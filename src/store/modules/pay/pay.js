import { getPayment, getPayType, getPayVeri, getCampaignNameModify, getEstimatePdf } from "@/api/pay/pay";
const pay = {
  namespaced: true,
  state: {
    getPayment: {},
    getPayType: {},
    getPayVeri: {},
    getCampaignNameModify: {},
    getEstimatePdf: {},
  },
  getters: {
    getPayment: state => {
      return state.getPayment;
    },
    getPayType: state => {
      return state.getPayType;
    },
    getPayVeri: state => {
      return state.getPayVeri;
    },
    getCampaignNameModify: state => {
      return state.getCampaignNameModify;
    },
    getEstimatePdf: state => {
      return state.getEstimatePdf;
    },
  },
  mutations: {
    getPayment(state, result) {
      state.getPayment = result;
    },
    getPayType(state, result) {
      state.getPayType = result;
    },
    getPayVeri(state, result) {
      state.getPayVeri = result;
    },
    getCampaignNameModify(state, result) {
      state.getCampaignNameModify = result;
    },
    getEstimatePdf(state, result) {
      state.getEstimatePdf = result;
    },
  },
  actions: {
    async PAYMENT({ commit }, datas) {
      const { data } = await getPayment(datas);
      commit("getPayment", data);
    },
    async ORDERID({ commit }, datas) {
      const { data } = await getPayType(datas);
      commit("getPayType", data);
    },
    async PAY_VERI({ commit }, id) {
      const { data } = await getPayVeri(id);
      commit("getPayVeri", data);
    },
    async CAMPAIGN_NAME_MODIFY({ commit }, datas) {
      const { data } = await getCampaignNameModify(datas);
      commit("getCampaignNameModify", data);
    },
    async ESTIMATE_PDF({ commit }, id) {
      const { data } = await getEstimatePdf(id);
      commit("getEstimatePdf", data);
    },
  },
};

export default pay;
