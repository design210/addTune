<template>
  <v-app>
    <v-main>
      <div>
        <router-view name="top"></router-view>
        <router-view name="singlepage" :apiBaseUrl="apiBaseUrl"></router-view>
        <div class="divide">
          <router-view name="lnb"></router-view>
          <router-view name="container" :apiBaseUrl="apiBaseUrl"></router-view>
        </div>
      </div>
      <router-view name="footer"></router-view>
      <div class="spinner-wrap" v-if="loadingStatus">
        <v-progress-circular :size="70" :width="7" color="amber" indeterminate class="spinner"></v-progress-circular>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import bus from "@/utils/bus.js";
export default {
  name: "App",
  data() {
    return {
      loadingStatus: false,
      apiBaseUrl: process.env.VUE_APP_API,
    };
  },
  watch: {
    $route(to) {
      if (to.name === "resetPW" || to.name === "resetError" || to.name === "emailverify") {
        //console.log(to.name);
      } else {
        this.reDirect();
      }
    },
  },
  created() {
    bus.$on("start:spinner", this.startSpinner);
    bus.$on("end:spinner", this.endSpinner);
  },
  beforeDestroy() {
    bus.$off("start:spinner", this.startSpinner);
    bus.$off("end:spinner", this.endSpinner);
  },
  methods: {
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
    reDirect() {
      const mobile = new Array("iPhone", "iPod", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson");
      const beforeUrl = document.referrer; // 이전 페이지 주소를 받아온다.
      const nowurl = window.location.href;
      for (var word in mobile) {
        //모바일 기기인지 확인하고 또한 이전 주소가 모바일에서 넘어오지 않았을 경우 리다이렉트 한다.
        if (nowurl.indexOf("promotion") < 0) {
          if (navigator.userAgent.match(mobile[word]) != null && beforeUrl.match("https://addune.net") == null) {
            location.href = "https://m.addtune.net";
            break;
          }
        }
      }
    },
  },
};
</script>
<style lang="scss">
.mx-icon-double-left,
.mx-icon-double-right {
  display: none !important;
}
.spinner-wrap {
  position: fixed !important;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 999999999;
  & .spinner {
    position: fixed !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999999999;
  }
}
.pay-checking {
  color: #ff0000;
}
//margin, padding setting
@for $i from 0 through 200 {
  .mt#{$i} {
    margin-top: 0.1rem * $i !important;
  }
  .ml#{$i} {
    margin-left: 0.1rem * $i !important;
  }
  .mr#{$i} {
    margin-right: 0.1rem * $i !important;
  }
  .mb#{$i} {
    margin-bottom: 0.1rem * $i !important;
  }
  .pt#{$i} {
    padding-top: 0.1rem * $i !important;
  }
  .pl#{$i} {
    padding-left: 0.1rem * $i !important;
  }
  .pr#{$i} {
    padding-right: 0.1rem * $i !important;
  }
  .pb#{$i} {
    padding-bottom: 0.1rem * $i !important;
  }
}

.addtune-intro {
  & .t-title {
    & span {
      color: #ff4d56;
      font-weight: 700;
    }
  }
  & .slide-wrap {
    & li {
      & span {
        color: #c4c4c4;
        font-size: 2.2rem;
        transition: color 0.5s ease-in-out;
        padding: 5px 20px 0;
        position: relative;
        z-index: 2;
        &.active {
          color: #fff;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
      & em {
        transition: all 0.5s ease-in-out;
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 45px;
        background: #ff4d56;
        border-radius: 30px;
      }
    }
  }
  & .s17 {
    & h1 {
      & b {
        color: #ff4d56;
      }
    }
    & .list {
      & li {
        & h2 {
          & span {
            color: #ff4d56;
          }
        }
      }
    }
  }
}
</style>
