<template>
  <div>
    <!-- 토스트 알럿 -->
    <Toast :content="toastContent" :visible="toastVisible" />
    <!-- //토스트 알럿 -->
    <section class="top-info-wrap">
      <div class="container">
        <!-- 회원 안내 메세지 영역 -->
        <div class="user-info">
          <span v-if="userData.userStatus.message == '로그인해주세요'">
            <router-link to="/login">{{ userData.userStatus.message }}</router-link>
          </span>
          <span v-else>{{ userData.userStatus.message }}</span>
          <button v-if="userData.userStatus.status === 1" type="button" @click="$router.push('/mypage/estimate/list')">
            {{ $t("button-checkMoveBtn") }}
          </button>
          <button v-if="userData.userStatus.status === 2" type="button" @click="$router.push('/mypage/adContents/adContentsList')">
            {{ $t("button-checkMoveBtn") }}
          </button>
          <button v-if="userData.userStatus.status === 3" type="button" @click="$router.push('/mypage/estimate/list')">
            {{ $t("button-checkMoveBtn") }}
          </button>
          <button v-if="userData.userStatus.status === 4" type="button" @click="$router.push('/report')">
            {{ $t("button-checkMoveBtn") }}
          </button>
        </div>
        <!-- //회원 안내 메세지 영역 -->

        <!-- 상단 튠 스토어 수 & 월 누적 통행량 정보 -->
        <div class="top-banner mt4">
          <div class="info-wrap mt80">
            <h2>
              {{ $t("main-tuneStoreInfo-now") }}
              <span>{{ __localeString(userData.storeCount) }}</span
              >{{ $t("main-tuneStoreInfo-wait") }}
            </h2>
            <div class="d-flex justify-space-between stay">
              <div class="subject">{{ $t("main-tuneStoreInfo-monthTraffic") }}</div>
              <div class="data">
                <p class="count">
                  <span class="mr5">{{ __localeString(userData.storeTrafficMonthTotal.traffic) }}</span
                  >{{ $t("common-unit-person") }}
                </p>
                <p>
                  <sup>*</sup> {{ userData.storeTrafficMonthTotal.year }}.{{ userData.storeTrafficMonthTotal.month }}
                  {{ $t("main-tuneStoreInfo-counting") }}
                </p>
              </div>
            </div>
            <button class="mt50" type="button" @click="$router.push('/ad/adMain')">{{ $t("button-checkAroundBtn") }}<i></i></button>
          </div>
        </div>
        <!-- 상단 튠 스토어 수 & 월 누적 통행량 정보 -->
      </div>
    </section>
    <!-- 광고 기획 상품 -->
    <section class="ad-set-wrap container mt160">
      <h1>{{ $t("main-adPlanningProduct-h1") }}</h1>
      <h2>{{ $t("main-adPlanningProduct-h2") }}</h2>
      <div v-if="userData.advertisingProduct.length > 4" class="btn-all mt50">
        <button type="button" @click="$router.push('/main/product')">{{ $t("button-allBtn") }}<i></i></button>
      </div>
      <ul class="pro-list mt15">
        <li v-for="item in userData.advertisingProduct" :key="item.advertisingProductSid" @click="$router.push(`/ad/adMain/adManage/${item.advertisingProductSid}`)">
          <div>
            <div class="img-wrap">
              <span v-if="item.advertisingProductOptionSummary !== null" class="discount">{{ item.advertisingProductOptionSummary }}</span>
              <span v-if="item.file_master.length > 0">
                <span v-for="file in item.file_master" :key="file.fileSid"
                  ><img :alt="item.advertisingProductSummary" :src="`${apiBaseUrl}/file/fileView/${file.fileSid}?size=240`" v-if="file.fileKind === 'SYS21B09B001'" /></span
              ></span>
              <span v-else><img alt="" src="@/assets/images/none.png" /></span>
            </div>
            <div class="pt15 pl15 pr15 pb17">
              <div>
                <span class="price">{{ __localeString(item.advertisingProductPrice) }}</span>
                <span class="unit">{{ $t("common-unit-price") }}~</span>
              </div>
              <div class="name">{{ item.advertisingProductName }}</div>
            </div>
          </div>
        </li>
      </ul>
      <h3 class="mt30">{{ $t("main-adPlanningProduct-comment") }}</h3>
    </section>
    <!-- //광고 기획 상품 -->

    <!-- 포트 폴리오 -->
    <section class="movie-wrap">
      <h2 v-html="$t('main-portfolio-h1')"></h2>
      <h3>{{ $t("main-portfolio-h2") }}</h3>
      <ad-main-bottom-slide :bottomBanner="userData.bottomBanner" class="mt90"></ad-main-bottom-slide>
      <div class="ad-set-btn mt84">
        <button @click="$router.push('/ad/productList')">{{ $t("button-checkWatchBtn") }}</button>
      </div>
    </section>
    <!-- //포트 폴리오 -->

    <!-- 애드튠 앱 안내 -->
    <section class="banner-fix mt200 mb200">
      <div class="container d-flex">
        <div class="d-center">
          <div class="d-flex">
            <div class="text mt30">
              <h2 v-html="$t('main-app-h1')"></h2>
              <div class="d-flex align-center">
                <div class="qr"><img alt="qr code" src="@/assets/images/qr.png" style="width: 115px" /></div>
              </div>
              <h3>{{ $t("main-app-h2") }}</h3>
            </div>
            <div class="ml90">
              <img alt="addTune app image" src="@/assets/images/app.gif" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- //애드튠 앱 안내 -->

    <!-- 보도 자료 -->
    <section class="press container mb200" v-if="$i18n.locale === 'ko'">
      <h2>{{ $t("main-press-h1") }}</h2>
      <h3>{{ $t("main-press-h2") }}</h3>
      <div class="btn-all mt12">
        <button type="button" @click="$router.push('/main/press')">{{ $t("button-allBtn") }}<i></i></button>
      </div>
      <ul class="press-list d-flex mt15">
        <li v-for="item in userData.news" :key="item.boardNewsURL">
          <div>
            <a :href="item.boardNewsURL" target="_blank"><img :alt="item.boardNewsDescription" :src="item.boardNewsImageURL" /></a>
          </div>
          <div class="info-line">
            <div class="title">
              <a :href="item.boardNewsURL" target="_blank">{{ item.boardNewsTitle }}</a>
            </div>
            <div class="btn mt23">
              <button v-clipboard:copy="item.boardNewsURL" v-clipboard:error="onError" v-clipboard:success="onCopy" type="button"><i></i> {{ $t("common-linkCopy") }}</button>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <!-- 보도 자료 -->
  </div>
