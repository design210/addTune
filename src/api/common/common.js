import { createInstanceWithAuth } from "../index";

function getAreaList(id) {
  const params = {
    parentSid: id,
  };
  return createInstanceWithAuth("/search/area/list", {}, params).get();
}

function getSystemCodeList(id) {
  return createInstanceWithAuth(`/syscode/parents/${id}`, {}, {}).get();
}

function getBusinessCheck(num) {
  return createInstanceWithAuth(`/checkBusiness/${num}`, {}, {}).get();
}

function getBusinessJoin(data) {
  var frm = new FormData();
  frm.append("channeltuneFiles[]", data.channeltuneFiles);
  frm.append("homepageUserSid", data.homepageUserSid);
  frm.append("userAdvertiserLocalKind", data.userAdvertiserLocalKind);
  frm.append("userAdvertiserUserHp", data.userAdvertiserUserHp);
  frm.append("userAdvertiserCompanyCrNum", data.userAdvertiserCompanyCrNum);
  frm.append("userAdvertiserCompanyName", data.userAdvertiserCompanyName);
  frm.append("userAdvertiserCompanyCeo", data.userAdvertiserCompanyCeo);
  frm.append("userAdvertiserCompanyZipCode", data.userAdvertiserCompanyZipCode);
  frm.append("userAdvertiserCompanyAddress1", data.userAdvertiserCompanyAddress1);
  frm.append("userAdvertiserCompanyAddress2", data.userAdvertiserCompanyAddress2);
  frm.append("userAdvertiserCompanyTypeOfBusiness", data.userAdvertiserCompanyTypeOfBusiness);
  frm.append("userAdvertiserCompanyIndustries", data.userAdvertiserCompanyIndustries);
  frm.append("userAdvertiserCountryCode", data.userAdvertiserCountryCode);
  return createInstanceWithAuth(`/userAdvertiser`, frm, {}).post();
}

function getBusinessModify(data) {
  var frm = new FormData();
  frm.append("channeltuneFiles[]", data.channeltuneFiles);
  frm.append("userAdvertiserLocalKind", data.userAdvertiserLocalKind);
  frm.append("homepageUserSid", data.homepageUserSid);
  frm.append("userAdvertiserUserHp", data.userAdvertiserUserHp);
  frm.append("userAdvertiserCompanyCrNum", data.userAdvertiserCompanyCrNum);
  frm.append("userAdvertiserCompanyName", data.userAdvertiserCompanyName);
  frm.append("userAdvertiserCompanyCeo", data.userAdvertiserCompanyCeo);
  frm.append("userAdvertiserCompanyZipCode", data.userAdvertiserCompanyZipCode);
  frm.append("userAdvertiserCompanyAddress1", data.userAdvertiserCompanyAddress1);
  frm.append("userAdvertiserCompanyAddress2", data.userAdvertiserCompanyAddress2);
  frm.append("userAdvertiserCompanyTypeOfBusiness", data.userAdvertiserCompanyTypeOfBusiness);
  frm.append("userAdvertiserCompanyIndustries", data.userAdvertiserCompanyIndustries);
  return createInstanceWithAuth(`/userAdvertiser/${data.userAdvertiserSid}`, frm, {}).post();
}

function getInterbridInfo() {
  return createInstanceWithAuth("/search/companymasterinfo", {}, {}).get();
}

function getRefund() {
  return createInstanceWithAuth("/policy/productTerms/advertisementRefund", {}, {}).get();
}

function getAdvertiser() {
  return createInstanceWithAuth("/policy/productTerms/advertisement", {}, {}).get();
}

function getMake() {
  return createInstanceWithAuth("/policy/productTerms/make", {}, {}).get();
}

function getVideoRefund() {
  return createInstanceWithAuth("/policy/productTerms/videoRefund", {}, {}).get();
}

function getHomeData() {
  const params = {
    deviceType: "W",
  };
  return createInstanceWithAuth("/home", {}, params).get();
}
function getNationCode() {
  return createInstanceWithAuth("/nationtel", {}, {}).get();
}
export { getNationCode, getVideoRefund, getMake, getAdvertiser, getRefund, getAreaList, getSystemCodeList, getBusinessCheck, getBusinessJoin, getBusinessModify, getInterbridInfo, getHomeData };
