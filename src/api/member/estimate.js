import { createInstanceWithAuth } from "../index";

function getEstimateList(data) {
  let params = {
    page: data.page,
    size: data.size,
    estimateStatus: data.estimateStatus,
    latestSort: data.latestSort,
    priceSort: data.priceSort,
  };
  return createInstanceWithAuth(`/estimate/list`, {}, params).get();
}
function getEstimateDetail(id) {
  return createInstanceWithAuth(`/estimate/${id}`, {}, {}).get();
}

function saveComment(data) {
  var frm = new FormData();
  frm.append("channeltuneFiles[]", data.channeltuneFiles);
  frm.append("systemCommentDocument", data.systemCommentDocument);
  frm.append("systemCommentWriteName", data.systemCommentWriteName);
  return createInstanceWithAuth(`/estimate/${data.id}/comment`, frm, {}).post();
}

function getEstimatePayinfo(data) {
  let params = {
    buyGoodName: data.buyGoodName,
    buyAdvertisingPayment: data.buyAdvertisingPayment,
    estimateSid: data.estimateSid,
    buyEstimateTaxBillFlag: data.buyEstimateTaxBillFlag,
  };
  return createInstanceWithAuth(`/payment/estimate`, params, {}).post();
}

export { getEstimateList, getEstimateDetail, saveComment, getEstimatePayinfo };
