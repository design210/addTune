import { createInstanceWithAuth } from "../index";

function getCampaignList() {
  return createInstanceWithAuth(`/report/campaign/list`, {}, {}).get();
}
function getCampaignInfo(id) {
  return createInstanceWithAuth(`/report/campaign/${id}`, {}, {}).get();
}
function getReportAll(data) {
  let params = {
    searchStartDate: data.searchStartDate,
    searchEndDate: data.searchEndDate,
    companyStoreSid: data.companyStoreSid,
  };
  return createInstanceWithAuth(`/report/campaign/${data.id}/summary`, {}, params).get();
}
function getStoreList(data) {
  let params = {
    storeArea: data.storeArea,
    storeType: data.storeType,
    searchText: data.searchText,
    sortTraffic: data.sortTraffic,
  };
  return createInstanceWithAuth(`/report/campaign/${data.id}/store/list`, {}, params).get();
}

function setStoreFavorite(data) {
  let paramData = {
    companyStoreSid: data.companyStoreSid,
    favoriteFlag: data.favoriteFlag,
  };
  return createInstanceWithAuth(`/report/campaign/${data.id}/favorite`, paramData, {}).post();
}

function setStoreType(id) {
  return createInstanceWithAuth(`/report/campaign/${id}/storeType`, {}, {}).get();
}

function setAera(data) {
  let params = {
    parentsSid: data.parentsSid,
  };
  return createInstanceWithAuth(`/report/campaign/${data.id}/area`, {}, params).get();
}

function getStoreInfo(data) {
  return createInstanceWithAuth(`/report/campaign/${data.campaignId}/store/${data.companyId}`, {}, {}).get();
}

function getReportUpdateDate() {
  return createInstanceWithAuth("/report/latestUpdatedDate", {}, {}).get();
}

export { getReportUpdateDate, getStoreInfo, setAera, setStoreType, getCampaignList, getCampaignInfo, getReportAll, getStoreList, setStoreFavorite };
