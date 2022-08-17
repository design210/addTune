import { getProductVideoList, getProductVideoDetail, getPortFolioList, commission, levelCommission, hpModify } from "@/api/product/product";
const product = {
  namespaced: true,
  state: {
    getProductVideoList: {},
    getProductVideoDetail: {},
    getPortFolioList: {},
    commission: {},
    levelCommission: {},
    hpModify: {},
  },
  getters: {
    getProductVideoList: state => {
      return state.getProductVideoList;
    },
    getProductVideoDetail: state => {
      return state.getProductVideoDetail;
    },
    getPortFolioList: state => {
      return state.getPortFolioList;
    },
    commission: state => {
      return state.commission;
    },
    levelCommission: state => {
      return state.levelCommission;
    },
    hpModify: state => {
      return state.hpModify;
    },
  },
  mutations: {
    getProductVideoList(state, result) {
      state.getProductVideoList = result;
    },
    getProductVideoDetail(state, result) {
      state.getProductVideoDetail = result;
    },
    getPortFolioList(state, result) {
      state.getPortFolioList = result;
    },
    commission(state, result) {
      state.commission = result;
    },
    levelCommission(state, result) {
      state.levelCommission = result;
    },
    hpModify(state, result) {
      state.hpModify = result;
    },
  },
  actions: {
    async PRODUCT_VIDEO_LIST({ commit }, datas) {
      const { data } = await getProductVideoList(datas);
      commit("getProductVideoList", data);
    },
    async PRODUCT_VIDEO_DETAIL({ commit }, id) {
      const { data } = await getProductVideoDetail(id);
      commit("getProductVideoDetail", data);
    },
    async PORTFOLIO_LIST({ commit }, datas) {
      const { data } = await getPortFolioList(datas);
      commit("getPortFolioList", data);
    },
    async COMMISSION({ commit }, datas) {
      const { data } = await commission(datas);
      commit("commission", data);
    },
    async LEVEL_COMMISSION({ commit }, datas) {
      const { data } = await levelCommission(datas);
      commit("levelCommission", data);
    },
    async HP_MODIFY({ commit }, datas) {
      const { data } = await hpModify(datas);
      commit("hpModify", data);
    },
  },
};

export default product;
