<template>
  <div class="modal-wrap">
    <div v-if="fileSid === ''" class="only-text">
      <h2>{{ title }}</h2>
      <h3>{{ subTitle }}</h3>
      <div class="mt20 text" v-html="contents"></div>
    </div>
    <div class="img-wrap" v-else>
      <transition name="fade">
        <a :href="link" :target="linkTarget"><img :src="`${apiBaseUrl}/file/fileView/${fileSid}`" alt="" @load="onImgLoad" v-show="isLoaded" /></a>
      </transition>
      <div class="loader" v-if="isLoaded === false">
        <div class="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <span @click="close('hide')">{{ closeName }}</span>
      <span @click="close">{{ $t("button-close") }}</span>
    </div>
  </div>
</template>

<script>
import { saveHideModalCookie } from "@/utils/cookie";
export default {
  props: ["daySet", "closeName", "title", "subTitle", "contents", "fileSid", "link"],
  data() {
    return {
      hide: false,
      isLoaded: false,
      linkTarget: "",
      apiBaseUrl: process.env.VUE_APP_API,
    };
  },
  watch: {
    target(n) {
      n === "L" ? (this.linkTarget = "_self") : (this.linkTarget = "_blank");
    },
  },
  methods: {
    onImgLoad() {
      this.isLoaded = true;
    },
    close(status) {
      if (status === "hide") {
        saveHideModalCookie("hide", this.daySet);
      }
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: space-between;
  height: 35px;
  background: #4f4f4f;
  line-height: 35px;
  padding: 0 20px;
  & span {
    color: #fff;
    cursor: pointer;
  }
}
.only-text {
  padding: 15px;
}
h2 {
  font-size: 2.4rem;
  font-weight: 700;
  color: #222;
}
h3 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #222;
}
.modal-wrap {
  border-radius: 10px;
  overflow: hidden;
}
.text {
  color: #747474;
  font-size: 1.4rem;
  line-height: 28px;
}
.v-application {
  justify-content: flex-end;
}
.img-wrap {
  min-height: 200px;
  & img {
    width: 100%;
  }
}
.loader {
  position: relative;
  min-height: 200px;
  width: 100%;
  height: 100%;
}
.lds-roller {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  transform: translate(-250%, -350%);
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff6600;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-to {
  opacity: 1;
}

.fade-enter {
  opacity: 0;
}
</style>
