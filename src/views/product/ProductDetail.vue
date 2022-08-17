<template>
  <div class="sub-wrapper pt100 pb100">
    <section class="div">
      <section class="content">
        <div v-if="data.sid !== ''" class="thumbnail-big">
          <img :src="`${apiBaseUrl}/video/view/${data.sid}?videoTransSid=${data.videoTransSid}`" alt="" />
          <div
            class="click-area"
            @click="
              __showModalTemplate(
                require('@/components/modal/Video'),
                {
                  videoSid: data.sid,
                  videoTransSid: data.videoTransSid,
                },
                1200,
              )
            "
          ></div>
        </div>
        <section class="pl20 pr20">
          <div class="tab tab-wrap mt100">
            <ul class="pt20">
              <li class="active" data-name="contents1">{{ $t("videoDetail-tab-tab1") }}</li>
              <li data-name="contents2">{{ $t("videoDetail-tab-tab2") }}</li>
              <li data-name="contents3" v-html="$t('videoDetail-tab-tab3')"></li>
              <li data-name="contents4" v-html="$t('videoDetail-tab-tab4')"></li>
            </ul>
          </div>
          <section class="contents1 mt100">
            <h1 v-html="$t('videoDetail-h1')"></h1>
            <h2 class="mt20" v-html="$t('videoDetail-h2')"></h2>
            <!-- 상품 설명 -->
            <ul class="process mt70">
              <li>
                <h3><span>1</span>{{ $t("videoDetail-info-title1") }}</h3>
                <div v-html="$t('videoDetail-info-comment1')"></div>
              </li>
              <li>
                <h3><span>2</span>{{ $t("videoDetail-info-title2") }}</h3>
                <div>
                  {{ $t("videoDetail-info-comment2-1") }}
                  <p>{{ $t("videoDetail-info-comment2-2") }}</p>
                </div>
              </li>
              <li>
                <h3><span>3</span>{{ $t("videoDetail-info-title3") }}</h3>
                <div>{{ $t("videoDetail-info-comment3") }}</div>
              </li>
              <li v-if="data.advertisingProductSid !== 'customizedV'">
                <h3><span>4</span>{{ $t("videoDetail-info-title4") }}</h3>
                <div>
                  {{ $t("videoDetail-info-comment4-1") }}
                  <strong @click="premium">{{ $t("videoDetail-info-comment4-2") }}</strong
                  >{{ $t("videoDetail-info-comment4-3") }}
                </div>
              </li>
              <li v-if="data.advertisingProductSid !== 'customizedV'">
                <h3><span>5</span>{{ $t("videoDetail-info-title5") }}</h3>
                <div>
                  {{ $t("videoDetail-info-comment5-1") }}<br />{{ $t("videoDetail-info-comment5-2") }} <strong @click="premium">{{ $t("videoDetail-info-comment4-2") }}</strong
                  >{{ $t("videoDetail-info-comment4-3") }}
                </div>
              </li>
            </ul>
            <div>
              <h2 class="mt100">{{ $t("videoDetail-h2-1") }} {{ data.advertisingProductName }} {{ $t("videoDetail-h2-2") }}</h2>
              <section class="sample-video mt40">
                <ul>
                  <li v-for="item in data.advertisingProductVideoSample" :key="item.video.videoSid">
                    <span
                      class="click-area"
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
                    ></span>
                    <img :src="`${apiBaseUrl}/video/view/${item.video.videoSid}?videoTransSid=${item.video.video_trans[2].videoTransSid}`" alt="" />
                  </li>
                </ul>
              </section>
            </div>
          </section>
          <!-- 진행과정 -->
          <section class="contents2 mt140">
            <h2>{{ $t("videoDetail-process-h2") }}</h2>
            <ul class="mt44">
              <li class="p1">
                <i class="circle"></i>
                <span>{{ $t("videoDetail-process-level1") }}</span>
                <i class="arrow"></i>
              </li>
              <li class="p2">
                <i class="circle"></i>
                <span>{{ $t("videoDetail-process-level2") }}</span>
                <i class="arrow"></i>
              </li>
              <li class="p3">
                <i class="circle"></i>
                <span>{{ $t("videoDetail-process-level3") }}</span>
                <i class="arrow"></i>
              </li>
              <li class="p4" v-if="data.advertisingProductSid === 'customizedV'">
                <i class="circle"></i>
                <span>{{ $t("videoDetail-process-level4") }}</span>
                <i class="arrow"></i>
              </li>
              <li class="p5">
                <i class="circle"></i>
                <span>{{ $t("videoDetail-process-level5") }}</span>
                <i class="arrow"></i>
              </li>
              <li class="p6">
                <i class="circle"></i>
                <span>{{ $t("videoDetail-process-level6") }}</span>
                <i class="arrow"></i>
              </li>
              <li class="p7">
                <i class="circle"></i>
                <span>{{ $t("videoDetail-process-level7") }}</span>
              </li>
            </ul>
          </section>
          <!-- 수정 재진행 -->
          <section class="contents3 mt140">
            <h2>{{ $t("videoDetail-modify") }}</h2>
            <div v-html="data.advertisingProductVideoAppend" class="html mt44"></div>
          </section>
          <!-- 취소 환불 -->
          <section class="contents4 mt140">
            <h2 v-html="$t('videoDetail-cancel')"></h2>
            <div v-html="data.advertisingProductVideoRefundPolicy" class="html mt44"></div>
          </section>
        </section>
      </section>
      <!-- 오른쪽 윙 -->
      <section class="wing">
        <div class="quick-pay">
          <h2>{{ data.advertisingProductName }}</h2>
          <ul>
            <li>
              <span class="subject">{{ $t("videoDetail-wing-data") }}</span
              ><span>{{ data.advertisingProductVideoShoot }}</span>
            </li>
            <li>
              <span class="subject">{{ $t("videoDetail-wing-length") }}</span
              ><span>{{ videoLengthSplit }}</span>
            </li>
            <li>
              <span class="subject">{{ $t("videoDetail-wing-count") }}</span
              ><span>{{ data.advertisingProductVideoModification }}</span>
            </li>
            <li>
              <span class="subject">{{ $t("videoDetail-wing-sound") }}</span
              ><span>{{ data.advertisingProductVideoSoundFlag }}</span>
            </li>
          </ul>
          <div v-if="data.advertisingProductSid !== 'customizedV'">
            <div class="price">
              <div>
                <span class="origin">{{ __localeString(data.advertisingProductCostPrice) }}</span>
                <span class="discount">{{ data.advertisingProductPriceRate }}%</span>
              </div>
              <span class="vat">({{ $t("videoDetail-wing-vat") }})</span>
              <span>{{ __localeString(data.advertisingProductPrice) }}</span
              >{{ $t("common-unit-price") }}
            </div>
          </div>
          <div v-else>
            <div class="price request mt30">{{ $t("videoDetail-wing-price") }}</div>
          </div>
          <button type="button" v-if="data.advertisingProductSid !== 'customizedV'" @click="contact">{{ $t("button-buyVideo") }}</button>
          <button type="button" v-else @click="contact('customizedV')">{{ $t("button-goMakeVideo") }}</button>
        </div>
      </section>
    </section>
    <!-- 광고 맞춤 제작 의뢰 & 결제 -->
    <section class="contact-wrap">
      <div class="dim"></div>
      <section class="add-bg">
        <div class="contact">
          <div class="close"><img src="@/assets/images/modal_close.png" alt="닫기" @click="contactClose" /></div>
          <h2>{{ data.advertisingProductName }}</h2>
          <div class="d-flex mt25">
            <div v-if="contactData.customizedV !== true">
              <div class="titles">{{ $t("videoDetail-buy-period2") }}</div>
              <div class="date-picker line">
                <date-picker :min="minDate2" @date="emitDate"></date-picker>
              </div>
            </div>
            <div v-else>
              <div class="titles">{{ $t("videoDetail-buy-period3") }}</div>
              <div class="date-picker line">
                <date-picker :min="minDate3" @date="emitDate"></date-picker>
              </div>
            </div>
            <div>
              <div class="titles">{{ $t("videoDetail-buy-contact") }}</div>
              <div class="line">
                <input type="text" v-model="buyAdvertisingProductVideoHp" maxlength="13" :placeholder="$t('videoDetail-buy-placeholder')" />
              </div>
            </div>
          </div>
          <div class="d-flex mt30">
            <div v-if="contactData.customizedV === true">
              <div class="titles">{{ $t("videoDetail-buy-length") }}</div>
              <v-radio-group v-model="contactData.buyAdvertisingProductVideoLength" column>
                <div class="d-flex justify-start mt10 radio-group">
                  <span class="mr50"><v-radio :label="`15${$t('common-unit-milisecond')}`" value="15"></v-radio></span>
                  <span><v-radio :label="`30${$t('common-unit-milisecond')}`" value="30"></v-radio></span>
                </div>
              </v-radio-group>
            </div>
            <div :class="{ p100: contactData.customizedV !== true }">
              <div class="titles">{{ $t("videoDetail-buy-url") }}</div>
              <div class="line">
                <input type="text" v-model="contactData.buyAdvertisingProductVideoSampleUrl" />
              </div>
            </div>
          </div>
          <div class="titles mt30">{{ $t("videoDetail-buy-concept") }}</div>
          <div><input class="free" type="text" v-model="contactData.buyAdvertisingProductVideoEtc" /></div>
          <div class="btn-contact" v-if="contactData.customizedV !== true">
            <button type="button" @click="pay">
              {{ __localeString(data.advertisingProductPrice) }}{{ $t("common-unit-price") }} {{ $t("common-unit-buy") }}
              <span>({{ $t("videoDetail-wing-vat") }})</span>
            </button>
          </div>
          <div class="btn-contact" v-else>
            <button type="button" @click="pay">{{ $t("button-goMakeVideo") }}</button>
          </div>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import localeString from "@/mixins/localeString";
