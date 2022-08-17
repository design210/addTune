<template>
  <div>
    <section class="container-join">
      <div class="header">
        <h1>{{ $t("gnb-login") }}</h1>
      </div>
      <div class="flx">
        <div class="bet mt100">
          <div class="join-title pt30">{{ $t("member-findPw-email") }}</div>
          <div>
            <div class="init pb18"><input type="text" v-model="email" /></div>
            <!--						<div class="error-text">{{ data.emailAlim }}</div>-->
          </div>
        </div>
        <div class="bet mt3">
          <div class="pw-wrap">
            <div class="join-title">{{ $t("mypage-myinfo-pw") }}</div>
          </div>
          <div class="init">
            <router-link to="/findPW">{{ $t("member-sns-forgot") }}</router-link>
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
      <section class="bottom mb200">
        <span>{{ $t("member-findPw-notYet") }}</span>
        <router-link to="/join">{{ $t("gnb-signup") }}</router-link>
      </section>
    </section>
  </div>
</template>

<script>
import { verifyEmail, CheckPassword } from "@/utils/validate.js";
import { ref, watch, reactive, onMounted, getCurrentInstance, computed } from "@vue/composition-api";
import bus from "@/utils/bus";
import { saveSnsLoginCookie } from "@/utils/cookie";
export default {
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
.bet {
  width: 80%;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
}
.flx {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.container-join {
  & .bi {
    text-align: center;
  }

  & .pw-wrap {
    display: flex;
    justify-content: space-between;
    margin-top: 35px;
  }
  & .btn-group {
    margin-top: 85px;
    & .confirm {
      display: block;
      background: #ff4d56;
      width: 300px;
      text-align: center;
      @include NotoSans(2.7, 700, #ffffff);
      margin: 0 auto;
      height: 70px;
      border-radius: 2px;
      &:disabled {
        background: #828282;
      }
    }
  }
  & .join-title {
    width: 130px;
    @include NotoSans(1.7, 500, #4f4f4f);
    text-align: right;
  }
  & .init {
    margin-top: 16px;
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
    width: 600px;
    height: 50px;
    padding: 0 40px 0 10px;
    font-size: 1.5rem;
  }
  & .bottom {
    text-align: center;
    margin-top: 20px;
    @include NotoSans(1.5, 500, #828282);
    & a {
      display: inline-block;
      @include NotoSans(1.5, 500, #4f4f4f);
      margin-left: 5px;
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
