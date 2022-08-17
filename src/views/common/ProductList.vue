<template>
  <div class="sub-wrapper mt100">
    <h1>{{ $t("mainAddtuneProductList-h1") }}</h1>
    <h2>{{ $t("mainAddtuneProductList-h2") }}</h2>
    <ul class="pro-list mt80">
      <li v-for="item in prodData.list" :key="item.advertisingProductSid" @click="$router.push(`/ad/adMain/adManage/${item.advertisingProductSid}`)">
        <div>
          <span class="discount" v-if="item.advertisingProductOptionSummary !== null">{{ item.advertisingProductOptionSummary }}</span>
          <span v-if="item.file_master.length > 0"
            ><span v-for="file in item.file_master" :key="file.fileSid"
              ><img :src="`${apiBaseUrl}/file/fileView/${file.fileSid}?size=266`" :alt="file.advertisingProductSummary" v-if="file.fileKind === 'SYS21B09B001'" /></span
          ></span>
          <span v-else><img src="@/assets/images/none.png" alt="" /></span>
        </div>
        <div class="pt15 pl15 pr15 pb17">
          <div>
            <span class="price">{{ __localeString(item.advertisingProductPrice) }}</span>
            <span class="unit">원~</span>
          </div>
          <div class="name">{{ item.advertisingProductName }}</div>
        </div>
      </li>
    </ul>
    <div class="text-center mt30 mb150">
      <v-pagination v-model="page" :length="prodData.lastPage" :total-visible="10"></v-pagination>
    </div>
  </div>
</template>

<script>
import localeString from "@/mixins/localeString";
import { ref, watch, reactive, computed, onMounted, getCurrentInstance } from "@vue/composition-api";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  mixins: [localeString, loading],
  props: ["apiBaseUrl"],
  setup() {
    return {
      ...product(),
    };
  },
};

function product() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const page = ref(1);
  const prodData = reactive({
    list: [],
    lastPage: 1,
    size: 16,
  });
  const prod = computed(() => _this.$store.getters["admain/getAdListAndBanner"]);
  onMounted(() => {
    reload();
  });
  watch(page, () => {
    reload();
  });
  const reload = async () => {
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("admain/AD_LIST_AND_BANNER", { page: page.value, size: prodData.size, device: "SYS21A28B014" });
      if (prod.value.addtuneApiResult.errorCode == 200) {
        prodData.lastPage = prod.value.addtuneApiResult.advertisingProduct.advertisingProductList.last_page;
        prodData.list = prod.value.addtuneApiResult.advertisingProduct.advertisingProductList.data;
      } else {
        alert(prod.value.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  };
  return { prodData, page };
}
</script>

<style lang="scss" scoped>
h1 {
  @include NotoSans(2.5, 700, #333333);
}
h2 {
  @include NotoSans(1.5, 400, #828282);
}
.pro-list {
  display: flex;
  flex-wrap: wrap;
  & li {
    width: calc(25% - 12px);
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    @include boxshadow(3px, 3px, 30px, 0px, rgba(0, 0, 0, 0.12));
    cursor: pointer;
    margin: 0 16px 16px 0;
    &:nth-child(4n) {
      margin-right: 0;
    }
    & .discount {
      background: rgba(0, 0, 0, 0.8);
      height: 27px;
      @include NotoSans(1.3, 700, #ffffff);
      border-radius: 14px;
      line-height: 27px !important;
      position: absolute;
      left: 10px;
      top: 10px;
      padding: 0 10px;
    }
    & img {
      width: 266px;
      height: 210px;
    }
    & .price {
      @include Montserrat(2.5, 600, #333333);
    }
    & .unit {
      @include NotoSans(1.5, 400, #333333);
      margin-left: 5px;
    }
    & .name {
      @include NotoSans(1.5, 400, #4f4f4f);
    }
  }
}
</style>
