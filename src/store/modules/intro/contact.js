import { setContact } from "@/api/intro/contact";
const contact = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async CONTACT({ commit }, datas) {
      await setContact(datas);
    },
  },
};

export default contact;
