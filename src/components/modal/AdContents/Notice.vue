<template>
  <modalWrap :hideLine="true" @close="close">
    <template slot="head">
      <h1 class="mt40">{{ $t("modal-notice-h1") }}</h1>
    </template>
    <template slot="body">
      <h2>{{ $t("modal-notice-h2") }}</h2>
      <div><img src="@/assets/images/warning.png" alt="" /></div>
      <div>
        <div class="box" v-html="$t('modal-notice-info')"></div>
      </div>
    </template>
    <template slot="footer">
      <div class="center">
        <button class="btn" @click="close">{{ $t("button-check") }}</button>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplatePaddingXs";

export default {
  components: {
    modalWrap,
  },
  data() {
    return {
      hide: false,
    };
  },
  methods: {
    close() {
      this.$attrs.update(true);
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  @include NotoSans(2.5, 700, #333333);
}
h2 {
  text-align: center;
  @include NotoSans(1.5, 400, #4f4f4f);
  margin-top: -10px;
  margin-bottom: 10px;
}
.box {
  width: 430px;
  background: #fff3f3;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
  margin: 10px auto 30px;
  @include NotoSans(1.6, 400, #4f4f4f);
  line-height: 2.4rem !important;
}
.btn {
  background: #ff4d56;
  @include NotoSans(2.3, 700, #fff);
  width: 250px;
  height: 70px;
  border-radius: 2px;
}
</style>
