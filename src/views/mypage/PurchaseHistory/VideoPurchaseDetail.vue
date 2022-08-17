<template>
  <div class="sub-wrapper mt100 mb100">
    <section>
      <h2>{{ $t("purchase-detail-title") }}</h2>
      <h3 v-if="buyAdvertisingProductVideoStatus !== 'SYS21C23B005'" class="mt100">{{ $t("purchase-detail-prodInfo") }}</h3>
      <h3 v-else class="mt100">{{ $t("purchase-detail-cancel") }}</h3>
      <table class="mt15" width="100%">
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td colspan="4">
            <div class="d-flex align-center">
              <div v-if="buyStatus === 'SYS21B19B006'">
                <div class="thumbnail mr38">
                  <span class="cancel"><em v-html="$t('purchase-list-cancelComp')"></em></span>
                </div>
              </div>
              <div v-else>
                <div
                  v-if="video !== null"
                  class="thumbnail active mr38"
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
                <div
                  v-else
                  class="thumbnail active mr38"
                  @click="
                    __showModalTemplate(
                      require('@/components/modal/Video'),
                      {
                        videoSid: product_video.videoSid,
                        videoTransSid: product_video.video_trans[0].videoTransSid,
                      },
                      1200,
                    )
                  "
                >
                  <div>
                    <img v-if="Object.keys(product_video).length > 0" :src="`${apiBaseUrl}/video/view/${product_video.videoSid}?videoTransSid=${product_video.video_trans[1].videoTransSid}`" alt="" />
                    <div class="time">{{ time }}</div>
                  </div>
                </div>
              </div>
              <div class="header">
                <p>
                  <span
                    :class="{
                      before: buyAdvertisingProductVideoStatus === 'SYS21C23B002',
                      current: buyAdvertisingProductVideoStatus === 'SYS21C23B003',
                      after: buyAdvertisingProductVideoStatus === 'SYS21C23B004',
                      cancel: buyAdvertisingProductVideoStatus === 'SYS21C23B005',
                    }"
                    >{{ buyAdvertisingProductVideoStatusName }}</span
                  >
                </p>
                <p class="d-flex align-center">
                  <span class="name mr18" @click="linkProduct(advertisingProductSid)">{{ advertisingProductName }}</span>
                </p>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("purchaseVideo-length") }}</td>
          <td>{{ advertisingProductVideoVideoLengthName }}</td>
          <td>{{ $t("purchaseVideo-range") }}</td>
          <td>{{ buyAdvertisingProductVideoDate }} {{ $t("common-unit-range") }}</td>
        </tr>
        <tr>
          <td>{{ $t("purchaseVideo-url") }}</td>
          <td colspan="3">
            <ul>
              <li v-for="item in buyAdvertisingProductVideoSampleUrl" :key="item">
                <a :href="item" target="_blank">{{ item }}</a>
              </li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>{{ $t("purchaseVideo-style") }}</td>
          <td colspan="3">{{ buyAdvertisingProductVideoEtc }}</td>
        </tr>
      </table>
    </section>
    <section class="mt150">
      <h3 v-if="buyAdvertisingProductVideoStatus !== 'SYS21C23B005'">{{ $t("purchase-detail-payInfo") }}</h3>
      <h3 v-else>{{ $t("purchase-detail-cancelInfo") }}</h3>
      <div class="order-num">
        {{ $t("pay-complete2-num") }} <span>{{ buySid }}</span>
      </div>
      <table v-if="buyAdvertisingProductVideoStatus !== 'SYS21C23B005'" class="mt15" width="100%">
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td>{{ $t("purchaseVideo-payDay") }}</td>
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
            <span class="ml20">{{ buyDepositBankAccount }}</span>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="price-wrap mt20 mb20 pl150 pr150">
              <div>
                <p class="subject">{{ $t("pay-price-basic") }}</p>
                <p>
                  <span>{{ __localeString(buyAdvertisingProductVideoCostPrice) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div v-if="buyAdvertisingProductVideoPriceRate > 0"><img alt="" src="@/assets/images/minus.png" /></div>
              <div v-if="buyAdvertisingProductVideoPriceRate > 0">
                <p class="subject">
                  {{ $t("pay-price-discount") }}<span class="discount">{{ buyAdvertisingProductVideoPriceRate }}%</span>
                </p>
                <p>
                  <span>{{ __localeString(buyAdvertisingProductVideoDiscountPrice) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div><img alt="" src="@/assets/images/plus.png" /></div>
              <div>
                <p class="subject">{{ $t("pay-price-vat") }}</p>
                <p>
                  <span>{{ __localeString(buyAdvertisingProductVideoVat) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div><img alt="" src="@/assets/images/eqal.png" /></div>
              <div>
                <p class="subject">{{ $t("pay-price-final") }}</p>
                <p>
                  <span class="total-price">{{ __localeString(buyAdvertisingProductVideoPayment) }}</span>
                  <span class="total-unit">{{ $t("common-unit-price") }}</span>
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <!-- 취소 환불 정보 -->
      <table v-else class="mt15" width="100%">
        <colgroup>
          <col width="130" />
          <col width="*" />
          <col width="130" />
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
            {{ __localeString(buyAdvertisingProductVideoPayment) }} {{ $t("common-unit-price") }}
            <button
              class="refund-detail"
              type="button"
              @click="
                __showModalTemplate(
                  require('@/components/modal/refund/RefundVideo'),
                  {
                    data: {
                      buySid,
                      buyDateTime,
                      buyPaymentKind,
                      buyAdvertisingProductVideoDefaultPrice,
                      buyAdvertisingProductVideoVat,
                      buyAdvertisingProductVideoPayment,
                      buyAdvertisingProductVideoCostPrice,
                      buyAdvertisingProductVideoPriceRate,
                      buyAdvertisingProductVideoDiscountPrice,
                    },
                  },
                  900,
                )
              "
            >
              {{ $t("button-detailView") }}
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="price-wrap mt20 mb20 pl150 pr150">
              <div>
                <p class="subject">{{ $t("purchase-detail-price") }}</p>
                <p>
                  <span>{{ __localeString(buyAdvertisingProductVideoPayment) }}</span> {{ $t("common-unit-price") }}
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
                  <span class="total-price">{{ __localeString(buyRefundPrice) }}</span> <span class="total-unit">{{ $t("common-unit-price") }}</span>
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </section>
    <section class="mt150">
      <h3>{{ $t("purchase-detail-buyerInfo") }}</h3>
      <table class="mt15" width="100%">
        <colgroup>
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td>{{ $t("pay-name") }}</td>
          <td>{{ homepageUserName }}</td>
        </tr>
        <tr>
          <td>{{ $t("videoDetail-buy-contact") }}</td>
          <td>{{ buyAdvertisingProductVideoHp }}</td>
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
            <div class="terms-wrap d-flex">
              <div class="subject">{{ $t("modal-terms-title8") }}</div>
              <div>
                <button
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
          </td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
import localeString from "@/mixins/localeString";
import { mapGetters } from "vuex";
import showModal from "@/mixins/showModal";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";

export default {
  mixins: [showModal, loading, localeString],
  props: ["apiBaseUrl"],
  data() {
    return {
      buySid: "",
      buyAdvertisingProductVideoStatusName: "",
      buyAdvertisingProductVideoStatus: "",
      advertisingProductName: "",
      advertisingProductVideoVideoLengthName: "",
      buyAdvertisingProductVideoDate: "",
      buyAdvertisingProductVideoSampleUrl: [],
      buyAdvertisingProductVideoEtc: "",
      buyDateTime: "",
      buyPaymentKind: "",
      buyAdvertisingProductVideoDefaultPrice: "",
      buyAdvertisingProductVideoCostPrice: "",
      buyAdvertisingProductVideoDiscountPrice: "",
      buyAdvertisingProductVideoPriceRate: "",
      buyAdvertisingProductVideoVat: "",
      buyAdvertisingProductVideoPayment: "",
      homepageUserName: "",
      buyAdvertisingProductVideoHp: "",
      video: "",
      product_video: "",
      time: "",
      buyRefundKindName: "",
      buyRefundPrice: "",
      buyRefundDemandDate: "",
      buyRefundDate: "",
      buyDepositBankAccount: "",
      buyStatus: "",
      advertisingProductSid: "",
    };
  },
  computed: {
    ...mapGetters("purchase", ["getVideoPurchaseDetail", "getPurchaseAdvertisingInfo"]),
    refundPrice() {
      return this.buyAdvertisingProductVideoPayment - this.buyRefundPrice;
    },
  },
  async created() {
    //구매내역 상세
    try {
      bus.$emit("start:spinner");
      const timezone = this.$date.tz.guess();
      await this.$store.dispatch("purchase/VIDEO_PURCHASE_DETAIL", this.$route.params.id);
      if (this.getVideoPurchaseDetail.addtuneApiResult.errorCode == 200) {
        const detail = this.getVideoPurchaseDetail.addtuneApiResult.paymentList;
        this.buySid = detail.buySid;
        this.buyAdvertisingProductVideoStatusName = detail.buyAdvertisingProductVideoStatusName;
        this.buyAdvertisingProductVideoStatus = detail.buyAdvertisingProductVideoStatus;
        this.advertisingProductName = detail.advertisingProductName;
        this.advertisingProductVideoVideoLengthName = detail.advertising_product.advertising_product_video_trans.advertisingProductVideoVideoLengthName;
        this.buyAdvertisingProductVideoDate = detail.buyAdvertisingProductVideoDate;
        if (detail.buyAdvertisingProductVideoSampleUrl.indexOf(",") > -1) {
          this.buyAdvertisingProductVideoSampleUrl = detail.buyAdvertisingProductVideoSampleUrl.split(",");
        } else {
          this.buyAdvertisingProductVideoSampleUrl = [detail.buyAdvertisingProductVideoSampleUrl];
        }
        this.buyAdvertisingProductVideoEtc = detail.buyAdvertisingProductVideoEtc;
        this.buyDateTime = this.$date(detail.buyDateTime).utc().local().format("YYYY.MM.DD HH:mm");
        this.buyPaymentKind = detail.buyPaymentKind;
        this.buyAdvertisingProductVideoDefaultPrice = detail.buyAdvertisingProductVideoDefaultPrice;
        this.buyAdvertisingProductVideoCostPrice = detail.buyAdvertisingProductVideoCostPrice;
        this.buyAdvertisingProductVideoDiscountPrice = detail.buyAdvertisingProductVideoDiscountPrice;
        this.buyAdvertisingProductVideoPriceRate = detail.buyAdvertisingProductVideoPriceRate;
        this.buyAdvertisingProductVideoVat = detail.buyAdvertisingProductVideoVat;
        this.buyAdvertisingProductVideoPayment = detail.buyAdvertisingProductVideoPayment;
        this.buyAdvertisingProductVideoHp = detail.buyAdvertisingProductVideoHp;
        this.homepageUserName = detail.hompageUserMaster.homepageUserName;
        this.video = detail.video;
        this.buyRefundKindName = detail.buyRefundKindName;
        this.buyRefundPrice = detail.buyRefundPrice;
        this.buyRefundDemandDate = this.$date(detail.buyRefundDemandDate).utc().local().format("YYYY.MM.DD HH:mm");
        this.buyRefundDate = this.$date(detail.buyRefundDate).utc().local().format("YYYY.MM.DD HH:mm");
        this.product_video = detail.advertising_product.advertising_product_video_trans.video;
        this.buyStatus = detail.buyStatus;
        this.buyDepositBankAccount = detail.buyDepositBankAccount;
        this.advertisingProductSid = detail.advertisingProductSid;
        let minute = parseInt((detail.buyAdvertisingProductVideoLengthName % 3600) / 60);
        const second = detail.buyAdvertisingProductVideoLengthName % 60;
        if (minute === 0) {
          minute = "00";
        }
        this.time = minute + ":" + second;
      } else {
        this.alim(this.getVideoPurchaseDetail.addtuneApiResult.errorMessage, this.errorColor);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    linkProduct(id) {
      this.$router.push(`/ad/productList/productDetail/${id}`);
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

  & button {
    @include NotoSans(1.5, 400, #828282);
    border: 1px solid #828282;
    border-radius: 5px;
    padding: 6px 13px;
  }
}

.order-num {
  text-align: right;
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

      & a {
        @include NotoSans(1.5, 400, #333333);
        position: relative;
        padding-left: 10px;
        text-decoration: underline;

        &:after {
          content: "";
          position: absolute;
          left: 0;
          top: 9px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #333333;
        }
      }

      & .thumbnail {
        border: 1px solid #828282;
        border-radius: 4px;
        width: 178px;
        height: 100px;
        overflow: hidden;
        position: relative;
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
        @include NotoSans(1.9, 400, #828282);

        & p {
          margin-bottom: 0 !important;
        }

        & .before {
          @include NotoSans(2, 700, #828282);
        }

        & .current {
          @include NotoSans(2, 700, #ff0000);
        }

        & .after {
          @include NotoSans(2, 700, #0047ff);
        }

        & .cancel {
          @include NotoSans(2, 700, #bdbdbd);
        }

        & .name {
          margin-top: 5px;
          @include NotoSans(2.5, 500, #4f4f4f);
          cursor: pointer;
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
  @include NotoSans(1.3, 500, #828282);
  text-decoration: underline;
  padding: 0;
  border: 0;
  margin-left: 20px;
  height: auto !important;
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
</style>
