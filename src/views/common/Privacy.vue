<template>
  <div class="container">
    <section style="display: flex; justify-content: space-between; margin-bottom: 30px">
      <h1 style="color: #000; font-size: 28px; font-weight: 700">{{ $t("terms-private") }}</h1>
      <router-link style="color: #c4c4c4; font-size: 15px; font-weight: 700; text-decoration: underline" to="/terms">{{ $t("terms-service") }} > </router-link>
    </section>
    <section style="color: #747474; font-size: 15px; font-weight: 400">
      <div v-html="privacy"></div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";

export default {
  mixins: [loading],
  data() {
    return {
      privacy: "",
    };
  },
  computed: {
    ...mapGetters("member", ["getPrivacy"]),
  },
  async mounted() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/GET_PRICACY");
      this.privacy = this.getPrivacy;
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1110px;
  margin: 80px auto 100px;
}
</style>
