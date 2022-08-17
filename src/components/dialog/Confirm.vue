<template>
  <div class="modal-wrap">
    <h1>{{ $t("common-confirm-title") }}</h1>
    <p class="infos">{{ type }} {{ $t("common-confirm-end") }}</p>
    <div class="btn-group">
      <button class="cancel" @click="close">{{ $t("common-confirm-other") }}</button>
      <button class="confirm" @click="confirm">{{ $t("common-confirm-this") }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$attrs.update();
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  @include NotoSans(1.8, 700, #333333);
  text-align: center;
  padding-top: 20px;
}
.infos {
  text-align: center;
  margin: 20px 0 40px;
}
.btn-group {
  display: flex;
  & button {
    width: 50%;
    @include NotoSans(1.4, 700, #fff);
    padding: 15px 0;
    &.cancel {
      background: #bdbdbd;
    }
    &.confirm {
      background: #ff4d56;
    }
  }
}
</style>
