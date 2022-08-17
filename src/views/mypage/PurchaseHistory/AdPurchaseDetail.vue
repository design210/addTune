<template>
  <div class="sub-wrapper mt100 mb100">
    <section>
      <h2>{{ $t("purchase-detail-title") }}</h2>
      <h3 v-if="buyAdvertisingStatus !== 'SYS21C10B005'" class="mt100">{{ $t("purchase-detail-prodInfo") }}</h3>
      <h3 v-else class="mt100">{{ $t("purchase-detail-cancel") }}</h3>
      <div v-if="buyAdvertisingStatus !== 'SYS21C10B005' && buyAdvertisingStatus !== 'SYS21C10B002'" class="report-wrap">
        <router-link
          :to="{
            name: 'report',
            params: { id: buyAdvertisingProductSid },
          }"
          >{{ $t("button-reportView") }}
        </router-link>
      </div>
      <table class="mt44" width="100%">
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td colspan="4">
            <div class="d-flex align-center">
              <section v-if="buyStatus === 'SYS21B19B006'">
                <div class="thumbnail mr38">
                  <span class="cancel"><em v-html="$t('purchase-list-cancelComp')"></em></span>
                </div>
              </section>
              <section v-else>
                <div v-if="video === null" class="thumbnail mr38" @click="$router.push('/mypage/adContents/adContentsList')" :class="{ upload: video === null }">
                  <div class="icon mt33"><img alt="" src="@/assets/images/plus_24.png" /></div>
                  <div class="text mt10">{{ $t("purchase-detail-upload") }}</div>
                </div>
                <div
                  v-else
                  class="thumbnail mr38 active"
                  @click="
                    __showModalTemplate(
                      require('@/components/modal/Video'),
                      {
                        videoSid: video.videoSid,
                        videoTransSid: video.video_trans[0].videoTransSid,
                      },
                      1200,
                    )
                  "
                >
                  <div>
                    <img v-if="Object.keys(video).length > 0" :src="`${apiBaseUrl}/video/view/${video.videoSid}?videoTransSid=${video.video_trans[1].videoTransSid}`" alt="" />
                    <div class="time">{{ time }}</div>
                  </div>
                </div>
              </section>
              <div class="header">
                <p>
                  <span
                    :class="{
                      before: buyAdvertisingStatus === 'SYS21C10B002',
                      current: buyAdvertisingStatus === 'SYS21C10B003',
                      after: buyAdvertisingStatus === 'SYS21C10B004',
                      cancel: buyAdvertisingStatus === 'SYS21C10B005',
                    }"
                    >{{ buyAdvertisingStatusName }}</span
                  >&nbsp;&nbsp;|&nbsp;&nbsp;<span>{{ advertisingProductName }}</span>
                </p>
                <p class="d-flex align-center mt5">
                  <span class="name mr18">{{ buyAdvertisingCampaignName }}</span>
                  <button v-if="buyAdvertisingStatus !== 'SYS21C10B005'" class="btn" @click="showPopup({ name: buyAdvertisingCampaignName, id: buySid })">
                    {{ $t("button-campaignModify") }}
                  </button>
                </p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("purchase-detail-adRange") }}</td>
          <td>{{ buyAdvertisingProductDay }}{{ $t("common-unit-day") }} ({{ buyAdvertisingProductStartDate }} ~ {{ buyAdvertisingProductEndDate }})</td>
          <td>{{ $t("buyAd-slot-h1") }}</td>
          <td>
            {{ buyAdvertisingProductSlotCount }} {{ $t("common-unit-amount") }}
            <span v-if="buyAdvertisingProductGiftVal > 0">(+{{ buyAdvertisingProductGiftVal }} {{ $t("pay-adProdInfo-give") }})</span>
          </td>
        </tr>
        <tr>
          <td>{{ $t("pay-adProdInfo-zone") }}</td>
          <td colspan="3">
            <span v-for="(item, index) in buyAdvertisingProductAreaChoiceName" :key="item"
              >{{ item }}<span v-if="buyAdvertisingProductAreaChoiceName.length > 0 && index + 1 !== buyAdvertisingProductAreaChoiceName.length">,</span></span
            >
          </td>
        </tr>
        <tr v-if="buyAdvertisingStatus === 'SYS21C10B002'">
          <td>{{ $t("pay-adProdInfo-categories") }}</td>
          <td colspan="3">{{ buyAdvertisingProductCategoryName }}</td>
        </tr>
        <tr v-else>
          <td>{{ $t("pay-adProdInfo-categories") }}</td>
          <td colspan="3">{{ buyAdvertisingProductCategoryName }}</td>
        </tr>
        <tr>
          <td>{{ $t("pay-adProdInfo-hopeStore") }}</td>
          <td colspan="3">
            <span v-for="(item, index) in buyAdvertisingProductStoreTypeName" :key="item"
              >{{ item }}<span v-if="buyAdvertisingProductStoreTypeName.length > 0 && index + 1 !== buyAdvertisingProductStoreTypeName.length">,</span></span
            >
          </td>
        </tr>
        <tr>
          <td>{{ $t("pay-adProdInfo-tuneStore") }}</td>
          <td colspan="3">
            {{ $t("common-unit-total") }} {{ __localeString(buyAdvertisingStoreCount) }} {{ $t("common-unit-area") }}
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
    <section class="mt150 relative">
      <h3 v-if="buyAdvertisingStatus !== 'SYS21C10B005'">{{ $t("purchase-detail-payInfo") }}</h3>
      <h3 v-else>{{ $t("purchase-detail-cancelInfo") }}</h3>
      <div class="order-num">
        {{ $t("pay-complete2-num") }} <span>{{ buySid }}</span>
      </div>
      <table v-if="buyAdvertisingStatus !== 'SYS21C10B005'" class="mt44" width="100%">
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td>{{ $t("pay-complete2-day") }}</td>
          <td>
            <span class="mr20">{{ buyDateTime }}</span>
            <span v-if="buyPaymentKind === 'SYS21B22B032' || buyPaymentKind === 'SYS21B22B033'">
              <span v-if="buyStatus === 'SYS21B19B004'" class="pay-complete">{{ $t("purchase-detail-depositCopm") }}</span>
              <span v-else class="pay-ready">{{ $t("purchase-detail-depositCheck") }}</span>
            </span>
          </td>
          <td>{{ $t("purchase-detail-payType") }}</td>
          <td>
            <span v-if="buyPaymentKind === 'SYS21B22B030'">{{ $t("common-payType-card") }}</span>
            <span v-if="buyPaymentKind === 'SYS21B22B031'">{{ $t("common-payType-hp") }}</span>
            <span v-if="buyPaymentKind === 'SYS21B22B032'">{{ $t("common-payType-transfer") }}</span>
            <span v-if="buyPaymentKind === 'SYS21B22B033'">{{ $t("common-payType-cyberBank") }}</span>
            <span class="ml20 bold" v-if="this.buyDepositBank !== null">{{ BankInfo }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="price-wrap mt20 mb20">
              <div>
                <p class="subject">{{ $t("pay-price-basic") }}</p>
                <p>
                  <span>{{ __localeString(buyAdvertisingDefaultPrice) }}</span> 원
                </p>
              </div>
              <div><img alt="" src="@/assets/images/minus.png" /></div>
              <div>
                <p class="subject">
                  {{ $t("pay-price-discount") }}<span v-if="buyAdvertisingDiscount > 0" class="discount">{{ buyAdvertisingDiscount }}%</span>
                </p>
                <p>
                  <span>{{ __localeString(buyAdvertisingProductSaleVal) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div><img alt="" src="@/assets/images/plus.png" /></div>
              <div>
                <p class="subject">{{ $t("pay-price-vat") }}</p>
                <p>
                  <span>{{ __localeString(buyAdvertisingVat) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div><img alt="" src="@/assets/images/eqal.png" /></div>
              <div>
                <p class="subject">{{ $t("pay-price-final") }}</p>
                <p>
                  <!--									<span class="discount-total" v-if="buyAdvertisingDiscount > 0">{{ buyAdvertisingDiscount }}%</span>-->
                  <span class="total-price">{{ __localeString(buyAdvertisingPayment) }}</span>
                  <span class="total-unit">{{ $t("common-unit-price") }}</span>
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <table v-else class="mt15" width="100%">
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td>{{ $t("purchase-detail-cancelDay") }}</td>
          <td>{{ buyRefundDemandDate }}</td>
          <td>{{ $t("purchase-detail-cancelCompDay") }}</td>
          <td>{{ buyRefundDate }}</td>
        </tr>
        <tr>
          <td>{{ $t("purchase-detail-refundMethod") }}</td>
          <td>{{ buyRefundKindName }}</td>
          <td>{{ $t("purchase-detail-price") }}</td>
          <td>
            {{ __localeString(buyAdvertisingPayment) }} {{ $t("common-unit-price") }}
            <button
              class="refund-detail"
              type="button"
              @click="
                __showModalTemplate(
                  require('@/components/modal/refund/RefundAd'),
                  {
                    data: {
                      buySid,
                      buyAdvertisingProductGradeChoiceName,
                      buyAdvertisingProductCategoryName,
                      buyAdvertisingDefaultPrice,
                      buyAdvertisingBenefitDiscount,
                      buyAdvertisingBenefitDiscountRatio,
                      buyAdvertisingSlotDiscount,
                      buyAdvertisingSlotDiscountRatio,
                      buyAdvertisingVat,
                      buyAdvertisingDiscount,
                      buyAdvertisingPayment,
                      buyAdvertisingProductSaleVal,
                    },
                  },
                  1200,
                )
              "
            >
              {{ $t("button-detailView") }}
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="price-wrap mt20 mb20 pr100 pl100">
              <div>
                <p class="subject">{{ $t("purchase-detail-price") }}</p>
                <p>
                  <span>{{ __localeString(buyAdvertisingPayment) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div><img alt="" src="@/assets/images/minus.png" /></div>
              <div>
                <p class="subject">{{ $t("purchase-detail-deduction") }}</p>
                <p>
                  <span>{{ __localeString(refundPrice) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div><img alt="" src="@/assets/images/eqal.png" /></div>
              <div>
                <p class="subject">{{ $t("purchase-detail-refundFinal") }}</p>
                <p>
                  <span class="total-price">{{ __localeString(buyRefundPrice) }}</span>
                  <span class="total-unit">{{ $t("common-unit-price") }}</span>
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </section>
    <section class="mt150">
      <h3>{{ $t("purchase-detail-buyerInfo") }}</h3>
      <table v-if="userAdvertiserLocalKind === 'SYS21B01B003'" class="mt44" width="100%">
        <colgroup>
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td>{{ $t("pay-name") }}</td>
          <td>{{ userName }}</td>
        </tr>
        <tr>
          <td>{{ $t("pay-type") }}</td>
          <td>
            <span v-if="userAdvertiserLocalKind === 'SYS21B01B003'">{{ $t("purchase-detail-buyerType1") }}</span>
            <span v-if="userAdvertiserLocalKind === 'SYS21B01B004'">{{ $t("purchase-detail-buyerType2") }}</span>
            <span v-if="userAdvertiserLocalKind === 'SYS21B01B005'">{{ $t("purchase-detail-buyerType3") }}</span>
          </td>
        </tr>
        <tr>
          <td>{{ $t("purchase-detail-hp") }}</td>
          <td>{{ userAdvertiserUserHp }}</td>
        </tr>
      </table>
      <table v-if="userAdvertiserLocalKind === 'SYS21B01B004'" class="mt15" width="100%">
        <colgroup>
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td>{{ $t("purchase-detail-businessName") }}</td>
          <td>{{ userAdvertiserCompanyName }}</td>
        </tr>
        <tr>
          <td>{{ $t("pay-type") }}</td>
          <td>
            <span v-if="userAdvertiserLocalKind === 'SYS21B01B003'">{{ $t("purchase-detail-buyerType1") }}</span>
            <span v-if="userAdvertiserLocalKind === 'SYS21B01B004'">{{ $t("purchase-detail-buyerType2") }}</span>
            <span v-if="userAdvertiserLocalKind === 'SYS21B01B005'">{{ $t("purchase-detail-buyerType3") }}</span>
          </td>
        </tr>
        <tr>
          <td>{{ $t("pay-businessNum") }}</td>
          <td>{{ userAdvertiserCompanyCrNum }}</td>
        </tr>
      </table>
    </section>
    <section class="mt150">
      <h3>{{ $t("purchase-detail-terms") }}</h3>
      <table class="mt15" width="100%">
        <tr>
          <td class="space">
            <div class="terms-wrap d-flex">
              <div class="subject">{{ $t("modal-terms-title6") }}</div>
              <div>
                <button
                  class="mr18"
                  type="button"
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
                  {{ $t("purchase-detail-terms") }}
                </button>
              </div>
            </div>
            <div class="terms-wrap d-flex">
              <div class="subject">{{ $t("modal-terms-title8") }}</div>
              <div>
                <button
                  type="button"
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
                  {{ $t("purchase-detail-terms") }}
                </button>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import campaignModal from "@/components/modal/CampaignModify.vue";
import { getPopupOpt } from "@/utils/modal";
import showModal from "@/mixins/showModal";
import loading from "@/mixins/loading";
import localeString from "@/mixins/localeString";
import bus from "@/utils/bus";
import isEmpty from "@/utils/empty";
import { getHomepageUserNameCookie } from "@/utils/cookie";

export default {
  //뒤로가기
  beforeRouteLeave(to, from, next) {
    if (this.$route.query.status === "ing") {
      to.params.status = "ing";
      next(to.params);
    } else {
      next();
    }
  },
  mixins: [showModal, loading, localeString],
  props: ["apiBaseUrl"],
  data() {
    return {
      buySid: "",
      buyAdvertisingCampaignName: "",
      buyAdvertisingStatus: "",
      buyAdvertisingStatusName: "",
      advertisingProductName: "",
      buyAdvertisingProductSlotCount: "",
      buyAdvertisingProductStartDate: "",
      buyAdvertisingProductEndDate: "",
      buyAdvertisingProductDay: "",
      buyDateTime: "",
      buyAdvertisingDefaultPrice: "",
      buyAdvertisingBenefitDiscount: "",
      buyAdvertisingSlotDiscount: "",
      buyAdvertisingVat: "",
      buyAdvertisingPayment: "",
      buyAdvertisingDiscount: "",
      userAdvertiserCompanyName: "",
      userAdvertiserCompanyCrNum: "",
      buyPaymentKind: "",
      userAdvertiserLocalKind: "",
      buyAdvertisingProductCategoryName: "",
      buyAdvertisingProductStoreTypeName: "",
      buyAdvertisingProductGradeChoiceName: "",
      buyAdvertisingProductAreaChoiceName: "",
      buyAdvertisingStoreCount: "",
      buyAdvertisingProductGiftVal: "",
      buyAdvertisingBenefitDiscountRatio: "",
      buyAdvertisingSlotDiscountRatio: "",
      time: "",
      video: {},
      buyRefundDemandDate: "",
      buyRefundDate: "",
      buyRefundKindName: "",
      buyAdvertisingProductSid: "",
      buyAdvertisingProductSaleVal: "",
      userAdvertiserUserHp: "",
      userName: "",
      buyDepositBankAccount: "",
      buyDepositBank: "",
      buyStatus: "",
      advertisingProductImage: "",
    };
  },
  computed: {
    ...mapGetters("purchase", ["getPurchaseDetail", "getPurchaseAdvertisingInfo"]),
    refundPrice() {
      return this.buyAdvertisingPayment - this.buyRefundPrice;
    },
    BankInfo() {
      return this.buyDepositBank + " " + this.buyDepositBankAccount;
    },
  },
  async created() {
    this.userName = getHomepageUserNameCookie();
    //구매내역 상세
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("purchase/PURCHASE_DETAIL", this.$route.params.id);
      if (this.getPurchaseDetail.addtuneApiResult.errorCode == 200) {
        const detail = this.getPurchaseDetail.addtuneApiResult.paymentList;
        this.advertisingProductImage = detail.advertisingProductImage;
        this.buyAdvertisingProductSid = detail.buyAdvertisingProductSid;
        this.userAdvertiserLocalKind = detail.userAdvertiserLocalKind;
        this.buyPaymentKind = detail.buyPaymentKind;
        this.buySid = detail.buySid;
        this.buyAdvertisingCampaignName = detail.buyAdvertisingCampaignName;
        this.buyAdvertisingStatus = detail.buyAdvertisingStatus;
        this.buyAdvertisingStatusName = detail.buyAdvertisingStatusName;
        this.advertisingProductName = detail.advertisingProductName;
        this.buyAdvertisingProductSlotCount = detail.buyAdvertisingProductSlotCount;
        this.buyAdvertisingProductStartDate = this.$date(detail.buyAdvertisingProductStartDate).format("YYYY.MM.DD");
        this.buyAdvertisingProductEndDate = this.$date(detail.buyAdvertisingProductEndDate).format("YYYY.MM.DD");
        this.buyAdvertisingProductDay = detail.buyAdvertisingProductDay;
        this.buyDateTime = this.$date(detail.buyDateTime).utc().local().format("YYYY.MM.DD HH:mm");
        this.buyAdvertisingDefaultPrice = detail.buyAdvertisingDefaultPrice;
        this.buyAdvertisingBenefitDiscount = detail.buyAdvertisingBenefitDiscount;
        this.buyAdvertisingSlotDiscount = detail.buyAdvertisingSlotDiscount;
        this.buyAdvertisingVat = detail.buyAdvertisingVat;
        this.buyAdvertisingPayment = detail.buyAdvertisingPayment;
        this.buyAdvertisingDiscount = detail.buyAdvertisingDiscount;
        this.userAdvertiserCompanyName = detail.userAdvertiserCompanyName;
        this.userAdvertiserCompanyCrNum = isEmpty(detail.userAdvertiserCompanyCrNum);
        this.buyAdvertisingStoreCount = detail.buyAdvertisingStoreCount;
        this.buyAdvertisingProductGiftVal = detail.buyAdvertisingProductGiftVal;
        this.buyAdvertisingBenefitDiscountRatio = detail.buyAdvertisingBenefitDiscountRatio;
        this.buyAdvertisingSlotDiscountRatio = detail.buyAdvertisingSlotDiscountRatio;
        this.buyAdvertisingContentLength = detail.buyAdvertisingContentLength;
        this.buyAdvertisingProductSaleVal = detail.buyAdvertisingProductSaleVal;
        this.userAdvertiserUserHp = detail.userAdvertiserUserHp;
        this.buyDepositBankAccount = detail.buyDepositBankAccount;
        this.buyDepositBank = detail.buyDepositBank;
        this.buyStatus = detail.buyStatus;
        let minute = parseInt((detail.buyAdvertisingContentLength % 3600) / 60);
        const second = detail.buyAdvertisingContentLength % 60;
        if (minute === 0) {
          minute = "00";
        }
        this.time = minute + ":" + second;
        this.video = detail.video;
        this.buyRefundDemandDate = this.$date(detail.buyRefundDemandDate).utc().local().format("YYYY.MM.DD HH:mm");
        if (detail.buyRefundDate !== null) {
          this.buyRefundDate = this.$date(detail.buyRefundDate).utc().local().format("YYYY.MM.DD HH:mm");
        } else {
          detail.buyRefundDate = "";
        }

        this.buyRefundKindName = detail.buyRefundKindName;
        this.buyRefundPrice = detail.buyRefundPrice;
      } else {
        this.alim(this.getPurchaseDetail.addtuneApiResult.errorMessage, this.errorColor);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
    //구매내역 정보 상세
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("purchase/PURCHASE_ADVERTISING_INFO", this.$route.params.id);
      if (this.getPurchaseAdvertisingInfo.addtuneApiResult.errorCode == 200) {
        const info = this.getPurchaseAdvertisingInfo.addtuneApiResult.paymentListInfo;
        this.buyAdvertisingProductCategoryName = info.buyAdvertisingProductCategoryName[0].sysCodeName;
        //스토어 업종
        const productStoreType = [];
        info.buyAdvertisingProductStoreTypeName?.forEach(ele => {
          productStoreType.push(ele.sysCodeName);
        });
        this.buyAdvertisingProductStoreTypeName = productStoreType;
        //스토어 등급
        const productGrade = [];
        info.buyAdvertisingProductGradeChoiceName?.forEach(ele => {
          productGrade.push(ele.sysCodeName);
        });
        this.buyAdvertisingProductGradeChoiceName = productGrade;
        //스토어 지역
        const productArea = [];
        info.buyAdvertisingProductAreaChoiceName?.forEach(ele => {
          productArea.push(ele.sysCodeName);
        });
        this.buyAdvertisingProductAreaChoiceName = productArea;
      } else {
        this.alim(this.getPurchaseAdvertisingInfo.addtuneApiResult.errorMessage, this.errorColor);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    //캠페인수정 모달
    showPopup(data) {
      let name = data.name;
      let id = data.id;
      this.$modal.show(
        campaignModal,
        {
          update: this.update,
          name,
          id,
        },
        getPopupOpt("campaignModal", "615px", "auto", false),
      );
    },
    update(name) {
      this.buyAdvertisingCampaignName = name;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  @include NotoSans(3, 700, #333333);
}

h3 {
  @include NotoSans(2.5, 700, #333333);
}

.report-wrap {
  text-align: right;

  & a {
    @include NotoSans(1.5, 400, #828282);
    border: 1px solid #828282;
    border-radius: 5px;
    padding: 6px 13px;
  }
}

.order-num {
  text-align: right;
  position: absolute;
  right: 0;
  top: 10px;
  @include NotoSans(1.5, 500, #828282);

  & span {
    @include Montserrat(1.5, 500, #828282);
  }
}

table {
  border-top: 2px solid #ff4d56;

  & tr {
    & td {
      padding: 20px;
      border-bottom: 1px solid #dddddd;
      @include NotoSans(1.5, 400, #333333);

      & .pay-ready {
        color: #ff4d56;
      }

      & .pay-complete {
        color: #0047ff;
      }

      & .thumbnail {
        border-radius: 4px;
        width: 178px;
        height: 100px;
        overflow: hidden;
        position: relative;
        &.upload {
          border: 1px solid #828282;
        }
        & .cancel {
          background: #f2f2f2;
          width: 100%;
          height: 100%;
          & em {
            @include NotoSans(1.4, 400, #828282);
            font-style: normal;
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            width: 100%;
            padding-top: 27px;
          }
        }
        &.refund {
          cursor: default !important;
        }
        &.active {
          &:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: url("../../../assets/images/play.png") no-repeat;
            width: 20px;
            height: 22px;
            background-size: 100%;
          }
        }

        & .time {
          position: absolute;
          right: 6px;
          bottom: 6px;
          @include NotoSans(1.1, 500, #fff);
          background: rgba(0, 0, 0, 0.5);
          padding: 0 5px;
          height: 20px;
          line-height: 20px !important;
        }

        cursor: pointer;

        & img {
          width: 100%;
          height: 100px;
        }

        & .icon {
          text-align: center;

          & img {
            width: 24px;
            height: 24px;
          }
        }

        & .text {
          text-align: center;
          @include NotoSans(1.1, 400, #bdbdbd);
        }
      }

      &.company-name {
        @include NotoSans(1.9, 400, #828282);
      }

      & .header {
        @include NotoSans(2, 400, #828282);

        & p {
          margin-bottom: 0 !important;
        }

        & .before {
          @include NotoSans(2, 500, #4f4f4f);
        }

        & .current {
          @include NotoSans(2, 500, #ff0000);
        }

        & .after {
          @include NotoSans(2, 500, #0047ff);
        }

        & .cancel {
          @include NotoSans(2, 500, #bdbdbd);
        }

        & .name {
          @include NotoSans(2.5, 500, #4f4f4f);
        }

        & .btn {
          @include NotoSans(1.3, 500, #ff4d56);
          height: 35px;
          background: rgba(255, 77, 86, 0.08);
          padding: 0 12px;
          border-radius: 10px;
          border: 0;
        }
      }

      &:nth-child(3) {
        border-left: 1px solid #dddddd;
        font-weight: 700 !important;
      }

      &:nth-child(1) {
        font-weight: 700 !important;
      }

      & .price-wrap {
        display: flex;
        justify-content: space-around;

        & p {
          margin-bottom: 0 !important;
          @include Montserrat(1.5, 400, #333333);

          &.subject {
            @include NotoSans(1.5, 400, #4f4f4f);
            position: relative;
          }

          & span {
            @include Montserrat(2.5, 600, #333333);
          }

          & .discount {
            @include Montserrat(1.5, 600, #fff);
            background: #7000ff;
            border-radius: 5px;
            padding: 0 10px;
            position: absolute;
            top: -30px;
            left: 50%;
            transform: translateX(-50%);

            &:after {
              content: "";
              position: absolute;
              left: 50%;
              bottom: -8px;
              transform: translateX(-50%);
              background: url("../../../assets/images/tryangle_black.png") no-repeat;
              width: 17px;
              height: 11px;
            }
          }

          & .total-price {
            color: #ff4d56 !important;
          }

          & .total-unit {
            @include NotoSans(2, 700, #ff4d56);
          }

          & .discount-total {
            @include Montserrat(1.5, 600, #333333);
            margin-right: 15px;
          }
        }
      }

      & button {
        @include NotoSans(1.8, 500, #4f4f4f);
        border: 1px solid #bdbdbd;
        border-radius: 8px;
        padding: 0 35px;
        height: 58px;
      }
    }

    &:last-child {
      & td {
        border-bottom: 1px solid #828282;
      }
    }
  }
}

.refund-detail {
  @include NotoSans(1.3, 500, #ff4d56);
  height: 35px;
  padding: 0 12px;
  border-radius: 10px;
  border: 0;
  background: rgba(255, 77, 86, 0.08);
  margin-left: 20px;
}

.btn-store-list {
  @include NotoSans(1.3, 700, #4f4f4f);
  text-decoration: underline;
  height: auto !important;
  padding: 0 !important;
  border: 0;
}
.bold {
  @include NotoSans(1.5, 500, #333333);
}
.space {
  padding: 40px 10px;
  & .terms-wrap {
    margin: 10px 0;
    & .subject {
      @include NotoSans(1.4, 500, #4f4f4f);
      margin-right: 216px;
    }
    & button {
      border: 0;
      padding: 0;
      height: auto;
      @include NotoSans(1.4, 400, #4f4f4f);
      text-decoration: underline;
    }
  }
}
.relative {
  position: relative;
}
</style>
