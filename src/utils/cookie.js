import VueCookies from "vue-cookies";
//생성
function saveAccessTokenCookie(value) {
  VueCookies.set("accessToken", value, "0");
}
function saveHomepageUserNameCookie(value) {
  VueCookies.set("homepageUserName", value, "0");
}
function saveHomepageUserKindCookie(value) {
  VueCookies.set("homepageUserKind", value, "0");
}
function saveEstimateCookie(value) {
  VueCookies.set("estimate", value, "0");
}
function saveAdBeforeSetCookie(value) {
  VueCookies.set("adBeforeSet", value, "0");
}
function saveAcountTransferCookie(value) {
  VueCookies.set("acountTransfer", value, "0");
}
function saveHomepageUserEmailCookie(value) {
  VueCookies.set("homepageUserEmail", value, "0");
}
function saveCampaignSidCookie(value) {
  VueCookies.set("campaignSid", value, "0");
}
function neverSeeAgainCookieAdContents(value) {
  VueCookies.set("NSadContents", value, "100000d");
}
function saveHideModalCookie(value, day) {
  VueCookies.set("hideModalCookie", value, day);
}
function saveSnsLoginCookie(value) {
  VueCookies.set("snsLogin", value, "100000d");
}
function saveLanguageCookie(value) {
  console.log(value);
  VueCookies.set("language", value, "100000d");
}

//호출
function getCampaignSidCookie() {
  return VueCookies.get("campaignSid");
}
function getHideModalCookie() {
  return VueCookies.get("hideModalCookie");
}
function getPayInfoCookie() {
  return VueCookies.get("payInfo");
}
function getAccessTokenCookie() {
  return VueCookies.get("accessToken");
}
function getHomepageUserNameCookie() {
  return VueCookies.get("homepageUserName");
}
function getHomepageUserKindCookie() {
  return VueCookies.get("homepageUserKind");
}
function getEstimateCookie() {
  return VueCookies.get("estimate");
}
function getAdBeforeCookie() {
  return VueCookies.get("adBeforeSet");
}
function getAcountTransferCookie() {
  return VueCookies.get("acountTransfer");
}
function getHomepageUserEmailCookie() {
  return VueCookies.get("homepageUserEmail");
}
function getNeverSeeAgainCookieAdContents() {
  return VueCookies.get("NSadContents");
}
function getSnsLoginCookie() {
  return VueCookies.get("snsLogin");
}
function getLanguageCookie() {
  return VueCookies.get("language");
}

//삭제
function deleteCookie(value) {
  VueCookies.remove(value);
}

export {
  getCampaignSidCookie,
  saveCampaignSidCookie,
  getHideModalCookie,
  saveHideModalCookie,
  getPayInfoCookie,
  saveAdBeforeSetCookie,
  getAdBeforeCookie,
  saveAccessTokenCookie,
  neverSeeAgainCookieAdContents,
  getAccessTokenCookie,
  deleteCookie,
  saveHomepageUserNameCookie,
  saveHomepageUserKindCookie,
  getHomepageUserNameCookie,
  getHomepageUserKindCookie,
  saveEstimateCookie,
  getEstimateCookie,
  saveAcountTransferCookie,
  getAcountTransferCookie,
  saveHomepageUserEmailCookie,
  getHomepageUserEmailCookie,
  getNeverSeeAgainCookieAdContents,
  saveSnsLoginCookie,
  getSnsLoginCookie,
  saveLanguageCookie,
  getLanguageCookie,
};
