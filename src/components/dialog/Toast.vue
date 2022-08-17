<template>
  <div>
    <transition name="fade">
      <div class="toast" v-if="showToast" :class="{ active: showToast === true }">
        <span>{{ content }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["content", "visible"],
  data() {
    return {
      showToast: false,
    };
  },
  watch: {
    visible(n) {
      this.showToast = n;
      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  //transform: translateY(-50px);
}
.toast {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  height: 55px;
  background: #000000;
  border-radius: 30px;
  padding: 0 20px;
  @include NotoSans(2, 400, #fff);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000000000000000000;
  transition: all 0.3s ease-in;
  &.active {
    top: 130px;
  }
  & i {
    & img {
      vertical-align: -2px;
      margin-left: 35px;
      cursor: pointer;
    }
  }
}
</style>
