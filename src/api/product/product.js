import { createInstanceWithAuth } from "../index";

function getProductVideoList(data) {
  let params = {
    size: data.size,
    page: data.page,
  };
  return createInstanceWithAuth(`/advertisingProductVideo/list`, {}, params).get();
}
function getProductVideoDetail(id) {
  return createInstanceWithAuth(`/advertisingProductVideo/${id}`, {}, {}).get();
}
function getPortFolioList(data) {
  let params = {
    size: data.size,
    page: data.page,
    advertisingProductSid: data.advertisingProductSid,
  };
  return createInstanceWithAuth(`/advertisingProductVideo/portfolio/list`, {}, params).get();
}

function commission(data) {
  let paramData = {
    buyGoodName: data.buyGoodName,
    advertisingProductSid: data.advertisingProductSid,
    buyAdvertisingProductVideoHp: data.buyAdvertisingProductVideoHp,
    buyAdvertisingProductVideoDate: data.buyAdvertisingProductVideoDate,
    buyAdvertisingProductVideoLength: data.buyAdvertisingProductVideoLength,
    buyAdvertisingProductVideoSampleUrl: data.buyAdvertisingProductVideoSampleUrl,
    buyAdvertisingProductVideoEtc: data.buyAdvertisingProductVideoEtc,
  };
  return createInstanceWithAuth(`/payment/advertisingProductVideo/commission`, paramData, {}).post();
}

function levelCommission(data) {
  let paramData = {
    buyGoodName: data.buyGoodName,
    advertisingProductSid: data.advertisingProductSid,
    buyAdvertisingProductVideoHp: data.buyAdvertisingProductVideoHp,
    buyAdvertisingProductVideoDate: data.buyAdvertisingProductVideoDate,
    buyAdvertisingProductVideoDefaultPrice: data.buyAdvertisingProductVideoDefaultPrice,
    buyAdvertisingProductVideoSampleUrl: data.buyAdvertisingProductVideoSampleUrl,
    buyAdvertisingProductVideoEtc: data.buyAdvertisingProductVideoEtc,
  };
  return createInstanceWithAuth(`/payment/advertisingProductVideo`, paramData, {}).post();
}

function hpModify(data) {
  let paramData = {
    buyAdvertisingProductVideoHp: data.buyAdvertisingProductVideoHp,
  };
  return createInstanceWithAuth(`/payment/phone/${data.id}`, paramData, {}).put();
}

export { getProductVideoList, getProductVideoDetail, getPortFolioList, commission, levelCommission, hpModify };
