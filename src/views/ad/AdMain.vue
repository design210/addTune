<template>
  <div>
    <section class="buy-ad">
      <h1 v-html="$t('buyAd-main-h1')"></h1>
      <button class="mt35" @click="$router.push('/ad/adMain/adManage/default')">{{ $t("button-setNow") }}</button>
    </section>
    <section class="ad-list-wrap">
      <div class="sub-wrapper">
        <h2>{{ $t("buyAd-main-subH1") }}</h2>
        <h3>{{ $t("buyAd-main-subH2") }}</h3>
        <ul class="ad-list">
          <li v-for="(item, index) in productList" :key="item.advertisingProductSid" @click="productDetail({ id: item.advertisingProductSid, fileSid: item.file_master[0].fileSid })">
            <article v-if="index < 5" class="d-flex">
              <div v-if="item.file_master.length !== 0">
                <div class="img-wrap">
                  <img :src="`${apiBaseUrl}/file/fileView/${item.file_master[0].fileSid}?size=360`" alt="" />
                </div>
              </div>
              <div v-else>
                <div class="img-wrap">
                  <img alt="" src="@/assets/images/prod_blank.png" />
                </div>
              </div>
              <div class="info-wrap">
                <h3>{{ item.advertisingProductName }}</h3>
                <div v-if="item.advertisingProductOptionSummary !== null" class="discount">
                  <i><img alt="" src="@/assets/images/emoji_happy.png" /></i>{{ item.advertisingProductOptionSummary }}
                </div>
                <div class="price">
                  {{ __localeString(item.advertisingProductPrice) }}<em>{{ item.advertisingProductPriceUnitName }}</em>
                </div>
                <div class="info-list">
                  <ul>
                    <li v-for="summary in item.advertisingProductSummary" :key="summary">
                      {{ summary }}
                    </li>
                  </ul>
                </div>
                <span class="detail-set">{{ $t("button-adDetailSet") }}<i></i></span>
              </div>
            </article>
          </li>
        </ul>
        <div v-if="productList.length > 4" class="btn-all">
          <router-link to="/main/product">전체보기 +</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import localeString from "@/mixins/localeString";
