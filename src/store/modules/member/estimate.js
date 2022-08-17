import { getEstimateList, getEstimateDetail, saveComment, getEstimatePayinfo } from "@/api/member/estimate";
const estimate = {
  namespaced: true,
  state: {
    getEstimateList: {},
    getEstimateDetail: {},
    getSaveComment: {},
    getEstimatePayinfo: {},
  },
  getters: {
    getEstimateList: state => {
      return state.getEstimateList;
    },
    getEstimateDetail: state => {
      return state.getEstimateDetail;
    },
    getSaveComment: state => {
      return state.getSaveComment;
    },
    getEstimatePayinfo: state => {
      return state.getEstimatePayinfo;
    },
  },
  mutations: {
    getEstimateList(state, result) {
      state.getEstimateList = result;
    },
    getEstimateDetail(state, result) {
      state.getEstimateDetail = result;
    },
    getSaveComment(state, result) {
      state.getSaveComment = result;
    },
    getEstimatePayinfo(state, result) {
      state.getEstimatePayinfo = result;
    },
  },
  actions: {
    async ESTIMATE_LIST({ commit }, datas) {
      const { data } = await getEstimateList(datas);
      commit("getEstimateList", data);
    },
    async ESTIMATE_DETAIL({ commit }, id) {
      const { data } = await getEstimateDetail(id);
      commit("getEstimateDetail", data);
    },
    async SAVE_COMMENT({ commit }, datas) {
      const { data } = await saveComment(datas);
      commit("getSaveComment", data);
    },
    async ESTIMATE_PAYINFO({ commit }, datas) {
      const { data } = await getEstimatePayinfo(datas);
      commit("getEstimatePayinfo", data);
    },
  },
};

export default estimate;
