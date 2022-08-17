import { getPurchaseStoreList, getVideoPurchaseDetail, getPurchaseList, getPurchaseDetail, getPurchaseAdvertisingInfo, getVideoPurchaseList, getPurchaseStoreDetail } from "@/api/member/purchase";
const purchase = {
  namespaced: true,
  state: {
    getPurchaseList: {},
    getPurchaseDetail: {},
    getPurchaseAdvertisingInfo: {},
    getVideoPurchaseList: {},
    getVideoPurchaseDetail: {},
    getPurchaseStoreList: {},
    getPurchaseStoreDetail: {},
  },
  getters: {
    getPurchaseList: state => {
      return state.getPurchaseList;
    },
    getPurchaseDetail: state => {
      return state.getPurchaseDetail;
    },
    getPurchaseAdvertisingInfo: state => {
      return state.getPurchaseAdvertisingInfo;
    },
    getVideoPurchaseList: state => {
      return state.getVideoPurchaseList;
    },
    getVideoPurchaseDetail: state => {
      return state.getVideoPurchaseDetail;
    },
    getPurchaseStoreList: state => {
      return state.getPurchaseStoreList;
    },
    getPurchaseStoreDetail: state => {
      return state.getPurchaseStoreDetail;
    },
  },
  mutations: {
    getPurchaseList(state, result) {
      state.getPurchaseList = result;
    },
    getPurchaseDetail(state, result) {
      state.getPurchaseDetail = result;
    },
    getPurchaseAdvertisingInfo(state, result) {
      state.getPurchaseAdvertisingInfo = result;
    },
    getVideoPurchaseList(state, result) {
      state.getVideoPurchaseList = result;
    },
    getVideoPurchaseDetail(state, result) {
      state.getVideoPurchaseDetail = result;
    },
    getPurchaseStoreList(state, result) {
      state.getPurchaseStoreList = result;
    },
    getPurchaseStoreDetail(state, result) {
      state.getPurchaseStoreDetail = result;
    },
  },
  actions: {
    async PURCHASE_LIST({ commit }, datas) {
      const { data } = await getPurchaseList(datas);
      commit("getPurchaseList", data);
    },
    async PURCHASE_DETAIL({ commit }, id) {
      const { data } = await getPurchaseDetail(id);
      commit("getPurchaseDetail", data);
    },
    async PURCHASE_ADVERTISING_INFO({ commit }, id) {
      const { data } = await getPurchaseAdvertisingInfo(id);
      commit("getPurchaseAdvertisingInfo", data);
    },
    async VIDEO_PURCHASE_LIST({ commit }, datas) {
      const { data } = await getVideoPurchaseList(datas);
      commit("getVideoPurchaseList", data);
    },
    async VIDEO_PURCHASE_DETAIL({ commit }, id) {
      const { data } = await getVideoPurchaseDetail(id);
      commit("getVideoPurchaseDetail", data);
    },
    async PURCHASE_STORE_LIST({ commit }, datas) {
      const { data } = await getPurchaseStoreList(datas);
      commit("getPurchaseStoreList", data);
    },
    async PURCHASE_STORE_DETAIL({ commit }, id) {
      const { data } = await getPurchaseStoreDetail(id);
      commit("getPurchaseStoreDetail", data);
    },
  },
};

export default purchase;
