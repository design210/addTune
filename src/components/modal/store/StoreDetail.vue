<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>{{ $t("modal-storeDetail-title") }}</h2>
    </template>
    <template slot="body">
      <section class="overflow">
        <div class="store_info mb142">
          <div class="pic_wrap">
            <div v-if="count > 0">
              <VueSlickCarousel ref="c1" :asNavFor="$refs.c2" :focusOnSelect="true" class="main_pic">
                <div v-for="(item, idx) in resData.files" :key="idx">
                  <img :src="`${apiBaseUrl}/file/fileView/${item.fileSid}?size=620`" @load="onImgLoad" v-show="isLoaded" />
                </div>
              </VueSlickCarousel>
              <div class="loader" v-show="isLoaded === false">
                <div class="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
            <div v-else><img src="@/assets/images/defaultPIC.png" /></div>

            <VueSlickCarousel v-if="count > 0" class="sub_pic" ref="c2" :asNavFor="$refs.c1" :slidesToShow="count" v-bind="settings" :focusOnSelect="true" v-show="isLoaded">
              <div v-for="(item, idx) in resData.files" :key="idx">
                <img :src="`${apiBaseUrl}/file/fileView/${item.fileSid}?size=88`" />
              </div>
            </VueSlickCarousel>
          </div>
          <div class="right_sec">
            <div class="store_name" :class="{ pb20: status === 'purchase' }">{{ resData.companyStoreName }}</div>
            <div class="mb32" v-if="status !== 'purchase'">
              <span class="price">{{ price }}</span> <span class="won ml6">원</span>
              <p class="comment">{{ $t("modal-storeDetail-slot") }}</p>
            </div>
            <div class="kind pt38">
              <div class="flx mb15">
                <span class="kind_title">{{ $t("report-total-sectors") }}</span>
                <div class="contnt">{{ resData.companyStoreBusinessTypeName }}</div>
              </div>
              <div class="flx">
                <span class="kind_title">{{ $t("report-total-address") }}</span>
                <div class="contnt">{{ resData.companyStoreAddress1 }} {{ resData.companyStoreAddress2 }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="month_circle mb162">
          <span class="title">{{ $t("modal-storeDetail-month") }}</span>
          <div class="perc">
            <div class="man left">
              <span class="num">{{ parseInt(resData.monthTrafficAvg).toLocaleString() }}</span>
            </div>
            <div class="line"></div>
            <div class="bi pl70">
              <div class="previous_month">{{ $t("modal-storeDetail-prev") }}</div>
              <div class="num">
                {{ resData.monthTrafficChangeRate }}<span v-if="trafficStatus !== 'none'">%</span>
                <span class="arrow" v-if="trafficStatus === 'plus'"><img src="@/assets/images/leave_up.png" alt="상승" /></span>
                <span v-if="trafficStatus === 'minus'" class="under_arrow"><img src="@/assets/images/leave_down.png" alt="하락" /></span>
              </div>
            </div>
          </div>
        </div>
        <div class="circle_graph mb162">
          <div class="flex_bet">
            <span class="title">{{ $t("report-total-sex") }}</span>
            <span class="traffic">{{ $t("common-unit-traffic") }}</span>
          </div>
          <div class="wraps wrapp mt44 d-flex">
            <div class="circle">
              <div class="doughnut mt27">
                <doughnut-chart :width="300" :height="300" :gender="resData.trafficStayGraph.gender"></doughnut-chart>
              </div>
              <div class="sex mt22">
                <div class="female">
                  <p class="percent">{{ resData.trafficStayGraph.gender.female.percent }}%</p>
                  <p class="num">
                    {{ __localeString(resData.trafficStayGraph.gender.female.count) }}
                    <span>{{ $t("common-unit-person") }}</span>
                  </p>
                </div>
                <div class="male">
                  <p class="percent">{{ resData.trafficStayGraph.gender.male.percent }}%</p>
                  <p class="num">
                    {{ __localeString(resData.trafficStayGraph.gender.male.count) }}
                    <span>{{ $t("common-unit-person") }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="barChart">
          <div class="bar">
            <div class="title-wrap">
              <h2 class="mb20">{{ $t("report-total-ageRange") }}</h2>
              <span>{{ $t("common-unit-traffic") }}</span>
            </div>
            <bar-chart-age :labels="ages" :data="ageCount"></bar-chart-age>
          </div>
        </div>
        <div class="storePics">
          <h2 class="mb50">{{ $t("modal-storeDetail-photo") }}</h2>
          <div v-if="count < 1">
            <img class="not-pic" src="@/assets/images/defaultPIC1.png" />
          </div>
          <div class="mb40 center" v-else v-for="(item, idx) in resData.files" :key="idx">
            <img :src="`${apiBaseUrl}/file/fileView/${item.fileSid}?size=950`" />
          </div>
        </div>
      </section>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import VueSlickCarousel from "vue-slick-carousel";
import DoughnutChart from "@/components/chart/DoughnutChart";
import BarChartAge from "@/components/chart/BarChartAge";

import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { mapGetters } from "vuex";
import localeString from "@/mixins/localeString";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: { VueSlickCarousel, DoughnutChart, BarChartAge, modalWrap },
  mixins: [localeString, loading],
  props: ["id", "starDate", "endDate", "slotCount", "apiBaseUrl", "status"],
  data() {
    return {
      c1: undefined,
      c2: undefined,
      resData: {
        trafficStayGraph: {
          gender: {
            female: {
              conunt: 0,
              percent: 0,
            },
            male: {
              conunt: 0,
              percent: 0,
            },
          },
        },
        monthTrafficAvg: 0,
      },
      count: null,
      price: "",
      ages: [],
      ageCount: [],
      settings: {
        // centerMode: true,
      },
      isLoaded: false,
      trafficStatus: "",
      unitMillians: false,
    };
  },
  computed: {
    ...mapGetters("adcontents", ["tuneStoreDetail"]),
    ...mapGetters("purchase", ["getPurchaseStoreDetail"]),
  },
  async mounted() {
    //구매내역 상세 모달일 경우
    if (this.status === "purchase") {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("purchase/PURCHASE_STORE_DETAIL", this.id);
        const res = this.getPurchaseStoreDetail.addtuneApiResult;
        if (res.errorCode === 200) {
          this.resData = res.storeList;
          this.resData.trafficStayGraph.age.forEach(ele => {
            this.ages.push(`${ele.range}${this.$t("common-unit-age")}`);
            this.ageCount.push(ele.count);
            this.count = this.resData.files.length;
            //통행량 Rate 체크
            if (this.resData?.monthTrafficChangeRate > 0) {
              this.trafficStatus = "plus";
            } else if (this.resData?.monthTrafficChangeRate === 0) {
              this.trafficStatus = "zero";
            } else if (this.resData?.monthTrafficChangeRate < 0) {
              this.trafficStatus = "minus";
            } else if (this.resData?.monthTrafficChangeRate === null) {
              this.trafficStatus = "none";
              this.resData.monthTrafficChangeRate = "-";
            }
          });
        } else {
          alert(res.errorMessage);
        }
      } catch (error) {
        alert(error);
      } finally {
        bus.$emit("end:spinner");
      }
    } else {
      //상품상세 설정 상세일경우
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("adcontents/TUNE_STORE_DETAIL", {
          id: this.id,
          advertiseStartDate: this.starDate,
          advertiseEndDate: this.endDate,
          slotCount: this.slotCount,
        });
        const res = this.tuneStoreDetail.addtuneApiResult;
        if (res.errorCode !== 200) {
          alert(res.erorMessage);
          return this.$router.go(-1);
        }
        this.resData = res.advertisingProduct;
        //통행량 Rate 체크
        if (res.advertisingProduct.monthTrafficChangeRate > 0) {
          this.trafficStatus = "plus";
        } else if (res.advertisingProduct.monthTrafficChangeRate === 0) {
          this.trafficStatus = "zero";
        } else if (res.advertisingProduct.monthTrafficChangeRate < 0) {
          this.trafficStatus = "minus";
        } else if (res.advertisingProduct.monthTrafficChangeRate === null) {
          this.trafficStatus = "none";
          this.resData.monthTrafficChangeRate = "-";
        }
        this.count = res.advertisingProduct.files?.length;
        this.price = this.resData.storeCalculatePrice.toLocaleString();

        this.resData.trafficStayGraph.age.forEach(ele => {
          this.ages.push(`${ele.range}대`);
          this.ageCount.push(ele.count);
        });
      } catch (error) {
        alert(error);
      } finally {
        bus.$emit("end:spinner");
      }
    }
  },
  methods: {
    getFirstDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      return this.$date(new Date(year, month - 1, 1)).format("YYYY-MM-DD");
    },
    getLastDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      return this.$date(new Date(year, month, 0)).format("YYYY-MM-DD");
    },
    close() {
      this.$emit("close");
    },
    onImgLoad() {
      this.isLoaded = true;
      this.imgAlign();
    },
    imgAlign() {
      setTimeout(() => {
        const a = this.count * 96;
        document.querySelector(".sub_pic").style.width = `${a}px`;
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex_bet {
  display: flex;
  justify-content: space-between;
}
h1 {
  @include NotoSans(3, 700, #000);
}
.store_info::v-deep {
  margin-top: 49px;
  display: flex;
  justify-content: space-between;
  & .pic_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  & .main_pic {
    width: 620px;
    height: 350px;
    & img {
      width: 620px;
      height: 350px;
    }
    & .slick-arrow {
      &.slick-next {
        right: 10% !important;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.55);
        &:before {
          opacity: 1 !important;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          content: "";
          width: 12px;
          height: 20px;
          background: url("../../../assets/images/arr-next.png") no-repeat;
        }
      }
      &.slick-prev {
        left: 10% !important;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.55);
        z-index: 1;
        &:before {
          opacity: 1 !important;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          content: "";
          width: 12px;
          height: 20px;
          background: url("../../../assets/images/arr-prev.png") no-repeat;
        }
      }
    }
  }
  & .sub_pic {
    margin-top: 23px;
    width: 300px;
    .slick-list {
      overflow: hidden;
    }
    & .slick-slide {
      & img {
        cursor: pointer;
        width: 88.3px;
        height: 58px;
      }
    }
    & .slick-current {
      & img {
        border: 2px solid #ff4d56;
      }
    }
  }

  & .right_sec {
    margin-left: 41px;
    width: 415px;
    padding-top: 30px;
    & .store_name {
      @include NotoSans(2.5, 400, #333333);
    }
    & .price {
      @include Montserrat(4.3, 600, #333333);
    }
    & .won {
      @include NotoSans(3.5, 500, #333333);
    }
    & .comment {
      @include NotoSans(1.4, 400, #828282);
    }
    & .kind {
      border-top: 1px solid #e0e0e0;
      border-spacing: 0 15px;
      & .flx {
        display: flex;
        justify-content: space-between;
        & .kind_title {
          width: 63px;
          @include NotoSans(1.6, 400, #828282);
        }
        & .contnt {
          flex: 1;
          @include NotoSans(1.6, 500, #4f4f4f);
        }
      }
    }
  }
}
.month_circle {
  margin-bottom: 50px;
  & .title {
    @include NotoSans(2.5, 500, #4f4f4f);
  }
  & .perc {
    width: 100%;
    display: flex;
    align-items: center;

    & .man {
      width: 50%;
      padding-right: 70px;
      text-align: right;

      & .num {
        @include Montserrat(7, 600, #333333);
        margin-right: 8px;
      }
      & .kor {
        @include NotoSans(5.5, 500, #333333);
      }
    }
    & .bi {
      & .previous_month {
        @include NotoSans(1.5, 500, #828282);
        margin-bottom: -15px;
      }
      & .num {
        @include Montserrat(4.6, 600, #333333);
        & img {
          vertical-align: 0px;
        }
      }
      & .arrow {
        color: #ff0000;
        font-size: 6rem;
        margin-left: 25px;
      }
      & .under_arrow {
        color: #0047ff;
        font-size: 6rem;
        margin-left: 25px;
      }
    }
    & .line {
      height: 65px;
      border-right: 2px solid #e0e0e0;
    }
  }
}
.circle_graph {
  .title {
    @include NotoSans(2.5, 500, #4f4f4f);
  }
  .traffic {
    @include NotoSans(1.5, 400, #828282);
  }
  & .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    & h2 {
      @include NotoSans(2.5, 700, #4f4f4f);
    }
    & .doughnut {
      margin-left: 30px;
    }
    & .sex {
      margin-left: 80px;
      width: 220px;
      & .female {
        padding: 5px 0 40px 101px;
        margin-bottom: 30px;
        border-bottom: 2px solid #e0e0e0;
        background: url("../../../assets/images/female.png") no-repeat left 0 top 30px;
        & .percent {
          @include Montserrat(4, 600, #ff8a00);
        }
      }
      & .num {
        margin-top: -6px;
        display: flex;
        @include Montserrat(2.5, 500, #333333);
        & span {
          @include NotoSans(2.5, 500, #333333);
        }
      }
      & .male {
        padding: 5px 0 0 101px;
        background: url("../../../assets/images/male.png") no-repeat left 0 top 30px;
        & .percent {
          @include Montserrat(4, 600, #25ba00);
        }
      }
    }
  }
}

.barChart {
  margin-bottom: 245px;
  & .bar {
    & .title-wrap {
      display: flex;
      justify-content: space-between;
      & span {
        @include NotoSans(1.5, 400, #828282);
      }
    }
  }
}
.overflow {
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}
.loader {
  position: relative;
  width: 620px;
  height: 350px;
  border-radius: 2px;
  margin-top: -350px;
}
.lds-roller {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  transform: translate(-320%, -370%);
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff6600;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}
.ck-basic {
  position: relative;
  z-index: 5;
}
</style>
