<template>
  <div>
    <section class="sub-wrapper pb100">
      <h1>{{ $t("pay-complete2-h1") }}</h1>
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
          <td v-if="method === 'vbank'">{{ $t("common-payType-transfer") }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-complete2-final") }}</th>
          <td class="right" colspan="5">{{ price.toLocaleString() }}{{ $t("common-unit-price") }}</td>
        </tr>
      </table>
    </section>
    <div class="sub-comment mt150">{{ $t("videoDetail-buy-alim") }}</div>
    <div class="btn-group mb150">
      <button type="button" @click="$router.push('/mypage/purchase/ad')">{{ $t("button-buyHistory") }}</button>
      <button type="button" @click="$router.push('/')">{{ $t("button-home") }}</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";

export default {
  mixins: [loading],
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
    };
  },
  computed: {
    ...mapGetters("pay", ["getPayVeri"]),
    ...mapGetters("admain", ["getAdListAndBanner"]),
  },
  async created() {
    this.reload();
  },
  methods: {
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("pay/PAY_VERI", this.$route.params.id);
        if (this.getPayVeri.addtuneApiResult.errorCode == 200) {
          const payment = this.getPayVeri.addtuneApiResult.payment.data;
          this.order_id = payment.order_id;
          this.price = payment.price;
          this.method = payment.method;
          const paymentData = this.getPayVeri.addtuneApiResult.payment.data.payment_data;
          this.p_at = paymentData.p_at;
        } else {
          alert(this.getPayVeri.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
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

  & h1 {
    @include NotoSans(4.5, 700, #000);
    margin-top: 0;
  }

  & h2 {
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
          width: 150px;
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
