<template>
  <div class="sub-wrapper pt100 pb100">
    <h1>{{ $t("pay-h1") }}</h1>
    <h2 class="mt97">{{ $t("pay-buyerInfo") }}</h2>
    <div class="btn-wrap">
      <button type="button" @click="telModify">{{ $t("button-modify") }}</button>
    </div>
    <table class="mt15">
      <colgroup>
        <col width="150" />
        <col width="*" />
      </colgroup>
      <tr>
        <td>{{ $t("mypage-myinfo-name") }}</td>
        <td>{{ data.homepageUserName }}</td>
      </tr>
      <tr>
        <td>{{ $t("mypage-myinfo-email") }}</td>
        <td>{{ data.homepageUserEmail }}</td>
      </tr>
      <tr>
        <td>{{ $t("videoDetail-buy-contact") }}</td>
        <td>{{ buyAdvertisingProductVideoHp }}</td>
      </tr>
    </table>
    <h2 class="mt150">{{ $t("pay-buyProdInfo") }}</h2>
    <table class="mt44">
      <tr>
        <td>
          <div class="d-flex">
            <div class="thumbnail">
              <img :src="`${apiBaseUrl}/video/view/${data.sid}?videoTransSid=${data.videoTransSid}`" alt="" />
            </div>
            <div class="info-wrap">
              <div class="name">{{ data.advertisingProductName }}</div>
              <div class="mt5">
                <span class="subject">{{ $t("purchaseVideo-length") }}</span>
                <span class="content">{{ data.buyAdvertisingProductVideoLengthName }}</span>
              </div>
              <div class="mt5">
                <span class="subject">{{ $t("purchaseVideo-range") }}</span> <span class="content">{{ data.buyAdvertisingProductVideoDate }}</span>
              </div>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- 결제 수단 -->
    <section class="pay-type-wrap">
      <h2 class="mt150">{{ $t("pay-payType-h1") }}</h2>
      <table class="advertiser-tbl mt44" width="100%">
        <colgroup>
          <col width="55%" />
          <col width="45%" />
        </colgroup>
        <tr>
          <td class="pl80">
            <div class="mt15 title-pay-type">{{ $t("pay-payType-card") }}</div>
            <div class="radio-group pay-type mb15 mt18">
              <v-radio-group v-model="buyPaymentKind">
                <span v-for="(item, index) in data.payTypeOptions" :key="index">
                  <!--									<v-radio :label="item.label" :value="item.val" v-if="index < 3"></v-radio>-->
                  <v-radio :label="item.label" :value="item.val" v-if="index === 0"></v-radio>
                </span>
              </v-radio-group>
            </div>
          </td>
          <td>
            <div class="mt15 title-pay-type">{{ $t("pay-payType-bank") }}</div>
            <div class="radio-group pay-type single mb15 mt18">
              <v-radio-group v-model="buyPaymentKind">
                <span v-for="(item, index) in data.payTypeOptions" :key="index"><v-radio :label="item.label" :value="item.val" v-if="index === 3"></v-radio></span>
              </v-radio-group>
            </div>
          </td>
        </tr>
      </table>
    </section>
    <!-- //결제 수단 -->
    <!-- 최종 결제 금액 -->
    <h2 class="mt150">{{ $t("pay-price-h1") }}</h2>
    <table class="mt44">
      <tr>
        <td class="pt40 pb30">
          <div class="price-wrap mt20 mb20 pr100 pl100">
            <div>
              <p class="subject">{{ $t("pay-price-basic") }}</p>
              <p>
                <span>{{ __localeString(data.advertisingProductCostPrice) }}</span> {{ $t("common-unit-price") }}
              </p>
            </div>
            <div v-if="discountPrice > 0"><img src="@/assets/images/minus.png" alt="" /></div>
            <div v-if="discountPrice > 0">
              <p class="subject">{{ $t("pay-price-discount") }}</p>
              <p>
                <span class="discount">{{ data.advertisingProductPriceRate }}%</span>
                <span>{{ __localeString(discountPrice) }}</span> {{ $t("common-unit-price") }}
              </p>
            </div>
            <div><img src="@/assets/images/plus.png" alt="" /></div>
            <div>
              <p class="subject">{{ $t("pay-price-vat") }}</p>
              <p>
                <span>{{ __localeString(data.buyAdvertisingProductVideoVat) }}</span> {{ $t("common-unit-price") }}
              </p>
            </div>
            <div><img src="@/assets/images/eqal.png" alt="" /></div>
            <div>
              <p class="subject">{{ $t("pay-price-final") }}</p>
              <p>
                <span class="total-price">{{ __localeString(data.buyAdvertisingProductVideoPayment) }}</span>
                <span class="total-unit">{{ $t("common-unit-price") }}</span>
              </p>
            </div>
          </div>
        </td>
      </tr>
    </table>
    <!-- //최종 결제 금액 -->
    <!-- 동의 -->
    <section class="agree-wrap">
      <input type="checkbox" id="use" v-model="data.use" class="ck-img" /><label for="use">{{ $t("pay-agree-require") }}</label>
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
                    {{ $t("purchase-detail-terms") }}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </section>
    <div class="btn-pay">
      <button type="button" @click="pay">{{ $t("button-pay") }}</button>
    </div>
  </div>