import showModal from "@/mixins/showModal";
import DatePicker from "@/components/form/DatePicker.vue";
import { getPopupOpt } from "@/utils/modal";
import { getAccessTokenCookie } from "@/utils/cookie";
import loginModal from "@/components/modal/Login.vue";
import HpNum from "@/utils/HpNum";
import { reactive, computed, onMounted, getCurrentInstance, ref, watch } from "@vue/composition-api";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: { DatePicker },
  mixins: [showModal, localeString, loading],
  props: ["apiBaseUrl"],
  setup() {
    return {
      ...movieDetail(),
      ...videoRequest(),
    };
  },
  watch: {
    "$route.params.id": function () {
      this.reload();
    },
  },
  mounted() {
    document.addEventListener("scroll", this.scroll);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scroll);
  },
  methods: {
    scroll() {
      let docHeight = window.scrollY;
      const offset2 = document.querySelector(".contents2").offsetTop - 200;
      const offset3 = document.querySelector(".contents3").offsetTop - 200;
      const offset4 = document.querySelector(".contents4").offsetTop - 200;
      const list = document.querySelectorAll(".tab li");
      list.forEach(ele => ele.classList.remove("active"));
      if (docHeight < offset2) {
        document.querySelector(".tab li:first-child").classList.add("active");
      } else if (docHeight > offset2 && docHeight < offset3) {
        document.querySelector(".tab li:nth-child(2)").classList.add("active");
      } else if (docHeight > offset3 && docHeight < offset4) {
        document.querySelector(".tab li:nth-child(3)").classList.add("active");
      } else if (docHeight > offset4) {
        document.querySelector(".tab li:nth-child(4)").classList.add("active");
      }
    },
  },
};

