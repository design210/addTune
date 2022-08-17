import { getAdContents, getAdContentsDetail, downloadAdContents, deleteAdContents, uploadContents, tuneStoreDetail } from "@/api/ad/adContents";

const adcontents = {
  namespaced: true,
  state: {
    getAdContentsList: {},
    getAdContentsDetail: {},
    adContentsDownload: {},
    deleteAdContents: {},
    uploadContents: {},
    tuneStoreDetail: {},
  },
  getters: {
    getAdContentsList: state => {
      return state.getAdContentsList;
    },
    getAdContentsDetail: state => {
      return state.getAdContentsDetail;
    },
    adContentsDownload: state => {
      return state.adContentsDownload;
    },
    deleteAdContents: state => {
      return state.deleteAdContents;
    },
    uploadContents: state => {
      return state.uploadContents;
    },
    tuneStoreDetail: state => {
      return state.tuneStoreDetail;
    },
  },
  mutations: {
    getAdContents(state, result) {
      state.getAdContentsList = result;
    },
    getAdContentsDetail(state, result) {
      state.getAdContentsDetail = result;
    },
    adContentsDownload(state, result) {
      state.adContentsDownload = result;
    },
    deleteAdContents(state, result) {
      state.deleteAdContents = result;
    },
    uploadContents(state, result) {
      state.uploadContents = result;
    },
    tuneStoreDetail(state, result) {
      state.tuneStoreDetail = result;
    },
  },
  actions: {
    async GET_AD_CONTENTS({ commit }, datas) {
      const { data } = await getAdContents(datas);
      commit("getAdContents", data);
    },

    async GET_AD_CONTENTS_DETAIL({ commit }, id) {
      const { data } = await getAdContentsDetail(id);
      commit("getAdContentsDetail", data);
    },

    async AD_CONTENTS_DOWNLOAD({ commit }, id) {
      const { data } = await downloadAdContents(id);
      commit("adContentsDownload", data);
    },
    async DELETE_AD_CONTENTS({ commit }, id) {
      const { data } = await deleteAdContents(id);
      commit("deleteAdContents", data);
    },
    async UPLOAD_CONTENTS({ commit }, id) {
      const { data } = await uploadContents(id, commit);
      commit("uploadContents", data);
    },
    async TUNE_STORE_DETAIL({ commit }, datas) {
      const { data } = await tuneStoreDetail(datas);
      commit("tuneStoreDetail", data);
    },
  },
};

export default adcontents;
