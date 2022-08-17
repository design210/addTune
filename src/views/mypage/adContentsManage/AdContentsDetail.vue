<template>
  <div class="sub-wrapper pl25 pr25 mb200">
    <!-- 파일 첨부 -->
    <div style="display: none">
      <input id="upFile" type="file" @input="handleFileChange" accept="video/mp4, image/jpeg, image/jpg, image/png" ref="fileupload" />
    </div>
    <Toast :content="toastContents" :visible="toastVisible"></Toast>
    <section class="video-info mt70">
      <!-- 비디오 업로드시 -->
      <div v-if="show === 'video'">
        <div
          class="thumbnail"
          @click="
            __showModalTemplate(
              require('@/components/modal/Video'),
              {
                videoSid: videoSid,
                videoTransSid: videoTransSid,
              },
              1000,
            )
          "
        >
          <img :src="videoImg" />
          <i></i>
          <span class="time">00:{{ video.videoSec }}</span>
          <img alt="" src="" />
        </div>
      </div>
      <!-- 이미지 업로드시 -->
      <div v-if="show === 'image'">
        <div class="thumbnail img">
          <img
            :src="`${apiBaseUrl}/file/fileView/${imageSid}?size=450`"
            alt=""
            @click="
              __showModalTemplate(
                require('@/components/modal/ImageSingle'),
                {
                  id: imageSid,
                },
                1000,
              )
            "
          />
        </div>
      </div>
      <!-- 영상 미업로드 시 -->
      <div v-if="show === 'none'">
        <div class="thumbnail none-contents" @click="fileLoader">
          <i></i>
          <p class="upload-content">{{ $t("purchase-detail-upload") }}</p>
        </div>
      </div>
      <div class="info-wrap" :class="className">
        <h1>{{ buyAdvertisingCampaignName }}</h1>
        <div class="date mt10">
          <span class="status">{{ buyAdvertisingStatusName }}&nbsp;&nbsp;</span
          ><span class="range"> |&nbsp;&nbsp;{{ $t("adContents-detail-execution") }} : {{ buyAdvertisingProductStartDate }} ~ {{ buyAdvertisingProductEndDate }} </span>
        </div>
        <section class="pull-down-btn-wrap" v-if="video !== null">
          <div class="mt130">
            <span @click="fileDown"><i class="download-icon"></i> &nbsp; {{ $t("button-download2") }}</span>
            <span class="ml33" @click="deleteContents" v-if="hasOrganized === 'F'"><v-icon>mdi-window-close</v-icon> &nbsp; {{ $t("button-contentDelete") }}</span>
          </div>
        </section>
      </div>
    </section>

    <h2 class="list mt85">{{ $t("adContents-detail-campaignInfo") }}</h2>

    <section class="video-info-detail">
      <h3>{{ buyAdvertisingCampaignName }}</h3>
      <table class="mt20">
        <colgroup>
          <col width="140" />
          <col width="*" />
          <col width="140" />
          <col width="*" />
        </colgroup>
        <tr>
          <th>{{ $t("adContents-detail-prodName") }}</th>
          <td colspan="3">{{ advertisingProductName }}</td>
        </tr>
        <tr>
          <th>{{ $t("adContents-detail-adExecution") }}</th>
          <td>{{ Calculation }}{{ $t("common-unit-day") }} ({{ buyAdvertisingProductStartDate }} ~ {{ buyAdvertisingProductEndDate }})</td>
          <th class="add-line">{{ $t("buyAd-slot-h1") }}</th>
          <td>{{ buyAdvertisingProductSlotCount }} {{ $t("common-unit-amount") }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-adProdInfo-zone") }}</th>
          <td colspan="3">{{ buyAdvertisingProductAreaChoiceList }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-adProdInfo-categories") }}</th>
          <td colspan="3">{{ buyAdvertisingProductCategoryName }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-adProdInfo-hopeStore") }}</th>
          <td colspan="3">
            {{ buyAdvertisingProductStoreTypeList }}
          </td>
        </tr>
        <tr>
          <th>{{ $t("pay-adProdInfo-tuneStore") }}</th>
          <td colspan="3">
            {{ $t("common-unit-total") }} {{ buyAdvertisingStoreCount }}{{ $t("common-unit-amount") }}
            <button
              class="btn-store-list ml20"
              @click="
                __showModalTemplate(
                  require('@/components/modal/mypage/PurchaseStoreList'),
                  {
                    buySid: buySid,
                  },
                  1200,
                )
              "
            >
              {{ $t("button-storeListView") }}
            </button>
          </td>
        </tr>
      </table>
    </section>
    <Progress :class="[toggle ? 'pg_on' : 'pg_off']" :innerToggle="toggle" />
  </div>
</template>

<script>
import Toast from "@/components/dialog/Toast";
import { getPopupOpt } from "@/utils/modal";
import warningBeforeUpload from "@/components/modal/AdContents/CheckBeforeUpLoadContents";
import videoDownload from "@/utils/videoDownload";
import { fileDownload } from "@/utils/fileDownload";
import showModal from "@/mixins/showModal";
import { getNeverSeeAgainCookieAdContents } from "@/utils/cookie";
import { mapGetters } from "vuex";
import Progress from "@/components/form/ProgressBar.vue";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";

export default {
  components: { Progress, Toast },
  mixins: [showModal, loading],
  props: ["apiBaseUrl"],
  data() {
    return {
      show: "",
      toggle: false, //프로그래스 바 보이기
      wait: false,

      buyAdvertisingStoreCount: "", //튠 스토어 수
      buyAdvertisingProductSid: "", //광고Sid
      buyAdvertisingProductSlotCount: "", //슬롯 수
      buyAdvertisingProductStartDate: "", //집행기간 - 시작
      buyAdvertisingProductEndDate: "", //집행기간 - 끝
      buyAdvertisingCampaignName: "", //캠페인 이름,
      buyAdvertisingProductCategoryName: "", //광고 카테고리
      buyAdvertisingProductAreaChoiceList: "", //지역
      buyAdvertisingProductGradeChoiceList: "", //스토어 희망등급
      buyAdvertisingProductStoreTypeList: "", //희망 스토어 업종
      advertisingProductName: "", //상품명
      buyAdvertisingStatus: "",
      buyAdvertisingStatusName: "", //집행 스탯
      buyAdvertisingContentLength: "", //영상 길이
      hasOrganized: "",
      videoImg: "",
      videoSid: "",
      videoTransSid: "",
      videoFileName: "", //파일 이름
      buySid: "",
      video: "",
      toastContents: "업로드가 완료되었습니다!",
      toastVisible: false,
      imageSid: "",
      fileExt: "",
      fileStorageFileName: "",
      className: "",
    };
  },
  computed: {
    //날짜 일수 계산
    Calculation() {
      const startDate = this.$date(this.buyAdvertisingProductStartDate);
      const endDate = this.$date(this.buyAdvertisingProductEndDate);
      return endDate.diff(startDate, "day") + 1;
    },
    ...mapGetters("adcontents", ["uploadContents", "getAdContentsDetail"]),
  },
  watch: {
    //업로드 전 컨텐츠 업로드 실행
    wait(val) {
      if (val === true) {
        document.getElementById("upFile").click();
      }
      this.wait = false;
    },
  },
  created() {
    this.getContentsDetail();
  },
  methods: {
    //광고 컨텐츠 상세조회
    async getContentsDetail() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("adcontents/GET_AD_CONTENTS_DETAIL", this.$route.params.id);
        const res = this.getAdContentsDetail.addtuneApiResult;

        if (res.errorCode !== 200) {
          alert(res.errorMessage);
          return this.$router.push("/mypage/adContents/adContentsList");
        }
        const data = res.advertisementContents;
        if (data.video === null && data.image === null) {
          this.show = "none";
        } else if (data.video) {
          this.show = "video";
          this.videoSid = data.video.videoSid;
          this.videoTransSid = data.video.video_trans[2].videoTransSid;
          this.videoFileName = data.video.videoFileName;
          this.videoImg = `${this.apiBaseUrl}/video/view/${this.videoSid}?videoTransSid=${this.videoTransSid}`;
        } else if (data.image) {
          this.show = "image";
          this.imageSid = data.image.fileSid;
          this.fileExt = data.image.fileExt;
          this.fileStorageFileName = data.image.fileStorageFileName;
        }
        this.buyAdvertisingStoreCount = data.buyAdvertisingStoreCount;
        this.buyAdvertisingProductSid = data.buyAdvertisingProductSid;
        this.buyAdvertisingProductSlotCount = data.buyAdvertisingProductSlotCount;
        this.buyAdvertisingProductStartDate = data.buyAdvertisingProductStartDate;
        this.buyAdvertisingProductEndDate = data.buyAdvertisingProductEndDate;
        this.buyAdvertisingCampaignName = data.buyAdvertisingCampaignName;
        this.buyAdvertisingProductCategoryName = data.buyAdvertisingProductCategoryName;
        this.buyAdvertisingProductGradeChoiceList = data.buyAdvertisingProductGradeChoiceList;
        this.buyAdvertisingProductAreaChoiceList = data.buyAdvertisingProductAreaChoiceList;
        this.buyAdvertisingProductStoreTypeList = data.buyAdvertisingProductStoreTypeList;
        this.advertisingProductName = data.advertising_product.advertisingProductName;
        this.buyAdvertisingContentLength = data.buyAdvertisingContentLength;
        this.video = data.video;
        this.buyAdvertisingStatusName = data.buyAdvertisingStatusName;
        this.buyAdvertisingStatus = data.buyAdvertisingStatus;
        if (this.buyAdvertisingStatus === "SYS21C10B002") {
          this.className = "before";
        } else if (this.buyAdvertisingStatus === "SYS21C10B003") {
          this.className = "ing";
        } else if (this.buyAdvertisingStatus === "SYS21C10B004") {
          this.className = "complete";
        }
        this.hasOrganized = data.hasOrganized;
        this.buySid = data.buySid;
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    fileDown() {
      videoDownload({ id: this.buyAdvertisingProductSid, name: this.videoFileName }, true);
    },
    imgDown() {
      fileDownload({ id: this.imageSid, fileExt: this.fileExt, name: this.fileStorageFileName });
    },
    async deleteContents() {
      const alert = this.$t("adContents-detail-videoDeleteAlert");
      if (window.confirm(alert)) {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("adcontents/DELETE_AD_CONTENTS", this.buyAdvertisingProductSid);
          const res = this.getAdContentsDetail.addtuneApiResult;

          if (res.errorCode !== 200) {
            alert(res.errorMessage);
          } else {
            alert(res.errorMessage);
            this.show = !this.show;
          }
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      }
    },
    fileLoader() {
      if (getNeverSeeAgainCookieAdContents() !== "hide") {
        this.$modal.show(warningBeforeUpload, { update: this.update }, getPopupOpt("warningBeforeUpload", "616px", "auto", false));
      } else {
        document.getElementById("upFile").click();
      }
    },
    update(data) {
      this.wait = data;
    },
    async handleFileChange(e) {
      let type = process.env.NODE_ENV;
      const size = type === "development" ? 100 : 500;
      const maxSize = size * 1024 * 1024;
      if (e.target.files[0].size > maxSize) {
        alert(`${size}${this.$t("adContents-detail-uploadAlert")}`);
        return;
      }

      this.toggle = !this.toggle;
      try {
        await this.$store.dispatch("adcontents/UPLOAD_CONTENTS", {
          id: this.buyAdvertisingProductSid,
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
        this.$refs.fileupload.value = null;
        this.toggle = !this.toggle;
        if (res.errorCode === 200) {
          this.show = !this.show;
          this.getContentsDetail();
        }
      } catch (error) {
        console.log(error);
      }
    },
    moveRequestVideoPage() {
      this.$router.push("/ad/productList");
    },
  },
};
</script>

<style lang="scss" scoped>
.video-info {
  display: flex;

  & .thumbnail {
    cursor: pointer;
    margin-right: 58px;
    position: relative;
    width: 450px;
    height: 253px;
    border-radius: 2px;
    overflow: hidden;
    &.img {
      cursor: inherit;
    }
    & img {
      width: 100%;
    }

    & .time {
      position: absolute;
      right: 10px;
      bottom: 12px;
      @include Montserrat(1.3, 500, #fff);
      background: rgba(0, 0, 0, 0.6);
      padding: 0 10px;
    }

    & i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 45px;
      height: 49px;
      background: url("../../../assets/images/play.png");
    }

    &.none-contents {
      background: #fff;
      border: 1px solid #4f4f4f;

      & i {
        width: 76px;
        height: 76px;
        background: url("../../../assets/images/plus_lg.png") no-repeat;
        top: 40% !important;
      }

      & .upload-content {
        text-align: center;
        @include NotoSans(1.7, 400, #bdbdbd);
        margin-top: 180px;
      }
    }
  }

  & .info-wrap {
    & h1 {
      @include NotoSans(3, 700, #333333);
    }
    &.before {
      & .status {
        @include NotoSans(2, 700, #4f4f4f);
      }
    }
    &.ing {
      & .status {
        @include NotoSans(2, 700, #ff0000);
      }
    }
    &.complete {
      & .status {
        @include NotoSans(2, 700, #0047ff);
      }
    }
    & .range {
      @include NotoSans(2, 400, #4f4f4f);
    }
    & .pull-down-btn-wrap {
      margin-top: 20px;
      position: relative;
      & .download-icon {
        width: 20px;
        height: 18px;
        background-image: url("../../../assets/images/icon_medium.png");
        vertical-align: -3px;
      }
      & span {
        cursor: pointer;
        @include NotoSans(1.7, 500, #828282);
      }

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

    & .control-menu {
      margin-top: 30px;

      & .download {
        @include NotoSans(1.7, 400, #828282);

        & i {
          vertical-align: 3px;
          margin-right: 5px;
        }
      }

      & .delete {
        margin-left: 33px;
        @include NotoSans(1.7, 400, #828282);

        & i {
          vertical-align: -1px;
        }
      }
    }
  }
}

.list {
  @include NotoSans(2.5, 700, #333333);

  & span {
    @include NotoSans(1.5, 400, #828282);
    margin-left: 20px;
  }
}

.none-history {
  @include NotoSans(1.8, 400, #828282);
  text-align: center;
}

.ad-info-list {
  & h3 {
    margin-top: 54px;
    @include NotoSans(2, 500, #333333);
  }

  & .fold {
    background: url("../../../assets/images/down.png");
    width: 20px;
    height: 12px;
    vertical-align: 0px;
    margin-left: 20px;
    cursor: pointer;

    &.active {
      background: url("../../../assets/images/up.png");
    }
  }

  & .fold-tbl {
    border-top: 1px solid #e0e0e0;
    overflow: hidden;
    height: 0px;
    transition: height 0.3s ease-in-out;

    &.active {
      border-top: 0;
    }
  }
}

table {
  border-top: 2px solid #ff4d56;
  border-bottom: 1px solid #828282;

  & tr {
    & th {
      padding: 20px 0;
      @include NotoSans(1.5, 700, #333333);
      text-align: left;
      border-bottom: 1px solid #dddddd;
      padding-left: 10px;
    }

    & td {
      @include NotoSans(1.5, 400, #333333);
      border-bottom: 1px solid #dddddd;

      & .link {
        & li {
          position: relative;

          &:after {
            content: "";
            background: #4f4f4f;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            position: absolute;
            left: 0;
            top: 10px;
          }

          & a {
            @include NotoSans(1.4, 400, #4f4f4f);
            padding-left: 13px;
          }
        }
      }
    }

    &:last-child {
      & th {
        border-bottom: 0;
      }

      & td {
        border-bottom: 0;
      }
    }

    & .add-line {
      border-left: 1px solid #dddddd;
      padding-left: 50px;
    }
  }
}

.video-info-detail {
  margin-top: 54px;
  & h3 {
    @include NotoSans(2, 500, #333333);
  }
}

.pg_off {
  display: none;
}

.pg_on {
  display: block;
}

.btn-store-list {
  @include NotoSans(1.3, 500, #828282);
  text-decoration: underline;
}
</style>
