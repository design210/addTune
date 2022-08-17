<template>
  <div @click="signup" class="facebook"><img src="@/assets/images/facebook_icon.svg" alt="페이스북" /></div>
</template>

<script>
import facebook from "@/utils/snsLogin/facebook";
export default {
  created() {
    this.init();
  },
  setup() {
    return {
      ...facebook(),
    };
  },
};
</script>

<style lang="scss" scoped>
.facebook {
  cursor: pointer;
}
</style>
