<template>
  <section class="sns-login-wrap">
    <div class="total-wrap">
      <!-- 로그인 필드 영역 -->
      <section class="container-join">
        <div class="bi">
          <a @click="$router.push('/main')"><img src="@/assets/images/bi_lg.png" alt="add tune" width="190" /></a>
        </div>
        <div class="flx">
          <div class="bet mt60">
            <div class="join-title">{{ $t("member-findPw-email") }}</div>
            <div>
              <div class="init pb10"><input type="text" v-model="email" /></div>
              <!--						<div class="error-text">{{ data.emailAlim }}</div>-->
            </div>
          </div>
          <div class="bet">
            <div class="pw-wrap">
              <div class="join-title">{{ $t("mypage-myinfo-pw") }}</div>
              <router-link to="/findPW">{{ $t("member-sns-forgot") }}</router-link>
            </div>
            <div class="init">
              <input type="password" v-model="password" v-if="data.pw" @keyup.enter="confirm" :class="data.pwAlim.length < 1 ? 'mb18' : ''" />
              <input type="text" v-model="password" v-else @keyup.enter="confirm" />
              <v-icon class="pw" v-if="data.pw">mdi-eye-off-outline</v-icon>
              <v-icon class="pw" v-else>mdi-eye-outline</v-icon>
              <div class="error-text">{{ data.pwAlim }}</div>
            </div>
          </div>
        </div>
        <section class="btn-group">
          <button class="confirm" @click="confirm">로그인</button>
        </section>
        <section class="bottom mt10 mb46">
          <span class="mr10">{{ $t("member-findPw-notYet") }}</span>
          <router-link to="/join">{{ $t("gnb-signup") }}</router-link>
        </section>
      </section>
      <!-- //로그인 필드 영역 -->
      <div class="line">
        <span>{{ $t("member-sns") }}</span>
      </div>
      <div class="etc-wrap" :class="$i18n.locale === 'en' && 'en'">
        <kakaoLogin class="kakao" />
        <naverLogin class="naver" />
        <googleLogin class="google" />
        <facebookLogin class="facebook" />
        <div class="apple"><appleLogin /></div>
      </div>
      <div :class="latSnsLogin" class="tooltip" v-if="latSnsLogin !== null">{{ $t("member-sns-last") }}</div>
    </div>
  </section>
</template>

<script>
import { verifyEmail, CheckPassword } from "@/utils/validate.js";
import { ref, watch, reactive, onMounted, getCurrentInstance, computed } from "@vue/composition-api";
import bus from "@/utils/bus";
import { saveSnsLoginCookie } from "@/utils/cookie";
import kakaoLogin from "@/components/loginSns/Kakao";
import naverLogin from "@/components/loginSns/Naver";
import googleLogin from "@/components/loginSns/Google";
import appleLogin from "@/components/loginSns/Apple";
import facebookLogin from "@/components/loginSns/Facebook";
import { getSnsLoginCookie } from "@/utils/cookie";
export default {
  components: { kakaoLogin, naverLogin, googleLogin, appleLogin, facebookLogin },
  data() {
    return {
      latSnsLogin: "",
    };
  },
  mounted() {
    this.latSnsLogin = getSnsLoginCookie();
  },
  setup() {
    return {
      ...login(),
    };
  },
};

//로그인
function login() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const email = ref("");
  const password = ref("");
  const data = reactive({
    pw: true,
    emailAlim: "",
    pwAlim: "",
    idok: false,
    pwok: false,
  });
  onMounted(() => {
    document.querySelector(".pw").addEventListener("click", () => (data.pw = !data.pw));
  });
  watch(email, n => {
    if (n === "") {
      data.emailAlim = "";
    } else {
      let result = verifyEmail(n);
      if (result == false) {
        data.emailAlim = _this.$t("member-signup-alert1");
        data.idok = false;
      } else {
        data.emailAlim = "";
        data.idok = true;
      }
    }
  });
  watch(password, n => {
    if (n === "") {
      data.pwAlim = "";
    } else {
      let result = CheckPassword(n);
      // if (result == 'error-length') {
      // 	data.pwAlim = '비밀번호는 8자리 이상으로 입력해주세요.';
      // 	data.pwok = false;
      // } else if (result == 'error-spe') {
      // 	data.pwAlim = '영문, 숫자, 특수문자를 사용하여 입력해주세요.';
      // 	data.pwok = false;
      // } else if (result == true) {
      // 	data.pwAlim = '';
      // 	data.pwok = true;
      // }
    }
  });
  const getter = computed(() => _this.$store.getters["member/login"]);
  const confirm = async () => {
    await _this.$store.dispatch("member/LOGIN", { homepageUserEmail: email.value, password: password.value });
    const res = getter.value.addtuneApiResult;
    if (res.errorCode == 200) {
      saveSnsLoginCookie("email");
      bus.$emit("login", true);
      _this.$router.push("/main");
    } else {
      data.pwAlim = res.errorMessage;
    }
  };
  return { email, password, data, confirm };
}
</script>

