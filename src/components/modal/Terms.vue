<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>{{ title }}</h2>
    </template>
    <template slot="body">
      <div class="term-wrap" v-html="this.html"></div>
    </template>
    <template slot="footer">
      <div class="btn-wrap mt30">
        <button @click="close">{{ $t("button-check") }}</button>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import { mapGetters } from "vuex";
import modalWrap from "@/components/modal/ModalTemplateNoCloseBtn";

export default {
  components: {
    modalWrap,
  },
  props: ["status"],
  data() {
    return {
      title: "",
      html: "",
    };
  },
  computed: {
    ...mapGetters("common", ["termsRefund", "termsAdvertiser", "getMake", "getVideoRefund"]),
  },
  async created() {
    if (this.status === "ad") {
      this.title = this.$t("modal-terms-title1");
    }
    if (this.status === "basic") {
      this.title = this.$t("modal-terms-title2");
    }
    if (this.status === "used") {
      this.title = this.$t("modal-terms-title3");
    }
    if (this.status === "consignment") {
      this.title = this.$t("modal-terms-title4");
    }
    if (this.status === "advertisementRefund") {
      this.title = this.$t("modal-terms-title5");
      await this.$store.dispatch("common/TERMS_REFUND");
      this.html = this.termsRefund;
    }
    if (this.status === "advertisement") {
      this.title = this.$t("modal-terms-title6");
      await this.$store.dispatch("common/TERMS_ADVERTISER");
      this.html = this.termsAdvertiser;
    }
    if (this.status === "make") {
      this.title = this.$t("modal-terms-title7");
      await this.$store.dispatch("common/TERMS_MAKE");
      this.html = this.getMake;
    }
    if (this.status === "videoRefund") {
      this.title = this.$t("modal-terms-title5");
      await this.$store.dispatch("common/TERMS_VIDEO_REFUND");
      this.html = this.getVideoRefund;
    }
  },

  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  @include NotoSans(3.5, 700, #333333);
  text-align: center;
}

.btn-wrap {
  text-align: center;

  & button {
    background: #ff4d56;
    @include NotoSans(3, 700, #fff);
    height: 70px;
    width: 350px;
  }
}

.term-wrap {
  max-height: 500px;
  overflow-y: auto;
  @include NotoSans(1.5, 400, #000000);
}
</style>
