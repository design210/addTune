import { getEventList, getEventDetail, tuneEvent } from "@/api/board/event";
const event = {
  namespaced: true,
  state: {
    getEventList: {},
    getEventDetail: {},
    tuneEvent: {},
  },
  getters: {
    getEventList: state => {
      return state.getEventList;
    },
    getEventDetail: state => {
      return state.getEventDetail;
    },
    tuneEvent: state => {
      return state.tuneEvent;
    },
  },
  mutations: {
    getEventList(state, result) {
      state.getEventList = result;
    },
    getEventDetail(state, result) {
      state.getEventDetail = result;
    },
    tuneEvent(state, result) {
      state.tuneEvent = result;
    },
  },
  actions: {
    async EVENT_LIST({ commit }, datas) {
      const { data } = await getEventList(datas);
      commit("getEventList", data);
    },
    async EVENT_DETAIL({ commit }, datas) {
      const { data } = await getEventDetail(datas);
      commit("getEventDetail", data);
    },
    async TUNE_EVENT({ commit }, datas) {
      const { data } = await tuneEvent(datas);
      commit("tuneEvent", data);
    },
  },
};

export default event;
