import axios from "axios";
import { baseURL } from "../index";
import { createInstanceWithAuth } from "../index";
//로그인 체크
async function loginUser(userData) {
  try {
    const response = await axios.post(`${baseURL}/login`, userData, {
      validateStatus: function (status) {
        // 상태 코드가 402 이상일 경우 거부. 나머지(402보다 작은)는 허용.
        return status < 500;
      },
    });
    return response;
  } catch (error) {
    console.log("error :", error);
  }
}
//sns 로그인
async function getSnsLogin(userData) {
  try {
    const response = await axios.post(`${baseURL}/snsLogin`, userData, {
      validateStatus: function (status) {
        // 상태 코드가 402 이상일 경우 거부. 나머지(402보다 작은)는 허용.
        return status < 500;
      },
    });
    return response;
  } catch (error) {
    console.log("error :", error);
  }
}
//로그아웃
function loginout() {
  return createInstanceWithAuth(`/logout`, {}, {}).post();
}
//회원가입
async function joinUser(userData) {
  try {
    const response = await axios.post(`${baseURL}/member`, userData, {
      validateStatus: function (status) {
        return status < 500;
      },
    });
    return response;
  } catch (error) {
    console.log("error :", error);
  }
}
//SNS 회원가입
async function getJoinSnsInfo(userData) {
  try {
    const response = await axios.post(`${baseURL}/member/sns`, userData, {
      validateStatus: function (status) {
        return status < 500;
      },
    });
    return response;
  } catch (error) {
    console.log("error :", error);
  }
}
//이메일확인
function emailverify(id) {
  return createInstanceWithAuth(`/emailverify/${id}`, {}, {}).get();
}
//이용약관
function getTerms() {
  return createInstanceWithAuth(`/policy/terms`, {}, {}).get();
}
//개인정보 취급
function getPrivacy() {
  return createInstanceWithAuth(`/policy/privacy`, {}, {}).get();
}
//프로모션 정보 수신
function getPromotionInfo() {
  return createInstanceWithAuth(`/policy/promotion`, {}, {}).get();
}
function getPW(email) {
  let paramData = {
    homepageUserEmail: email,
  };
  return createInstanceWithAuth(`/passwordemailsend`, paramData, {}).put();
}
function resetPW(data) {
  let paramData = {
    verificationCode: data.verificationCode,
    password: data.password,
    password_confirmation: data.password_confirmation,
  };
  return createInstanceWithAuth(`/passwordverify`, paramData, {}).put();
}
//광고주 정보 상세 조회
function getAdvertiserDetail(id) {
  return createInstanceWithAuth(`/userAdvertiser/${id}`, {}, {}).get();
}
//내 정보
function getMe() {
  return createInstanceWithAuth(`/me`, {}, {}).post();
}
//이름변경
function setName(data) {
  let paramData = {
    homepageUserEmail: data.homepageUserEmail,
    homepageUserName: data.homepageUserName,
  };
  return createInstanceWithAuth(`/memberinfochange`, paramData, {}).put();
}
//비밀번호 변경
function setPw(data) {
  let paramData = {
    homepageUserEmail: data.homepageUserEmail,
    oldPassword: data.oldPassword,
    password: data.password,
    password_confirmation: data.password_confirmation,
  };
  return createInstanceWithAuth(`/passwordchange`, paramData, {}).put();
}

//서비스 탈퇴 사유
function getUserWithDrawReson() {
  return createInstanceWithAuth("/userWithdraw/reason/list", {}, {}).get();
}

function userWithDraw(data) {
  let params = {
    password: data.password,
    reason: data.reason,
    reasonEtc: data.reasonEtc,
  };
  return createInstanceWithAuth("/userWithdraw", params, {}).post();
}
//앱 설정
function getUserConfig() {
  return createInstanceWithAuth("/userConfig/list", {}, {}).get();
}
function setUserConfig(data) {
  let params = {
    configValue: data.configValue,
  };
  return createInstanceWithAuth(`/userConfig/${data.sysCodeSid}`, params, {}).post();
}

function getPasswordResetCheck(id) {
  return createInstanceWithAuth(`/password/verification/${id}`, {}, {}).get();
}

export {
  loginUser,
  loginout,
  joinUser,
  emailverify,
  getTerms,
  getPromotionInfo,
  getPrivacy,
  getPW,
  resetPW,
  getAdvertiserDetail,
  getMe,
  setName,
  setPw,
  getUserWithDrawReson,
  userWithDraw,
  getUserConfig,
  setUserConfig,
  getPasswordResetCheck,
  getSnsLogin,
  getJoinSnsInfo,
};
