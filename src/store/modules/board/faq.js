import { getFaqList, getFaqDetail } from "@/api/board/faq";
const faq = {
  namespaced: true,
  state: {
    getFaqList: {},
    getFaqDetail: {},
  },
  getters: {
    getFaqList: state => {
      return state.getFaqList;
    },
    getFaqDetail: state => {
      return state.getFaqDetail;
    },
  },
  mutations: {
    getFaqList(state, result) {
      state.getFaqList = result;
    },
    getFaqDetail(state, result) {
      state.getFaqDetail = result;
    },
  },
  actions: {
    async FAQ_LIST({ commit }, datas) {
      const { data } = await getFaqList(datas);
      commit("getFaqList", data);
    },
    async FAQ_DETAIL({ commit }, id) {
      const { data } = await getFaqDetail(id);
      commit("getFaqDetail", data);
    },
  },
};

export default faq;
