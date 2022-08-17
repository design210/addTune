<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>{{ $t("modal-campaignInfo-title") }}</h2>
    </template>
    <template slot="body">
      <h3>{{ name }}</h3>
      <table>
        <colgroup>
          <col width="150" />
          <col width="*" />
          <col width="150" />
          <col width="*" />
        </colgroup>
        <tr>
          <td>{{ $t("adContents-detail-prodName") }}</td>
          <td colspan="3">{{ campaignData.advertising_product }}</td>
        </tr>
        <tr>
          <td>{{ $t("adContents-detail-adExecution") }}</td>
          <td>{{ campaignData.execution }}{{ $t("common-unit-day") }} ({{ campaignData.buyAdvertisingProductStartDate }} ~ {{ campaignData.buyAdvertisingProductEndDate }})</td>
          <td>{{ $t("pay-adProdInfo-slot") }}</td>
          <td>{{ campaignData.buyAdvertisingProductSlotCount }}{{ $t("common-unit-amount") }}</td>
        </tr>
        <tr>
          <td>{{ $t("pay-adProdInfo-zone") }}</td>
          <td colspan="3">{{ campaignData.buyAdvertisingProductAreaChoiceList }}</td>
        </tr>
        <tr>
          <td>{{ $t("pay-adProdInfo-categories") }}</td>
          <td colspan="3">{{ campaignData.buyAdvertisingProductCategoryName }}</td>
        </tr>
        <tr>
          <td>{{ $t("pay-adProdInfo-hopeStore") }}</td>
          <td colspan="3">{{ campaignData.buyAdvertisingProductStoreTypeList }}</td>
        </tr>
        <tr>
          <td>{{ $t("pay-adProdInfo-tuneStore") }}</td>
          <td colspan="3">{{ $t("common-unit-total") }} {{ __localeString(campaignData.buyAdvertisingStoreCount) }}{{ $t("common-unit-area") }}</td>
        </tr>
      </table>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { computed, getCurrentInstance, onMounted, reactive } from "@vue/composition-api";
import betweenDay from "@/utils/betweenDay";
import localeString from "@/mixins/localeString";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";

export default {
  components: {
    modalWrap,
  },
  mixins: [localeString, loading],
  props: ["sid", "name"],
  setup() {
    return {
      ...campaignInfo(),
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};

//캠페인 정보
function campaignInfo() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const campaignData = reactive({
    advertising_product: "",
    buyAdvertisingProductStartDate: "",
    buyAdvertisingProductEndDate: "",
    execution: "",
    buyAdvertisingProductSlotCount: "",
    buyAdvertisingProductAreaChoiceList: "",
    buyAdvertisingProductCategoryName: "",
    buyAdvertisingProductStoreTypeList: "",
    buyAdvertisingStoreCount: 0,
  });
  const getCampaignInfo = computed(() => _this.$store.getters["report/getCampaignInfo"]);
  onMounted(async () => {
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("report/CAMPAIGN_INFO", _this.sid);
      //await _this.$store.dispatch('report/CAMPAIGN_INFO', 511); //임시
      const info = getCampaignInfo.value.addtuneApiResult;
      if (info.errorCode === 200) {
        const campaignInfo = getCampaignInfo.value.addtuneApiResult.campaignInfo;
        campaignData.advertising_product = campaignInfo.advertising_product.advertisingProductName;
        campaignData.buyAdvertisingProductStartDate = campaignInfo.buyAdvertisingProductStartDate;
        campaignData.buyAdvertisingProductEndDate = campaignInfo.buyAdvertisingProductEndDate;
        campaignData.execution = betweenDay(campaignData.buyAdvertisingProductStartDate.replace(/\-/g, ""), campaignData.buyAdvertisingProductEndDate.replace(/\-/g, ""));
        campaignData.buyAdvertisingProductSlotCount = campaignInfo.buyAdvertisingProductSlotCount;
        campaignInfo.buyAdvertisingProductAreaChoiceList === "시스템 기본 코드 행정구역"
          ? (campaignData.buyAdvertisingProductAreaChoiceList = _this.$t("buyAd-area-all-all2"))
          : (campaignData.buyAdvertisingProductAreaChoiceList = campaignInfo.buyAdvertisingProductAreaChoiceList);
        campaignData.buyAdvertisingProductCategoryName = campaignInfo.buyAdvertisingProductCategoryName;
        campaignData.buyAdvertisingProductStoreTypeList = campaignInfo.buyAdvertisingProductStoreTypeList;
        campaignData.buyAdvertisingStoreCount = campaignInfo.buyAdvertisingStoreCount;
      } else {
        alert(info.errorMessage);
      }
    } catch (error) {
      alert(error);
    } finally {
      bus.$emit("end:spinner");
    }
  });
  return { campaignData };
}
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  @include NotoSans(3, 700, #333333);
}

h3 {
  @include NotoSans(2, 500, #333333);
}

table {
  border-top: 2px solid #ff4d56;
  border-bottom: 1px solid #828282;
  margin-top: 20px;

  & tr {
    & td {
      @include NotoSans(1.5, 400, #333333);
      padding: 20px 10px;
      border-bottom: 1px solid #dddddd;

      &:nth-child(1) {
        font-weight: 700 !important;
      }

      &:nth-child(3) {
        font-weight: 700 !important;
        border-left: 1px solid #dddddd;
      }
    }

    &:last-child {
      & td {
        border-bottom: 0;
      }
    }
  }
}
</style>
