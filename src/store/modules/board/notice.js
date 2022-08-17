import { noticeList } from "@/api/board/notice";
const notice = {
  namespaced: true,
  state: {
    noticeList: {},
  },
  getters: {
    noticeList: state => {
      return state.noticeList;
    },
  },
  mutations: {
    noticeList(state, result) {
      state.noticeList = result;
    },
  },
  actions: {
    async NOTICE_LIST({ commit }, datas) {
      const { data } = await noticeList(datas);
      commit("noticeList", data);
    },
  },
};

export default notice;