//상세 데이터
function movieDetail() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const data = reactive({
    advertisingProductName: "",
    advertisingProductSummary: "",
    advertisingProductPrice: "",
    advertisingProductCostPrice: "",
    advertisingProductPriceRate: "",
    advertisingProductVideoModification: "",
    advertisingProductVideoShoot: "",
    advertisingProductVideoEditType: "",
    advertisingProductVideoVideoLengthName: "",
    advertisingProductVideoPriceEdit: "",
    advertisingProductVideoShootTypeName: "",
    advertisingProductVideoAppend: "",
    advertisingProductVideoRefundPolicy: "",
    advertisingProductVideoSoundFlag: "",
    url: "",
    videoTransSid: "",
    sid: "",
    videoFileName: "",
    advertisingProductSid: "",
    advertisingProductVideoSample: [],
  });
  const getList = computed(() => _this.$store.getters["product/getProductVideoDetail"]);
  //영상길이 변수 변경
  const videoLengthSplit = computed(() => {
    if (data.advertisingProductVideoVideoLengthName.indexOf(",") !== -1) {
      return data.advertisingProductVideoVideoLengthName.replace(",", _this.$t("videoDetail-buy-or"));
    } else {
      return data.advertisingProductVideoVideoLengthName;
    }
  });
  onMounted(() => {
    const tab = document.querySelectorAll(".tab li");
    tab.forEach(ele => {
      ele.addEventListener("click", () => {
        const name = ele.getAttribute("data-name");
        const target = document.querySelector(`.${name}`).offsetTop - 100;
        window.scrollTo({ top: target, behavior: "smooth" });
      });
    });
    reload();
  });
  const reload = async () => {
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("product/PRODUCT_VIDEO_DETAIL", _this.$route.params.id);
      if (getList.value.addtuneApiResult.errorCode === 200) {
        const detail = getList.value.addtuneApiResult.advertisingProductVideo;
        detail.advertisingProductVideoTrans.advertisingProductVideoSoundFlag === "Y"
          ? (data.advertisingProductVideoSoundFlag = _this.$t("videoDetail-buy-Y"))
          : (data.advertisingProductVideoSoundFlag = _this.$t("videoDetail-buy-N"));
        data.advertisingProductName = detail.advertisingProductName;
        data.advertisingProductSummary = detail.advertisingProductSummary;
        data.advertisingProductPrice = detail.advertisingProductPrice;
        data.advertisingProductSid = detail.advertisingProductSid;
        data.advertisingProductCostPrice = detail.advertisingProductCostPrice;
        data.advertisingProductPriceRate = detail.advertisingProductPriceRate;
        data.advertisingProductVideoShoot = detail.advertisingProductVideoTrans.advertisingProductVideoShoot;
        data.advertisingProductVideoModification = detail.advertisingProductVideoTrans.advertisingProductVideoModification;
        data.advertisingProductVideoEditType = detail.advertisingProductVideoTrans.advertisingProductVideoEditType;
        data.advertisingProductVideoVideoLengthName = detail.advertisingProductVideoTrans.advertisingProductVideoVideoLengthName + _this.$t("common-unit-milisecond");
        data.advertisingProductVideoShootTypeName = detail.advertisingProductVideoTrans.advertisingProductVideoShootTypeName;
        if (detail.advertisingProductVideoTrans.advertisingProductVideoPriceEdit !== null) {
          data.advertisingProductVideoPriceEdit = detail.advertisingProductVideoTrans.advertisingProductVideoPriceEdit.replace(/(?:\r\n|\r|\n)/g, "<br />");
        }
        if (detail.advertisingProductVideoTrans.advertisingProductVideoAppend !== null) {
          data.advertisingProductVideoAppend = detail.advertisingProductVideoTrans.advertisingProductVideoAppend.replace(/(?:\r\n|\r|\n)/g, "<br />");
          data.advertisingProductVideoRefundPolicy = detail.advertisingProductVideoTrans.advertisingProductVideoRefundPolicy.replace(/(?:\r\n|\r|\n)/g, "<br />");
        }
        data.videoFileName = detail.advertisingProductVideoTrans.video.videoFileName;
        const id = detail.advertisingProductVideoTrans.video.video_trans.find(item => item.videoTransSort == 400);
        data.sid = id.videoSid;
        data.videoTransSid = id.videoTransSid;
        data.advertisingProductVideoSample = detail.advertisingProductVideoSample;
      } else {
        alert(getList.value.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  };
  const premium = () => {
    _this.$router.push("/ad/productList/productDetail/customizedV");
  };
  const browserBackButton = () => {
    console.log("backbutton");
  };
  return { data, videoLengthSplit, premium, browserBackButton, reload };
}
//제작의뢰
function videoRequest() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const minDate2 = ref(_this.$date().add(14, "day").format("YYYY-MM-DD"));
  const minDate3 = ref(_this.$date().add(21, "day").format("YYYY-MM-DD"));
  const buyAdvertisingProductVideoHp = ref("");
  const contactData = reactive({
    buyGoodName: "",
    advertisingProductSid: "",
    buyAdvertisingProductVideoDate: "",
    buyAdvertisingProductVideoLength: "",
    buyAdvertisingProductVideoSampleUrl: "",
    buyAdvertisingProductVideoEtc: "",
    customizedV: true,
  });
  watch(buyAdvertisingProductVideoHp, data => {
    buyAdvertisingProductVideoHp.value = HpNum(data);
  });
  const emitDate = date => {
    contactData.buyAdvertisingProductVideoDate = date;
  };
  const contactResult = computed(() => _this.$store.getters["product/commission"]);
  const contactLevelResult = computed(() => _this.$store.getters["product/levelCommission"]);
  const pay = async () => {
    if (contactData.buyAdvertisingProductVideoDate === "") {
      alert(_this.$t("videoDetail-buy-alert1"));
      return false;
    }
    if (buyAdvertisingProductVideoHp.value === "") {
      alert(_this.$t("videoDetail-buy-alert2"));
      return false;
    }
    if (contactData.customizedV === true) {
      if (contactData.buyAdvertisingProductVideoLength === "") {
        alert(_this.$t("videoDetail-buy-alert3"));
        return false;
      }
      if (contactData.buyAdvertisingProductVideoEtc === "") {
        alert(_this.$t("videoDetail-buy-alert5"));
        return false;
      }
    }
    if (getAccessTokenCookie() !== null) {
      if (contactData.customizedV === true) {
        try {
          bus.$emit("start:spinner");
          await _this.$store.dispatch("product/COMMISSION", {
            buyGoodName: "customizedV",
            advertisingProductSid: "customizedV",
            buyAdvertisingProductVideoHp: buyAdvertisingProductVideoHp.value,
            buyAdvertisingProductVideoDate: contactData.buyAdvertisingProductVideoDate,
            buyAdvertisingProductVideoLength: contactData.buyAdvertisingProductVideoLength,
            buyAdvertisingProductVideoSampleUrl: contactData.buyAdvertisingProductVideoSampleUrl,
            buyAdvertisingProductVideoEtc: contactData.buyAdvertisingProductVideoEtc,
          });
          if (contactResult.value.addtuneApiResult.errorCode == 200) {
            alert(_this.$t("videoDetail-buy-alert4"));
            _this.$router.push("/main");
          } else {
            alert(contactResult.value.addtuneApiResult.errorMessage);
          }
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      } else {
        try {
          bus.$emit("start:spinner");
          await _this.$store.dispatch("product/LEVEL_COMMISSION", {
            buyGoodName: _this.data.advertisingProductName,
            advertisingProductSid: _this.$route.params.id,
            buyAdvertisingProductVideoHp: buyAdvertisingProductVideoHp.value,
            buyAdvertisingProductVideoDate: contactData.buyAdvertisingProductVideoDate,
            buyAdvertisingProductVideoDefaultPrice: _this.data.advertisingProductPrice,
            buyAdvertisingProductVideoSampleUrl: contactData.buyAdvertisingProductVideoSampleUrl,
            buyAdvertisingProductVideoEtc: contactData.buyAdvertisingProductVideoEtc,
          });
          if (contactLevelResult.value.addtuneApiResult.errorCode == 200) {
            const byuInfo = contactLevelResult.value.addtuneApiResult.buyMaster.paymentInfo;
            _this.$router.push({
              name: "prod_pay",
              params: {
                buySid: byuInfo.buyInfo.buySid,
                homepageUserName: byuInfo.homepageUserMaster.homepageUserName,
                homepageUserEmail: byuInfo.homepageUserMaster.homepageUserEmail,
                buyAdvertisingProductVideoHp: buyAdvertisingProductVideoHp.value,
                advertisingProductName: byuInfo.advertisingProduct.advertisingProductName,
                buyAdvertisingProductVideoLengthName: byuInfo.buyVideoInfo.buyAdvertisingProductVideoLengthName,
                buyAdvertisingProductVideoDate: byuInfo.buyVideoInfo.buyAdvertisingProductVideoDate,
                buyAdvertisingProductVideoDefaultPrice: byuInfo.buyVideoInfo.buyAdvertisingProductVideoDefaultPrice,
                buyAdvertisingProductVideoVat: byuInfo.buyVideoInfo.buyAdvertisingProductVideoVat,
                buyAdvertisingProductVideoPayment: byuInfo.buyVideoInfo.buyAdvertisingProductVideoPayment,
                videoTransSid: _this.data.videoTransSid,
                sid: _this.data.sid,
                advertisingProductCostPrice: byuInfo.advertisingProduct.advertisingProductCostPrice,
                advertisingProductPriceRate: byuInfo.advertisingProduct.advertisingProductPriceRate,
              },
            });
          } else {
            alert(contactLevelResult.value.addtuneApiResult.errorMessage);
          }
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      }
    } else {
      const status = "product";
      _this.$modal.show(loginModal, { status }, getPopupOpt("loginModal", "615px", "auto", false));
    }
  };
  const update = () => {
    pay();
  };
  const contact = status => {
    status === "customizedV" ? (contactData.customizedV = true) : (contactData.customizedV = false);
    document.querySelector(".contact-wrap").classList.add("active");
    document.querySelector(".add-bg").classList.add("active");
  };
  const contactClose = () => {
    document.querySelector(".contact-wrap").classList.remove("active");
    document.querySelector(".add-bg").classList.remove("active");
  };
  return { contactData, buyAdvertisingProductVideoHp, minDate2, minDate3, emitDate, pay, update, contact, contactClose };
}
</script>
<style lang="scss" scoped>
.contents1 {
  & h1 {
    @include NotoSans(3.2, 500, #333333);
  }
  & h2 {
    @include NotoSans(2, 400, #4f4f4f);
  }
  & .process {
    & li {
      margin-bottom: 30px;
      & h3 {
        @include NotoSans(1.8, 500, #ff4d56);
        & span {
          @include Montserrat(3.5, 500, #ff4d56);
          margin-right: 15px;
        }
      }
      & div {
        background: #fff3f3;
        border-radius: 10px;
        padding: 25px 35px;
        @include NotoSans(1.5, 400, #4f4f4f);
        & p {
          margin-bottom: 0;
          @include NotoSans(1.5, 500, #ff4d56);
        }
      }
      & strong {
        cursor: pointer;
      }
    }
  }
  & .sample-video {
    & ul {
      & li {
        width: 100%;
        height: 400px;
        position: relative;
        margin-bottom: 30px;
        cursor: pointer;
        & .click-area {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
        }
        & img {
          width: 100%;
          height: 400px;
        }
        &:after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 45px;
          height: 50px;
          background: url("../../assets/images/play.png");
        }
      }
    }
  }
}
.contents2 {
  & h2 {
    @include NotoSans(2.5, 700, #4f4f4f);
  }
  & ul {
    & li {
      position: relative;
      background: #fff6f7;
      height: 70px;
      border-radius: 35px;
      margin-bottom: 26px;
      text-align: center;
      @include NotoSans(1.9, 500, #4f4f4f);
      line-height: 70px !important;
      & .arrow {
        position: absolute;
        left: 50%;
        bottom: -20px;
        display: block;
        background: url("../../assets/images/flow_arrow.png");
        width: 16px;
        height: 16px;
      }
      & .circle {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        display: block;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        @include boxshadow(3px, 3px, 15px, 0px, rgba(0, 0, 0, 0.05));
      }
      &.p1 {
        & .circle {
          background: #fff url("../../assets/images/p1.png") no-repeat center;
        }
      }
      &.p2 {
        & .circle {
          background: #fff url("../../assets/images/p2.png") no-repeat center;
        }
      }
      &.p3 {
        & .circle {
          background: #fff url("../../assets/images/p3.png") no-repeat center;
        }
      }
      &.p4 {
        & .circle {
          background: #fff url("../../assets/images/p4.png") no-repeat center;
        }
      }
      &.p5 {
        & .circle {
          background: #fff url("../../assets/images/p5.png") no-repeat center;
        }
      }
      &.p6 {
        & .circle {
          background: #fff url("../../assets/images/p6.png") no-repeat center;
        }
      }
      &.p7 {
        & .circle {
          background: #fff url("../../assets/images/p7.png") no-repeat center;
        }
      }
    }
  }
}
.contents3,
.contents4 {
  & h2 {
    @include NotoSans(2.5, 700, #4f4f4f);
  }
  & .html {
    @include NotoSans(1.7, 400, #4f4f4f);
  }
}

ul {
  padding-left: 0 !important;
}
.thumbnail-big {
  width: 100%;
  height: 420px;
  position: relative;
  cursor: pointer;
  & img {
    width: 100%;
    height: 100%;
  }
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 45px;
    height: 50px;
    background: url("../../assets/images/play.png");
  }
  & .click-area {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    left: 0;
    top: 0;
  }
}
.div {
  display: flex;
  justify-content: space-between;
  & .content {
    width: 750px;
  }
  & .wing {
    width: 335px;
  }
}
.tab-wrap {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  background: #fff;
  &:after {
    content: "";
    width: calc(100% - 3px);
    border-bottom: 2px solid #ff4d56;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  & ul {
    display: flex;
    & li {
      width: 25%;
      background: #fff;
      border: 1px solid #bdbdbd;
      border-radius: 5px 5px 0 0;
      text-align: center;
      cursor: pointer;
      @include NotoSans(1.6, 500, #bdbdbd);
      padding: 12px 0;
      margin-left: -1px;
      &.active {
        @include NotoSans(1.6, 700, #fff);
        background: #ff4d56;
        border-color: #ff4d56;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
}
.quick-pay {
  position: sticky;
  top: 20px;
  @include boxshadow(0px, 1px, 30px, 0px, rgba(0, 0, 0, 0.1));
  padding: 25px 25px;
  border-radius: 10px;
  & h2 {
    @include Montserrat(2.5, 700, #4f4f4f);
  }
  & ul {
    padding-left: 0;
    margin-top: 10px;
    & li {
      @include NotoSans(1.5, 500, #4f4f4f);
      padding: 5px 3px;
      display: flex;
      & .subject {
        @include NotoSans(1.5, 400, #4f4f4f);
        display: inline-block;
        width: 120px;
        letter-spacing: -1px;
        & + span {
          letter-spacing: -1px;
        }
      }
    }
  }
  & .price {
    text-align: right;
    padding-top: 25px;
    margin-top: 25px;
    border-top: 1px solid #e0e0e0;
    & span {
      @include Montserrat(3.4, 600, #333333);
      display: inline-block;
      padding-right: 5px;
      &.vat {
        @include NotoSans(1, 500, #828282);
      }
    }
    & .origin {
      @include Montserrat(1.6, 600, #bdbdbd);
      text-decoration: line-through;
    }
    & .discount {
      @include Montserrat(1.6, 600, #ff4d56);
    }
    &.request {
      @include NotoSans(2.8, 500, #333333);
    }
  }
  & button {
    margin-top: 15px;
    @include NotoSans(1.8, 500, #333333);
    height: 55px;
    width: 100%;
    background: #ff4d56;
    @include NotoSans(2, 700, #fff);
    border-radius: 2px;
  }
}
.contact-wrap {
  & .dim {
    position: fixed;
    width: 100vw;
    height: 100vh;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: none;
  }
  & .add-bg {
    background: #f2f2f2;
    padding: 90px 0;
    position: fixed;
    z-index: 999;
    bottom: -700px;
    left: 0;
    width: 100vw;
    transition: bottom 0.3s linear;
    &.active {
      bottom: 0;
    }
    & .contact {
      position: relative;
      width: 1048px;
      margin: 0 auto;
      & .close {
        position: absolute;
        top: -50px;
        right: 0;
        cursor: pointer;
      }
      & h2 {
        @include Montserrat(3, 600, #4f4f4f);
      }
      & .d-flex {
        justify-content: space-between;
        & > div {
          width: calc(50% - 14px);
          &.p100 {
            width: 100%;
          }
          @at-root .titles {
            @include NotoSans(1.5, 400, #4f4f4f);
            margin-bottom: 10px;
          }
          & input[type="text"] {
            background: #fff;
            width: 100%;
            height: 50px;
            border-radius: 2px;
            padding: 0 20px;
            @include NotoSans(1.5, 400, #4f4f4f);
            &::placeholder {
              @include NotoSans(1.5, 400, #bdbdbd);
            }
          }
        }
      }
      & .line {
        border: 1px solid #bdbdbd;
        border-radius: 2px;
      }
      & .btn-contact {
        margin-top: 40px;
        text-align: center;
        & button {
          background: #ff4d56;
          height: 70px;
          @include NotoSans(2.5, 700, #fff);
          padding: 0 55px;
          border-radius: 2px;
          & span {
            @include NotoSans(1.5, 400, #fff);
          }
        }
      }
      & .radio-group::v-deep {
        & .v-label {
          margin-left: 10px;
        }
      }
    }
    & .free {
      border: 1px solid #bdbdbd;
      height: 50px;
      width: 100%;
      background: #fff;
      padding: 0 20px;
      @include NotoSans(1.6, 400, #4f4f4f);
      border-radius: 2px;
    }
  }
  &.active {
    & .dim {
      display: block;
    }
  }
}
</style>
