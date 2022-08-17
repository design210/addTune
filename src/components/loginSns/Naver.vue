<template>
  <div>
    <button id="naverIdLogin" @click="naverLoginBtn"><img src="@/assets/images/naver_icon.svg" alt="네이버 로그인" /></button>
  </div>
</template>

<script>
import { loadScript } from "vue-plugin-load-script";
import naver from "@/utils/snsLogin/naver";

export default {
  mounted() {
    //naver
    loadScript("https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js")
      .then(() => {
        if (this.$route.hash !== "") {
          const params = this.$route.hash.split("&").map(part => part.replace(/#/, ""));
          const parsedParams = {};
          params.forEach(param => {
            const parts = param.split("=");
            parsedParams[parts[0]] = parts[1];
          });
          this.naverRestApi(parsedParams);
        }
      })
      .catch(() => {});
  },
  setup() {
    return {
      ...naver(),
    };
  },
};
</script>

<style scoped></style>
