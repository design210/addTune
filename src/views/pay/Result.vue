<template>
  <div>
    <section class="sub-wrapper">
      <h1>{{ $t("pay-complete2-h1") }}</h1>
      <div class="comment">{{ $t("pay-complete2-comment") }}</div>
      <h2 class="mt105">{{ $t("pay-complete2-info") }}</h2>
      <table class="advertiser-tbl mt40" width="100%">
        <colgroup>
          <col width="150" />
          <col width="33.33333%" />
          <col width="150" />
          <col width="33.33333%" />
          <col width="150" />
          <col width="33.33333%" />
        </colgroup>
        <tr>
          <th>{{ $t("pay-complete2-num") }}</th>
          <td>{{ order_id }}</td>
          <th class="add-line">{{ $t("pay-complete2-day") }}</th>
          <td>{{ p_at }}</td>
          <th class="add-line">{{ $t("pay-complete2-type") }}</th>
          <td v-if="method === 'card'">{{ $t("common-payType-card") }}</td>
          <td v-if="method === 'phone'">{{ $t("common-payType-hp") }}</td>
          <td v-if="method === 'vbank'">{{ $t("common-payType-cyberBank") }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-complete2-final") }}</th>
          <td class="right" colspan="5">
            <span class="price line mr10"
              ><span>{{ __localeString(origin) }}</span> {{ $t("common-unit-price") }}</span
            >
            <span class="price mr10"
              >{{ $t("pay-complete2-discount") }} <span>{{ buyAdvertisingDiscount }}%</span></span
            >
            <span class="final"
              ><span>{{ __localeString(price) }}</span> {{ $t("common-unit-price") }}</span
            >
          </td>
        </tr>
      </table>
      <h2 class="mt100">{{ $t("pay-complete2-product") }}</h2>
      <table class="advertiser-tbl mt40" width="100%">
        <tr>
          <td class="pt20 pb20">
            <div class="d-flex">
              <div class="img-wrap">
                <img :src="imgUrl" alt="" v-if="imgUrl !== null" />
                <img src="@/assets/images/product_sample.png" v-else alt="" />
              </div>
              <div class="ml30">
                <div class="mt10 d-flex align-center">
                  <span class="campaign mr20">{{ campaignName }}</span>
                  <span class="campaign-modify" @click="showPopup({ name: campaignName, id: order_id })">{{ $t("pay-complete-campaignChange") }}</span>
                </div>
                <h3 class="mt20">{{ name }}</h3>
                <div class="infos mt15">
                  <span class="subject">{{ $t("pay-complete2-range") }}</span>
                  <span class="data"
                    >{{ range }}{{ $t("common-unit-day") }} ({{ startDay.substr(0, 4) }}. {{ startDay.substr(5, 2) }}. {{ startDay.substr(8, 2) }} ~ {{ endDay.substr(0, 4) }}.
                    {{ endDay.substr(5, 2) }}. {{ endDay.substr(8, 2) }})</span
                  >
                </div>
                <div class="infos mt5">
                  <span class="subject">{{ $t("buyAd-slot-h1") }}</span>
                  <span class="data"
                    >{{ slot }}{{ $t("common-unit-amount") }} <span v-if="slotGift > 0">(+{{ slotGift }} {{ $t("pay-adProdInfo-give") }})</span></span
                  >
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <div class="sub-comment mt150">{{ $t("pay-complete2-upload") }}</div>
      <div class="btn-group mb150">
        <button type="button" @click="$router.push('/mypage/purchase/ad')">{{ $t("button-buyDetail") }}</button>
        <button type="button" @click="$router.push('/mypage/adContents/adContentsList')">{{ $t("button-contentUpload") }}</button>
      </div>
    </section>
    <section class="movie-wrap">
      <h2 v-html="$t('pay-movie-h1')"></h2>
      <h3 class="mt30">{{ $t("pay-movie-h2") }}</h3>
      <ad-main-bottom-slide :bottomBanner="bottomBanner" class="mt90"></ad-main-bottom-slide>
      <div class="ad-set-btn mt200">
        <button>{{ $t("button-checkAroundBtn") }}</button>
      </div>
    </section>
  </div>
</template>

<script>
import AdMainBottomSlide from "@/components/ad/AdMainBottomSlide.vue";
import { mapGetters } from "vuex";
import { deleteCookie } from "@/utils/cookie";
import betweenDay from "@/utils/betweenDay.js";
import campaignModal from "@/components/modal/CampaignModify.vue";
import { getPopupOpt } from "@/utils/modal";
import localeString from "@/mixins/localeString";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";

export default {
  components: {
    AdMainBottomSlide,
  },
  mixins: [localeString, loading],
  data() {
    return {
      order_id: "",
      name: "",
      price: "",
      method: "",
      p_at: "",
      discount: "",
      origin: "",
      startDay: "",
      endDay: "",
      range: "",
      slot: "",
      slotGift: "",
      imgUrl: "",
      campaignName: "",
      bottomBanner: [],
      buyAdvertisingDiscount: "",
    };
  },
  computed: {
    ...mapGetters("pay", ["getPayVeri"]),
    ...mapGetters("admain", ["getAdListAndBanner"]),
    ...mapGetters("common", ["getHomeData"]),
  },
  async created() {
    deleteCookie("payInfo");
    await this.reload();
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("common/GET_HOME_DATA");
      if (this.getHomeData.addtuneApiResult.errorCode == 200) {
        const bottomBanner = [];
        const bbanner = this.getHomeData.addtuneApiResult.home.bottomBanner.file_master;
        bbanner.forEach(ele => {
          bottomBanner.push(`${ele.fileServer}/${ele.fileStoragePath}/${ele.fileStorageFileName}`);
        });
        this.bottomBanner = bottomBanner;
      } else {
        alert(this.getHomeData.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("pay/PAY_VERI", this.$route.params.id);
        if (this.getPayVeri.addtuneApiResult.errorCode == 200) {
          const payment = this.getPayVeri.addtuneApiResult.payment.data;
          this.order_id = payment.order_id;
          this.name = payment.name;
          this.price = payment.price;
          this.method = payment.method;
          const paymentData = this.getPayVeri.addtuneApiResult.payment.data.payment_data;
          this.p_at = paymentData.p_at;
          this.campaignName = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.buyInfo.buyAdvertisingCampaignName;
          this.discount =
            this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.buyInfo.buyAdvertisingSlotDiscountRatio +
            this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.buyInfo.buyAdvertisingBenefitDiscountRatio;
          this.origin = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.buyInfo.buyAdvertisingPayment;
          this.startDay = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.buyInfo.buyAdvertisingProductStartDate;
          this.endDay = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.buyInfo.buyAdvertisingProductEndDate;
          let startDay = this.startDay.replace(/\-/g, "");
          let endDay = this.endDay.replace(/\-/g, "");
          this.range = betweenDay(startDay, endDay); //날짜 차이 계산
          this.slot = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.buyInfo.buyAdvertisingProductSlotCount;
          this.slotGift = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.buyInfo.buyAdvertisingProductGiftVal;
          if (this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.AdvertisingProductInfo.imageFileInfo !== null) {
            const fileServer = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.AdvertisingProductInfo.imageFileInfo.fileServer;
            const fileStoragePath = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.AdvertisingProductInfo.imageFileInfo.fileStoragePath;
            const fileStorageFileName = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.AdvertisingProductInfo.imageFileInfo.fileStorageFileName;
            this.imgUrl = `${fileServer}/${fileStoragePath}/${fileStorageFileName}`;
          } else {
            this.imgUrl = null;
          }

          this.buyAdvertisingDiscount = this.getPayVeri.addtuneApiResult.payment.data.paymentInfo.buyInfo.buyAdvertisingDiscount;
        } else {
          alert(this.getPayVeri.addtuneApiResult.errorMessage);
          await this.$router.push("/ad/adMain/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
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
    update() {
      this.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-top: 150px;
  @include NotoSans(4.5, 700, #333333);
  text-align: center;
}

.comment {
  margin-top: 25px;
  @include NotoSans(2, 400, #7b7b7b);
  text-align: center;
}

h2 {
  @include NotoSans(2.5, 700, #333333);
}

.sub-comment {
  @include NotoSans(1.6, 400, #828282);
  text-align: center;
}

.btn-group {
  margin-top: 25px;
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

.movie-wrap {
  background: #f5f5f5;
  padding: 150px 0;

  & h2 {
    @include NotoSans(4.5, 700, #000);
    margin-top: 0;
  }

  & h3 {
    text-align: center;
    @include NotoSans(2, 400, #828282);
  }

  & .ad-set-btn {
    text-align: center;
    margin-top: 25px;

    & button {
      background: #ff4d56;
      height: 70px;
      line-height: 70px;
      padding: 0 40px;
      @include NotoSans(2.7, 700, #fff);
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

      &.right {
        text-align: right;

        & .price {
          @include NotoSans(1.2, 700, #333333);

          & span {
            @include Montserrat(1.2, 600, #333333);
          }

          &.line {
            & span {
              text-decoration: line-through;
            }
          }
        }

        & .final {
          @include NotoSans(2, 700, #ff4d56);

          & span {
            @include Montserrat(2, 600, #ff4d56);
          }
        }
      }

      & .campaign {
        @include NotoSans(2, 400, #4f4f4f);
      }

      & .campaign-modify {
        @include NotoSans(1.4, 400, #828282);
        text-decoration: underline;
        cursor: pointer;
        border-radius: 2px;
      }

      & h3 {
        @include NotoSans(2.5, 700, #333333);
      }

      & .infos {
        & .subject {
          @include NotoSans(1.5, 700, #333333);
          width: 130px;
        }

        & .data {
          @include NotoSans(1.5, 400, #333333);
        }
      }

      & .img-wrap {
        & img {
          width: 220px;
        }
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
</style>
