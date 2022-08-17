<template>
  <section class="pt100 pb100 video-wrap">
    <section class="sub-wrapper">
      <h2 class="mt100">{{ $t("videoMake-h1") }}</h2>
      <h3 class="mt15" v-html="$t('videoMake-h2')"></h3>
      <div class="btn-wrap mt50">
        <button type="button" @click="scroll">
          {{ $t("button-contentMake") }}<i><img src="@/assets/images/arrow_white.png" alt="" /></i>
        </button>
      </div>
      <h4>{{ $t("videoMake-portfolio") }}</h4>
    </section>
    <div class="movie-sample-wrap">
      <div class="absolute">
        <VueSlickCarousel class="banner-slider" v-bind="prodData.settings" v-if="prodData.portfolio.length">
          <div class="a" v-for="item in prodData.portfolio" :key="item.video.videoSid">
            <div
              class="b"
              @click="
                __showModalTemplate(
                  require('@/components/modal/Video'),
                  {
                    videoSid: item.video.videoSid,
                    videoTransSid: item.video.video_trans[0].videoTransSid,
                  },
                  1200,
                )
              "
            >
              <div class="dim"></div>
              <transition name="fade">
                <img :src="`${apiBaseUrl}/video/view/${item.video.videoSid}?videoTransSid=${item.video.video_trans[2].videoTransSid}?size=300`" alt="" @load="onImgLoad" v-show="prodData.isLoaded" />
              </transition>
              <div class="info-wrap" v-if="prodData.isLoaded === true">
                <p class="title">{{ item.advertisingProductVideoSampleTitle }}</p>
                <div class="data">
                  <span>{{ item.advertisingProductVideoSampleClientName }}</span>
                  <span v-if="item.advertising_product !== null">
                    <span class="pl5 pr5">|</span>
                    <span>{{ item.advertising_product.advertisingProductName }}</span>
                    <span>({{ item.time }})</span>
                  </span>
                </div>
              </div>
              <div class="lds-roller" v-else>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </VueSlickCarousel>
      </div>
    </div>
    <section class="sub-wrapper mt100 pl25 pr25">
      <div class="btn-wrap">
        <button type="button" @click="scroll" class="white">{{ $t("button-goMake") }}</button>
      </div>
      <!-- 상품 안내 -->
      <h2 class="sub mt200 target">{{ $t("videoMake-priceTerm") }}</h2>
      <h3 class="sub mt10">{{ $t("videoMake-price") }}</h3>
      <ul class="mt44 prod-list">
        <li v-for="item in prodData.List" :key="item.advertisingProductSid" @click="$router.push(`/ad/productList/productDetail/${item.advertisingProductSid}`)">
          <div class="thumbnail">
            <p v-for="item2 in item.file_master" :key="item2.fileSid">
              <span v-if="item2.fileKind === 'SYS21B09B001'">
                <img :src="`${apiBaseUrl}/file/fileView/${item2.fileSid}?size=340`" alt="" class="prod-thumbnail" />
              </span>
            </p>
          </div>
          <div class="info-wrap">
            <p class="title">{{ item.advertisingProductName }}</p>
            <div class="price-wrap">
              <p class="price" v-if="item.advertisingProductPriceOpenFlag === 'Y'">
                <span v-if="item.advertisingProductPriceRate > 0">
                  <span class="origin">{{ __localeString(item.advertisingProductCostPrice) }}</span>
                  <span class="per">{{ item.advertisingProductPriceRate }}<em>%</em></span>
                </span>
                <span class="final">{{ __localeString(item.advertisingProductPrice) }}<em>원</em></span>
              </p>
              <p class="price" v-else>{{ $t("button-conference") }}</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import localeString from "@/mixins/localeString";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { reactive, computed, onMounted, getCurrentInstance } from "@vue/composition-api";
