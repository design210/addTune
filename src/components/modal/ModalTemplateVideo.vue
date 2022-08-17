<template>
  <div class="modal-wrap">
    <div @click="close" class="close"><img src="@/assets/images/video_close.png" alt="close" /></div>
    <slot name="head"></slot>
    <div class="line"></div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-wrap {
  position: relative;
}
.close {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  width: 60px;
  height: 60px;
  background: #000;
  z-index: 10;
  text-align: center;
  padding-top: 10px;
}
</style>
