<template>
  <div>
    <button @click="GoogleLoginBtn"><img src="@/assets/images/google_icon.svg" alt="구글 로그인" /></button>
    <div id="my-signin2" style="display: none"></div>
  </div>
</template>

<script>
import google from "@/utils/snsLogin/google";

export default {
  setup() {
    return {
      ...google(),
    };
  },
};
</script>

<style scoped></style>
