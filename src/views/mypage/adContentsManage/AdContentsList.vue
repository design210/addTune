<template>
  <div>
    <Toast :content="toastContents" :visible="toastVisible"></Toast>
    <section class="tab mt92" v-if="totalCount > 0">
      <ul class="ad-contents-tab">
        <li :class="{ active: style === 99 }" @click="getAdContents()">{{ $t("report-total-total") }} {{ totalCount }}</li>
        <li v-for="(item, index) in statusList" :key="item.sysCodeSid" @click="getAdContents(item.sysCodeSid)" :class="{ active: style === index }">{{ item.sysCodeName }} {{ item.count }}</li>
      </ul>
    </section>

    <section class="ad-contents-list" v-if="totalCount > 0">
      <div v-if="contents.length > 0">
        <button class="btn-modal mb20" @click="noticeModalOpen"><i></i>{{ $t("adContents-list-notice") }}</button>
        <ul>
          <li v-for="(item, index) in contents" :key="item.buyAdvertisingProductSid">
            <div v-if="item.video === null && item.image === null">
              <input :id="'file' + index" class="file-trigger" type="file" accept="video/mp4, image/jpeg, image/jpg, image/png" @change="handleFileChange($event, item.buyAdvertisingProductSid)" />
              <div class="thumbnail file-select" @click="clicked(index, $event)">
                <i></i>
                <p class="ad-info">{{ $t("purchase-detail-upload") }}</p>
              </div>
            </div>
            <div v-if="item.video !== null && item.video.video_trans.length > 0" class="thumbnail" @click="goDetail(item)">
              <img :src="`${apiBaseUrl}/video/view/${item.video.video_trans[0].videoSid}?videoTransSid=${item.video.video_trans[0].videoTransSid}?size=287`" alt="thumb" />
              <p class="time">00:{{ item.video.videoSec }}</p>
            </div>
            <div v-if="item.image !== null && item.video === null" class="thumbnail" @click="goDetail(item)">
              <img :src="`${apiBaseUrl}/file/fileView/${item.image.fileSid}?size=287`" alt="" />
            </div>
            <div>
              <div>
                <p class="subject">
                  <router-link :to="`/mypage/adContents/adContentsDetail/${item.buyAdvertisingProductSid}`">{{ item.buyAdvertisingCampaignName }} </router-link>
                </p>
                <p class="date">
                  <span :class="buyAdvertisingStatusColor(item.buyAdvertisingStatus)">{{ item.buyAdvertisingStatusName }}</span> &nbsp;|&nbsp; {{ $t("adContents-detail-execution") }} :
                  {{ item.buyAdvertisingProductStartDate }} ~
                  {{ item.buyAdvertisingProductEndDate }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="contents.length === 0" class="no-content">{{ $t("adContents-list-noneContent") }}</div>
    </section>
    <div class="text-center mb120" v-if="contents.length > 0">
      <v-pagination v-model="page" :length="len" :total-visible="9"></v-pagination>
    </div>
    <!-- 광고 컨텐츠가 없을 경우 -->
    <section class="none-data-wrap" v-if="totalCount === 0">
      <h1 class="mt130">{{ $t("purchase-list-notYet") }}</h1>
      <h2 class="mt12">{{ $t("purchase-list-fast") }}</h2>
      <div class="center mt20 mt50">
        <router-link to="/ad/adMain" class="btn-product">{{ $t("button-makeAd") }} <i></i></router-link>
      </div>
      <h3 class="mt30 mb100">
        {{ $t("adContents-list-noneVideo") }} <router-link to="/ad/productList">{{ $t("button-goMakeVideo") }}</router-link>
      </h3>
    </section>
    <!-- //광고 컨텐츠가 없을 경우 -->
    <Progress :class="[toggle ? 'pg_on' : 'pg_off']" :innerToggle="toggle" />
  </div>
</template>

<script>
import Toast from "@/components/dialog/Toast";
import { getPopupOpt } from "@/utils/modal";
import bus from "@/utils/bus.js";
import { getNeverSeeAgainCookieAdContents } from "@/utils/cookie";
import warningBeforeUpload from "@/components/modal/AdContents/CheckBeforeUpLoadContents";
import notice from "@/components/modal/AdContents/Notice";
import Progress from "@/components/form/ProgressBar.vue";
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
export default {
  components: { Progress, Toast },
  mixins: [loading],
  props: ["apiBaseUrl"],
  data() {
    return {
      size: 9,
      page: 1,
      len: null,
      files: [],
      buyAdvertisingStatus: "", //광고 컨텐츠 상태
      statusList: [],
      totalCount: null,
      contents: [],
      toggle: false,
      wait: false,
      selctedSid: "",
      idx: 0,
      neverOpen: false,
      style: 99,
      toastContents: this.$t("adContents-list-uploadComp"),
      toastVisible: false,
    };
  },
  computed: {
    ...mapGetters("adcontents", ["uploadContents", "getAdContentsList"]),
  },
  watch: {
    files(val) {
      console.log(val);
    },
    page() {
      this.getAdContents();
    },
    wait(val) {
      if (val === true) {
        document.getElementById(`file${this.idx}`).click();
      }
      this.wait = false;
    },
  },
  created() {
    bus.$on("openFileLoader", this.update);
  },
  mounted() {
    this.getAdContents();
  },
  methods: {
    async handleFileChange(e, sid) {
      let type = process.env.NODE_ENV;
      const size = type === "development" ? 100 : 500;
      const maxSize = size * 1024 * 1024;
      if (e.target.files[0].size > maxSize) {
        alert(`${size}${this.$t("adContents-detail-uploadAlert")}`);
        return;
      }
      this.toggle = !this.toggle;
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("adcontents/UPLOAD_CONTENTS", {
          id: sid,
          channeltuneFiles: e.target.files[0],
        });
        const res = this.uploadContents.addtuneApiResult;
        let txt = 0;
        switch (res.errorCode) {
          case 200:
            txt = res.errorMessage;
            this.toastVisible = true;
            break;
          case 430:
            //430일 때 영상길이 맞지 않음
            txt = this.$t("adContents-detail-videoLengthAlert");
            alert(txt);
            break;
          case 431:
            //431일때 영상길이 15초 이하
            txt = this.$t("adContents-detail-videoLengthAlert");
            alert(txt);
            break;

          default:
            txt = res.errorMessage;
            alert(txt);
            break;
        }
        const inputs = document.querySelectorAll(".file-trigger");
        inputs.forEach(ele => (ele.value = null));
        this.toggle = !this.toggle;
        if (res.errorCode === 200) {
          this.show = !this.show;
          this.getAdContents();
          this.wait = false;
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async getAdContents(sid = "") {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("adcontents/GET_AD_CONTENTS", {
          size: this.size,
          page: this.page,
          buyAdvertisingStatus: sid,
        });
        const res = this.getAdContentsList.addtuneApiResult;
        if (res.errorCode !== 200) {
          alert(res.errorMessage);
          return;
        }
        this.statusList = res.advertisementContents.statusList;
        this.totalCount = res.advertisementContents.totalCount;
        this.contents = res.advertisementContents.contents.data;
        this.len = res.advertisementContents.contents.last_page;
        if (sid === "SYS21C10B002") {
          this.style = 0;
        } else if (sid === "SYS21C10B003") {
          this.style = 1;
        } else if (sid === "SYS21C10B004") {
          this.style = 2;
        } else {
          this.style = 99;
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    goDetail(link) {
      this.$router.push(`/mypage/adContents/adContentsDetail/${link.buyAdvertisingProductSid}`);
    },
    buyAdvertisingStatusColor(code) {
      if (code === "SYS21C10B002") {
        return "before";
      } else if (code === "SYS21C10B003") {
        return "current";
      } else {
        return "after";
      }
    },
    clicked(idx) {
      this.idx = idx;
      if (getNeverSeeAgainCookieAdContents() !== "hide") {
        this.$modal.show(warningBeforeUpload, { update: this.update }, getPopupOpt("warningBeforeUpload", "616px", "auto", false));
      } else {
        document.getElementById(`file${this.idx}`).click();
      }
    },
    update(data) {
      data === true ? (this.wait = data) : this.$modal.show(notice, { update: this.fileSelectOpen }, getPopupOpt("notice", "616px", "auto", false));
    },
    fileSelectOpen(data) {
      this.wait = data;
    },
    noticeModalOpen() {
      const notice = true;
      this.$modal.show(warningBeforeUpload, { notice }, getPopupOpt("warningBeforeUpload", "616px", "auto", false));
    },
  },
};
</script>

<style lang="scss" scoped>
.no-content {
  text-align: center;
  @include NotoSans(1.8, 400, #828282);
}
.ad-contents-list {
  margin-top: 40px;

  & ul {
    display: flex;
    flex-wrap: wrap;

    & li {
      width: 262px;
      margin-right: 28px;
      margin-bottom: 68px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      & .thumbnail {
        cursor: pointer;
        position: relative;
        height: 148px;
        border: 1px solid #828282;
        border-radius: 4px;
        -webkit-transition: 0.3s ease-in-out;
        transition: 0.3s ease-in-out;

        & i {
          width: 38px;
          height: 38px;
          background: url("../../../assets/images/plus_md.png");
          display: block;
          margin: 48px auto 20px;
        }

        & .ad-info {
          text-align: center;
          @include NotoSans(1.3, 400, #bdbdbd);
        }

        & .time {
          position: absolute;
          right: 10px;
          bottom: 10px;
          @include Montserrat(1.3, 500, #fff);
          background: rgba(0, 0, 0, 0.6);
          padding: 0 10px;
        }

        & img {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        &:hover {
          opacity: 0.5;
        }
      }

      & .subject {
        @include NotoSans(1.6, 700, #4f4f4f);
        margin-top: 13px;

        & a {
          @include NotoSans(1.6, 700, #4f4f4f);
        }

        & .etc {
          font-weight: 400 !important;
          position: relative;

          & .tool-tip {
            display: none;
            position: absolute;
            left: 40px;
            top: 50%;
            transform: translateY(-50%);
            background: #fff;
            border: 1px solid #4f4f4f;
            border-radius: 10px;
            padding: 10px 15px 10px 10px;

            & p {
              white-space: nowrap;
              @include NotoSans(1.3, 500, #333333);
            }

            &:after {
              content: "";
              position: absolute;
              background: url("../../../assets/images/tooltip-left.png");
              top: 50%;
              transform: translateY(-50%);
              width: 9px;
              height: 12px;
              left: -8px;
            }
          }
        }

        &:hover {
          text-decoration: underline;

          & a {
            text-decoration: underline;
          }

          & .etc {
            text-decoration: underline;

            & .tool-tip {
              display: block;
              @include boxshadow(4px, 0px, 10px, 0px, rgba(0, 0, 0, 0.1));
            }
          }
        }
      }

      & .date {
        @include NotoSans(1.3, 400, #4f4f4f);
        margin-top: 3px;

        & span {
          &.before {
            @include NotoSans(1.3, 700, #4f4f4f);
          }

          &.current {
            @include NotoSans(1.3, 700, #ff0000);
          }

          &.after {
            @include NotoSans(1.3, 700, #0047ff);
          }
        }
      }
    }
  }
}

.tab {
  display: flex;
  justify-content: space-between;

  & ul {
    width: 100%;
    height: 55px;
    background: #f2f2f2;
    display: flex;
    justify-content: space-between;
    border-radius: 28px;
    padding: 5px !important;

    & li {
      @include NotoSans(1.7, 400, #828282);
      cursor: pointer;
      line-height: 45px !important;
      text-align: center;
      width: 25%;

      &.active {
        background: #fff;
        border-radius: 25px;
        @include boxshadow(4px, 0px, 10px, 0px, rgba(0, 0, 0, 0.1));
        color: #4f4f4f !important;
      }
    }
  }

  & .btn-upload {
    @include NotoSans(1.8, 500, #4f4f4f);
    height: 55px;
    border: 1px solid #4f4f4f;
    border-radius: 5px;
    padding: 0 20px;

    & i {
      width: 16px;
      height: 16px;
      background: url("../../../assets/images/plus_xs.png");
      margin-right: 10px;
      vertical-align: -1px;
    }
  }
}

.file-trigger {
  display: none;
}

.file-select {
  cursor: pointer;
}

.pull-down-btn-wrap {
  position: relative;

  & .pull-down-btn {
    width: 350px;
    height: 70px;
    background: #ff4d56;
    @include NotoSans(2.5, 500, #fff);
    border-radius: 2px;
  }

  & .btn-child {
    display: none;
    position: absolute;
    left: 0;
    top: 70px;
    background: #fff;
    width: 350px;
    padding: 27px 0;
    @include boxshadow(0px, 5px, 25px, 0px, rgba(0, 0, 0, 0.15));
    border-radius: 0px 0px 2px 2px;

    & li {
      @include NotoSans(1.7, 400, #4f4f4f);
      margin-bottom: 20px;
      text-align: center;

      &:last-child {
        margin-bottom: 0;
      }

      & button {
        &:hover {
          @include NotoSans(1.7, 700, #ff4d56);
        }
      }
    }
  }
}

.pg_off {
  display: none;
}
.ad-contents-tab {
  max-width: 690px;
}
.pg_on {
  display: block;
}
.none-data-wrap {
  margin-bottom: 300px;
  & h1 {
    text-align: center;
    @include NotoSans(3, 500, #333333);
  }
  & h2 {
    text-align: center;
    @include NotoSans(2, 400, #4f4f4f);
  }
  & h3 {
    text-align: center;
    @include NotoSans(1.6, 400, #828282);
    & a {
      @include NotoSans(1.6, 700, #828282);
      text-decoration: underline;
      margin-left: 10px;
    }
  }
  & .btn-product {
    background-color: #ff4d56;
    @include NotoSans(2.5, 700, #fff);
    height: 70px;
    padding: 0 80px;
    line-height: 70px;
    border-radius: 2px;
    & i {
      background: url("../../../assets/images/arrow_white.png");
      width: 18px;
      height: 15px;
      display: inline-block;
      vertical-align: 1px;
    }
  }
}
.btn-modal {
  @include NotoSans(1.5, 500, #828282);
  margin-bottom: 5px;
  & i {
    background: url("../../../assets/images/info_xs_op.png");
    display: inline-block;
    width: 20px;
    height: 19px;
    margin-right: 5px;
    vertical-align: -4px;
  }
}
</style>
