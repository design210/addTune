import { createInstanceWithAuth } from "../index";

function getPayment(data) {
  let paramData = {
    buyDateTime: data.buyDateTime,
    buyGoodName: data.buyGoodName,
    advertisingProductSid: data.advertisingProductSid,
    buyAdvertisingProductContentFlag: data.buyAdvertisingProductContentFlag,
    buyAdvertisingContentLength: data.buyAdvertisingContentLength,
    buyAdvertisingExposedCount: data.buyAdvertisingExposedCount,
    buyAdvertisingStoreCount: data.buyAdvertisingStoreCount,
    buyAdvertisingDiscount: data.buyAdvertisingDiscount,
    buyAdvertisingPayment: data.buyAdvertisingPayment,
    buyAdvertisingProductAreaChoice: data.buyAdvertisingProductAreaChoice,
    buyAdvertisingProductGradeChoice: data.buyAdvertisingProductGradeChoice,
    buyAdvertisingProductSlotCount: data.buyAdvertisingProductSlotCount,
    buyAdvertisingProductBenefitChoiceVal: data.buyAdvertisingProductBenefitChoiceVal,
    buyAdvertisingProductSaleVal: data.buyAdvertisingProductSaleVal,
    buyAdvertisingProductGiftVal: data.buyAdvertisingProductGiftVal,
    buyAdvertisingProductGiftStoreList: data.buyAdvertisingProductGiftStoreList,
    buyAdvertisingProductStartDate: data.buyAdvertisingProductStartDate,
    buyAdvertisingProductEndDate: data.buyAdvertisingProductEndDate,
    buyAdvertisingProductCategory: data.buyAdvertisingProductCategory,
    buyAdvertisingProductStoreType: data.buyAdvertisingProductStoreType,
    buyAdvertisingProductStoreList: data.buyAdvertisingProductStoreList,
    buyAdvertisingBenefitDiscount: data.buyAdvertisingBenefitDiscount,
    buyAdvertisingBenefitDiscountRatio: data.buyAdvertisingBenefitDiscountRatio,
    buyAdvertisingDefaultPrice: data.buyAdvertisingDefaultPrice,
    buyAdvertisingSlotDiscount: data.buyAdvertisingSlotDiscount,
    buyAdvertisingSlotDiscountRatio: data.buyAdvertisingSlotDiscountRatio,
    buyAdvertisingVat: data.buyAdvertisingVat,
    buyAdvertisingVatRatio: data.buyAdvertisingVatRatio,
  };
  return createInstanceWithAuth("/payment", paramData, {}).post();
}

function getPayType(data) {
  let paramData = {
    buyPaymentKind: data.buyPaymentKind,
  };
  return createInstanceWithAuth(`/payment/${data.order_id}`, paramData, {}).put();
}

function getPayVeri(id) {
  return createInstanceWithAuth(`/payment/${id}`, {}, {}).get();
}

function getCampaignNameModify(data) {
  let paramData = {
    campaignName: data.campaignName,
  };
  return createInstanceWithAuth(`/payment/campaignname/${data.id}`, paramData, {}).put();
}

function getEstimatePdf(id) {
  return createInstanceWithAuth(`/payment/estimate/${id}`, {}, {}).get();
}

export { getPayment, getPayType, getPayVeri, getCampaignNameModify, getEstimatePdf };