<style lang="scss" scoped>
.sns-login-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  & .total-wrap {
    position: relative;
    width: 400px;
  }
  & .tooltip {
    position: absolute;
    background: #333333;
    height: 34px;
    border-radius: 17px;
    @include NotoSans(1.2, 400, #fff);
    line-height: 34px;
    padding: 0 10px;
    white-space: nowrap;
    &.email {
      bottom: 210px;
      left: 50%;
      transform: translate(-50%);
      &:after {
        content: "";
        width: 0px;
        height: 0px;
        border-bottom: 8px solid #333333;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        position: absolute;
        bottom: -8px;
        left: 45%;
        transform: rotate(180deg);
      }
    }
    &.kakao {
      bottom: -45px;
      left: -40px;
      &:after {
        content: "";
        width: 0px;
        height: 0px;
        border-bottom: 8px solid #333333;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        position: absolute;
        top: -8px;
        left: 48%;
      }
    }
    &.google {
      bottom: -45px;
      left: 114px;
      &:after {
        content: "";
        width: 0px;
        height: 0px;
        border-bottom: 8px solid #333333;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        position: absolute;
        top: -8px;
        left: 48%;
      }
    }
    &.facebook {
      bottom: -45px;
      left: 188px;
      &:after {
        content: "";
        width: 0px;
        height: 0px;
        border-bottom: 8px solid #333333;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        position: absolute;
        top: -8px;
        left: 48%;
      }
    }
    &.naver {
      bottom: -45px;
      left: 37px;
      &:after {
        content: "";
        width: 0px;
        height: 0px;
        border-bottom: 8px solid #333333;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        position: absolute;
        top: -8px;
        left: 48%;
      }
    }
    &.apple {
      bottom: -45px;
      left: 264px;
      &:after {
        content: "";
        width: 0px;
        height: 0px;
        border-bottom: 8px solid #333333;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        position: absolute;
        top: -8px;
        left: 48%;
      }
    }
  }
  & .line {
    width: 100%;
    margin: 50px auto 25px;
    text-align: center;
    border-top: 1px solid #828282;
    position: relative;
    & span {
      background-color: #fff;
      padding: 0 10px;
      @include NotoSans(1.5, 400, #828282);
      position: absolute;
      left: 50%;
      top: -12px;
      transform: translateX(-50%);
      white-space: nowrap;
    }
  }
  & .kakao-wrap {
    display: flex;
    justify-content: center;
  }
  & .etc-wrap {
    display: flex;
    justify-content: center;
    & > div {
      margin: 0 10px;
    }
    &.en {
      & .google {
        order: 1;
      }
      & .facebook {
        order: 2;
      }
      & .apple {
        order: 3;
      }
      & .naver {
        order: 4;
      }
      & .kakao {
        order: 5;
      }
    }
  }
  & .link {
    text-align: center;
    margin: 150px 0 160px;
    & a {
      @include NotoSans(1.5, 400, #828282);
      &.email {
        margin-right: 40px;
      }
    }
  }
}

button-login-button {
  background-color: white;
  height: 32px;
  width: 200px;
  border-radius: 5px;
  border: 0px;
  font-size: 12px;
  font-weight: 500;
  margin: 5px;
}
button-login-button svg {
  height: 15px;
  margin-top: -3px;
  margin-right: 3px;
}
.error-text {
  color: #ff4d56;
  font-size: 1.2rem;
  margin-top: 5px;
}
.flx {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container-join {
  width: 400px !important;
  margin: 0 !important;
  & .bi {
    text-align: center;
  }

  & .pw-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    & a {
      display: inline-block;
      @include NotoSans(1.3, 500, #828282);
      margin-left: 5px;
    }
  }
  & .btn-group {
    margin-top: 50px;
    & .confirm {
      display: block;
      background: #ff4d56;
      width: 100%;
      text-align: center;
      @include NotoSans(2, 600, #ffffff);
      margin: 0 auto;
      height: 54px;
      border-radius: 2px;
      &:disabled {
        background: #828282;
      }
    }
  }
  & .join-title {
    @include NotoSans(1.5, 500, #828282);
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
    & a {
      position: absolute;
      right: 0;
      top: -23px;
      @include NotoSans(1.3, 500, #bdbdbd);
    }
  }
  & input[type="text"],
  input[type="password"] {
    border: 1px solid #e5e5e5;
    width: 400px;
    height: 50px;
    padding: 0 40px 0 10px;
    font-size: 1.5rem;
  }
  & .bottom {
    text-align: center;
    @include NotoSans(1.3, 400, #828282);
    & a {
      @include NotoSans(1.3, 700, #4f4f4f);
    }
  }

  width: 1052px;
  margin: 100px auto 50px;
  & h1 {
    @include NotoSans(2.5, 700, #333333);
    width: 100%;
    padding-bottom: 51px;
    border-bottom: 2px solid #ff4d56;
  }
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
  }
}
</style>
