<template>
  <vue-apple-login
    mode="center-align"
    type="sign in"
    color="black"
    :border="true"
    :radius="10"
    width="68px"
    height="100%"
    logoSize="medium"
    :logoPosition="0"
    :labelPosition="0"
    className="vue-apple-login"
    :onSuccess="callSuccess"
    :onFailure="callFail"
  ></vue-apple-login>
</template>

<script>
import apple from "@/utils/snsLogin/apple";
import { loadScript } from "vue-plugin-load-script";

export default {
  mounted() {
    loadScript("https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js")
      .then(() => {})
      .catch(() => {});
  },
  setup() {
    return {
      ...apple(),
    };
  },
};
</script>

<style lang="scss" scoped>
.vue-apple-login::v-deep {
  width: 55px;
  height: 55px;
  background: #fff url("../../assets/images/apple_icon.svg");
  cursor: pointer;
  & > div {
  }
  & svg {
    width: 0 !important;
    height: 0 !important;
  }
}
</style>
