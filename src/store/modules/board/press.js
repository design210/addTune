import { pressList } from "@/api/board/press";
const press = {
  namespaced: true,
  state: {
    pressList: {},
  },
  getters: {
    pressList: state => {
      return state.pressList;
    },
  },
  mutations: {
    pressList(state, result) {
      state.pressList = result;
    },
  },
  actions: {
    async PRESS_LIST({ commit }, datas) {
      const { data } = await pressList(datas);
      commit("pressList", data);
    },
  },
};

export default press;
