import { createInstanceWithAuth } from "../index";

function getAdPriceCalc(data) {
  let params = {
    address: data.address,
    period: data.period,
  };
  return createInstanceWithAuth("/advertisingProduct/price/expect", {}, params).get();
}

function getAdListAndBanner(data) {
  let params = {
    device: data.device,
    page: data.page,
    size: data.size,
  };
  return createInstanceWithAuth("/advertisingProduct/list", {}, params).get();
}

function setAdEstimate(data) {
  let paramData = {
    userAdvertiserSid: data.userAdvertiserSid,
    estimateExposureCountCode: data.basic.estimateExposureCountCode,
    estimateExposureAccount: data.basic.estimateExposureAccount,
    estimateExposureRate: data.basic.estimateExposureRate,
    estimateExposureCount: data.basic.estimateExposureCount,
    estimateExposureContentFlag: data.basic.estimateExposureContentFlag,
    estimateExposureContentLength: data.basic.estimateExposureContentLength,
    estimateExposureCategoryCode: data.basic.estimateExposureCategoryCode.code,
    estimateExposureMonth: data.basic.estimateExposureMonth,
    estimateExposureStartDate: data.basic.estimateExposureStartDate,
    estimateExposureEndDate: data.basic.estimateExposureEndDate,
    estimateExposureEtc: data.basic.estimateExposureEtc,
    estimateExposureTotalCount: data.basic.estimateExposureTotalCount,
  };

  return createInstanceWithAuth("/exposureEstimate", paramData, {}).post();
}

function setAdDetailDate(id) {
  return createInstanceWithAuth(`/advertisingProduct/${id}`, {}, {}).get();
}

function getAdStoreList(data) {
  let params = {
    areaList: data.areaList,
    advertiseStartDate: data.advertiseStartDate,
    advertiseEndDate: data.advertiseEndDate,
    slotCount: data.slotCount,
    trafficOrder: data.trafficOrder,
    advertisingProductSid: data.advertisingProductSid,
    storeTypeList: data.storeTypeList,
  };
  return createInstanceWithAuth("/search/tuneStore/list", {}, params).get();
}

function getAdFinalPriceCalc(data) {
  let params = {
    advertisingProductSid: data.advertisingProductSid,
    slotCount: data.slotCount,
    advertiseStartDate: data.advertiseStartDate,
    advertiseEndDate: data.advertiseEndDate,
    storeList: data.storeList,
  };
  return createInstanceWithAuth("/advertisingProduct/price/calc", {}, params).get();
}

export { getAdPriceCalc, getAdListAndBanner, setAdEstimate, setAdDetailDate, getAdStoreList, getAdFinalPriceCalc };
