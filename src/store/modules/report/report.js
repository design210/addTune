import { getStoreInfo, setStoreType, setAera, setStoreFavorite, getStoreList, getCampaignList, getCampaignInfo, getReportAll, getReportUpdateDate } from "@/api/report/report";
const report = {
  namespaced: true,
  state: {
    getCampaignList: {},
    getCampaignInfo: {},
    getReportAll: {},
    getStoreList: {},
    setStoreFavorite: {},
    setStoreType: {},
    setAera: {},
    getStoreInfo: {},
    getReportUpdateDate: {},
  },
  getters: {
    getCampaignList: state => {
      return state.getCampaignList;
    },
    getCampaignInfo: state => {
      return state.getCampaignInfo;
    },
    getReportAll: state => {
      return state.getReportAll;
    },
    getStoreList: state => {
      return state.getStoreList;
    },
    setStoreFavorite: state => {
      return state.setStoreFavorite;
    },
    setStoreType: state => {
      return state.setStoreType;
    },
    setAera: state => {
      return state.setAera;
    },
    getStoreInfo: state => {
      return state.getStoreInfo;
    },
    getReportUpdateDate: state => {
      return state.getReportUpdateDate;
    },
  },
  mutations: {
    getCampaignList(state, result) {
      state.getCampaignList = result;
    },
    getCampaignInfo(state, result) {
      state.getCampaignInfo = result;
    },
    getReportAll(state, result) {
      state.getReportAll = result;
    },
    getStoreList(state, result) {
      state.getStoreList = result;
    },
    setStoreFavorite(state, result) {
      state.setStoreFavorite = result;
    },
    setStoreType(state, result) {
      state.setStoreType = result;
    },
    setAera(state, result) {
      state.setAera = result;
    },
    getStoreInfo(state, result) {
      state.getStoreInfo = result;
    },
    getReportUpdateDate(state, result) {
      state.getReportUpdateDate = result;
    },
  },
  actions: {
    async CAMPAIGN_LIST({ commit }) {
      const { data } = await getCampaignList();
      commit("getCampaignList", data);
    },
    async CAMPAIGN_INFO({ commit }, id) {
      const { data } = await getCampaignInfo(id);
      commit("getCampaignInfo", data);
    },
    async REPORT_ALL({ commit }, datas) {
      const { data } = await getReportAll(datas);
      commit("getReportAll", data);
    },
    async STORE_LIST({ commit }, datas) {
      const { data } = await getStoreList(datas);
      commit("getStoreList", data);
    },
    async STORE_FAVORITE({ commit }, datas) {
      const { data } = await setStoreFavorite(datas);
      commit("setStoreFavorite", data);
    },
    async STORE_TYPE({ commit }, datas) {
      const { data } = await setStoreType(datas);
      commit("setStoreType", data);
    },
    async STORE_AREA({ commit }, datas) {
      const { data } = await setAera(datas);
      commit("setAera", data);
    },
    async STORE_INFO({ commit }, datas) {
      const { data } = await getStoreInfo(datas);
      commit("getStoreInfo", data);
    },
    async REPORT_UPDATE_DATE({ commit }) {
      const { data } = await getReportUpdateDate();
      commit("getReportUpdateDate", data);
    },
  },
};

export default report;
