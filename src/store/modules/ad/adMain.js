import { getAdPriceCalc, getAdListAndBanner, setAdEstimate, setAdDetailDate, getAdStoreList, getAdFinalPriceCalc } from "@/api/ad/adMain";
const admain = {
  namespaced: true,
  state: {
    getAdPriceCalc: {},
    getAdListAndBanner: {},
    setAdEstimate: {},
    setAdDetailDate: {},
    getAdStoreList: {},
    getAdFinalPriceCalc: {},
    percentage: 0,
  },
  getters: {
    getAdPriceCalc: state => {
      return state.getAdPriceCalc;
    },
    getAdListAndBanner: state => {
      return state.getAdListAndBanner;
    },
    setAdEstimate: state => {
      return state.setAdEstimate;
    },
    setAdDetailDate: state => {
      return state.setAdDetailDate;
    },
    getAdStoreList: state => {
      return state.getAdStoreList;
    },
    getAdFinalPriceCalc: state => {
      return state.getAdFinalPriceCalc;
    },
    percentage: state => {
      return state.percentage;
    },
  },
  mutations: {
    getAdPriceCalc(state, result) {
      state.getAdPriceCalc = result;
    },
    getAdListAndBanner(state, result) {
      state.getAdListAndBanner = result;
    },
    setAdEstimate(state, result) {
      state.setAdEstimate = result;
    },
    setAdDetailDate(state, result) {
      state.setAdDetailDate = result;
    },
    getAdStoreList(state, result) {
      state.getAdStoreList = result;
    },
    getAdFinalPriceCalc(state, result) {
      state.getAdFinalPriceCalc = result;
    },
    percentage(state, list) {
      state.percentage = list;
    },
  },
  actions: {
    async AD_PRICE_CALC({ commit }, datas) {
      const { data } = await getAdPriceCalc(datas);
      commit("getAdPriceCalc", data);
    },
    async AD_LIST_AND_BANNER({ commit }, datas) {
      const { data } = await getAdListAndBanner(datas);
      commit("getAdListAndBanner", data);
    },
    async AD_ESTIMATE({ commit }, datas) {
      const { data } = await setAdEstimate(datas);
      commit("setAdEstimate", data);
    },
    async AD_DETAIL_DATA({ commit }, id) {
      const { data } = await setAdDetailDate(id);
      commit("setAdDetailDate", data);
    },
    async AD_STORE_LIST({ commit }, datas) {
      const { data } = await getAdStoreList(datas);
      commit("getAdStoreList", data);
    },
    async AD_PRICE_FINAL_CALC({ commit }, datas) {
      const { data } = await getAdFinalPriceCalc(datas);
      commit("getAdFinalPriceCalc", data);
    },
    async GET_PERCENTAGE({ commit }) {
      commit("percentage");
    },
  },
};

export default admain;