</template>

<script>
import localeString from "@/mixins/localeString";
import { saveAcountTransferCookie } from "@/utils/cookie";
import { ref, watch, reactive, computed, onMounted, getCurrentInstance } from "@vue/composition-api";
import HpModify from "@/components/modal/HpModify.vue";
import { getPopupOpt } from "@/utils/modal";
import termModal from "@/components/modal/Terms.vue";
import BootPay from "bootpay-js";
import showModal from "@/mixins/showModal";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  mixins: [showModal, localeString, loading],
  props: ["apiBaseUrl"],
  setup() {
    return {
      ...pay(),
    };
  },
};
function pay() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const buyAdvertisingProductVideoHp = ref("");
  const buyPaymentKind = ref("");
  const data = reactive({
    buySid: "",
    homepageUserName: "",
    homepageUserEmail: "",
    advertisingProductName: "",
    buyAdvertisingProductVideoLengthName: "",
    buyAdvertisingProductVideoDate: "",
    buyAdvertisingProductVideoDefaultPrice: "",
    buyAdvertisingProductVideoVat: "",
    buyAdvertisingProductVideoPayment: "",
    payTypeOptions: [
      { label: _this.$t("common-payType-card"), val: "" },
      { label: _this.$t("common-payType-hp"), val: "" },
      { label: _this.$t("common-payType-cyberBank"), val: "" },
      { label: "", val: "" },
    ],
    holder: "",
    payTypeName: "",
    use: false,
    endDay: "",
    vbank: "",
    userAdvertiserSid: "",
    userAdvertiserCompanyAddress1: "",
    userAdvertiserCompanyAddress2: "",
    sid: "",
    videoTransSid: "",
    advertisingProductCostPrice: "",
    advertisingProductPriceRate: "",
  });
  const info = _this.$route.params;
  if (Object.keys(info).length === 0) {
    _this.$router.push("/");
  }
  data.sid = info.sid;
  data.videoTransSid = info.videoTransSid;
  data.buySid = info.buySid;
  data.homepageUserName = info.homepageUserName;
  data.homepageUserEmail = info.homepageUserEmail;
  buyAdvertisingProductVideoHp.value = info.buyAdvertisingProductVideoHp;
  data.advertisingProductName = info.advertisingProductName;
  data.buyAdvertisingProductVideoLengthName = info.buyAdvertisingProductVideoLengthName;
  data.buyAdvertisingProductVideoDate = info.buyAdvertisingProductVideoDate;
  data.buyAdvertisingProductVideoDefaultPrice = info.buyAdvertisingProductVideoDefaultPrice;
  data.buyAdvertisingProductVideoVat = info.buyAdvertisingProductVideoVat;
  data.buyAdvertisingProductVideoPayment = info.buyAdvertisingProductVideoPayment;
  data.advertisingProductCostPrice = info.advertisingProductCostPrice;
  data.advertisingProductPriceRate = info.advertisingProductPriceRate;
  watch(buyPaymentKind, n => {
    if (n === "SYS21B22B030") {
      data.payTypeName = "card";
    } else if (n === "SYS21B22B031") {
      data.payTypeName = "phone";
    } else if (n === "SYS21B22B033") {
      data.payTypeName = "vbank";
    }
  });
  //가상계좌 입금 기한
  data.endDay = _this.$date().format("YYYY-MM-DD");
  const discountPrice = computed(() => data.advertisingProductCostPrice * (data.advertisingProductPriceRate / 100));
  const payType = computed(() => _this.$store.getters["common/getSystemCodeList"]);
  const bankNum = computed(() => _this.$store.getters["common/getInterbridInfo"]);
  const order = computed(() => _this.$store.getters["pay/getPayType"]);
  onMounted(async () => {
    //결제수단 code
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("common/SYSCODE", "SYS21B22B029");
      if (payType.value.addtuneApiResult.errorCode == 200) {
        const codeList = payType.value.addtuneApiResult.sysCodeList;
        data.payTypeOptions[0].val = codeList[0].sysCodeSid;
        data.payTypeOptions[1].val = codeList[1].sysCodeSid;
        data.payTypeOptions[2].val = codeList[3].sysCodeSid;
        data.payTypeOptions[3].val = codeList[2].sysCodeSid;
      } else {
        alert(payType.value.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
    try {
      bus.$emit("start:spinner");
      //계좌 번호
      await _this.$store.dispatch("common/INTERBRID_INFO");
      if (bankNum.value.addtuneApiResult.errorCode == 200) {
        data.payTypeOptions[3].label = bankNum.value.addtuneApiResult.companyInfo.sys_code_parent_sys_code_use[0].sysCodeVal;
        data.holder = bankNum.value.addtuneApiResult.companyInfo.sys_code_parent_sys_code_use[0].sysCodeValName;
      } else {
        alert(bankNum.value.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  });
  const telModify = async () => {
    const id = data.buySid;
    _this.$modal.show(HpModify, { update: update, id }, getPopupOpt("HpModify", "615px", "auto", false));
  };
  const showTermsPopup = status => {
    _this.$modal.show(termModal, { status }, getPopupOpt("termModal", "615px", "auto", false));
  };
  const update = data => {
    buyAdvertisingProductVideoHp.value = data;
  };
  const pay = async () => {
    if (data.use === false) {
      alert(_this.$t("alert-t12"));
      return false;
    }
    if (buyPaymentKind.value === "") {
      alert(_this.$t("alert-t13"));
      return false;
    }
    try {
      await _this.$store.dispatch("pay/ORDERID", {
        order_id: data.buySid,
        buyPaymentKind: buyPaymentKind.value,
      });
      if (order.value.addtuneApiResult.errorCode == 200) {
        if (buyPaymentKind.value === "SYS21B22B032") {
          saveAcountTransferCookie({
            payment: data.buyAdvertisingProductVideoPayment,
            bank: `${data.payTypeOptions[3].label} ${data.holder}`,
            endDay: data.endDay,
            id: data.buySid,
          });
          _this.$router.push("/pay/resultBank");
        } else {
          BootPay.request({
            price: data.buyAdvertisingProductVideoPayment, //실제 결제되는 가격
            application_id: "6188ad7d7b5ba4f7e352aa5c",
            name: data.advertisingProductName, //결제창에서 보여질 이름
            pg: "inicis",
            method: data.payTypeName, //결제수단, 입력하지 않으면 결제수단 선택부터 화면이 시작합니다.
            show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
            user_info: {
              username: data.homepageUserName,
              email: data.homepageUserEmail,
              //addr: `${data.userAdvertiserCompanyAddress1} ${data.userAdvertiserCompanyAddress2}`,
              phone: buyAdvertisingProductVideoHp.value,
            },
            order_id: data.buySid, //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
            account_expire_at: data.endDay, // 가상계좌 입금기간 제한 ( yyyy-mm-dd 포멧으로 입력해주세요. 가상계좌만 적용됩니다. )
          })
            .error(function (info) {
              //결제 진행시 에러가 발생하면 수행됩니다.
              console.log(info);
            })
            .cancel(function (info) {
              //결제가 취소되면 수행됩니다.
              console.log(info);
            })
            .ready(function (info) {
              // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
              data.vbank = info.account;
              saveAcountTransferCookie({
                payment: data.buyAdvertisingProductVideoPayment,
                bank: `${info.bankname} ${info.account} ${info.accounthodler}`,
                endDay: data.endDay,
                id: data.buySid,
              });
            })
            .confirm(function (info) {
              //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
              //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
              console.log(info);
              var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
              if (enable) {
                BootPay.transactionConfirm(info); // 조건이 맞으면 승인 처리를 한다.
              } else {
                BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
              }
            })
            .close(function (info) {
              // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
              console.log(info);
              if (data.vbank !== "") {
                _this.$router.push("/pay/resultBank");
              }
            })
            .done(function (info) {
              //결제가 정상적으로 완료되면 수행됩니다
              //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
              console.log(info);
              _this.$router.push(`/product/result/${info.receipt_id}`);
            });
        }
      } else {
        alert(this.getPayType.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return { data, telModify, discountPrice, buyAdvertisingProductVideoHp, buyPaymentKind, showTermsPopup, pay };
}
</script>

<style lang="scss" scoped>
h1 {
  @include NotoSans(3, 700, #333333);
}
h2 {
  @include NotoSans(2.5, 700, #333333);
}
.btn-wrap {
  text-align: right;
  & button {
    @include NotoSans(1.5, 400, #828282);
    border: 1px solid #828282;
    border-radius: 5px;
    padding: 6px 13px;
  }
}

table {
  border-top: 2px solid #ff4d56;
  & tr {
    & td {
      padding: 20px;
      border-bottom: 1px solid #dddddd;
      @include NotoSans(1.5, 400, #333333);
      & .title-pay-type {
        @include NotoSans(1.5, 500, #4f4f4f);
      }
      & .thumbnail {
        border: 1px solid #828282;
        border-radius: 4px;
        width: 178px;
        height: 100px;
        overflow: hidden;
        position: relative;
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
      & .info-wrap {
        margin-left: 30px;
        & .name {
          @include Montserrat(2.5, 500, #333333);
        }
        & .subject {
          @include NotoSans(1.5, 700, #333333);
        }
        & .content {
          @include NotoSans(1.5, 400, #333333);
          margin-left: 60px;
        }
      }
      & .price-wrap {
        display: flex;
        justify-content: space-around;
        & > div {
          position: relative;
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
            background: url("../../assets/images/tryangle_black.png") no-repeat;
            width: 17px;
            height: 11px;
          }
        }
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
.agree-wrap {
  margin-top: 150px;
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
.btn-pay {
  margin-top: 150px;
  margin-bottom: 200px;
  text-align: center;
  & button {
    @include NotoSans(2.5, 700, #fff);
    background: #ff4d56;
    height: 70px;
    padding: 0 85px;
  }
}
</style>
