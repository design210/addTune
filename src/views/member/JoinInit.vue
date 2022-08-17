<template>
  <div>
    <section class="container-join">
      <h1>{{ $t("gnb-signup") }}</h1>
      <div class="centerd mt55">
        <div>
          <!-- 자동완성 방지용 -->
          <input style="width: 0; height: 0; position: absolute; opacity: 0" type="text" />
          <input style="width: 0; height: 0; position: absolute; opacity: 0" type="password" />
          <!-- 자동완성 방지용 -->

          <div class="flx">
            <div class="join-title">{{ $t("member-findPw-email") }}</div>
            <div :class="emailAlim.length < 1 ? 'pb18' : ''">
              <div class="init">
                <input ref="target" v-model="email" autocomplete="off" type="text" :disabled="snsEmailDisabled" />
              </div>
              <div class="error-text">{{ emailAlim }}</div>
            </div>
          </div>
          <div class="flx" v-if="$route.params.homepageUserSnsId === undefined">
            <div class="join-title">{{ $t("mypage-myinfo-pw") }}</div>
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
          <div class="flx" v-if="$route.params.homepageUserSnsId === undefined">
            <div class="join-title">{{ $t("mypage-myinfo-pwRe") }}</div>
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
          <div class="flx">
            <div class="join-title">{{ $t("mypage-myinfo-name") }}</div>
            <div :class="nameAlim.length < 1 ? 'pb18' : ''">
              <div class="init"><input v-model="name" type="text" /></div>
              <div class="error-text">{{ nameAlim }}</div>
            </div>
          </div>
          <div class="flx">
            <div class="join-title">{{ $t("mypage-myinfo-suggestion") }}</div>
            <div class="init"><input v-model="homepageUserPathfinder" :placeholder="$t('mypage-myinfo-suggestionCode')" type="text" /></div>
          </div>
        </div>
      </div>
      <section class="btn-group">
        <button :disabled="btnActive" class="confirm" @click="confirm">{{ $t("button-signup") }}</button>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :color="color" :open="snackbar" :txt="text" @reset="emitReset"></alim>
    <vue-apple-login
      mode="center-align"
      type="sign in"
      color="black"
      :border="true"
      :radius="10"
      width="100%"
      height="100%"
      logoSize="medium"
      :logoPosition="0"
      :labelPosition="0"
      className="vue-apple-login"
      :onSuccess="callSuccess"
      :onFailure="callFail"
      style="opacity: 0; width: 0; height: 0"
    ></vue-apple-login>
    <div id="my-signin2" style="display: none"></div>
  </div>
</template>

<script>
import { CheckPassword, verifyEmail, verifyName } from "@/utils/validate.js";
import { mapGetters } from "vuex";
import alim from "@/components/dialog/Alim.vue";
import { baseURL } from "@/api/index";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import axios from "axios";
import kakao from "@/utils/snsLogin/kakao";
import naver from "@/utils/snsLogin/naver";
import google from "@/utils/snsLogin/google";
import apple from "@/utils/snsLogin/apple";
import facebook from "@/utils/snsLogin/facebook";
import { loadScript } from "vue-plugin-load-script";

