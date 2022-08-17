<template>
  <div>
    <section class="container-join">
      <div class="bi">
        <router-link to="/main"><img alt="addtune" class="bi" src="@/assets/images/addtune_bi_xs.png" /></router-link>
      </div>
      <div class="info-box">
        <h1 class="mt100">{{ $t("member-resetPw-error") }}</h1>
        <p class="mt50" v-html="$t('member-resetPw-errorInfo')"></p>
      </div>
      <section v-if="mobile === false" class="btn-group">
        <button @click="send">{{ $t("button-findPw") }}</button>
      </section>
      <section v-if="mobile === false" class="login">
        <span>{{ $t("member-resetPw-remember") }}</span>
        <router-link to="/login">{{ $t("button-login") }}</router-link>
      </section>
    </section>
  </div>
</template>

<script>
import loading from "@/mixins/loading";
import { mapGetters } from "vuex";

export default {
  mixins: [loading],
  data() {
    return {
      mobile: false,
    };
  },
  computed: {
    ...mapGetters("member", ["getPwResult"]),
  },
  mounted() {
    document.querySelector(".pw1").addEventListener("click", () => (this.pw1 = !this.pw1));
    document.querySelector(".pw2").addEventListener("click", () => (this.pw2 = !this.pw2));
    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });
    const mobile = ["iPhone", "iPod", "BlackBerry", "Android", "Windows CE", "LG", "MOT", "SAMSUNG", "SonyEricsson"];
    const beforeUrl = document.referrer; // 이전 페이지 주소를 받아온다.
    const nowurl = window.location.href;
    for (var word in mobile) {
      //모바일 기기인지 확인하고 또한 이전 주소가 모바일에서 넘어오지 않았을 경우 리다이렉트 한다.
      if (nowurl.indexOf("promotion") < 0) {
        if (navigator.userAgent.match(mobile[word]) != null && beforeUrl.match("https://addune.net") == null) {
          this.mobile = true;
          break;
        }
      }
    }
  },
  methods: {
    send() {
      this.$router.push("/findPW");
    },
  },
};
</script>

<style lang="scss" scoped>
.container-join {
  width: 650px;
  margin: 100px auto 50px;

  & .init {
    margin-top: 5px;
    position: relative;

    & i {
      position: absolute;
      right: 10px;
      top: 13px;
      cursor: pointer;
    }
  }

  & .join-title {
    font-size: 1.5rem;
    color: #000;
    margin-bottom: 5px;
    font-weight: 700;
  }

  & .error-text {
    color: #ff4d56;
    font-size: 1.2rem;
    margin-top: 5px;
  }

  & .login {
    text-align: center;
    margin-top: 25px;
    color: #a4a4a4;

    & a {
      color: #747474;
      font-weight: 700;
      margin-left: 15px;
    }
  }

  & .img-wrap {
    text-align: center;
    margin: 70px 0 50px;
  }

  & .info-box {
    text-align: center;
    color: #747474;

    & h1 {
      font-size: 3rem;
    }
  }

  & .bi {
    text-align: center;
  }

  & .btn-group {
    margin-top: 85px;
    text-align: center;

    & button {
      width: calc(50% - 20px);
      text-align: center;
      font-size: 2.1rem;
      font-weight: 700;
      height: 60px;
      display: inline-block;
      margin: 0 auto;
      line-height: 60px;
      width: 280px;
      background: #ff4d56;
      color: #fff;

      &:disabled {
        background: #747474;
      }
    }
  }

  & .copyright {
    margin-top: 50px;
    text-align: center;
    color: #747474;
    font-size: 1.5rem;

    & span {
      font-weight: 700;
    }

    & .bi {
      margin-right: 10px;
      height: 15px;
      vertical-align: -2px;
    }
  }

  & input[type="text"],
  input[type="password"] {
    border: 1px solid #e5e5e5;
    width: 100%;
    height: 50px;
    padding: 0 40px 0 10px;
    font-size: 1.5rem;
  }
}

@media (max-width: 800px) {
  .container-join {
    width: 100%;
    margin: 0;
    padding: 50px 16px;
  }
}
</style>
