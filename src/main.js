import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VModal from "vue-js-modal";
import i18n from "@/locales/i18n";
import "@/plugins/Dayjs";
import VueCompositionAPI from "@vue/composition-api";
Vue.use(VueCompositionAPI);
Vue.use(VModal);
Vue.config.productionTip = false;
//apple login
import VueAppleLogin from "vue-apple-login";

Vue.use(VueAppleLogin, {
  clientId: "channeltune.net.addTune.service",
  scope: "email",
  redirectURI: "https://www.addtune.net/login",
  state: "signin",
  usePopup: true,
});

//video
// import VideoPlayer from 'vue-video-player';
// require('video.js/dist/video-js.css');
// require('vue-video-player/src/custom-theme.css');
// const hls = require('videojs-contrib-hls');
// Vue.use(hls);
// Vue.use(VideoPlayer);
//clipboard
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

// VueMeta
import Meta from "vue-meta";
Vue.use(Meta, {
  keyName: "metaInfo",
  attribute: "data-vue-meta",
  ssrAttribute: "data-vue-meta-server-rendered",
  tagIDKeyName: "vmid", // 변화시키는 구분 값
  refreshOnceOnNavigation: true,
});
new Vue({
  router,
  store,
  vuetify,
  VModal,
  i18n,
  render: (h) => h(App),
}).$mount("#app");

// develop - pipeline test commit
