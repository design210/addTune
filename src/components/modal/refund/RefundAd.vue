<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>{{ $t("purchase-detail-price") }}</h2>
    </template>
    <template slot="body">
      <table width="100%" class="mt15">
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td colspan="4">
            <div class="price-wrap mt20 mb20">
              <div>
                <p class="subject">{{ $t("pay-price-basic") }}</p>
                <p>
                  <span>{{ __localeString(data.buyAdvertisingDefaultPrice) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div><img src="@/assets/images/minus.png" alt="" /></div>
              <div>
                <p class="subject">
                  {{ $t("pay-price-discount") }}<span class="discount" v-if="data.buyAdvertisingProductSaleVal > 0">{{ data.buyAdvertisingDiscount }}%</span>
                </p>
                <p>
                  <span>{{ __localeString(data.buyAdvertisingProductSaleVal) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div><img src="@/assets/images/plus.png" alt="" /></div>
              <div>
                <p class="subject">{{ $t("pay-price-vat") }}</p>
                <p>
                  <span>{{ __localeString(data.buyAdvertisingVat) }}</span> {{ $t("common-unit-price") }}
                </p>
              </div>
              <div><img src="@/assets/images/eqal.png" alt="" /></div>
              <div>
                <p class="subject">{{ $t("pay-price-final") }}</p>
                <p>
                  <span class="total-price">{{ __localeString(data.buyAdvertisingPayment) }}</span>
                  <span class="total-unit">{{ $t("common-unit-price") }}</span>
                </p>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </template>
    <template slot="footer"> </template>
  </modalWrap>
</template>

<script>
import localeString from "@/mixins/localeString";
import modalWrap from "@/components/modal/ModalTemplate";
export default {
  components: {
    modalWrap,
  },
  mixins: [localeString],
  props: ["data"],
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
table {
  border-top: 2px solid #ff4d56;
  & tr {
    & td {
      padding: 20px;
      border-bottom: 1px solid #dddddd;
      @include NotoSans(1.5, 400, #333333);
      & .thumbnail {
        border: 1px solid #828282;
        border-radius: 4px;
        width: 178px;
        height: 100px;
        overflow: hidden;
        position: relative;
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
          @include NotoSans(1.9, 500, #828282);
        }
        & .current {
          @include NotoSans(1.9, 500, #ff0000);
        }
        & .after {
          @include NotoSans(1.9, 500, #0047ff);
        }
        & .cancel {
          @include NotoSans(1.9, 500, #bdbdbd);
        }
        & .name {
          @include NotoSans(2.6, 500, #4f4f4f);
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
.order-num {
  text-align: right;
}
</style>