import { mapGetters } from "vuex";
import { deleteCookie } from "@/utils/cookie";
import modalMixin from "@/mixins/showModal";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  metaInfo() {
    return {
      title: "광고구매｜옥외 광고 설정하기",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "간편한 광고 설정과 합리적인 가격으로 누구나 쉽게 할수 있어요.",
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: "애드튠,  ADDTUNE, 옥외광고, 옥외광고 성과측정, 디지털옥외광고, 옥외광고물, 지역광고, 전국광고, 택시광고, 버스광고, 지하철광고, 튠, 채널튠, TUNE, 디지털사이니지, 인터브리드",
        },
      ],
    };
  },
  mixins: [modalMixin, localeString, loading],
  props: ["apiBaseUrl"],
  data() {
    return {
      productList: [],
    };
  },
  computed: {
    ...mapGetters("admain", ["getAdPriceCalc", "getAdListAndBanner"]),
  },
  async created() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("admain/AD_LIST_AND_BANNER", {
        device: "SYS21A28B014",
        page: "",
        size: "",
      });
      if (this.getAdListAndBanner.addtuneApiResult.errorCode == 200) {
        this.productList = this.getAdListAndBanner.addtuneApiResult.advertisingProduct.advertisingProductList;
        this.productList.forEach(ele => {
          ele.advertisingProductSummary = ele.advertisingProductSummary.split("\n");
        });
      } else {
        alert(this.getAdListAndBanner.addtuneApiResult.errorMessage);
      }
      deleteCookie("payInfo");
      deleteCookie("estimate");
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    productDetail(data) {
      this.$router.push(`/ad/adMain/adManage/${data.id}?fileSid=${data.fileSid}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.buy-ad {
  text-align: center;
  padding: 162px 0 190px;

  & h1 {
    @include NotoSans(4, 500, #333333);
  }

  & button {
    background: #ff4d56;
    height: 70px;
    @include NotoSans(2.7, 700, #fff);
    padding: 0 40px;
    border-radius: 2px;
  }
}

.dot-flashing {
  position: relative;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotFlashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -60px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 60px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #9880ff;
  color: #9880ff;
  animation: dotFlashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dotFlashing {
  0% {
    background-color: #9880ff;
  }
  50%,
  100% {
    background-color: #ebe6ff;
  }
}

.main-banner-silder {
  width: 100%;
  min-width: 1110px;

  & .wrapper {
    margin: 0 auto;
  }
}

.ad-cal {
  & h1 {
    margin-top: 140px;
    text-align: center;
    @include NotoSans(4.5, 700, #4f4f4f);
  }

  & h2 {
    text-align: center;
    @include NotoSans(2, 400, #7b7b7b);
    margin-top: 40px;
  }

  & .area-select-wrap {
    margin-top: 90px;

    & .search-wrap {
      padding: 0 40px;
    }

    & .txt-big {
      @include NotoSans(2.5, 700, #828282);
    }

    & .txt-sm {
      @include NotoSans(2, 400, #6e6e6e);
    }

    & .txt-red {
      @include NotoSans(2.5, 700, #ff4d56);
    }

    & .txt-price {
      @include Montserrat(3.5, 600, #ff4d56);

      & em {
        font-style: normal;
        @include NotoSans(2, 400, #6e6e6e);
        margin-left: 5px;
      }
    }

    & .subject {
      width: 150px;
    }

    & .column1 {
      & span {
        &:nth-child(2) {
          width: 300px;
        }

        &:nth-child(3) {
          text-align: center;
          width: 80px;
        }

        &:nth-child(4) {
          width: calc(100% - 530px);
        }
      }
    }

    & .column2 {
      & span {
        &:nth-child(2) {
          width: calc(100% - 150px);
        }
      }
    }

    & .column3 {
      display: flex;
      justify-content: space-between;
      padding-top: 30px;
      border-top: 1px solid #bdbdbd;
      margin-top: 45px;
      padding: 30px 40px 0;
    }

    & .comment {
      @include NotoSans(1.6, 400, #828282);
      text-align: center;
      margin-top: 80px;
    }

    @at-root .ad-set-btn {
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
}

.contact {
  background: #ffebeb;
  height: 150px;
  text-align: center;
  @include NotoSans(2, 500, #4e3e3e);
  padding-top: 50px;
  margin-top: 150px;

  & a {
    @include NotoSans(2, 700, #4e3e3e);
    border: 1px solid #4e3e3e;
    border-radius: 5px;
    height: 53px;
    line-height: 51px;
    padding: 0 45px 0 20px;
    margin: 0 20px;
    position: relative;

    & i {
      position: absolute;
      background: url("../../assets/images/arrow_gray.png") no-repeat;
      right: 16px;
      top: 19px;
      width: 20px;
      height: 15px;
    }
  }
}

.ad-list-wrap {
  background: #f5f5f5;
  padding: 150px 0;

  & .sub-wrapper {
    & h2 {
      @include NotoSans(4.5, 700, #333333);
      text-align: center;
    }

    & h3 {
      @include NotoSans(2, 400, #828282);
      padding-top: 35px;
      text-align: center;
    }

    & .ad-list {
      margin: 90px auto 0;
      width: 1000px;
      & li {
        & article {
          width: 100%;
          display: flex;
          margin-bottom: 40px;
          cursor: pointer;
        }
        & .img-wrap {
          width: 360px;

          & img {
            width: 360px;
            height: 300px;
            border-radius: 10px 0 0 10px;
          }
        }

        & .info-wrap {
          width: calc(100% - 361px);
          background: #fff;
          padding: 30px 30px 0;
          position: relative;
          border-radius: 0 10px 10px 0;

          & h3 {
            @include NotoSans(2.5, 400, #4f4f4f);
            text-align: left;
          }

          & .discount {
            margin-top: 10px;
            @include NotoSans(1.4, 900, #7000ff);

            & i {
              margin-right: 5px;
            }
          }

          & .price {
            @include Montserrat(4.7, 600, #333333);

            & em {
              font-style: normal;
              @include NotoSans(2, 400, #4f4f4f);
              margin-left: 5px;
            }
          }

          & .info-list {
            & li {
              @include NotoSans(1.5, 400, #4f4f4f);
              margin-bottom: 5px;
            }
          }

          & .detail-set {
            position: absolute;
            right: 33px;
            bottom: 31px;
            @include NotoSans(1.8, 700, #ff4d56);

            & i {
              background: url("../../assets/images/arrow_red.png") no-repeat;
              width: 18px;
              height: 15px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }
}

.movie-wrap {
  margin-top: 150px;

  & h1 {
    @include NotoSans(4.5, 700, #333333);
    text-align: center;
  }

  & h2 {
    @include NotoSans(2, 400, #828282);
    padding-top: 35px;
    text-align: center;
  }
}
.btn-all {
  margin-top: 100px;
  text-align: center;
  & a {
    height: 55px;
    border: 1px solid #4f4f4f;
    border-radius: 5px;
    @include NotoSans(1.7, 500, #4f4f4f);
    line-height: 53px;
    padding: 0 20px;
  }
}
$dot-width: 10px;
$dot-height: 10px;
</style>
