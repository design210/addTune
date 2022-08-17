<template>
  <div class="no-lnb sub-wrapper">
    <h1>{{ $t("pay-h1") }}</h1>
    <!-- 광고주 정보 -->
    <section class="advertiser-info-wrap">
      <div class="header">
        <h2 class="mt80">{{ $t("pay-h2") }}</h2>
        <button v-if="userAdvertiserSid === null" type="button" @click="advertiserInit">{{ $t("button-init") }}</button>
        <button v-else type="button" @click="advertiserModify">{{ $t("button-modify") }}</button>
      </div>
      <table v-if="userAdvertiserSid === null" class="advertiser-tbl mt40 center" width="100%">
        <tr>
          <td>{{ $t("pay-warning") }}</td>
        </tr>
      </table>
      <table v-if="userAdvertiserLocalKind === 'SYS21B01B003'" class="advertiser-tbl mt40" width="100%">
        <colgroup>
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <th>{{ $t("pay-name") }}</th>
          <td>{{ userInfo.homepageUserName }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-type") }}</th>
          <td>{{ userAdvertiserLocalKindName }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-hp") }}</th>
          <td>{{ userAdvertiserUserHp }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-address") }}</th>
          <td v-if="userAdvertiserCompanyAddress1 !== ''">
            {{ userAdvertiserCompanyAddress1 }}
            {{ userAdvertiserCompanyAddress2 }}
          </td>
          <td v-else class="not-yet">{{ $t("pay-addressWarning") }}</td>
        </tr>
      </table>
      <table v-if="userAdvertiserLocalKind === 'SYS21B01B004'" class="advertiser-tbl mt40" width="100%">
        <colgroup>
          <col width="150" />
          <col width="50%" />
          <col width="150" />
          <col width="50%" />
        </colgroup>
        <tr>
          <th>{{ $t("pay-name") }}</th>
          <td colspan="3">{{ userInfo.homepageUserName }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-type") }}</th>
          <td>{{ userAdvertiserLocalKindName }}</td>
          <th class="add-line">{{ $t("pay-hp") }}</th>
          <td>{{ userAdvertiserUserHp }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-businessNum") }}</th>
          <td>{{ userAdvertiserCompanyCrNum }}</td>
          <th class="add-line">{{ $t("pay-company") }}</th>
          <td>{{ userAdvertiserCompanyName }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-ceo") }}</th>
          <td>{{ userAdvertiserCompanyCeo }}</td>
          <th class="add-line">{{ $t("pay-businessAddress") }}</th>
          <td>{{ userAdvertiserCompanyAddress1 }} {{ userAdvertiserCompanyAddress2 }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-businessType") }}</th>
          <td>{{ userAdvertiserCompanyTypeOfBusiness }}</td>
          <th class="add-line">{{ $t("pay-companyIndustries") }}</th>
          <td>{{ userAdvertiserCompanyIndustries }}</td>
        </tr>
      </table>
    </section>
    <!-- 광고주 정보 -->

    <!-- 광고 상품 정보 -->
    <section class="ad-product-info-wrap">
      <h2 class="mt150">{{ $t("pay-adProdInfo-h1") }}</h2>
      <div class="comment mt10">{{ $t("pay-adProdInfo-h2") }}</div>
      <table class="advertiser-tbl mt44" width="100%">
        <colgroup>
          <col width="150" />
          <col width="50%" />
          <col width="150" />
          <col width="50%" />
        </colgroup>
        <tr>
          <th class="name" colspan="4">
            <div class="d-flex">
              <span v-if="payInfo.fileSid !== undefined">
                <img :src="`${apiBaseUrl}/file/fileView/${payInfo.fileSid}?size=200`" alt="" class="img-radius" />
              </span>
              <img v-else alt="기본 이미지" src="@/assets/images/product_sample.png" />
              <div class="prod-info-wrap mt20 ml30">
                <div class="titles">{{ payInfo.buyGoodName }}</div>
                <div class="infos mt15">
                  <span class="subject">{{ $t("pay-adProdInfo-range") }}</span>
                  <span>{{ payInfo.adRangeDay }}{{ $t("common-unit-day") }} ({{ payInfo.buyAdvertisingProductStartDate }} ~ {{ payInfo.buyAdvertisingProductEndDate }})</span>
                </div>
                <div class="infos mt5">
                  <span class="subject">{{ $t("pay-adProdInfo-slot") }}</span>
                  <span
                    >{{ payInfo.buyAdvertisingProductSlotCount }} {{ $t("common-unit-amount") }}
                    <span v-if="payInfo.giftSlotCount > 0">(+{{ payInfo.giftSlotCount }} {{ $t("pay-adProdInfo-give") }})</span></span
                  >
                </div>
              </div>
            </div>
          </th>
        </tr>
        <tr>
          <th>{{ $t("pay-adProdInfo-zone") }}</th>
          <td colspan="3">
            <span v-for="(item, index) in payInfo.buyAdvertisingProductAreaChoiceName" :key="index"
              >{{ item.sysCodeName }}<span v-if="payInfo.buyAdvertisingProductAreaChoiceName.length > index + 1" class="comma">,</span>
            </span>
          </td>
        </tr>
        <tr>
          <th>{{ $t("pay-adProdInfo-categories") }}</th>
          <td colspan="3">{{ payInfo.buyAdvertsingProductCategory.name }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-adProdInfo-hopeStore") }}</th>
          <td colspan="3">
            <span v-for="(item, index) in payInfo.buyAdvertsingProductStoreTypeName" :key="index"
              >{{ item }}<span v-if="payInfo.buyAdvertsingProductStoreTypeName.length > index + 1" class="comma">,</span>
            </span>
          </td>
        </tr>
        <tr>
          <th>{{ $t("pay-adProdInfo-tuneStore") }}</th>
          <td colspan="3">{{ $t("common-unit-total") }} {{ __localeString(payInfo.buyAdvertisingStoreCount) }}{{ $t("common-unit-area") }}</td>
        </tr>
      </table>
    </section>
    <!-- //광고 상품 정보 -->

    <!-- 결제 수단 -->
    <section class="pay-type-wrap">
      <h2 class="mt150">{{ $t("pay-payType-h1") }}</h2>
      <table class="advertiser-tbl mt44" width="100%">
        <colgroup v-if="payTypeDisabled === false">
          <col width="55%" />
          <col width="45%" />
        </colgroup>
        <tr>
          <th v-if="payTypeDisabled === false" class="pl80">
            <div class="mt15 title-pay-type">{{ $t("pay-payType-card") }}</div>
            <div class="radio-group pay-type mb15 mt18">
              <v-radio-group v-model="buyPaymentKind">
                <span v-for="(item, index) in payTypeOptions" :key="index">
                  <v-radio v-if="index === 0" :disabled="payTypeDisabled" :label="item.label" :value="item.val"></v-radio>
                </span>
              </v-radio-group>
            </div>
          </th>
          <th>
            <div class="mt15 title-pay-type">{{ $t("pay-payType-bank") }}</div>
            <div class="radio-group pay-type single mb15 mt18">
              <v-radio-group v-model="buyPaymentKind">
                <span v-for="(item, index) in payTypeOptions" :key="index"><v-radio v-if="index === 3" :label="item.label" :value="item.val"></v-radio></span>
              </v-radio-group>
            </div>
          </th>
        </tr>
      </table>
    </section>
    <!-- //결제 수단 -->

    <!-- 최종 결재 금액 -->
    <section class="final-pay-wrap">
      <div class="relative">
        <h2>{{ $t("pay-price-h1") }}</h2>
        <table class="advertiser-tbl mt20" width="100%">
          <tr>
            <td class="white">
              <div class="pay-calc-wrap pr100 pl100">
                <div>
                  <div class="subject">{{ $t("pay-price-basic") }}</div>
                  <div class="price">
                    {{ __localeString(buyAdvertisingDefaultPrice) }}<span>{{ $t("common-unit-price") }}</span>
                  </div>
                </div>
                <div class="img"><img alt="" src="@/assets/images/minus.png" /></div>
                <div>
                  <div class="subject">
                    <div v-if="buyAdvertisingDiscount > 0" class="discount">{{ buyAdvertisingDiscount }}%</div>
                    {{ $t("pay-price-discount") }}
                  </div>
                  <div class="price">
                    {{ __localeString(buyAdvertisingProductSaleVal) }}<span>{{ $t("common-unit-price") }}</span>
                  </div>
                </div>
                <div class="img"><img alt="" src="@/assets/images/plus.png" /></div>
                <div>
                  <div class="subject">{{ $t("pay-price-vat") }}</div>
                  <div class="price">
                    {{ __localeString(buyAdvertisingVat) }}<span>{{ $t("common-unit-price") }}</span>
                  </div>
                </div>
                <div class="img"><img alt="" src="@/assets/images/eqal.png" /></div>
                <div>
                  <div class="subject">{{ $t("pay-price-final") }}</div>
                  <div class="price final">
                    {{ __localeString(buyAdvertisingPayment) }}<span>{{ $t("common-unit-price") }}</span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="bg-pink"></div>
    </section>
    <!-- //최종 결재 금액 -->

    <!-- 동의 -->
    <section class="agree-wrap">
      <input id="use" v-model="use" class="ck-img" type="checkbox" /><label for="use">{{ $t("pay-agree-require") }}</label>
      <div class="comment">{{ $t("pay-agree-comment") }}</div>
      <table class="advertiser-tbl mt20" width="100%">
        <tr>
          <td class="pt20 pb20">
            <div class="d-flex">
              <div>
                <h3>{{ $t("pay-agree-buyAgree") }}</h3>
                <div class="infos mt10">
                  {{ $t("pay-agree-low") }}
                </div>
                <div class="terms-wrap mt30">
                  <div class="title">{{ $t("pay-agree-term") }}</div>
                  <div
                    class="view pr170"
                    @click="
                      __showModalTemplate(
                        require('@/components/modal/Terms'),
                        {
                          status: 'advertisement',
                        },
                        1000,
                      )
                    "
                  >
                    {{ $t("pay-agree-termView") }}
                  </div>
                </div>
                <div class="terms-wrap mt10">
                  <div class="title">{{ $t("pay-agree-cancel") }}</div>
                  <div
                    class="view pr170"
                    @click="
                      __showModalTemplate(
                        require('@/components/modal/Terms'),
                        {
                          status: 'advertisementRefund',
                        },
                        1000,
                      )
                    "
                  >
                    {{ $t("pay-agree-termView") }}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </section>

    <div class="btn-group mb200" style="margin-top: 250px !important">
      <button type="button" @click="pdfDownload">{{ $t("button-download1") }}</button>
      <button type="button" @click="payType">{{ $t("button-pay") }}</button>
    </div>
    <!-- //동의 -->
    <!-- <button @click="pay">결제요청</button> -->
  </div>
</template>

<script>
import localeString from "@/mixins/localeString";
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import BootPay from "bootpay-js";
import { deleteCookie, saveAcountTransferCookie } from "@/utils/cookie";
import isEmpty from "@/utils/empty";
import termModal from "@/components/modal/Terms.vue";
import { getPopupOpt } from "@/utils/modal";
import showModal from "@/mixins/showModal";
import axios from "axios";
import bus from "@/utils/bus";
export default {
  mixins: [loading, showModal, localeString],
  props: ["apiBaseUrl"],
  data() {
    return {
      use: false,
      payTypeOptions: [
        { label: this.$t("common-payType-card"), val: "" },
        { label: this.$t("common-payType-hp"), val: "" },
        { label: this.$t("common-payType-cyberBank"), val: "" },
        { label: "", val: "" },
      ],
      payInfo: {}, //결재 정보
      buyPaymentKind: "",
      userAdvertiserSid: "", //userSid
      userInfo: {},
      userAdvertiserInfo: {},
      mKey: "",
      signature: "",
      siteDomain: "",
      goodname: "",
      buyername: "",
      buyertel: "",
      buyeremail: "",
      price: "",
      mid: "",
      gopaymethod: "",
      oid: "",
      timestamp: "",
      version: "",
      currency: "",
      acceptmethod: "",
      returnUrl: "",
      closeUrl: "",
      order_id: "",
      vat: "",
      payTypeName: "",
      endDay: "",
      holder: "",
      payTypeDisabled: false,
      //광고주 상세 정보
      userAdvertiserLocalKindName: "",
      userAdvertiserLocalKind: "",
      userAdvertiserUserHp: "",
      userAdvertiserCompanyCrNum: "",
      userAdvertiserCompanyName: "",
      userAdvertiserCompanyCeo: "",
      userAdvertiserCompanyAddress1: "",
      userAdvertiserCompanyAddress2: "",
      userAdvertiserCompanyTypeOfBusiness: "",
      userAdvertiserCompanyIndustries: "",
      buyAdvertisingPayment: "",
      buyAdvertisingDefaultPrice: "",
      buyAdvertisingBenefitDiscount: "",
      buyAdvertisingSlotDiscount: "",
      buyAdvertisingSlotDiscountRatio: "",
      buyAdvertisingVat: "",
      buyAdvertisingBenefitDiscountRatio: "",
      buyAdvertisingCampaignName: "",
      buyAdvertisingDiscount: "",
      buyAdvertisingProductSaleVal: "",
      //가상계좌 결재 데이터
      vbank: "",
      estimatePdf: "",
      //통행량
      min: "",
      max: "",
    };
  },
  computed: {
    ...mapGetters("common", ["getInterbridInfo", "getSystemCodeList"]),
    ...mapGetters("member", ["getAdvertiserDetail", "getMe"]),
    ...mapGetters("pay", ["getPayment", "getPayType", "getPayVeri", "getEstimatePdf"]),
  },
  watch: {
    buyPaymentKind(n) {
      if (n === "SYS21B22B030") {
        this.payTypeName = "card";
      } else if (n === "SYS21B22B031") {
        this.payTypeName = "phone";
      } else if (n === "SYS21B22B033") {
        this.payTypeName = "vbank";
      }
    },
  },
  async created() {
    if (sessionStorage.getItem("payData")) {
      //데이터가 세션에 저장되어 있는지 확인
      this.payInfo = JSON.parse(sessionStorage.getItem("payData")); //세션데이터를 불러옴
      sessionStorage.removeItem("payData");
    } else {
      //세션 데이터가 없다는건 루트대로 제대로 온 것
      this.payInfo = this.$route.params;
    }
    if (Object.keys(this.payInfo).length === 0) {
      this.$router.push("/ad/adMain");
    }
    this.min = this.payInfo.min;
    this.max = this.payInfo.max;
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/ME");
      if (this.getMe.addtuneApiResult.errorCode == 200) {
        this.userAdvertiserSid = this.getMe.addtuneApiResult.login.userAdvertiserSid;
        this.userInfo = this.getMe.addtuneApiResult.login;
      } else {
        alert(this.getMe.addtuneApiResult.errorMessage);
      }
      if (this.userAdvertiserSid !== null) {
        await this.$store.dispatch("member/ADVERTISER_DETAIL", this.userAdvertiserSid);
        if (this.getAdvertiserDetail.addtuneApiResult.errorCode == 200) {
          const info = this.getAdvertiserDetail.addtuneApiResult.userAdvertiser;
          this.userAdvertiserLocalKindName = info.userAdvertiserLocalKindName;
          this.userAdvertiserLocalKind = info.userAdvertiserLocalKind;
          this.userAdvertiserUserHp = info.userAdvertiserUserHp;
          this.userAdvertiserCompanyCrNum = isEmpty(info.userAdvertiserCompanyCrNum);
          this.userAdvertiserCompanyName = isEmpty(info.userAdvertiserCompanyName);
          this.userAdvertiserCompanyCeo = isEmpty(info.userAdvertiserCompanyCeo);
          this.userAdvertiserCompanyAddress1 = isEmpty(info.userAdvertiserCompanyAddress1);
          this.userAdvertiserCompanyAddress2 = isEmpty(info.userAdvertiserCompanyAddress2);
          this.userAdvertiserCompanyTypeOfBusiness = isEmpty(info.userAdvertiserCompanyTypeOfBusiness);
          this.userAdvertiserCompanyIndustries = isEmpty(info.userAdvertiserCompanyIndustries);
        } else {
          alert(this.getAdvertiserDetail.addtuneApiResult.errorMessage);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }

    //가상계좌 입금 기한
    let tDate = new Date();
    let dates = tDate.setDate(tDate.getDate() + 0);
    this.endDay = new Date(dates).toISOString().substr(0, 10);
    this.payment();
    //계좌 번호
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("common/INTERBRID_INFO");
      if (this.getInterbridInfo.addtuneApiResult.errorCode == 200) {
        this.payTypeOptions[3].label = this.getInterbridInfo.addtuneApiResult.companyInfo.sys_code_parent_sys_code_use[0].sysCodeVal;
        this.holder = this.getInterbridInfo.addtuneApiResult.companyInfo.sys_code_parent_sys_code_use[0].sysCodeValName;
      } else {
        alert(this.getInterbridInfo.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
    //결제수단 code
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("common/SYSCODE", "SYS21B22B029");
      if (this.getSystemCodeList.addtuneApiResult.errorCode == 200) {
        const codeList = this.getSystemCodeList.addtuneApiResult.sysCodeList;
        this.payTypeOptions[0].val = codeList[0].sysCodeSid;
        this.payTypeOptions[1].val = codeList[1].sysCodeSid;
        this.payTypeOptions[2].val = codeList[3].sysCodeSid;
        this.payTypeOptions[3].val = codeList[2].sysCodeSid;
      } else {
        alert(this.getSystemCodeList.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    //광고주 정보 입력
    advertiserInit() {
      const router = "pay";
      this.payInfo.router = router;
      sessionStorage.setItem("payData", JSON.stringify(this.payInfo)); //수정할 때 뒤로가기 대비 가지고 있는 데이터를 세션에 저장
      this.$router.push({ name: "advertiser_info_init", params: this.payInfo });
    },
    //광고주 정보수정
    advertiserModify() {
      const id = this.userInfo.userAdvertiserSid;
      const router = "pay";
      this.payInfo.id = id;
      this.payInfo.router = router;
      sessionStorage.setItem("payData", JSON.stringify(this.payInfo)); //수정할 때 뒤로가기 대비 가지고 있는 데이터를 세션에 저장
      this.$router.push({ name: "advertiser_info_modify", params: this.payInfo });
    },
    //결제 Order Id 가져오기
    async payment() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("pay/PAYMENT", {
          buyDateTime: this.payInfo.buyDateTime,
          buyGoodName: this.payInfo.buyGoodName,
          advertisingProductSid: this.payInfo.advertisingProductSid,
          buyAdvertisingProductContentFlag: this.payInfo.buyAdvertisingProductContentFlag,
          buyAdvertisingContentLength: this.payInfo.buyAdvertisingContentLength,
          buyAdvertisingExposedCount: this.payInfo.buyAdvertisingExposedCount,
          buyAdvertisingStoreCount: this.payInfo.buyAdvertisingStoreCount,
          buyAdvertisingDiscount: this.payInfo.buyAdvertisingDiscount,
          buyAdvertisingPayment: this.payInfo.addVatPrice,
          buyAdvertisingProductAreaChoice: this.payInfo.buyAdvertisingProductAreaChoice,
          buyAdvertisingProductGradeChoice: this.payInfo.buyAdvertisingProductGradeChoice,
          buyAdvertisingProductSlotCount: this.payInfo.buyAdvertisingProductSlotCount,
          buyAdvertisingProductBenefitChoiceVal: this.payInfo.buyAdvertisingProductBenefitChoiceVal,
          buyAdvertisingProductSaleVal: this.payInfo.totalDiscountPrice,
          buyAdvertisingProductGiftVal: this.payInfo.giftSlotCount,
          buyAdvertisingProductGiftStoreList: this.payInfo.buyAdvertisingProductGiftStoreList,
          buyAdvertisingProductStartDate: this.payInfo.buyAdvertisingProductStartDate,
          buyAdvertisingProductEndDate: this.payInfo.buyAdvertisingProductEndDate,
          buyAdvertisingProductCategory: this.payInfo.buyAdvertsingProductCategory.code,
          buyAdvertisingProductStoreType: this.payInfo.buyAdvertsingProductStoreType,
          buyAdvertisingProductStoreList: this.payInfo.buyAdvertisingProductStoreList,
          buyAdvertisingBenefitDiscount: this.payInfo.benefitDiscountPrice,
          buyAdvertisingBenefitDiscountRatio: this.payInfo.benefitDiscountRatio,
          buyAdvertisingDefaultPrice: this.payInfo.originPrice,
          buyAdvertisingSlotDiscount: this.payInfo.slotDiscountPrice,
          buyAdvertisingSlotDiscountRatio: this.payInfo.slotDiscountRatio,
          buyAdvertisingVat: this.payInfo.vatPrice,
          buyAdvertisingVatRatio: this.payInfo.vatRatio,
        });
        if (this.getPayment.addtuneApiResult.errorCode == 200) {
          this.order_id = this.getPayment.addtuneApiResult.buyMaster.buySid;
          const payment = this.getPayment.addtuneApiResult.buyMaster.paymentInfo.buyInfo;
          this.buyAdvertisingDefaultPrice = payment.buyAdvertisingDefaultPrice; //원가

          //this.buyAdvertisingBenefitDiscount = payment.buyAdvertisingBenefitDiscount; //특별할인
          // this.buyAdvertisingSlotDiscount = payment.buyAdvertisingSlotDiscount; //슬롯 추가 할인
          // this.buyAdvertisingSlotDiscountRatio = payment.buyAdvertisingSlotDiscountRatio; //슬롯추가 할인률
          this.buyAdvertisingVat = payment.buyAdvertisingVat; //부가세
          this.buyAdvertisingPayment = payment.buyAdvertisingPayment; //최종가격
          // this.buyAdvertisingBenefitDiscountRatio = payment.buyAdvertisingBenefitDiscountRatio; //특별 할인률
          this.buyAdvertisingCampaignName = payment.buyAdvertisingCampaignName; //캠페인 네임
          this.buyAdvertisingDiscount = payment.buyAdvertisingDiscount; //할인률
          this.buyAdvertisingProductSaleVal = payment.buyAdvertisingProductSaleVal; //할인가격
          //결제금액이 500만원 이상일 경우
          if (this.buyAdvertisingPayment > 5000000) {
            this.buyPaymentKind = "SYS21B22B032";
            this.payTypeDisabled = true;
          }
          deleteCookie("payInfo");
        } else {
          alert(this.getPayment.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async pdfDownload() {
      try {
        bus.$emit("start:spinner");
        //견적서 다운로드
        await axios({
          method: "get",
          url: `${process.env.VUE_APP_API}/payment/estimate/${this.order_id}`,
          responseType: "arraybuffer",
        }).then(res => {
          var file = new Blob([res.data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          const link = document.createElement("a");
          link.href = fileURL;
          link.download = "견적서_" + this.$date().format("YYYY.MM.DD_h_m_s") + ".pdf";
          link.click();
        });
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //결제 수단 선택
    async payType() {
      if (this.use === false) {
        alert(this.$t("alert-t12"));
        return false;
      }
      if (this.buyPaymentKind === "") {
        alert(this.$t("alert-t13"));
        return false;
      }
      if (this.userAdvertiserSid === null) {
        alert(this.$t("alert-t14"));
        return false;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("pay/ORDERID", {
          order_id: this.order_id,
          buyPaymentKind: this.buyPaymentKind,
        });
        if (this.getPayType.addtuneApiResult.errorCode == 200) {
          this.pay();
        } else {
          alert(this.getPayType.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //결제 : 부트페이
    pay() {
      if (this.buyPaymentKind === "SYS21B22B032") {
        saveAcountTransferCookie({
          payment: this.buyAdvertisingPayment,
          bank: `${this.payTypeOptions[3].label} ${this.holder}`,
          endDay: this.endDay,
          id: this.order_id,
          name: this.buyAdvertisingCampaignName,
        });
        this.$router.push("/pay/resultBank");
      } else {
        const _this = this;
        BootPay.request({
          price: this.buyAdvertisingPayment, //실제 결제되는 가격
          application_id: "6188ad7d7b5ba4f7e352aa5c",
          name: this.payInfo.buyGoodName, //결제창에서 보여질 이름
          pg: "inicis",
          method: this.payTypeName, //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
          show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
          // items: [
          // 	{
          // 		item_name: '나는 아이템', //상품명
          // 		qty: 1, //수량
          // 		unique: '123', //해당 상품을 구분짓는 primary key
          // 		price: 1000, //상품 단가
          // 		cat1: 'TOP', // 대표 상품의 카테고리 상, 50글자 이내
          // 		cat2: '티셔츠', // 대표 상품의 카테고리 중, 50글자 이내
          // 		cat3: '라운드 티', // 대표상품의 카테고리 하, 50글자 이내
          // 	},
          // ],
          user_info: {
            username: this.userInfo.homepageUserName,
            email: this.userInfo.homepageUserEmail,
            addr: `${this.userAdvertiserCompanyAddress1} ${this.userAdvertiserCompanyAddress2}`,
            phone: this.userAdvertiserUserHp,
          },
          order_id: this.order_id, //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
          //params: { callback1: '그대로 콜백받을 변수 1', callback2: '그대로 콜백받을 변수 2', customvar1234: '변수명도 마음대로' },
          account_expire_at: this.endDay, // 가상계좌 입금기간 제한 ( yyyy-mm-dd 포멧으로 입력해주세요. 가상계좌만 적용됩니다. )
          // extra: {
          // 	start_at: '2019-05-10', // 정기 결제 시작일 - 시작일을 지정하지 않으면 그 날 당일로부터 결제가 가능한 Billing key 지급
          // 	end_at: '2022-05-10', // 정기결제 만료일 -  기간 없음 - 무제한
          // 	vbank_result: 1, // 가상계좌 사용시 사용, 가상계좌 결과창을 볼지(1), 말지(0), 미설정시 봄(1)
          // 	quota: '0,2,3', // 결제금액이 5만원 이상시 할부개월 허용범위를 설정할 수 있음, [0(일시불), 2개월, 3개월] 허용, 미설정시 12개월까지 허용,
          // 	theme: 'purple', // [ red, purple(기본), custom ]
          // 	custom_background: '#00a086', // [ theme가 custom 일 때 background 색상 지정 가능 ]
          // 	custom_font_color: '#ffffff', // [ theme가 custom 일 때 font color 색상 지정 가능 ]
          // },
        })
          .error(function (data) {
            //결제 진행시 에러가 발생하면 수행됩니다.
            console.log(data);
          })
          .cancel(function (data) {
            //결제가 취소되면 수행됩니다.
            console.log(data);
          })
          .ready(function (data) {
            // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
            _this.vbank = data.account;
            saveAcountTransferCookie({
              payment: _this.buyAdvertisingPayment,
              bank: `${data.bankname} ${data.account} ${data.accounthodler}`,
              endDay: _this.endDay,
              id: _this.order_id,
              name: _this.buyAdvertisingCampaignName,
            });
          })
          .confirm(function (data) {
            //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
            //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
            console.log(data);
            var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
            if (enable) {
              BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
            } else {
              BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
            }
          })
          .close(function (data) {
            // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
            console.log(data);
            if (_this.vbank !== "") {
              _this.$router.push("/pay/resultBank");
            }
          })
          .done(function (data) {
            //결제가 정상적으로 완료되면 수행됩니다
            //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
            console.log(data);
            //deleteCookie('payInfo');
            _this.$router.push(`/pay/result/${data.receipt_id}`);
          });
      }
    },
    //약관 모달
    showTermsPopup(status) {
      this.$modal.show(termModal, { status }, getPopupOpt("termModal", "615px", "auto", false));
    },
  },
};
</script>

<style lang="scss" scoped>
.img-radius {
  border-radius: 10px;
}

h1 {
  margin-top: 60px;
  @include NotoSans(3, 700, #000);
}

h2 {
  @include NotoSans(2.5, 700, #333333);
}

.comment {
  @include NotoSans(1.5, 500, #828282);
}

.agree-wrap {
  margin-top: 300px;

  & .comment {
    @include NotoSans(1.5, 400, #828282);
    margin: 10px 0 0 38px;
  }

  & .d-flex {
    & > div {
      width: 100%;
      padding-left: 48px;

      & h3 {
        @include NotoSans(1.8, 700, #333333);
      }

      & .infos {
        @include NotoSans(1.4, 400, #828282);
      }

      & .terms-wrap {
        display: flex;

        & .title {
          @include NotoSans(1.4, 400, #333333);
          width: 300px;
        }

        & .view {
          @include NotoSans(1.4, 400, #333333);
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}

.final-pay-wrap {
  position: relative;

  & .relative {
    position: relative;
    z-index: 10;

    & h2 {
      margin-top: 300px;
    }
  }

  & .bg-pink {
    width: 6000px;
    height: 500px;
    background: #fffafa;
    position: absolute;
    top: -148px;
    left: -3000px;
  }
}

.advertiser-info-wrap {
  position: relative;

  & .header {
    & button {
      @include NotoSans(1.5, 500, #828282);
      border: 1px solid #828282;
      padding: 5px 15px;
      border-radius: 5px;
      position: absolute;
      right: 0;
      top: 35px;
    }
  }
}

.advertiser-tbl {
  border-top: 2px solid #ff4d56;

  & tr {
    & th {
      padding: 15px 20px;
      text-align: left;
      border-bottom: 1px solid #dddddd;
      @include NotoSans(1.5, 700, #333333);

      &.name {
        @include NotoSans(2, 700, #333333);

        & img {
          width: 200px;
          margin-right: 10px;
        }
      }

      &.add-line {
        border-left: 1px solid #dddddd !important;
      }

      & .prod-info-wrap {
        & .titles {
          @include NotoSans(2.3, 700, #333333);
        }

        & .infos {
          @include NotoSans(1.5, 400, #333333);

          & .subject {
            font-weight: 700 !important;
            width: 130px;
          }
        }
      }

      & .title-pay-type {
        @include NotoSans(1.5, 500, #4f4f4f);
      }
    }

    & td {
      padding: 15px 10px;
      border-bottom: 1px solid #dddddd;
      @include NotoSans(1.5, 400, #333333);

      & .comma {
        margin-right: 5px;
      }

      &.white {
        background: #fff;
        border-bottom: 1px solid #333333 !important;
      }

      &.not-yet {
        color: #bdbdbd !important;
      }
    }

    &:last-child {
      & th {
        border-color: #828282;
      }

      & td {
        border-color: #828282;
      }
    }
  }
}

.pay-calc-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 45px 20px;

  & .subject {
    @include NotoSans(1.5, 400, #4f4f4f);
    position: relative;

    & .discount {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translateX(-50%);
      @include Montserrat(1.5, 700, #fff);
      background: #7000ff;
      padding: 0 10px;
      border-radius: 5px;

      &:after {
        content: "";
        background: url("../../assets/images/tryangle_black.png");
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 15px;
        height: 10px;
      }
    }
  }

  & .price {
    @include Montserrat(2.5, 600, #333333);

    & span {
      @include NotoSans(1.5, 400, #333333);
      margin-left: 3px;
    }

    &.final {
      color: #ff4d56 !important;

      & span {
        color: #ff4d56 !important;
        font-weight: 700 !important;
      }
    }
  }

  & .img {
    margin: 0 30px;
  }
}

//ckbox
input[type="checkbox"].ck-img {
  display: none;
}

input[type="checkbox"].ck-img + label {
  cursor: pointer;
  padding-left: 33px;
  background-repeat: no-repeat;
  background-image: url("../../assets/images/agree_off.png");
  display: block;
  background-position: left 0 top 8px;
  @include NotoSans(2.5, 700, #000);
}

input[type="checkbox"].ck-img:checked + label {
  background-image: url("../../assets/images/agree_on.png");
}

input[type="checkbox"].ck-img:disabled + label {
  background-image: url("../../assets/images/agree_off.png");
}

.btn-group {
  margin: 84px 0 100px;
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
</style>
