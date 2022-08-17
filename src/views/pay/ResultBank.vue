<template>
  <div>
    <section class="sub-wrapper">
      <h1>{{ $t("pay-complete-h1") }}</h1>
      <div class="comment">{{ $t("pay-complete-comment") }}</div>
      <h2 class="mt105">{{ $t("pay-complete-h2") }}</h2>
      <table class="advertiser-tbl mt40" width="100%">
        <colgroup>
          <col width="150" />
          <col width="50%" />
          <col width="150" />
          <col width="50%" />
        </colgroup>
        <tr>
          <th>{{ $t("pay-complete-send") }}</th>
          <td colspan="3" class="price">{{ __localeString(price) }}{{ $t("common-unit-price") }}</td>
        </tr>
        <tr>
          <th>{{ $t("pay-complete-bank") }}</th>
          <td>{{ bank[0] }} {{ bank[1] }} <span></span></td>
          <th class="add-line">{{ $t("pay-complete-name") }}</th>
          <td>{{ bank[2] }}</td>
        </tr>
        <tr v-if="name !== undefined">
          <th>{{ $t("pay-complete-sendRange") }}</th>
          <td>
            <b>{{ endDay.substr(0, 4) }}{{ $t("common-unit-year") }} {{ endDay.substr(5, 2) }}{{ $t("common-unit-month") }} {{ endDay.substr(8, 2) }}{{ $t("common-unit-day") }} 23:59</b>
            까지
          </td>
          <th class="add-line">{{ $t("pay-complete-campaignName") }}</th>
          <td>
            {{ name }} <span @click="showPopup({ name: name, id: id })" class="btn">{{ $t("pay-complete-campaignChange") }}</span>
          </td>
        </tr>
        <tr v-else>
          <th>{{ $t("pay-complete-sendRange") }}</th>
          <td colspan="3">
            <b>{{ endDay.substr(0, 4) }}{{ $t("common-unit-year") }} {{ endDay.substr(5, 2) }}{{ $t("common-unit-month") }} {{ endDay.substr(8, 2) }}{{ $t("common-unit-day") }} 23:59</b>
            {{ $t("common-unit-range") }}
          </td>
        </tr>
      </table>
      <div class="btn-group mt100 mb150">
        <button type="button" @click="check">{{ $t("button-check") }}</button>
      </div>
    </section>
  </div>
</template>

<script>
import { deleteCookie } from "@/utils/cookie";
import campaignModal from "@/components/modal/CampaignModify.vue";
import { getPopupOpt } from "@/utils/modal";
import { getAcountTransferCookie } from "@/utils/cookie";
import localeString from "@/mixins/localeString";
export default {
  mixins: [localeString],
  data() {
    return {
      price: "",
      name: "",
      endDay: "",
      bank: "",
      id: "",
    };
  },
  async created() {
    deleteCookie("payInfo");
    const data = getAcountTransferCookie();
    this.price = data.payment;
    this.name = data.name;
    this.endDay = data.endDay;
    this.bank = data.bank.split(" ");
    this.id = data.id;
  },
  methods: {
    //캠페인수정 모달
    showPopup(data) {
      let name = data.name;
      let id = data.id;
      this.$modal.show(campaignModal, { update: this.update, name, id }, getPopupOpt("campaignModal", "615px", "auto", false));
    },
    update(name) {
      this.name = name;
    },
    check() {
      deleteCookie("acountTransfer");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  border: 1px solid #dddddd;
  @include NotoSans(1.3, 400, #7b7b7b);
  padding: 2px 10px;
  border-radius: 3px;
  margin-left: 10px;
  cursor: pointer;
}
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
      &.price {
        @include NotoSans(1.8, 700, #ff4d56);
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
