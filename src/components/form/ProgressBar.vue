<template>
  <div class="progress">
    <div class="wid">
      <div class="soon" v-if="loading">
        <div class="doted">
          <div class="dot-flashing"></div>
        </div>
        <span>{{ $t("common-progress-almost") }}</span
        ><br />
        <span>{{ $t("common-progress-wait") }}</span>
      </div>
      <div class="linear" v-else>
        <div class="txt" :style="{ left: percentageState + '%' }">{{ percent }}%</div>
        <v-progress-linear class="mb21" background-color="rgba(0, 0, 0, 0.5)" color="#fff" rounded height="7px" :value="percentageState"></v-progress-linear>
        <span class="">{{ $t("common-progress-upload") }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["innerToggle"],
  data() {
    return {
      percent: 0,
      loading: false,
    };
  },
  computed: {
    percentageState() {
      return this.$store.getters["common/percentage"];
    },
  },
  watch: {
    innerToggle(val) {
      if (val === false) {
        this.loading = false;
      }
    },
    percentageState(val) {
      this.percent = val;
      if (val === 100) {
        this.loading = true;
        this.$store.commit("common/percentage", 0);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.soon {
  span {
    width: 100%;
    @include NotoSans(3, 500, #fff);
    text-align: center;
  }
}
.doted {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 33px;
  & .dot-flashing {
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ffa0a5;
    color: #fff;
    animation: dotFlashing 1s infinite linear alternate;
    animation-delay: 0.5s;
  }

  & .dot-flashing::before,
  & .dot-flashing::after {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
  }

  & .dot-flashing::before {
    left: -30px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ffa0a5;
    color: #fff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 0s;
  }

  & .dot-flashing::after {
    left: 30px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #ffa0a5;
    color: #fff;
    animation: dotFlashing 1s infinite alternate;
    animation-delay: 1s;
  }

  @keyframes dotFlashing {
    0% {
      background-color: #ffa0a5;
    }
    50%,
    100% {
      background-color: #fff;
    }
  }
}

.main-banner-silder {
  width: 100%;
  min-width: 1110px;
  & .wrapper {
    margin: 0 auto;
  }
}
.progress {
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);

  & .wid {
    width: 400px;
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    & .linear {
      position: relative;
      & .txt {
        transition: left 0.2s ease-in;
        position: absolute;
        top: -50px;
        left: 0;
        @include NotoSans(2.5, 600, #fff);
      }
      & span {
        font-family: "Noto Sans KR", sans-serif;
        font-size: 30px;
        font-weight: 500;
        color: #fff;
        width: 100%;
        text-align: center !important;
      }
    }
  }
}
</style>
