import {
  loginUser,
  loginout,
  joinUser,
  emailverify,
  getTerms,
  getPrivacy,
  getPW,
  getPromotionInfo,
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
} from "@/api/member/member";
import { saveHomepageUserEmailCookie, saveAccessTokenCookie, saveHomepageUserNameCookie, saveHomepageUserKindCookie, deleteCookie } from "@/utils/cookie";
const member = {
  namespaced: true,
  state: {
    login: {},
    getJoinInfo: {},
    getEmailVerify: {},
    getTerms: "",
    getPrivacy: "",
    getPromotionInfo: "",
    getPwResult: {},
    getAdvertiserDetail: {},
    getMe: {},
    setName: {},
    setPw: {},
    getUserWithDrawReson: {},
    userWithDraw: {},
    getUserConfig: {},
    setUserConfig: {},
    getPasswordResetCheck: {},
    getSnsLogin: {},
    getJoinSnsInfo: {},
    getPW: {},
  },
  getters: {
    login: state => {
      return state.login;
    },
    getJoinInfo: state => {
      return state.getJoinInfo;
    },
    getEmailVerify: state => {
      return state.getEmailVerify;
    },
    getTerms: state => {
      return state.getTerms;
    },
    getPrivacy: state => {
      return state.getPrivacy;
    },
    getPromotionInfo: state => {
      return state.getPromotionInfo;
    },
    getPwResult: state => {
      return state.getPwResult;
    },
    getAdvertiserDetail: state => {
      return state.getAdvertiserDetail;
    },
    getMe: state => {
      return state.getMe;
    },
    setName: state => {
      return state.setName;
    },
    setPw: state => {
      return state.setPw;
    },
    getUserWithDrawReson: state => {
      return state.getUserWithDrawReson;
    },
    userWithDraw: state => {
      return state.userWithDraw;
    },
    getUserConfig: state => {
      return state.getUserConfig;
    },
    setUserConfig: state => {
      return state.setUserConfig;
    },
    getPasswordResetCheck: state => {
      return state.getPasswordResetCheck;
    },
    getSnsLogin: state => {
      return state.getSnsLogin;
    },
    getJoinSnsInfo: state => {
      return state.getJoinSnsInfo;
    },
    getPW: state => {
      return state.getPW;
    },
  },
  mutations: {
    login(state, userInfo) {
      state.login = userInfo;
    },
    getJoinInfo(state, joinInfo) {
      state.getJoinInfo = joinInfo;
    },
    getEmailVerify(state, info) {
      state.getEmailVerify = info;
    },
    getTerms(state, info) {
      state.getTerms = info;
    },
    getPrivacy(state, info) {
      state.getPrivacy = info;
    },
    getPromotionInfo(state, info) {
      state.getPromotionInfo = info;
    },
    getPwResult(state, info) {
      state.getPwResult = info;
    },
    getAdvertiserDetail(state, info) {
      state.getAdvertiserDetail = info;
    },
    getMe(state, result) {
      state.getMe = result;
    },
    setName(state, result) {
      state.setName = result;
    },
    setPw(state, result) {
      state.setPw = result;
    },
    getUserWithDrawReson(state, result) {
      state.getUserWithDrawReson = result;
    },
    userWithDraw(state, result) {
      state.userWithDraw = result;
    },
    getUserConfig(state, result) {
      state.getUserConfig = result;
    },
    setUserConfig(state, result) {
      state.setUserConfig = result;
    },
    getPasswordResetCheck(state, result) {
      state.getPasswordResetCheck = result;
    },
    getSnsLogin(state, result) {
      state.getSnsLogin = result;
    },
    getJoinSnsInfo(state, result) {
      state.getJoinSnsInfo = result;
    },
    getPW(state, result) {
      state.getPW = result;
    },
  },
  actions: {
    async LOGIN({ commit }, datas) {
      const { data } = await loginUser(datas);
      const result = data.addtuneApiResult;
      if (result.errorCode == 200) {
        saveAccessTokenCookie(result.login.access_token);
        saveHomepageUserNameCookie(result.login.current_user.homepageUserName);
        saveHomepageUserKindCookie(result.login.current_user.homepageUserKind);
        saveHomepageUserEmailCookie(result.login.current_user.homepageUserEmail);
      }
      commit("login", data);
    },
    async LOGOUT() {
      await loginout();
      deleteCookie("accessToken");
      deleteCookie("homepageUserName");
      deleteCookie("homepageUserKind");
      deleteCookie("homepageUserEmail");
    },
    async JOIN({ commit }, datas) {
      const { data } = await joinUser(datas);
      commit("getJoinInfo", data);
    },
    async JOIN_SNS({ commit }, datas) {
      const { data } = await getJoinSnsInfo(datas);
      commit("getJoinSnsInfo", data);
    },
    async EMAILVERIFY({ commit }, id) {
      const { data } = await emailverify(id);
      commit("getEmailVerify", data);
    },
    async GET_TERMS({ commit }) {
      const { data } = await getTerms();
      commit("getTerms", data);
    },
    async GET_PRICACY({ commit }) {
      const { data } = await getPrivacy();
      commit("getPrivacy", data);
    },
    async GET_PROMOTION_INFO({ commit }) {
      const { data } = await getPromotionInfo();
      commit("getPromotionInfo", data);
    },
    async FINDPW({ commit }, email) {
      const { data } = await getPW(email);
      commit("getPW", data);
    },
    async RESETPW({ commit }, datas) {
      const { data } = await resetPW(datas);
      commit("getPwResult", data);
    },
    //광고주 정보 상세 조회
    async ADVERTISER_DETAIL({ commit }, id) {
      const { data } = await getAdvertiserDetail(id);
      commit("getAdvertiserDetail", data);
    },
    //내정보 조회
    async ME({ commit }) {
      const { data } = await getMe();
      commit("getMe", data);
    },
    //이름변경
    async CHANGE_NAME({ commit }, datas) {
      const { data } = await setName(datas);
      commit("setName", data);
    },
    //비밀번호 변경
    async CHANGE_PW({ commit }, datas) {
      const { data } = await setPw(datas);
      commit("setPw", data);
    },
    async GET_USER_WITH_DRAW_RESON({ commit }) {
      const { data } = await getUserWithDrawReson();
      commit("getUserWithDrawReson", data);
    },
    async USER_WITH_DRAW({ commit }, datas) {
      const { data } = await userWithDraw(datas);
      commit("userWithDraw", data);
    },
    async GET_USER_CONFIG({ commit }) {
      const { data } = await getUserConfig();
      commit("getUserConfig", data);
    },
    async SET_USER_CONFIG({ commit }, datas) {
      const { data } = await setUserConfig(datas);
      commit("setUserConfig", data);
    },
    async PASSWORD_RESET_CHECK({ commit }, id) {
      const { data } = await getPasswordResetCheck(id);
      commit("getPasswordResetCheck", data);
    },
    async SNS_LOGIN({ commit }, datas) {
      const { data } = await getSnsLogin(datas);
      commit("getSnsLogin", data);
    },
  },
};

export default member;
