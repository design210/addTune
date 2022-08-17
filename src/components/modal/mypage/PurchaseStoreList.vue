<template>
  <modalWrap @close="close">
    <template slot="head">
      <h1>{{ $t("store-all-view") }}</h1>
    </template>
    <template slot="body">
      <div class="sort-wrap mb30">
        <div class="sort" @click="sortChange">
          <i><img src="@/assets/images/swap-vertical.png" alt="" /></i>
          <span v-show="trafficOrder === 'DESC'">{{ $t("buyAd-sotreList-high") }}</span>
          <span v-show="trafficOrder === 'ASC'">{{ $t("buyAd-sotreList-low") }}</span>
        </div>
      </div>
      <div class="store-list-wrap">
        <ul>
          <li v-for="item in storeListData.storeList" :key="item.companyStoreSid">
            <div class="img-wrap">
              <div v-if="item.files.length === 0">
                <img src="@/assets/images/store_xs_blank.png" alt="스토어 사진을 준비중입니다" />
              </div>
              <div v-else class="store-img-wrap" @click="showStoreDetail(item.companyStoreSid)">
                <v-lazy-image :src="`${storeListData.apiBaseUrl}/file/fileView/${item.files[0].fileSid}?size=252`" />
                <div class="basic-img"><img src="@/assets/images/thumbnail_default.png" alt="" /></div>
              </div>
            </div>
            <div @click="showStoreDetail(item.companyStoreSid)">
              <div class="title mt15">{{ item.companyStoreName }}</div>
              <div class="day-avg mt3">
                <p>
                  <span class="mr10">{{ $t("modal-storeDetail-month") }}</span>
                  <strong>{{ parseInt(item.monthTrafficAvg).toLocaleString() }}</strong>
                </p>
                <p>
                  <span class="mr10">{{ $t("report-total-sex") }}</span>
                  <strong>{{ $t("common-sex-male") }} {{ item.trafficMaleRate }} : {{ $t("common-sex-female") }} {{ item.trafficFemaleRate }}</strong>
                </p>
              </div>
              <!--              <div class="address mt4">{{ item.companyStoreAddress1 }}{{ item.companyStoreAddress2 }}</div>-->
            </div>
          </li>
        </ul>
      </div>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>

<script>
import VLazyImage from "v-lazy-image/v2";
import modalWrap from "@/components/modal/ModalTemplate";
import { ref, computed, getCurrentInstance, onMounted, reactive } from "@vue/composition-api/dist/vue-composition-api";
import bus from "@/utils/bus";
import storeModal from "@/components/modal/store/StoreDetail";
import { getPopupOpt } from "@/utils/modal";
export default {
  components: {
    modalWrap,
    VLazyImage,
  },
  props: ["buySid"],
  setup() {
    return {
      ...storeList(),
    };
  },
};
const storeList = () => {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const close = () => {
    _this.$emit("close");
  };
  const trafficOrder = ref("DESC");
  const storeListData = reactive({
    storeList: [],
    apiBaseUrl: process.env.VUE_APP_API,
    companyStoreName: "",
    monthTrafficAvg: "",
    trafficMaleRate: "",
    trafficFemaleRate: "",
    companyStoreBusinessTypeName: "",
    companyStoreAddress1: "",
    companyStoreAddress2: "",
  });
  const buyStoreList = computed(() => _this.$store.getters["purchase/getPurchaseStoreList"]);
  onMounted(() => {
    reload();
  });
  const reload = async () => {
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("purchase/PURCHASE_STORE_LIST", { id: _this.buySid, trafficOrder: trafficOrder.value });
      if (buyStoreList.value.addtuneApiResult.errorCode === 200) {
        storeListData.storeList = buyStoreList.value.addtuneApiResult.storeList;
      } else {
        alert(buyStoreList.value.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      alert(error);
    } finally {
      bus.$emit("end:spinner");
    }
  };
  const sortChange = () => {
    trafficOrder.value === "DESC" ? (trafficOrder.value = "ASC") : (trafficOrder.value = "DESC");
    reload();
  };
  const showStoreDetail = id => {
    _this.$modal.show(storeModal, { id: id, status: "purchase", apiBaseUrl: storeListData.apiBaseUrl }, getPopupOpt("storeModal", "1250px", "auto", false));
  };
  return { close, sortChange, showStoreDetail, trafficOrder, storeListData };
};
</script>

<style lang="scss" scoped>
.store-list-wrap {
  max-height: 583px;
  overflow-y: auto;
  overflow-x: hidden;
  & ul {
    display: flex;
    flex-wrap: wrap;
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
.sort-wrap {
  display: flex;
  justify-content: flex-end;
  & .sort {
    cursor: pointer;
    @include NotoSans(1.6, 400, #4f4f4f);
    & i {
      margin-right: 5px;
    }
  }
}
</style>
