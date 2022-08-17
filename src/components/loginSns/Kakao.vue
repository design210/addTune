<template>
  <div>
    <button @click="kakaoLoginBtn"><img src="@/assets/images/kakao_icon.svg" alt="카카오로 3초만에 시작하기" /></button>
  </div>
</template>

<script>
import { loadScript } from "vue-plugin-load-script";
import kakao from "@/utils/snsLogin/kakao";

export default {
  mounted() {
    loadScript("https://developers.kakao.com/sdk/js/kakao.js")
      .then(() => {
        window.Kakao.init(process.env.VUE_APP_KAKAO_KEY);
        if (this.$route.query.code !== undefined) {
          this.kakaoRestApi();
        }
      })
      .catch(() => {});
  },
  setup() {
    return {
      ...kakao(),
    };
  },
};
</script>

<style scoped></style>