import showModal from "@/mixins/showModal";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
export default {
  components: { VueSlickCarousel },
  mixins: [showModal, loading, localeString],
  props: ["apiBaseUrl"],
  setup() {
    return {
      ...prodList(),
    };
  },
};
//영상 상품 리스트
function prodList() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const prodData = reactive({
    List: [],
    portfolio: [],
    settings: {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      centerMode: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
    },
    isLoaded: false,
  });
  const getList = computed(() => _this.$store.getters["product/getProductVideoList"]);
  onMounted(async () => {
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("product/PRODUCT_VIDEO_LIST", { size: "", page: "" });
      if (getList.value.addtuneApiResult.errorCode === 200) {
        prodData.List = getList.value.addtuneApiResult.advertisingProductVideo.advertisingProductVideoList;
        prodData.portfolio = getList.value.addtuneApiResult.advertisingProductVideo.portfolio;
        prodData.portfolio.forEach(ele => {
          ele.advertising_product = ele?.advertising_product;
          if (ele.advertising_product_video_trans !== null) {
            let minute = parseInt((ele.video.videoSec % 3600) / 60);
            let second = ele.video.videoSec % 60;
            if (minute === 0) {
              minute = "00";
            }
            ele.time = minute + ":" + second;
          }
        });
      } else {
        alert(getList.value.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  });
  const onImgLoad = () => {
    prodData.isLoaded = true;
  };
  const scroll = () => {
    const pos = document.querySelector(".target").getBoundingClientRect();
    window.scrollTo({ top: pos.y, behavior: "smooth" });
  };
  return { prodData, onImgLoad, scroll };
}
</script>

<style lang="scss" scoped>
.prod-thumbnail {
  width: 340px;
  height: 260px;
  border-radius: 2px;
}
.prod-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  & li {
    margin-bottom: 70px;
    cursor: pointer;
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      right: -14px;
      top: 0;
      height: 265px;
      border-right: 1px solid #828282;
    }
    &:last-child {
      &:after {
        height: 0;
      }
    }
    & .thumbnail {
      width: 336px;
      & img {
        width: 336px;
        height: 183px;
      }
    }
    & .info-wrap {
      margin-top: 20px;
      position: relative;
      padding-left: 15px;
      & .title {
        @include Montserrat(2.1, 600, #fff);
        margin-bottom: 0;
      }
      & .price-wrap {
        & .subject {
          @include NotoSans(1.5, 400, #bdbdbd);
        }
        & .price {
          text-align: right;
          @include Montserrat(2.5, 700, #fff);
          & em {
            font-style: normal;
          }
          & .final {
            @include Montserrat(2.5, 700, #fff);
            & em {
              @include NotoSans(1.5, 500, #fff);
            }
          }
          & .per {
            @include Montserrat(1.6, 600, #eb5757);
            margin-right: 10px;
            & em {
              @include NotoSans(1.6, 600, #eb5757);
            }
          }
          & .origin {
            @include Montserrat(1.6, 600, #bdbdbd);
            text-decoration: line-through;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
.movie-sample-wrap {
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: 250px;
  & .absolute::v-deep {
    position: absolute;
    width: 2250px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    & .slick-slide {
      & .a {
        position: relative;
        height: 180px;
        & .b {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 162px;
          transform: translate(-50%, -50%);
          transition: all 0.3s ease-in;
          cursor: pointer;
          &:hover {
            width: 325px;
            height: 180px;
            z-index: 2;
          }
          & img {
            width: 100%;
            height: 100%;
          }
          & .info-wrap {
            position: absolute;
            bottom: 5px;
            left: 10px;
            width: 100%;
            & .title {
              @include NotoSans(2, 700, #fff);
              text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
              padding-right: 20px;
            }
            & .data {
              margin-top: -10px;
              @include NotoSans(1.6, 500, #fff);
              text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
            }
          }
        }
      }
    }
    & .slick-prev {
      left: 29% !important;
      z-index: 1000;
      width: 45px;
      height: 45px;
      &:before {
        content: "" !important;
        background: url("../../assets/images/slider_prev.png");
        opacity: 1 !important;
        width: 45px !important;
        height: 45px !important;
        display: block;
      }
    }
    & .slick-next {
      right: 29% !important;
      z-index: 1000;
      width: 45px;
      height: 45px;
      &:before {
        content: "" !important;
        background: url("../../assets/images/slider_next.png");
        opacity: 1 !important;
        width: 45px !important;
        height: 45px !important;
        display: block;
      }
    }
    & .dim {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.4);
    }
  }
}
.video-wrap {
  background: #1f1112 url("../../assets/images/video_bg_body.png") no-repeat;
  background-position: top center;
}
h2 {
  @include NotoSans(3.7, 700, #fff);
  &.sub {
    @include NotoSans(2.5, 700, #fff);
  }
}
h3 {
  @include NotoSans(2.2, 500, #fff);
  & span {
    @include Montserrat(2.2, 600, #fff);
  }
  &.sub {
    @include NotoSans(1.5, 400, #bdbdbd);
  }
}
h4 {
  margin-top: 244px;
  @include Montserrat(2, 400, #fff);
}
.btn-wrap {
  & button {
    @include NotoSans(1.8, 700, #fff);
    padding: 0 35px;
    border: 1px solid #fff;
    height: 55px;
    border-radius: 2px;
    & i {
      margin-left: 10px;
      & img {
        vertical-align: -1px;
      }
    }
    &.white {
      background: #fff;
      height: 70px;
      padding: 0 55px;
      @include NotoSans(2.5, 700, #1f0f11);
      display: block;
      margin: 0 auto;
      border-radius: 2px;
    }
  }
}
.contact {
  & .d-flex {
    justify-content: space-between;
    & > div {
      width: calc(50% - 14px);
      @at-root .title {
        @include NotoSans(1.7, 400, #fff);
        margin-bottom: 10px;
      }
      & input[type="text"] {
        background: #fff;
        width: 100%;
        height: 50px;
        border-radius: 2px;
        padding: 0 20px;
        @include NotoSans(1.6, 400, #4f4f4f);
        &::placeholder {
          @include NotoSans(1.6, 400, #bdbdbd);
        }
      }
      @at-root textarea {
        width: 100%;
        background: #fff;
        border-radius: 2px;
        height: 160px;
      }
    }
  }
  & .btn-contact {
    margin-top: 100px;
    text-align: center;
    & button {
      background: #ff4d56;
      height: 70px;
      @include NotoSans(2.5, 700, #fff);
      padding: 0 55px;
    }
  }
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #fff;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}
</style>
