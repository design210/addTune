import {
  getRefund,
  getAreaList,
  getSystemCodeList,
  getBusinessCheck,
  getBusinessJoin,
  getBusinessModify,
  getInterbridInfo,
  getAdvertiser,
  getMake,
  getVideoRefund,
  getHomeData,
  getNationCode,
} from "@/api/common/common";
const common = {
  namespaced: true,
  state: {
    getAreaList: {},
    getSystemCodeList: {},
    getBusinessCheck: {},
    getBusinessJoin: {},
    getBusinessModify: {},
    getInterbridInfo: {},
    termsRefund: {},
    termsAdvertiser: {},
    getMake: {},
    getVideoRefund: {},
    percentage: 0,
    getHomeData: {},
    nationCode: {},
  },
  getters: {
    getAreaList: state => {
      return state.getAreaList;
    },
    getSystemCodeList: state => {
      return state.getSystemCodeList;
    },
    getBusinessCheck: state => {
      return state.getBusinessCheck;
    },
    getBusinessJoin: state => {
      return state.getBusinessJoin;
    },
    getBusinessModify: state => {
      return state.getBusinessModify;
    },
    getInterbridInfo: state => {
      return state.getInterbridInfo;
    },
    termsRefund: state => {
      return state.termsRefund;
    },
    termsAdvertiser: state => {
      return state.termsAdvertiser;
    },
    getMake: state => {
      return state.getMake;
    },
    getVideoRefund: state => {
      return state.getVideoRefund;
    },
    percentage: state => {
      return state.percentage;
    },
    getHomeData: state => {
      return state.getHomeData;
    },
    nationCode: state => {
      return state.nationCode;
    },
  },
  mutations: {
    getAreaList(state, result) {
      state.getAreaList = result;
    },
    getSystemCodeList(state, result) {
      state.getSystemCodeList = result;
    },
    getBusinessCheck(state, result) {
      state.getBusinessCheck = result;
    },
    getBusinessJoin(state, result) {
      state.getBusinessJoin = result;
    },
    getBusinessModify(state, result) {
      state.getBusinessModify = result;
    },
    getInterbridInfo(state, result) {
      state.getInterbridInfo = result;
    },
    termsRefund(state, result) {
      state.termsRefund = result;
    },
    termsAdvertiser(state, result) {
      state.termsAdvertiser = result;
    },
    getMake(state, result) {
      state.getMake = result;
    },
    getVideoRefund(state, result) {
      state.getVideoRefund = result;
    },
    percentage(state, list) {
      state.percentage = list;
    },
    getHomeData(state, result) {
      state.getHomeData = result;
    },
    nationCode(state, result) {
      state.nationCode = result;
    },
  },
  actions: {
    async AREA_LIST({ commit }, id) {
      const { data } = await getAreaList(id);
      commit("getAreaList", data);
    },
    async SYSCODE({ commit }, id) {
      const { data } = await getSystemCodeList(id);
      commit("getSystemCodeList", data);
    },
    async BUSINESS_CHECK({ commit }, num) {
      const { data } = await getBusinessCheck(num);
      commit("getBusinessCheck", data);
    },
    async BUSINESS_JOIN({ commit }, datas) {
      const { data } = await getBusinessJoin(datas);
      commit("getBusinessJoin", data);
    },
    async BUSINESS_MODIFY({ commit }, datas) {
      const { data } = await getBusinessModify(datas);
      commit("getBusinessModify", data);
    },
    async INTERBRID_INFO({ commit }, datas) {
      const { data } = await getInterbridInfo(datas);
      commit("getInterbridInfo", data);
    },
    async TERMS_REFUND({ commit }, datas) {
      const { data } = await getRefund(datas);
      commit("termsRefund", data);
    },
    async TERMS_ADVERTISER({ commit }, datas) {
      const { data } = await getAdvertiser(datas);
      commit("termsAdvertiser", data);
    },
    async TERMS_MAKE({ commit }, datas) {
      const { data } = await getMake(datas);
      commit("getMake", data);
    },
    async TERMS_VIDEO_REFUND({ commit }, datas) {
      const { data } = await getVideoRefund(datas);
      commit("getVideoRefund", data);
    },
    async GET_PERCENTAGE({ commit }) {
      commit("percentage");
    },
    async GET_HOME_DATA({ commit }) {
      const { data } = await getHomeData();
      commit("getHomeData", data);
    },
    async GET_NATION_CODE({ commit }) {
      const { data } = await getNationCode();
      commit("nationCode", data);
    },
  },
};

export default common;
