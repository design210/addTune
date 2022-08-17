<template>
  <div>
    <div class="banner-wrap" v-if="$route.params.id !== 'default' && advertisingProductContentKind === 'SYS22228B003'">
      <div class="sub-wrapper">
        <h1 v-html="bannerContents.title"></h1>
        <h2 v-html="bannerContents.subject"></h2>
      </div>
    </div>
    <div v-if="$route.params.id !== 'default' && advertisingProductContentKind === 'SYS22228B002'">
      <div class="top-banner" :style="`background-image: url(${apiBaseUrl}/file/fileView/${file_master.fileSid})`"></div>
    </div>
    <!-- 광고 컨텐츠 유무 -->
    <section class="ad-contents-yn sub-wrapper mt55">
      <h2>{{ $t("buyAd-content-h1") }}</h2>
      <div class="comment mt10">{{ $t("buyAd-content-h2") }}</div>
      <ad-contents class="mt45" @contents="contentsEmit" :reset="reset" :set="advertisingProductOptionContentFlag"></ad-contents>
    </section>
    <!-- //광고 컨텐츠 유무 -->
    <!-- 광고 카테고리 -->
    <section class="ad-categories sub-wrapper mt150">
      <h2>{{ $t("buyAd-categories-h1") }}</h2>
      <div class="comment mt10">{{ $t("buyAd-categories-h2") }}</div>
      <ad-categories @categories="categoriesEmit" :reset="reset"></ad-categories>
    </section>
    <!-- //광고 카테고리 -->
    <!-- 희망 스토어 업종 -->
    <section class="ad-hope sub-wrapper mt150">
      <h2>{{ $t("buyAd-hope-h1") }}</h2>
      <div v-if="advertisingProductOptionStoreType === 'A'">
        <div class="comment mt10">{{ $t("buyAd-hope-h2") }}</div>
        <ad-hope class="mt40" @hope="hopeEmit" :reset="reset"></ad-hope>
      </div>
      <div class="ad-selected-list hope" v-else>
        <div class="comment alert mt10 mb30">{{ $t("buyAd-hope-warning") }}</div>
        <span v-for="item in advertisingProductOptionStoreTypeChoice" :key="item.sysCodeName">{{ item.sysCodeName }}</span>
      </div>
    </section>
    <!-- //희망 스토어 업종 -->
    <!-- 광고 지역 선택 -->
    <section class="ad-area-wrap sub-wrapper mt130">
      <div>
        <h2>{{ $t("buyAd-area-h1") }}</h2>
        <div v-if="advertisingProductOptionArea === 'A'">
          <div class="comment mt10">{{ $t("buyAd-area-h2") }}</div>
          <area-select class="mt25" :reset="reset" :si="temp.si" :gu="temp.gu" :guName="temp.guName" :siName="temp.siName" :default="defaultSi" @area="areaEmit"></area-select>
        </div>
        <div v-else class="ad-selected-list area">
          <div class="comment mt10 mb20 alert">{{ $t("buyAd-area-warning") }}</div>
          <span v-for="item in advertisingProductOptionAreaChoice" :key="item.sysCodeName">{{ item.sysCodeName }}</span>
        </div>
      </div>
    </section>
    <!-- //광고 지역 선택 -->
    <!-- 광고 기간 -->
    <section class="date-wrap sub-wrapper mt150 date-dual">
      <h2>{{ $t("buyAd-calendar-h1") }}</h2>
      <div class="comment mt10" v-show="estimateExposureContentFlag === 'T'">{{ $t("buyAd-calendar-h2") }}</div>
      <div class="comment mt10" v-show="estimateExposureContentFlag === 'F'">{{ $t("buyAd-calendar-h2-1") }}</div>
      <ad-calendar class="mt40" :month="temp.month" @dayRange="rangeEmit" :reset="reset" :adRange="true" :today="advertiseStartDate" :disabledDay="disabledDay"></ad-calendar>
    </section>
    <!-- //광고 기간 -->
    <!-- 슬롯 수 -->
    <section class="slot-wrap sub-wrapper mt150">
      <h2>
        {{ $t("buyAd-slot-h1") }}
        <i class="tooltip-wrap"
          ><img src="@/assets/images/info_xs_op.png" alt="" />
          <div class="tooltip">
            <div class="slot-info mt10">
              <div><img src="@/assets/images/slot.png" alt="" /></div>
              <div>
                <h3>{{ $t("buyAd-slot-h1-help-title") }}</h3>
                <ul>
                  <li>&middot; <span v-html="$t('buyAd-slot-h1-help-t1')"></span></li>
                  <li>&middot; {{ $t("buyAd-slot-h1-help-t2") }}</li>
                  <li>&middot; {{ $t("buyAd-slot-h1-help-t3") }}</li>
                </ul>
              </div>
            </div>
          </div>
        </i>
      </h2>
      <div v-if="advertisingProductOptionSlot === 'A'">
        <ad-slot class="mt42" @slot="slotEmit" :basicSetSlot="basicSetSlot" :maxSlot="slotMaxCount" :slotSet="slot" :slotfixed="basicSlot" :fixed="false"></ad-slot>
      </div>
      <div v-else>
        <div class="comment alert mt10">{{ $t("buyAd-slot-warning") }}</div>
        <ad-slot class="mt42" :slotfixed="advertisingProductOptionSlotCount" :fixed="true"></ad-slot>
      </div>
    </section>
    <!-- //슬롯 수 -->
    <!-- 스토어 수 -->
    <section class="slot-wrap sub-wrapper mt150" v-show="$route.params.id === 'default'">
      <h2>{{ $t("buyAd-store-h1") }}</h2>
      <div>
        <ad-slot
          class="mt42"
          @storeSlot="storeSlotEmit"
          @storeViewTotal="storeViewTotalEmit"
          :slotfixed="totalStore"
          :maxStoreSlot="totalStore"
          :fixed="false"
          :store="true"
          :changeSlot="changeSlot"
        ></ad-slot>
      </div>
    </section>
    <!-- //스토어 수 -->
    <!-- 스토어 리스트: -->
    <section class="ad-store sub-wrapper mt150 mb150">
      <h2>
        {{ $t("buyAd-sotreList-h1") }}
        <!--( 선택 {{ selectStore }}곳 / 총 {{ showNum === null ? totalStore : showNum }}곳)-->
      </h2>
      <div>
        <div class="comment mt10">
          {{ $t("buyAd-sotreList-h2") }}
        </div>
        <ad-store
          v-if="advertisingProductOptionStoreList"
          class="mt44"
          @totalStore="totalStoreEmit"
          @selectStore="selectStoreEmit"
          @showNum="showNumEmit"
          :storeViewTotalNum="storeViewTotalNum"
          :slotCount="slotCount"
          :advertiseStartDate="advertiseStartDate"
          :advertiseEndDate="advertiseEndDate"
          :areaList="areaList"
          :storeTypeList="storeTypeList"
          :fixed="advertisingProductOptionStoreList"
          :reset="reset"
          :trafficMin="min"
          :trafficMax="max"
          :storeShowNum="storeShowNum"
          :basicAllArea="true"
          :apiBaseUrl="apiBaseUrl"
        ></ad-store>
      </div>
    </section>
    <!-- //스토어 리스트 -->
    <!-- 따라다니는 배너 -->
    <section class="fixed-banner">
      <div class="sub-wrapper">
        <section class="fix-bottom d-flex align-center justify-space-between mt20">
          <div class="exposure">
            <div class="txt mr40">
              {{ $t("common-tooltip-send-title")
              }}<i
                ><img src="@/assets/images/info_xs.png" alt="" /><span class="tooltip"
                  >{{ $t("common-tooltip-send-t1") }}<br /><span class="gray">* {{ $t("common-tooltip-send-t2") }} </span>
                </span></i
              >
            </div>
            <div v-if="displayIndices !== ''" class="num">
              <span>{{ __localeString(totalOut) }} {{ $t("common-unit-number") }}</span>
            </div>
          </div>
          <div class="store">
            <div class="txt mr40">
              {{ $t("common-tooltip-exposure-title")
              }}<i
                ><img src="@/assets/images/info_xs.png" alt="" /><span class="tooltip">
                  {{ $t("common-tooltip-exposure-t1") }}<br /><span class="gray"> <span v-html="$t('common-tooltip-exposure-t2')"></span></span> </span
              ></i>
            </div>
            <div class="num">
              <span>{{ __localeString(Math.round(totalDisplay)) }}</span> {{ $t("common-unit-person") }}
            </div>
          </div>
          <div class="price-zero price-wrap d-flex" v-if="selectStore === 0 || addVatPrice === 0">
            <div class="tooltip">
              <p>{{ $t("buyAd-bottomInfo-t1") }}</p>
              <p>{{ $t("buyAd-bottomInfo-t2") }}</p>
            </div>
            <div class="price"><span>0</span> {{ $t("common-unit-price") }}</div>
            <button type="button" class="pay mt7" disabled>{{ $t("button-pay") }}</button>
          </div>
          <div class="price-calc price-wrap align-end d-flex" v-else>
            <!--						<span class="discount" v-if="totalDiscountRate !== ''">{{ totalDiscountRate.toFixed(2) }}%</span>-->
            <span class="origin">
              <span class="num">{{ __localeString(originPrice) }}</span> {{ $t("common-unit-price") }}
            </span>
            <div class="price">
              <div class="vat">{{ $t("common-vat") }}</div>
              <span class="num">{{ __localeString(realPrice) }} {{ $t("common-unit-price") }}</span>
            </div>
            <button type="button" @click="validate" class="pay">{{ $t("button-pay") }}</button>
          </div>
        </section>
      </div>
    </section>
    <!-- //따라다니는 배너 -->
  </div>