export default {
  components: { alim },
  mixins: [loading],
  data() {
    return {
      //알림 데이터
      snackbar: false,
      text: "",
      color: "",
      errorColor: "orange darken-3",
      successColor: "light-blue darken-4",
      password: "",
      password_confirmation: "",
      email: "",
      name: "",
      pw1: true,
      pw2: true,
      emailAlim: "",
      pwAlim: "",
      reAlim: "",
      nameAlim: "",
      homepageUserPathfinder: "",
      idok: false,
      pwok: false,
      pwreok: false,
      nameok: false,
      btnActive: true,
      snsEmailDisabled: false,
      snsKind: "",
    };
  },
  computed: {
    ...mapGetters("member", ["getJoinInfo", "getJoinSnsInfo"]),
  },
  watch: {
    email(n) {
      if (n === "") {
        this.emailAlim = "";
        this.idok = false;
      } else {
        let result = verifyEmail(n);

        if (result === false) {
          this.emailAlim = this.$t("member-signup-alert1");
          this.idok = false;
        } else {
          this.emailAlim = "";
          this.idok = true;
        }
      }
      this.activeJoinBtnActive();
    },
    password(n) {
      if (n === "") {
        this.pwAlim = "";
        this.pwok = false;
      } else {
        let result = CheckPassword(n);
        if (result === "error-length") {
          this.pwAlim = this.$t("member-signup-alert2");
          this.pwok = false;
        } else if (result === "error-spe") {
          this.pwAlim = this.$t("member-signup-alert3");
          this.pwok = false;
        } else if (result === true) {
          this.pwAlim = "";
          this.pwok = true;
        }
      }
      if (this.password_confirmation !== "" && n !== this.password_confirmation) {
        this.reAlim = this.$t("member-signup-alert4");
      } else {
        this.reAlim = "";
      }
      this.activeJoinBtnActive();
    },
    password_confirmation(n) {
      if (n === "") {
        this.pwreok = false;
        this.reAlim = "";
      } else if (this.password !== n) {
        this.reAlim = this.$t("member-signup-alert4");
        this.pwreok = false;
      } else {
        this.reAlim = "";
        this.pwreok = true;
      }
      if (this.password !== "" && n !== this.password) {
        this.reAlim = this.$t("member-signup-alert4");
      } else {
        this.reAlim = "";
      }
      this.activeJoinBtnActive();
    },
    name(n) {
      if (n === "") {
        this.nameAlim = "";
        this.nameok = false;
      } else {
        let result = verifyName(n);
        if (result) {
          this.nameAlim = "";
          this.nameok = true;
        } else {
          this.nameAlim = this.$t("member-signup-alert5");
          this.nameok = false;
        }
      }
      this.activeJoinBtnActive();
    },
  },
  mounted() {
    const init = document.querySelector(".pw1");
    if (init) {
      document.querySelector(".pw1").addEventListener("click", () => (this.pw1 = !this.pw1));
      document.querySelector(".pw2").addEventListener("click", () => (this.pw2 = !this.pw2));
    }
    console.log(this.$route.params);
    if (this.$route.params.homepageUserSnsEmail !== undefined) {
      this.email = this.$route.params.homepageUserSnsEmail;
    }
    this.snsKind = this.$route.params.homepageUserSnsKind;

    if (this.snsKind === "SYS21823B006" || this.snsKind === "SYS21823B005" || this.snsKind === "SYS21823B007" || this.snsKind === "SYS22719B001") {
      this.$route.params.homepageUserSnsEmail === undefined ? (this.snsEmailDisabled = false) : (this.snsEmailDisabled = true);
    }
    if (this.snsKind === "SYS21823B006") {
      loadScript("https://developers.kakao.com/sdk/js/kakao.js")
        .then(() => {
          window.Kakao.init(process.env.VUE_APP_KAKAO_KEY);
        })
        .catch(() => {});
    } else if (this.snsKind === "SYS21823B005") {
      loadScript("https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js")
        .then(() => {
          if (this.$route.hash !== "") {
            const params = this.$route.hash.split("&").map(part => part.replace(/#/, ""));
            const parsedParams = {};
            params.forEach(param => {
              const parts = param.split("=");
              parsedParams[parts[0]] = parts[1];
            });
            this.naverRestApi(parsedParams);
          }
        })
        .catch(() => {});
    } else if (this.snsKind === "SYS22429B001") {
      loadScript("https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js")
        .then(() => {})
        .catch(() => {});
    } else if (this.snsKind === "SYS22719B001") {
      this.init();
    }
  },
  setup() {
    return {
      ...naver(),
      ...kakao(),
      ...google(),
      ...apple(),
      ...facebook(),
    };
  },
  methods: {
    async confirm() {
      let txt = "";
      //이메일 체크
      try {
        bus.$emit("start:spinner");
        await axios.get(`${baseURL}/emailCheck?email=${this.email}`).then(res => (txt = res.data.addtuneApiResult.errorMessage));
        if (txt === this.$t("member-signup-alert6")) {
          bus.$emit("end:spinner");
          this.emailAlim = txt;
          return this.$refs.target.focus();
        }
        if (txt === this.$t("member-signup-alert7")) {
          bus.$emit("end:spinner");
          this.emailAlim = txt;
          return this.$refs.target.focus();
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
      //일반 이메일 가입
      if (this.snsKind === undefined) {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("member/JOIN", {
            homepageUserKind: "SYS21823B004",
            homepageUserName: this.name,
            homepageUserEmail: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            homepageUserPathfinder: this.homepageUserPathfinder,
            promotionConfig: this.$route.query.promotion,
            homepageUserDevice: "SYS22407B005",
          });
          if (this.getJoinInfo.addtuneApiResult.errorCode == 200) {
            await this.$router.push("/welcome");
          } else {
            this.emailAlim = this.getJoinInfo.addtuneApiResult.errorMessage;
          }
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      }
      //sns 가입
      else {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("member/JOIN_SNS", {
            homepageUserKind: "SYS21823B004",
            homepageUserName: this.name,
            homepageUserEmail: this.email,
            homepageUserPathfinder: this.homepageUserPathfinder,
            homepageUserDevice: "SYS22407B005",
            homepageUserSnsId: this.$route.params.homepageUserSnsId,
            homepageUserSnsKind: this.$route.params.homepageUserSnsKind,
          });
          if (this.getJoinSnsInfo.addtuneApiResult.errorCode == 200) {
            if (this.snsKind === "SYS21823B006") {
              this.kakaoLoginBtn();
            } else if (this.snsKind === "SYS21823B005") {
              this.naverLoginBtn();
            } else if (this.snsKind === "SYS21823B007") {
              this.GoogleLoginBtn();
            } else if (this.snsKind === "SYS22429B001") {
              const el = document.querySelector(".vue-apple-login");
              el.click();
            } else if (this.snsKind === "SYS22719B001") {
              await this.signup();
            }
          } else {
            this.emailAlim = this.getJoinSnsInfo.addtuneApiResult.errorMessage;
          }
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      }
    },
    //버튼 활성 비활성
    activeJoinBtnActive() {
      if (this.$route.params.homepageUserSnsId === undefined) {
        if (this.idok === true && this.pwok === true && this.pwreok === true && this.nameok === true) {
          this.btnActive = false;
        } else {
          this.btnActive = true;
        }
      } else {
        if (this.idok === true && this.nameok === true) {
          this.btnActive = false;
        } else {
          this.btnActive = true;
        }
      }
    },
    //알림리셋
    emitReset() {
      this.snackbar = false;
      this.text = "";
    },
    //알림 호출
    alim(text, color) {
      this.snackbar = true;
      this.text = text;
      this.color = color;
      const _this = this;
      let time = setTimeout(function () {
        _this.snackbar = false;
        _this.text = "";
        _this.color = "";
        clearInterval(time);
      }, 3000);
    },
  },
};
</script>

<style lang="scss" scoped>
.flx {
  display: flex;
  justify-content: space-between;
  margin-top: 19px;
  width: 765px;
}

.centerd {
  display: flex;
  justify-content: center;
}

.container-join {
  width: 1052px;
  margin: 100px auto 50px;

  & h1 {
    @include NotoSans(2.5, 700, #333333);
    border-bottom: 2px solid #ff4d56;
    padding-bottom: 51px;
    margin-top: 100px;
  }

  & .bi {
    text-align: center;
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

  & .join-title {
    width: 120px;
    text-align: right;
    @include NotoSans(1.7, 500, #4f4f4f);
    padding-top: 12.5px;
  }

  & .init {
    width: 600px;
    height: 50px;
    position: relative;
    & input[type="text"] {
      &:disabled {
        background: #f4f4f4;
      }
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

  & .error-text {
    color: #ff4d56;
    font-size: 1.2rem;
    margin-top: 5px;
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
</style>
