<template>
  <div>
    <div class="store-header-wrap d-flex justify-space-between">
      <div class="d-flex">
        <v-checkbox v-if="fixed === 'A'" v-model="allSelect" class="ck-basic"></v-checkbox>
        <span class="all-select"
          >{{ $t("buyAd-sotreList-all") }} <span v-if="storeList.length > 0">({{ selectStore }}/{{ storeViewTotalNum }})</span></span
        >
      </div>
      <div class="sort" @click="sortChange">
        <i><img alt="" src="@/assets/images/swap-vertical.png" /></i>
        <span v-show="trafficOrder === 'DESC'">{{ $t("buyAd-sotreList-high") }}</span>
        <span v-show="trafficOrder === 'ASC'">{{ $t("buyAd-sotreList-low") }}</span>
      </div>
    </div>
    <div class="store-list-wrap">
      <ul v-if="storeList.length > 0">
        <li v-for="(item, index) in storeList" :key="item.companyStoreSid" :class="[index < showNum ? `item-${index}` : 'hide']">
          <div v-show="index < showNum">
            <div class="img-wrap">
              <div v-if="fixed === 'A'" class="ck-box">
                <v-checkbox v-model="storeSelect" :value="item.companyStoreSid" class="ck-basic" @click="select({ index: index, companyStoreSid: item.companyStoreSid })"></v-checkbox>
              </div>
              <div v-if="item.files.length === 0" @click="showPopup(item.companyStoreSid)">
                <img alt="ready to store photo" src="@/assets/images/store_xs_blank.png" />
              </div>
              <div v-else class="store-img-wrap" @click="showPopup(item.companyStoreSid)">
                <v-lazy-image :src="`${apiBaseUrl}/file/fileView/${item.files[0].fileSid}?size=252`" />
                <div class="basic-img"><img alt="" src="@/assets/images/thumbnail_default.png" /></div>
              </div>
            </div>
            <div class="title mt10" @click="showPopup(item.companyStoreSid)">{{ item.companyStoreName }}</div>
            <div class="day-avg mt3" @click="showPopup(item.companyStoreSid)">
              <p>
                <span class="mr10">{{ $t("modal-storeDetail-month") }}</span>
                <strong>{{ parseInt(item.monthTrafficAvg).toLocaleString() }}</strong>
              </p>
              <p>
                <span class="mr10">{{ $t("report-total-sex") }}</span>
                <strong>{{ $t("common-sex-male") }} {{ item.trafficMaleRate }} : {{ $t("common-sex-female") }} {{ item.trafficFemaleRate }}</strong>
              </p>
            </div>
            <!--            <div class="address mt4" @click="showPopup(item.companyStoreSid)">{{ item.companyStoreAddress1 }}{{ item.companyStoreAddress2 }}</div>-->
          </div>
        </li>
      </ul>
      <ul v-else>
        <li class="none">{{ $t("buyAd-sotreList-none") }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import localeString from "@/mixins/localeString";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import storeModal from "@/components/modal/store/StoreDetail";
import { getPopupOpt } from "@/utils/modal";
import VLazyImage from "v-lazy-image/v2";

export default {
  components: {
    VLazyImage,
  },
  mixins: [loading, localeString],
  props: ["slotCount", "advertiseStartDate", "advertiseEndDate", "areaList", "storeTypeList", "fixed", "reset", "trafficMin", "trafficMax", "storeShowNum", "storeViewTotalNum", "apiBaseUrl"],
  data() {
    return {
      allSelect: false,
      storeSelect: [],
      allData: [],
      storeList: [],
      first: true,
      companyNameOrder: "",
      businessTypeOrder: "",
      storeGradeOrder: "",
      priceOrder: "",
      advertisingProductSid: "",
      tempDate: [],
      slotCountTemp: 1,
      totalStore: null,
      selectStore: null,
      showNum: null,
      //정렬 상태
      name: true,
      type: true,
      price: true,
      trafficOrder: "DESC",
      isLoaded: false,
      finalStore: [],
      showStoreList: [],
      OrinStoreList: [], //slider 사용시
      storeTemp: [], // 조건 변경시
      storeViewTotal: null,
    };
  },
  computed: {
    ...mapGetters("admain", ["getAdStoreList"]),
  },
  watch: {
    storeViewTotalNum(n) {
      this.showNum = n;
    },
    storeShowNum(n) {
      this.showNum = n;
      this.selectStore = n;

      this.allData.length = n;
      this.finalStore = this.allData.filter(ele => this.storeSelect.includes(ele));
      this.storeSelect = this.finalStore;
      //고민필요
      if (this.storeSelect.length < n) {
        this.allSelect = false;
      } else {
        this.storeSelect.length === this.finalStore.length ? (this.allSelect = true) : (this.allSelect = false);
      }
      this.showStoreList = this.OrinStoreList.slice(0, this.storeViewTotalNum);
      this.$emit("selectStore", this.storeSelect);
    },
    allSelect(n) {
      if (n === true) {
        if (this.storeShowNum !== null) {
          this.storeSelect = this.showStoreList;
        } else {
          this.storeSelect = this.allData;
        }
      } else {
        if (this.storeSelect.length === this.showNum) {
          this.storeSelect = [];
        }
      }
    },
    storeSelect(n) {
      this.selectStore = n.length;

      let totalNum = this.storeShowNum !== null ? this.storeShowNum : this.OrinStoreList.length;
      if (this.storeSelect.length < totalNum) {
        this.allSelect = false;
      }
      if (this.storeSelect.length === totalNum) {
        this.allSelect = true;
      }
      setTimeout(() => {
        this.storeTemp = this.storeSelect.concat();
      }, 1000);

      this.$emit("selectStore", n);
    },
    slotCount() {
      this.reloadFilter();
    },
    areaList() {
      this.reloadFilter();
    },
    trafficMin() {
      this.reloadFilter();
    },
    trafficMax() {
      this.reloadFilter();
    },
    advertiseEndDate() {
      this.reloadFilter();
    },
    storeTypeList() {
      this.reloadFilter();
    },
  },
  created() {
    if (this.$route.params.id !== "default") {
      this.advertisingProductSid = this.$route.params.id;
    }
  },
  mounted() {
    this.reload();
  },
  methods: {
    async reloadFilter() {
      let count = 1;
      if (!isNaN(this.slotCount)) {
        count = this.slotCount;
      } else {
        count = 1;
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("admain/AD_STORE_LIST", {
          areaList: this.areaList,
          advertiseStartDate: this.advertiseStartDate,
          advertiseEndDate: this.advertiseEndDate,
          slotCount: count,
          trafficOrder: this.trafficOrder,
          advertisingProductSid: this.advertisingProductSid,
          storeTypeList: this.storeTypeList,
        });
        if (this.getAdStoreList.addtuneApiResult.errorCode == 200) {
          const list = this.getAdStoreList.addtuneApiResult.storeList;
          this.totalStore = list.length;
          this.$emit("totalStore", list.length);
          const allSidList2 = [];
          this.storeList = list;
          this.storeList.forEach(ele => {
            allSidList2.push(ele.companyStoreSid);
          });
          this.allData = allSidList2;
          this.OrinStoreList = this.allData.concat();
          this.storeSelect = this.storeTemp.filter(ele => this.allData.includes(ele));
          setTimeout(() => {
            this.showStoreList = this.allData.slice(0, this.storeViewTotalNum);
            this.storeSelect.length === this.allData.length ? (this.allSelect = true) : (this.allSelect = false);
          }, 300);

          this.totalStore > this.storeSelect.length ? (this.allSelect = false) : (this.allSelect = true);
        } else {
          alert(this.getAdStoreList.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        alert(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async reload() {
      let count = 1;
      if (!isNaN(this.slotCount)) {
        count = this.slotCount;
      } else {
        count = 1;
      }
      this.tempData = this.storeSelect.concat();
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("admain/AD_STORE_LIST", {
          areaList: this.areaList,
          trafficMin: this.trafficMin,
          trafficMax: this.trafficMax,
          advertiseStartDate: this.advertiseStartDate,
          advertiseEndDate: this.advertiseEndDate,
          slotCount: count,
          trafficOrder: this.trafficOrder,
          advertisingProductSid: this.advertisingProductSid,
          storeTypeList: this.storeTypeList,
        });
        if (this.getAdStoreList.addtuneApiResult.errorCode == 200) {
          const list = this.getAdStoreList.addtuneApiResult.storeList;
          this.showNum = list.length;
          this.totalStore = list.length;
          this.selectStore = list.length;
          this.$emit("totalStore", list.length);
          //기존 선택 데이터
          this.storeSelect = this.tempData;
          this.storeList = list;
          if (this.first === true) {
            const allSidList = [];
            this.storeList.forEach(ele => {
              allSidList.push(ele.companyStoreSid);
            });
            this.allData = allSidList;
            this.storeTemp = this.allData.concat();
            this.OrinStoreList = this.allData.concat();
            this.storeSelect = this.allData;
            this.finalStore = this.allData;
            this.allSelect = true;
            this.first = false;
          }
        } else {
          alert(this.getAdStoreList.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        alert(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //모달
    showPopup(id) {
      this.$modal.show(
        storeModal,
        {
          id: id,
          starDate: this.advertiseStartDate,
          endDate: this.advertiseEndDate,
          slotCount: this.slotCount,
          apiBaseUrl: this.apiBaseUrl,
        },
        getPopupOpt("storeModal", "1250px", "auto", false),
      );
    },
    select(data) {
      if (this.storeSelect.includes(data.companyStoreSid)) {
        document.querySelector(`.item-${data.index}`).classList.add("active");
      } else {
        document.querySelector(`.item-${data.index}`).classList.remove("active");
      }
    },
    sortChange() {
      this.trafficOrder === "DESC" ? (this.trafficOrder = "ASC") : (this.trafficOrder = "DESC");
      this.reloadFilter();
    },
  },
};
</script>

<style lang="scss" scoped>
.v-lazy-image {
  opacity: 0;
  transform: scale3d(0.3, 0.3, 0.3);
  transition: opacity 0.5s, transform 0.5s;
}

.v-lazy-image-loaded {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

.store-header-wrap {
  border-top: 2px solid #ff4d56;
  padding: 15px 20px 0 5px;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  background: #fff;
  z-index: 10;
  top: 0;
  height: 56px;

  & .all-select {
    @include NotoSans(1.6, 400, #4f4f4f);
    padding-left: 3px;
  }

  & .sort {
    cursor: pointer;
    @include NotoSans(1.6, 400, #4f4f4f);

    & i {
      margin-right: 5px;
    }
  }
}

.store-header-wrap::v-deep,
.store-list-wrap::v-deep {
  & .v-input__slot {
    margin-bottom: 0 !important;
  }

  & .v-input {
    & i {
      &:after {
        opacity: 0 !important;
        width: 0;
        height: 0;
      }
    }
  }

  & .v-input--is-label-active {
    & i {
      &:before {
        position: relative;
        z-index: 2;
      }

      &:after {
        opacity: 1 !important;
        background: #fff !important;
        border-radius: 0px !important;
        position: absolute;
        left: 5px;
        top: 7px;
        width: 14px;
        height: 12px;
      }
    }
  }
}

.store-list-wrap {
  & ul {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;

    & li {
      width: calc(25% - 11px);
      margin-right: 14.5px;
      margin-bottom: 60px;
      cursor: pointer;

      &:nth-child(4n) {
        margin-right: 0;
      }

      & .img-wrap {
        position: relative;

        & .ck-box::v-deep {
          position: absolute;
          top: 10px;
          left: 10px;

          & .v-icon {
            &.v-icon {
              font-size: 27px !important;
              line-height: 20px !important;
            }
          }
        }

        & img {
          width: 252px;
          height: 142px;
          border-radius: 4px;
          position: relative;
          z-index: 2;
        }

        & .basic-img {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
      }

      & .title {
        @include NotoSans(1.6, 700, #333333);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 95%;
      }

      &.none {
        width: 100%;
        text-align: center;
        @include NotoSans(1.6, 700, #333333);
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 30px;
      }

      & .day-avg {
        @include NotoSans(1.4, 500, #4f4f4f);
      }

      & .address {
        @include NotoSans(1.4, 400, #828282);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 95%;
      }

      &.hide {
        margin: 0;
        height: 0px;
      }
    }
  }
}

.store-tbl-wrap {
  border-left: 1px solid #bdbdbd;
  border-right: 1px solid #bdbdbd;
  border-bottom: 1px solid #bdbdbd;
  border-top: 2px solid #ff4d56;
}

.overflow {
  max-height: 549px;
  overflow-y: auto;
}

.store-tbl {
  & tr {
    & th {
      border-bottom: 2px solid #bdbdbd;
      text-align: left;
      height: 46px;
      @include NotoSans(1.5, 400, #333333);
      position: relative;

      &.center {
        text-align: center;
      }

      & .options {
        position: absolute;
        top: 45px;
        left: -10px;
        background: #fff;
        border: 1px solid #828282;
        display: none;

        & ul {
          padding: 10px;

          & li {
            cursor: pointer;
            margin-bottom: 5px;
            @include NotoSans(1.5, 400, #333333);
          }
        }
      }

      & i {
        &.select {
          position: absolute;
          right: 20px;
          top: 19px;
          cursor: pointer;
          width: 12px;
          height: 8px;
          background: url("../../assets/images/board_arrow_down.png") no-repeat;

          &.toggle {
            transition: all 0.3s ease-in-out;

            &.active {
              transform: rotate(180deg);
            }
          }
        }
      }

      &.first {
        padding-left: 15px;
      }
    }

    & td {
      border-bottom: 1px solid #bdbdbd;
      text-align: left;
      height: 50px;
      @include NotoSans(1.5, 400, #333333);

      &.no-data {
        text-align: center;
      }

      &.center {
        text-align: center;
      }

      &.right {
        text-align: right;
      }

      & .discount {
        @include Montserrat(1.4, 700, #ff4d56);
        margin-right: 10px;
      }

      & .origin {
        @include Montserrat(1.2, 500, #828282);
        text-decoration: line-through;
        margin-right: 10px;
      }

      & .price {
        @include Montserrat(1.8, 500, #333333);

        & em {
          @include NotoSans(1.8, 400, #333333);
          font-style: normal;
          margin-left: 5px;
        }
      }

      &.first {
        padding-left: 15px;
      }
    }

    &:last-child {
      & td {
        border-bottom: 0;
      }
    }

    & .v-input {
      & .v-messages {
        display: none !important;
      }

      & .v-input__slot {
        margin-bottom: 0 !important;
        display: flex;
        justify-content: center;
      }
    }
  }
}

.ck-basic {
  position: relative;
  z-index: 5;
}

.store-img-wrap {
  position: relative;

  & img {
    position: relative;
    z-index: 2;
  }
}

.loader {
  position: relative;
}

.lds-roller {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  transform: translate(-50%, -550%);
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
</style>
