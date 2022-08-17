import { createInstanceWithAuth } from "../index";

function getPurchaseList(data) {
  let params = {
    page: data.page,
    size: data.size,
    buyAdvertisingStatus: data.buyAdvertisingStatus,
    latestSort: data.latestSort,
  };
  return createInstanceWithAuth(`/paymentList/advertising`, {}, params).get();
}

function getPurchaseDetail(id) {
  return createInstanceWithAuth(`/paymentList/advertising/${id}`, {}, {}).get();
}

function getPurchaseAdvertisingInfo(id) {
  return createInstanceWithAuth(`/paymentList/advertising/info/${id}`, {}, {}).get();
}

function getVideoPurchaseList(data) {
  let params = {
    page: data.page,
    size: data.size,
    buyAdvertisingProductVideoStatus: data.buyAdvertisingProductVideoStatus,
    latestSort: data.latestSort,
  };
  return createInstanceWithAuth(`/paymentList/video/list`, {}, params).get();
}

function getVideoPurchaseDetail(id) {
  return createInstanceWithAuth(`/paymentList/video/${id}`, {}, {}).get();
}
function getPurchaseStoreList(data) {
  let params = {
    trafficOrder: data.trafficOrder,
  };
  return createInstanceWithAuth(`/paymentList/advertising/${data.id}/storeList`, {}, params).get();
}

function getPurchaseStoreDetail(id) {
  return createInstanceWithAuth(`/search/tuneStore/${id}/withoutPrice`, {}, {}).get();
}

export { getPurchaseStoreDetail, getPurchaseStoreList, getVideoPurchaseDetail, getPurchaseList, getPurchaseDetail, getPurchaseAdvertisingInfo, getVideoPurchaseList };
