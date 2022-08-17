<template>
  <div>
    <section v-if="mobile === false" class="container-join">
      <div class="header">
        <h1>{{ $t("member-resetPw-title") }}</h1>
        <p class="mt12">{{ $t("member-resetPw-info") }}</p>
      </div>
      <div class="containerd mt100">
        <div class="flx">
          <div class="join-title">{{ $t("member-resetPw-new") }}</div>
          <div :class="pwAlim.length < 1 ? 'pb18' : ''">
            <div class="init">
              <input v-if="pw1" v-model="password" maxlength="16" type="password" />
              <input v-else v-model="password" maxlength="16" type="text" />
              <span v-if="pw1" class="pw1 off"></span>
              <span v-else class="pw1 on"></span>
            </div>
            <div class="error-text">{{ pwAlim }}</div>
          </div>
        </div>
        <div class="flx">
          <div class="join-title">{{ $t("member-resetPw-reInit") }}</div>
          <div :class="reAlim.length < 1 ? 'pb18' : ''">
            <div class="init">
              <input v-if="pw2" v-model="password_confirmation" maxlength="16" type="password" />
              <input v-else v-model="password_confirmation" maxlength="16" type="text" />
              <span v-if="pw2" class="pw2 off"></span>
              <span v-else class="pw2 on"></span>
            </div>
            <div class="error-text">{{ reAlim }}</div>
          </div>
        </div>
      </div>
      <section class="btn-group">
        <button :disabled="idok" @click="send">{{ $t("member-resetPw-reset") }}</button>
      </section>
    </section>

    <section v-else class="btn-app">
      <button @click="mobileAppRedirect">{{ $t("member-resetPw-app") }}</button>
    </section>
  </div>
</template>

<script>
import { CheckPassword } from "@/utils/validate.js";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";

export default {
  mixins: [loading],
  data() {
    return {
      password: "",
      password_confirmation: "",
      idok: true,
      pwAlim: "",
      reAlim: "",
      pw1: true,
      pw2: true,
      mobile: false,
    };
  },
  computed: {
    ...mapGetters("member", ["getPwResult"]),
  },
  watch: {
    password(n) {
      if (n === "") {
        this.pwAlim = "";
      } else {
        let result = CheckPassword(n);
        if (result === "error-length") {
          this.pwAlim = this.$t("member-signup-alert2");
        } else if (result === "error-spe") {
          this.pwAlim = this.$t("member-signup-alert3");
        } else if (result === true) {
          this.pwAlim = "";
        }
      }
    },
    password_confirmation(n) {
      if (this.password !== n) {
        this.reAlim = this.$t("member-signup-alert4");
      } else if (this.password === n && this.password !== "") {
        this.reAlim = "";
        this.idok = false;
      } else if (this.password === "" || n === "") {
        this.reAlim = "";
      }
    },
  },
  mounted() {
    bus.$emit("mobile", true);
    bus.$emit("mobileFooter", true);
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
  beforeDestroy() {
    bus.$emit("mobile", false);
    bus.$emit("mobileFooter", false);
  },
  methods: {
    mobileAppRedirect() {
      if (this.mobile === true) {
        const _this = this;
        var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
        if (varUA.indexOf("android") > -1) {
          //안드로이드
          const param = { path: "ATap_0_2_2_2", value: _this.$route.params.id };
          const string = JSON.stringify(param);
          window.location.replace(`interbridaddtune://act?${string}`);
          setTimeout(function () {
            window.location.replace("https://play.google.com/store/apps/details?id=net.channeltune.addtune");
          }, 2000);
        } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
          //IOS
          const param = { path: "ATap_0_2_2_2", value: _this.$route.params.id };
          const string = JSON.stringify(param);
          window.location.replace(`interbridaddtune://act?path=${param.path}&value=${_this.$route.params.id}`);
          setTimeout(function () {
            window.location.replace("https://apps.apple.com/app/id1600166344");
          }, 2000);
          webkit.messageHandlers.event.postMessage(string);
        } else {
          //아이폰, 안드로이드 외
          return "other";
        }
      }
    },
    async send() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/RESETPW", {
          verificationCode: this.$route.params.id,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
        if (this.getPwResult.addtuneApiResult.errorCode == 400) {
          this.$router.push("/reseterror");
        } else if (this.getPwResult.addtuneApiResult.errorCode == 200) {
          alert("비밀번호가 변경되었습니다!");
          if (this.mobile === false) {
            this.$router.push("/login");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-app {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;

  & button {
    background-color: #ff4d56;
    padding: 20px;
    border-radius: 2px;
    @include NotoSans(1.8, 700, #fff);
  }
}

.containerd {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
}

.bet {
  width: 80%;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}

.flx {
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
  width: 765px;
}

.container-join {
  width: 1052px;
  margin: 100px auto 50px;

  & h1 {
    @include NotoSans(2.5, 700, #333333);
    width: 100%;
  }

  .header {
    position: relative;
    padding-bottom: 32px;
    border-bottom: 2px solid #ff4d56;

    & p {
      @include NotoSans(1.5, 400, #828282);
    }
  }

  & .init {
    margin-top: 5px;
    position: relative;

    & i {
      position: absolute;
      right: 10px;
      top: 13px;
      cursor: pointer;
    }

    & .pw1,
    & .pw2 {
      width: 20px;
      height: 12px;
      position: absolute;
      right: 10px;
      top: 20px;
      cursor: pointer;

      &.on {
        background: url("../../assets/images/eye_on.png") no-repeat;
      }

      &.off {
        background: url("../../assets/images/eye_off.png") no-repeat;
        background-position: left 0 top 3px;
      }
    }
  }

  & .join-title {
    width: 120px;
    @include NotoSans(1.7, 500, #4f4f4f);
    text-align: right;
    margin-bottom: 5px;
    margin-top: 20px;
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
      margin-top: 100px;
      font-size: 3rem;
    }

    & p {
      margin-top: 50px;
    }
  }

  & .bi {
    text-align: center;
  }

  & .btn-group {
    margin-top: 125px;
    margin-bottom: 400px;
    text-align: center;

    & button {
      text-align: center;
      height: 70px;
      @include NotoSans(2.5, 700, #fff);
      display: inline-block;
      margin: 0 auto;
      width: 300px;
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
    width: 600px;
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

    & .info-box {
      text-align: center;
      color: #747474;

      & h1 {
        margin-top: 50px;
        font-size: 3rem;
      }

      & p {
        margin-top: 10px;
      }
    }
  }
}
</style>
