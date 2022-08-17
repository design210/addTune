<template>
  <div class="modal-wrap">
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
  padding: 35px 75px;
}
.close {
  position: absolute;
  right: 30px;
  top: 30px;
  cursor: pointer;
  & .v-icon {
    color: #fff;
    font-size: 3rem;
  }
}
.subject {
  margin-bottom: 5px;
}
.body {
  padding: 20px 0 0 0;
}
.line {
  margin-top: 20px;
}
</style>