</template>

<script>
import Toast from "@/components/dialog/Toast";
import { computed, getCurrentInstance, onMounted, reactive } from "@vue/composition-api";
import AdMainBottomSlide from "@/components/ad/AdMainBottomSlide.vue";
import { getPopupOpt } from "@/utils/modal";
import { getHideModalCookie, getHomepageUserNameCookie } from "@/utils/cookie";
import eventModal from "@/components/modal/Event";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import localeString from "@/mixins/localeString";

export default {
  components: { AdMainBottomSlide, Toast },
  mixins: [loading, localeString],
  props: ["apiBaseUrl"],
  data() {
    return {
      toastContent: "",
      toastVisible: false,
    };
  },
  created() {
    if (this.$route.query.sns === "join") {
      const name = getHomepageUserNameCookie();
      this.toastContent = `${name}님, 환영합니다!`;
      this.toastVisible = !this.toastVisible;
    }
  },
  metaInfo() {
    return {
      title: "애드튠 ADDTUNE : 성과측정 가능한 디지털 옥외광고! 합리적인 비용, 한번에 전국광고!",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "1분만 투자하면 견적 상담 없이 바로 구매 가능! 광고 효과도 측정해주는 옥외광고는 처음일 거예요. 똑똑한 옥외광고 애드튠. ",
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: "애드튠,  ADDTUNE, 옥외광고, 옥외광고 성과측정, 디지털옥외광고, 옥외광고물, 지역광고, 전국광고, 택시광고, 버스광고, 지하철광고, 튠, 채널튠, TUNE, 디지털사이니지, 인터브리드",
        },
      ],
    };
  },
  setup() {
    return {
      ...homeData(),
    };
  },
};
//홈 데이터
function homeData() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const userData = reactive({
    userStatus: {},
    storeCount: "",
    advertisingProduct: [],
    adBanner: [],
    addTuneBanner: [],
    news: [],
    storeTrafficMonthTotal: {},
    bottomBanner: [],
    eventSheetModelBanner: {
      bannerOpenFlag: "",
      bannerCloseKind: "",
      bannerCloseKindName: "",
      bannerLink: "",
      bannerTarget: "",
      bannerStartDateTime: "",
      bannerEndDateTime: "",
      bannerTitle: "",
      bannerSubTitle: "",
      bannerContent: "",
      fileSid: "",
      daySet: "",
    },
  });
  const getHome = computed(() => _this.$store.getters["common/getHomeData"]);
  onMounted(async () => {
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("common/GET_HOME_DATA");
      const res = getHome.value.addtuneApiResult;
      if (res.errorCode === 200) {
        userData.userStatus = res.home.userStatus;
        userData.storeCount = res.home.storeCount;
        userData.advertisingProduct = res.home.advertisingProduct;
        userData.adBanner = res.home.adBanner;
        userData.addTuneBanner = res.home.addTuneBanner;
        userData.news = res.home.news;
        userData.storeTrafficMonthTotal = res.home.storeTrafficMonthTotal;
        const bottomBanner = [];
        const bbanner = res.home.bottomBanner.file_master;
        bbanner.forEach(ele => {
          bottomBanner.push(`${process.env.VUE_APP_API}/file/fileView/${ele.fileSid}?size=300`);
        });
        userData.bottomBanner = bottomBanner;
        if (res.home.eventSheetModelBanner !== null) {
          userData.eventSheetModelBanner.bannerOpenFlag = res.home.eventSheetModelBanner.bannerOpenFlag;
          userData.eventSheetModelBanner.bannerCloseKind = res.home.eventSheetModelBanner.bannerCloseKind;
          userData.eventSheetModelBanner.bannerLink = res.home.eventSheetModelBanner.bannerLink;
          userData.eventSheetModelBanner.bannerTarget = res.home.eventSheetModelBanner.bannerTarget;
          userData.eventSheetModelBanner.bannerCloseKindName = res.home.eventSheetModelBanner.bannerCloseKindName;
          userData.eventSheetModelBanner.bannerTitle = res.home.eventSheetModelBanner.bannerTitle;
          userData.eventSheetModelBanner.bannerSubTitle = res.home.eventSheetModelBanner.bannerSubTitle;
          userData.eventSheetModelBanner.bannerContent = res.home.eventSheetModelBanner.bannerContent;
          if (res.home.eventSheetModelBanner.file_master.length > 0) {
            userData.eventSheetModelBanner.fileSid = res.home.eventSheetModelBanner.file_master[0].fileSid;
          }
          userData.eventSheetModelBanner.bannerStartDateTime = _this.$date(res.home.eventSheetModelBanner.bannerStartDateTime).local().format("YYYY-MM-DD HH:mm:ss");
          userData.eventSheetModelBanner.bannerEndDateTime = _this.$date(res.home.eventSheetModelBanner.bannerEndDateTime).local().format("YYYY-MM-DD HH:mm:ss");

          if (userData.eventSheetModelBanner.bannerOpenFlag === "Y") {
            const isBetween = require("dayjs/plugin/isBetween");
            _this.$date.extend(isBetween);
            const today = _this.$date().format("YYYY-MM-DD HH:mm:ss");
            if (_this.$date(today).isBetween(userData.eventSheetModelBanner.bannerStartDateTime, userData.eventSheetModelBanner.bannerEndDateTime, null, "[]")) {
              switch (userData.eventSheetModelBanner.bannerKind) {
                case "SYS22228B008":
                  userData.eventSheetModelBanner.daySet = "100000000000";
                  break;
                case "SYS22228B009":
                  userData.eventSheetModelBanner.daySet = "1";
                  break;
                case "SYS22228B010":
                  userData.eventSheetModelBanner.daySet = "7";
                  break;
              }
              bannerModal({
                daySet: userData.eventSheetModelBanner.daySet,
                closeName: userData.eventSheetModelBanner.bannerCloseKindName,
                title: userData.eventSheetModelBanner.bannerTitle,
                subTitle: userData.eventSheetModelBanner.bannerSubTitle,
                contents: userData.eventSheetModelBanner.bannerContent,
                fileSid: userData.eventSheetModelBanner.fileSid,
                link: userData.eventSheetModelBanner.bannerLink,
                target: userData.eventSheetModelBanner.bannerTarget,
              });
            }
          }
        }
      } else {
        alert(res.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  });
  const bannerModal = data => {
    const cookie = getHideModalCookie();
    if (cookie === null) {
      _this.$modal.show(
        eventModal,
        {
          daySet: data.daySet,
          closeName: data.closeName,
          title: data.title,
          subTitle: data.subTitle,
          contents: data.contents,
          fileSid: data.fileSid,
          link: data.link,
          target: data.target,
        },
        getPopupOpt("eventModal", "500px", "auto", false),
      );
    }
  };
  const onCopy = () => {
    alert("복사 되었습니다.");
  };
  const onError = () => {
    alert("복사에 실패했습니다.");
  };
  return { userData, onCopy, onError };
}
</script>

<style lang="scss" scoped>
.ad-set-btn {
  text-align: center;
  margin-top: 25px;

  & button {
    background: #ff4d56;
    height: 70px;
    line-height: 70px;
    width: 250px;
    border-radius: 2px;
    @include NotoSans(2.7, 700, #fff);
  }
}

.movie-wrap {
  margin-top: 200px;

  & h2 {
    @include NotoSans(4.5, 700, #4f4f4f);
    text-align: center;
  }

  & h3 {
    @include NotoSans(2, 400, #828282);
    padding-top: 15px;
    text-align: center;
  }
}

.main-banner-silder {
  width: 100%;
  min-width: 1110px;
}

.container {
  width: 1048px;
  margin: 0 auto;
}

.btn-all {
  text-align: right;
  @include NotoSans(1.5, 700, #828282);

  & i {
    background: url("../assets/images/main_arrow_gray.png");
    width: 17px;
    height: 12px;
    vertical-align: -1px;
    margin-left: 5px;
  }
}

.top-info-wrap {
  background: linear-gradient(360deg, #f2f2f2 0%, #ffffff 88.55%);
  padding: 33px 0 50px 0;

  & .user-info {
    @include NotoSans(1.7, 700, #4f4f4f);
    text-align: center;
    position: relative;
    z-index: 2;
    height: 45px;
    & a {
      color: #4f4f4f;
    }

    & button {
      @include NotoSans(1.5, 700, #828282);
      background: #f2f2f2;
      height: 45px;
      border-radius: 10px;
      padding: 0 13px;
      margin-left: 20px;
    }
  }

  & .top-banner {
    & .info-wrap {
      text-align: center;

      & h2 {
        text-align: center;
        @include NotoSans(3, 700, #333333);
        position: relative;

        & span {
          @include Montserrat(3.5, 600, #333333);
          color: #ff4d56 !important;
        }
      }

      & button {
        @include NotoSans(1.9, 400, #333333);
        margin-top: 35px;
        @include NotoSans(2.3, 700, #fff);
        background: #ff4d56;
        height: 70px;
        border-radius: 35px;
        padding: 0 30px;
        letter-spacing: -1px;

        & i {
          background: url("../assets/images/main-arrow.png") no-repeat;
          background-size: 100%;
          width: 20px;
          height: 23px;
          vertical-align: -6px;
          margin-left: 10px;
        }
      }

      & .stay {
        border-top: 0.5px solid #828282;
        width: 700px;
        margin: 0 auto;
        margin-top: 15px;
        padding-top: 15px;

        & .subject {
          padding-left: 60px;
          @include NotoSans(1.8, 500, #4f4f4f);
        }

        & .data {
          padding-right: 60px;
          text-align: right;
          @include NotoSans(1.3, 400, #828282);

          & .count {
            @include NotoSans(1.8, 400, #4f4f4f);

            & span {
              @include Montserrat(3, 600, #4f4f4f);
            }
          }
        }
      }
    }

    & .img-wrap {
      margin-left: 60px;
    }
  }
}

.ad-set-wrap {
  & h1 {
    text-align: center;
    @include NotoSans(4.5, 700, #4f4f4f);
  }

  & h2 {
    text-align: center;
    @include NotoSans(2, 400, #828282);
    margin-top: 10px;
  }

  & .pro-list {
    display: flex;
    justify-content: space-between;

    & li {
      width: calc(25% - 12px);
      border-radius: 10px;
      overflow: hidden;
      position: relative;
      @include boxshadow(3px, 3px, 30px, 0px, rgba(0, 0, 0, 0.12));
      cursor: pointer;
      display: none;

      &:nth-child(1) {
        display: block;
      }

      &:nth-child(2) {
        display: block;
      }

      &:nth-child(3) {
        display: block;
      }

      &:nth-child(4) {
        display: block;
      }

      & .discount {
        background: rgba(0, 0, 0, 0.8);
        height: 27px;
        @include NotoSans(1.3, 700, #ffffff);
        border-radius: 14px;
        line-height: 27px !important;
        position: absolute;
        left: 10px;
        top: 10px;
        padding: 0 10px;
      }

      & img {
        width: 240px;
        height: 200px;
      }

      & .price {
        @include Montserrat(2.5, 600, #333333);
      }

      & .unit {
        @include NotoSans(1.5, 400, #333333);
        margin-left: 5px;
      }

      & .name {
        @include NotoSans(1.5, 400, #4f4f4f);
      }
    }
  }

  & h3 {
    @include NotoSans(1.4, 400, #4f4f4f);
    text-align: center;
  }
}

.banner {
  & > div {
    text-align: center;
  }
}

.addtune {
  & h1 {
    text-align: center;
    @include NotoSans(4.5, 700, #4f4f4f);
  }

  & h2 {
    text-align: center;
    @include NotoSans(2, 400, #828282);
    margin-top: 10px;
  }

  & li {
    margin-bottom: 15px;
  }
}

.banner-fix {
  background: #fff6f7;
  padding-top: 57px;

  & .text {
    width: 280px;

    & h2 {
      @include NotoSans(3.1, 500, #333333);
      text-align: center;
    }

    & h3 {
      @include NotoSans(1.6, 700, #4f4f4f);
      text-align: center;
    }

    & .qr {
      display: inline-block;
      margin: 30px auto 22px;
      text-align: center;

      & img {
        border-radius: 10px;
        border: 3px solid #ffd1d4;
      }
    }
  }

  & .d-center {
    margin: 0 auto;
  }
}

.press {
  & h2 {
    text-align: center;
    @include NotoSans(4.5, 700, #4f4f4f);
  }

  & h3 {
    text-align: center;
    @include NotoSans(2, 400, #828282);
    margin-top: 10px;
  }

  & .press-list {
    flex-wrap: wrap;

    & li {
      width: calc(33.33333% - 14px);
      margin-right: 21px;
      border: 1px solid #bdbdbd;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 30px;

      &:nth-child(3n) {
        margin-right: 0;
      }

      & img {
        width: 320px;
        height: 220px;
      }

      & .info-line {
        padding: 20px 20px 15px;

        & .title {
          overflow: hidden;
          text-overflow: ellipsis;
          word-wrap: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* ellipsis line */
          -webkit-box-orient: vertical;
          @include NotoSans(1.7, 700, #4f4f4f);
          height: 50px;

          & a {
            @include NotoSans(1.7, 700, #4f4f4f);
          }
        }
      }

      & .btn {
        text-align: right;

        & button {
          @include NotoSans(1.4, 700, #bdbdbd);

          & i {
            width: 17px;
            vertical-align: -2px;
            height: 17px;
            background: url("../assets/images/link.png");
          }
        }
      }
    }
  }
}

.btn-group {
  & .btn-addtune {
    height: 70px;
    width: 300px;
    background: #ff4d56;
    @include NotoSans(2.5, 700, #fff);
  }

  & .btn-contact {
    height: 70px;
    width: 300px;
    background: #ff4d56;
    @include NotoSans(2.5, 700, #fff);
  }

  & .company {
    position: relative;

    & p {
      position: absolute;
      top: -50px;
      left: 50%;
      transform: translateX(-50%);
      @include NotoSans(1.6, 400, #828282);
    }
  }
}
</style>