</template>

<script>
import AdCalendar from "@/components/ad/AdCalendar.vue";
import AdCategories from "@/components/ad/AdCategories.vue";
import AdSlot from "@/components/ad/AdSlot.vue";
import AreaSelect from "@/components/ad/areaSelect.vue";
import AdContents from "@/components/ad/AdContents.vue";
import AdHope from "@/components/ad/AdHope.vue";
import AdStore from "@/components/ad/AdStore.vue";
import { getAccessTokenCookie, getAdBeforeCookie, deleteCookie } from "@/utils/cookie";
import { mapGetters } from "vuex";
import loginModal from "@/components/modal/Login.vue";
import { getPopupOpt } from "@/utils/modal";
import localeString from "@/mixins/localeString";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: {
    AreaSelect,
    AdSlot,
    AdCalendar,
    AdCategories,
    AdContents,
    AdHope,
    AdStore,
  },
  mixins: [localeString, loading],
  props: ["apiBaseUrl"],
  data() {
    return {
      login: false,
      //임시 데이터
      temp: {
        si: "",
        gu: "",
        month: "",
        siName: "",
        guName: "",
      },
      //스토어 로드 데이터
      companyNameOrder: "",
      businessTypeOrder: "",
      storeGradeOrder: "",
      priceOrder: "",
      advertiseStartDate: "",
      advertiseEndDate: "",
      storeList: "",
      slotCount: null,
      totalStore: "",
      selectStore: "",
      areaList: "",
      //gradeList: '',
      storeTypeList: "SYS21A15B012",
      //화면 데이터
      areaName: "",
      gradeName: "",
      yn: "",
      categories: "",
      hopeName: [],
      dateRange: "",
      slotMaxCount: "",
      priceData: [],
      alim: "",
      //설정 데이터
      estimateExposureContentFlag: "",
      slot: "", //슬롯수
      reset: false,
      //디테일 데이터
      advertisingProductSid: "",
      advertisingProductOptionArea: "",
      advertisingProductOptionAreaChoice: "",
      advertisingProductOptionGrade: "",
      //advertisingProductOptionGradeChoice: '',
      advertisingProductOptionStoreType: "",
      advertisingProductOptionStoreTypeChoice: "",
      advertisingProductOptionStoreList: "",
      advertisingProductOptionStoreListChoice: "",
      advertisingProductOptionSlot: "",
      advertisingProductOptionSlotCount: "",
      discountBySlot: "",
      advertisingProductName: "",
      buyAdvertisingContentLength: "",
      advertisingProductBenefitChoiceVal: "",
      advertisingProductBenefitKindSaleVal: "",
      advertisingProductBenefitKindGiftVal: "",
      advertisingProductBenefitKindGiftStoreList: "",
      advertisingProductOptionContentFlag: "",
      bannerContents: {
        title: "",
        subject: "",
      },
      userAdvertiserSid: "",
      file_master: [],
      slotDiscountRatio: "",
      slotDiscountPrice: "",
      benefitDiscountPrice: "",
      benefitDiscountRatio: "",
      vatRatio: "",
      saleVal: "",
      totalOut: "",
      outFrequency: "",
      displayFrequency: "",
      totalDisplay: "",
      totalDisplayStoreCount: "",
      totalDiscountRate: "",
      originPrice: "",
      realPrice: "",
      giftSlotCount: "",
      totalDiscountPrice: "",
      vatPrice: "",
      addVatPrice: "",
      displayIndices: "",
      min: 0,
      max: 0,
      storeShowNum: null,
      changeSlot: false,
      basicSlot: 0,
      defaultSi: false,
      advertisingProductContentKind: "",
      showNum: null,
      storeViewTotalNum: null,
      watchStart: false,
      basicSetSlot: null,
      disabledDay: 6,
    };
  },
  computed: {
    ...mapGetters("member", ["getMe"]),
    ...mapGetters("admain", ["setAdDetailDate", "getAdFinalPriceCalc"]),
  },
  watch: {
    advertiseEndDate() {
      if (this.watchStart === true) {
        this.priceCalc();
      }
    },
    slotCount() {
      if (this.watchStart === true) {
        this.priceCalc();
      }
    },
    storeList() {
      if (this.watchStart === true) {
        this.priceCalc();
      }
    },
    storeTypeList() {
      if (this.watchStart === true) {
        this.priceCalc();
      }
    },
  },
  async created() {
    //로그인 여부 확인
    if (getAccessTokenCookie()) {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/ME");
        if (this.getMe.addtuneApiResult.errorCode == 200) {
          this.userAdvertiserSid = this.getMe.addtuneApiResult.login.userAdvertiserSid;
          this.login = true;
        } else {
          alert(this.getMe.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    }
    deleteCookie("acountTransfer");
  },
  async mounted() {
    this.advertiseStartDate = this.$date().add(14, "day").format("YYYY-MM-DD");
    this.advertiseEndDate = this.$date().add(15, "day").format("YYYY-MM-DD");
    this.advertisingProductSid = this.$route.params.id;
    //지역 선택시 저장값
    const temp = getAdBeforeCookie();
    if (temp !== null) {
      this.temp.si = temp.si;
      this.temp.gu = temp.gu;
      this.temp.month = temp.month;
      this.temp.siName = temp.siName;
      this.temp.guName = temp.guName;
      deleteCookie("adBeforeSet");
    }
    //광고 데이터 불러오기
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("admain/AD_DETAIL_DATA", this.advertisingProductSid);
      if (this.setAdDetailDate.addtuneApiResult.errorCode == 200) {
        const info = this.setAdDetailDate.addtuneApiResult.advertisingProduct;
        const detail = info.advertisingProductTrans;
        if (detail.advertisingProductOptionArea === "C") {
          this.advertisingProductOptionAreaChoice = detail.advertisingProductOptionAreaChoice;
          const codeList = [];
          detail.advertisingProductOptionAreaChoice.forEach(ele => {
            codeList.push(ele.sysCodeSid);
          });
          this.areaList = codeList.join(",");
          this.areaName = this.advertisingProductOptionAreaChoice;
        }
        if (detail.advertisingProductOptionArea === "A") {
          this.areaList = "SYS21A15B001";
          this.defaultSi = true;
        }
        this.slotCount = parseInt(info.slotDefaultCount);
        this.basicSetSlot = this.slotCount;
        this.basicSlot = info.slotDefaultCount;
        this.slotMaxCount = info.slotMaxCount;
        this.discountBySlot = info.discountBySlot;
        this.advertisingProductName = info.advertisingProductName;
        this.advertisingProductContentKind = info.advertisingProductContentKind;
        this.file_master = info.file_master.find(ele => ele.fileKind === "SYS21B24B008");
        this.bannerContents.title = info.advertisingProductContentTitle?.replace(/(?:\r\n|\r|\n)/g, "<br />");
        this.bannerContents.subject = info.advertisingProductContent?.replace(/(?:\r\n|\r|\n)/g, "<br />");
        this.advertisingProductOptionArea = detail.advertisingProductOptionArea;
        this.advertisingProductOptionContentFlag = detail.advertisingProductOptionContentFlag;
        this.advertisingProductOptionGrade = detail.advertisingProductOptionGrade;
        this.advertisingProductOptionStoreType = detail.advertisingProductOptionStoreType;
        if (detail.advertisingProductOptionStoreType === "C") {
          this.advertisingProductOptionStoreTypeChoice = detail.advertisingProductOptionStoreTypeChoice;
          const codeList = [];
          const nameList = [];
          detail.advertisingProductOptionStoreTypeChoice.forEach(ele => {
            codeList.push(ele.sysCodeSid);
            nameList.push(ele.sysCodeName);
          });
          this.storeTypeList = codeList.join(",");
          this.hopeName = nameList;
        }
        this.advertisingProductOptionStoreList = detail.advertisingProductOptionStoreList;
        this.advertisingProductOptionStoreListChoice = detail.advertisingProductOptionStoreListChoice;
        this.advertisingProductOptionSlot = detail.advertisingProductOptionSlot;
        this.advertisingProductOptionSlotCount = detail.advertisingProductOptionSlotCount;
        this.advertisingProductBenefitChoiceVal = detail.advertisingProductBenefitChoiceVal;
        this.advertisingProductBenefitKindSaleVal = detail.advertisingProductBenefitKindSaleVal;
        this.advertisingProductBenefitKindGiftVal = detail.advertisingProductBenefitKindGiftVal;
        this.advertisingProductBenefitKindGiftStoreList = detail.advertisingProductBenefitKindGiftStoreList;
        this.watchStart = true;
      } else {
        alert(this.setAdDetailDate.addtuneApiResult.errorMessage);
      }
      const list = document.querySelectorAll(".fixed-banner i");
      list.forEach(ele => {
        ele.addEventListener("mouseover", () => {
          ele.querySelector(".tooltip").classList.add("active");
        });
      });
      list.forEach(ele => {
        ele.addEventListener("mouseout", () => {
          ele.querySelector(".tooltip").classList.remove("active");
        });
      });
      const tooltip = document.querySelectorAll(".tooltip-wrap");
      tooltip.forEach(ele => {
        ele.addEventListener("mouseover", () => {
          ele.querySelector(".tooltip").classList.add("active");
        });
      });
      tooltip.forEach(ele => {
        ele.addEventListener("mouseout", () => {
          ele.querySelector(".tooltip").classList.remove("active");
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    areaEmit(data) {
      //지역선택
      this.areaList = data.code.join(",");
      this.areaName = data.name;
    },
    categoriesEmit(data) {
      //카테고리
      this.categories = data;
    },
    clear() {
      this.reset = !this.reset;
      this.gradeName = [];
      this.yn = "";
      this.priceData = [];
    },
    //광고비 및 노출수 계산
    async priceCalc() {
      if (!isNaN(this.slotCount)) {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("admain/AD_PRICE_FINAL_CALC", {
            advertisingProductSid: this.advertisingProductSid,
            slotCount: this.slotCount,
            advertiseStartDate: this.advertiseStartDate,
            advertiseEndDate: this.advertiseEndDate,
            storeList: this.storeList,
          });
          if (this.getAdFinalPriceCalc.addtuneApiResult.errorCode == 200) {
            const priceData = this.getAdFinalPriceCalc.addtuneApiResult.advertisingPriceCalc;
            this.totalOut = priceData.totalOut; //총 송출량
            this.displayIndices = priceData.displayIndices; //노출지수
            this.outFrequency = priceData.outFrequency; //송출빈도
            this.displayFrequency = priceData.displayFrequency; //노출빈도
            this.totalDisplay = priceData.totalDisplay; //총 노출량
            this.totalDisplayStoreCount = priceData.totalDisplayStoreCount; //송출 스토어 수
            this.totalDiscountRate = priceData.totalDiscountRate; //총 할인율
            this.originPrice = priceData.originPrice; //정상광고비
            this.realPrice = priceData.realPrice; //최종광고비
            this.giftSlotCount = priceData.giftSlotCount; //증정슬롯 수
            this.totalDiscountPrice = priceData.totalDiscountPrice; //총 할인가격
            this.vatRatio = priceData.vatRatio; //부가세율
            this.vatPrice = priceData.vatPrice; //부가세
            this.addVatPrice = priceData.addVatPrice; //부가세포함 최종광고비
          } else {
            alert(this.getAdFinalPriceCalc.addtuneApiResult.errorMessage);
          }
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      }
    },
    rangeEmit(data) {
      //기간
      this.advertiseStartDate = data.firstDate;
      this.advertiseEndDate = data.lastDate;
      this.dateRange = data.range;
    },
    selectStoreEmit(data) {
      this.storeList = data.join(",");
      this.selectStore = data.length;
    },
    //로그인 모달
    showLoginPopup(status, data) {
      this.$modal.show(loginModal, { status, data }, getPopupOpt("loginModal", "615px", "auto", false));
    },
    contentsEmit(data) {
      //광고컨텐츠 유무 및 길이
      data.estimateExposureContentFlag === "Y" ? (this.estimateExposureContentFlag = "T") : (this.estimateExposureContentFlag = "F");
      data.estimateExposureContentFlag === "Y" ? (this.disabledDay = 6) : (this.disabledDay = 13);
      this.slot = data.slot;
      this.buyAdvertisingContentLength = data.time;
      if (this.estimateExposureContentFlag === "T") {
        this.yn = this.$t("common-Y");
      } else if (this.estimateExposureContentFlag === "F") {
        this.yn = this.$t("common-N");
      } else if (this.estimateExposureContentFlag === "") {
        this.yn = "";
      }
    },
    hopeEmit(data) {
      //희망스토어
      if (data.allSelect !== undefined) {
        this.storeTypeList = data.allSelect;
      } else {
        this.storeTypeList = data.code.join(",");
      }
      this.hopeName = data.name;
    },
    slotEmit(data) {
      //슬롯
      this.slotCount = data;
      this.changeSlot = !this.changeSlot;
    },
    storeSlotEmit(data) {
      //스토어수
      this.storeShowNum = data;
    },
    storeViewTotalEmit(data) {
      this.storeViewTotalNum = data;
    },
    totalStoreEmit(data) {
      this.totalStore = data;
    },
    showNumEmit(data) {
      this.showNum = data;
    },
    validate() {
      if (this.estimateExposureContentFlag === "") {
        alert(this.$t("alert-t1"));
        return false;
      }
      if (this.estimateExposureContentFlag === "Y" && this.slot === 0) {
        alert(this.$t("alert-t2"));
        return false;
      }
      if (this.categories === "") {
        alert(this.$t("alert-t3"));
        return false;
      }
      if (this.hopeName.length === 0) {
        alert(this.$t("alert-t4"));
        return false;
      }
      if (this.areaList === "") {
        alert(this.$t("alert-t5"));
        return false;
      }
      if (this.advertiseEndDate === "") {
        alert(this.$t("alert-t6"));
        return false;
      }
      if (this.storeList === "") {
        alert(this.$t("alert-t7"));
        return false;
      }
      let buyDateTime = this.$date().utc().local().format("YYYY-MM-DD hh:mm:ss");

      let saveData = {
        adRangeDay: this.dateRange,
        buyDateTime,
        buyGoodName: this.advertisingProductName,
        advertisingProductSid: this.advertisingProductSid,
        buyAdvertisingProductContentFlag: this.estimateExposureContentFlag,
        buyAdvertisingContentLength: this.buyAdvertisingContentLength,
        buyAdvertisingStoreCount: this.totalDisplayStoreCount,
        buyAdvertisingDiscount: this.totalDiscountRate,
        buyAdvertisingPayment: this.realPrice,
        totalDiscountPrice: this.totalDiscountPrice,
        buyAdvertisingProductAreaChoice: this.areaList,
        buyAdvertisingProductAreaChoiceName: this.areaName,
        buyAdvertisingProductGradeChoiceName: this.gradeName,
        buyAdvertisingProductSlotCount: this.slotCount,
        buyAdvertisingProductBenefitChoiceVal: this.advertisingProductBenefitChoiceVal,
        buyAdvertisingProductSaleVal: this.advertisingProductBenefitKindSaleVal,
        buyAdvertisingProductGiftVal: this.advertisingProductBenefitKindGiftVal,
        buyAdvertisingProductGiftStoreList: this.advertisingProductBenefitKindGiftStoreList,
        buyAdvertisingProductStartDate: this.advertiseStartDate,
        buyAdvertisingProductEndDate: this.advertiseEndDate,
        buyAdvertsingProductCategory: this.categories,
        buyAdvertsingProductStoreTypeName: this.hopeName,
        buyAdvertsingProductStoreType: this.storeTypeList,
        buyAdvertisingProductStoreList: this.storeList,
        buyAdvertisingVatRatio: this.vatRatio,
        realPrice: this.realPrice,
        originPrice: this.originPrice,
        slotDiscountRatio: this.slotDiscountRatio,
        slotDiscountPrice: this.slotDiscountPrice,
        benefitDiscountPrice: this.benefitDiscountPrice,
        benefitDiscountRatio: this.benefitDiscountRatio,
        vatPrice: this.vatPrice,
        vatRatio: this.vatRatio,
        addVatPrice: this.addVatPrice,
        giftSlotCount: this.giftSlotCount,
        saleVal: this.saleVal,
        file_master: this.file_master,
        min: this.min,
        max: this.max,
        fileSid: this.$route.query.fileSid,
      };
      if (this.login === true) {
        //로그인 되어 있는 경우
        this.$router.push({ name: "pay", params: saveData });
        // if (this.userAdvertiserSid !== null) {
        // 	//사업자 등록이 되어 있는 경우
        // 	this.$router.push({ name: 'pay', params: saveData });
        // } else {
        // 	//사업자 등록이 안되어 있는 경우
        // 	this.$router.push({ name: 'advertiser_info_init', params: saveData });
        // }
      } else {
        //로그인 안되어 있는 경우
        this.showLoginPopup("pay", saveData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.top-banner {
  background-position: center;
  height: 347px;
  //background-repeat: repeat-x;
}
.banner-wrap {
  background: #fef7f7;
  height: 450px;
  display: flex;
  align-items: center;
  & h1 {
    @include NotoSans(4, 700, #333333);
  }
  & h2 {
    @include NotoSans(1.9, 400, #4f4f4f);
  }
}
.fix-top {
  & > div {
    margin-right: 48px;
    & span {
      @include NotoSans(1.2, 500, #4f4f4f);
      & i {
        margin: 0 15px 0 3px;
        cursor: pointer;
      }
      &.data {
        @include NotoSans(1.5, 600, #333333);
      }
    }
  }
}
.info-comma {
  margin-right: 5px;
}
.info-etc {
  margin-left: 5px;
}
.date-wrap,
.slot-wrap,
.level-wrapper,
.ad-contents-yn,
.ad-area-wrap,
.ad-categories,
.ad-hope,
.ad-store,
.ad-etc,
.passage-wrap,
.ad-set {
  & h2 {
    @include NotoSans(2.5, 700, #333333);
  }
  & .comment {
    @include NotoSans(1.5, 400, #828282);
    &.alert {
      color: #ff4d56 !important;
      font-weight: 700 !important;
    }
  }
}
.ad-selected-list {
  &.area {
    & span {
      @include NotoSans(1.6, 400, #ff4d56);
      border: 1px solid #ff4d56;
      padding: 5px 15px;
      border-radius: 30px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
  &.hope {
    & span {
      @include NotoSans(1.8, 700, #ff4d56);
      border: 4px solid #ff4d56;
      padding: 10px 30px;
      border-radius: 30px;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
}
.fixed-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  @include boxshadow(0px, 0px, 11px, 0px, rgba(0, 0, 0, 0.28));
  z-index: 100;
  background: #fff;
  & i {
    position: relative;
    & .tooltip {
      display: none;
      &.active {
        display: block;
      }
    }
    & .tooltip {
      position: absolute;
      left: -30px;
      bottom: 35px;
      background: #000000;
      @include NotoSans(1.4, 400, #fff);
      white-space: nowrap;
      padding: 20px;
      border-radius: 10px;
      font-style: normal;
      z-index: 10;
      &:after {
        content: "";
        width: 20px;
        height: 20px;
        background: #000;
        transform: rotate(45deg);
        position: absolute;
        bottom: -5px;
        left: 28px;
      }
      & .gray {
        @include NotoSans(1.4, 400, #bdbdbd);
        display: block;
      }
      & .major {
        @include NotoSans(1.4, 400, #ec5b5c);
        display: block;
      }
    }
  }
  & .clear {
    margin-top: 30px;
    border: 1px solid #4f4f4f;
    border-radius: 3px;
    width: 97px;
    height: 38px;
    text-align: center;
    @include NotoSans(1.3, 400, #4f4f4f);
    line-height: 36px !important;
    cursor: pointer;
  }
  & .price-wrap {
    width: 564px;
    display: flex;
    justify-content: flex-end;
  }
  & .price-calc {
    text-align: right;
    & .discount {
      @include Montserrat(1.7, 600, #ff4d56);
      margin-right: 10px;
      padding-top: 20px;
      margin-bottom: 6px;
      white-space: nowrap;
    }
    & .origin {
      @include NotoSans(1.3, 400, #828282);
      margin-right: 10px;
      margin-bottom: 9px;
      white-space: nowrap;
      & .num {
        @include Montserrat(1.3, 400, #828282);
        text-decoration: line-through;
      }
    }

    & .price {
      @include NotoSans(3.5, 400, #333333);
      position: relative;
      & .num {
        @include Montserrat(3.5, 600, #333333);
        white-space: nowrap;
      }
      & .vat {
        @include NotoSans(1.2, 400, #828282);
        position: absolute;
        top: -10px;
        right: 0;
        white-space: nowrap;
      }
    }
    & .pay {
      @include NotoSans(2, 600, #ffffff);
      background: #ff4d56;
      border-radius: 3px;
      height: 43px;
      padding: 0 30px;
      margin-left: 30px;
      margin-bottom: 5px;
      white-space: nowrap;
      &:disabled {
        background: #828282;
      }
    }
  }
  & .price-zero {
    position: relative;
    & .price {
      @include NotoSans(3.5, 400, #bdbdbd);
      & span {
        @include Montserrat(3.5, 600, #bdbdbd);
      }
    }
    & .tooltip {
      position: absolute;
      background: #fff0f0;
      border-radius: 10px;
      padding: 8px 15px;
      text-align: center;
      top: 0px;
      right: 250px;
      & p {
        @include NotoSans(1.2, 700, #ff4d56);
        white-space: nowrap;
        margin-bottom: 0;
      }
      &:after {
        content: "";
        position: absolute;
        right: -10px;
        top: 19px;
        width: 13px;
        height: 17px;
        background: url("../../assets/images/tooltip.png");
      }
    }
    & .pay {
      @include NotoSans(2, 600, #ffffff);
      background: #ff4d56;
      border-radius: 3px;
      height: 43px;
      padding: 0 30px;
      margin-left: 30px;
      margin-bottom: 5px;
      &:disabled {
        background: #828282;
      }
    }
  }
  & .view {
    width: 250px;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 25px;
      height: 53px;
      border-right: 1px solid #e0e0e0;
    }
  }
  & .txt {
    @include NotoSans(1.2, 500, #4f4f4f);
    & i {
      margin-left: 5px;
    }
  }
  & .num {
    @include NotoSans(2.5, 400, #333333);
    & span {
      @include Montserrat(2.5, 600, #333333);
    }
  }
  & .exposure {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      right: -65px;
      top: 8px;
      height: 40px;
      border-right: 1px solid #e0e0e0;
    }
  }
  & .store {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      right: -65px;
      top: 8px;
      height: 40px;
      border-right: 1px solid #e0e0e0;
    }
  }
}
.ad-set {
  background: #fffafa;
  padding: 150px 0 200px 0;
  & .alim-wrap {
    background: url("../../assets/images/alim_bg.png") no-repeat right 0 top 0;
    text-align: center;
    height: 58px;
    position: relative;
    @include NotoSans(1.8, 700, #fff);
    padding-top: 16px;
    & i {
      margin-right: 10px;
    }
    &:after {
      content: "";
      width: 80px;
      height: 58px;
      position: absolute;
      left: 0;
      top: 0;
      background: #7000ff;
    }
  }
  & .ad-result-tbl {
    border-top: 2px solid #ff4d56;
    & tr {
      & td {
        height: 50px;
        border-bottom: 1px solid #e0e0e0;
        padding: 0 10px;
        @include NotoSans(1.5, 400, #333333);
        &:nth-child(2) {
          border-right: 1px solid #e0e0e0;
        }
        &.subject {
          font-weight: 700 !important;
        }
        &.right {
          text-align: right;
        }
        & .num {
          @include Montserrat(1.5, 400, #333333);
        }
        & .discount {
          @include NotoSans(1.2, 700, #333333);
          margin-right: 10px;
          & .num {
            @include Montserrat(1.2, 600, #333333);
          }
        }
        & .origin {
          @include NotoSans(1.2, 400, #333333);
          margin-right: 10px;
          & .num {
            @include Montserrat(1.2, 400, #333333);
            text-decoration: line-through;
          }
          & em {
            font-style: normal;
          }
        }
        & .price {
          @include NotoSans(2, 600, #ff4d56);
          margin-right: 10px;
          position: relative;
          & .num {
            @include Montserrat(2, 600, #ff4d56);
          }
          & em {
            font-style: normal;
          }
        }
      }
    }
  }
  & .btn-group {
    margin-top: 250px;
    text-align: center;
    & button {
      &:first-child {
        width: 250px;
        height: 70px;
        border: 1px solid #ff4d56;
        border-radius: 2px;
        @include NotoSans(2.5, 700, #ff4d56);
      }
      &:last-child {
        width: 250px;
        height: 70px;
        background: #ff4d56;
        border-radius: 2px;
        @include NotoSans(2.5, 700, #fff);
        margin-left: 15px;
      }
    }
  }
}
.ad-etc {
  & .textarea {
    & textarea {
      border: 1px solid #bdbdbd;
      width: 100%;
      height: 255px;
      padding: 15px;
      @include NotoSans(1.5, 400, #4f4f4f);
    }
  }
}
.slot-wrap {
  & .help {
    text-align: right;
    @include NotoSans(1.5, 500, #828282);
    & i {
      margin-right: 5px;
      vertical-align: 2px;
    }
  }
  & .tooltip-wrap {
    position: relative;
    vertical-align: 5px;
    margin-left: 10px;
    cursor: pointer;
    & .tooltip {
      position: absolute;
      z-index: 10;
      display: none;
      & .slot-info {
        background: #f2f2f2;
        border-radius: 5px;
        padding: 42px 95px;
        & h3 {
          margin-top: 20px;
          font-style: normal;
          @include NotoSans(1.5, 700, #333333);
        }
        & ul {
          & li {
            @include NotoSans(1.5, 400, #333333);
            font-style: normal;
            margin-top: 8px;
            white-space: nowrap;
          }
        }
      }
      &.active {
        display: block;
      }
    }
  }
}
.ad-contents-yn {
  & .select {
    display: flex;
    justify-content: space-between;
    & .item {
      width: 530px;
      border: 1px solid #828282;
      height: 122px;
      border-radius: 61px;
      padding: 30px 0 0 120px;
      cursor: pointer;
      & .title {
        @include NotoSans(2.3, 700, #828282);
      }
      & .comment {
        @include NotoSans(1.4, 400, #828282);
      }
      &.active {
        padding: 26px 0 0 116px;
        border: 5px solid #ff4d56;
        background: url("../../assets/images/mov_check.png") no-repeat left 35px top 41px;
        & .title {
          color: #ff4d56 !important;
        }
      }
    }
  }
}
.movie-length {
  & .comment {
    @include NotoSans(1.5, 400, #828282);
  }
}
</style>
