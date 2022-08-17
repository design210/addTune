<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="alert mt40"><img alt="" src="@/assets/images/alert.png" /></div>
      <h2>{{ title }}</h2>
    </template>
    <template slot="body">
      <div class="subject">{{ $t("member-findPw-email") }}</div>
      <div class="id"><input v-model="email" type="text" /></div>
      <!--			<div class="error-text" v-html="emailAlim"></div>-->
      <div class="subject mt20">
        <span>{{ $t("mypage-myinfo-pw") }}</span>
        <span @click="pwFind">{{ $t("member-sns-forgot") }}</span>
      </div>
      <div class="password"><input v-model="password" type="password" @keyup.enter="confirm" /></div>
      <div class="error-text" v-html="pwAlim"></div>
      <div class="btn-wrap mt60">
        <button type="button" @click="confirm">{{ $t("gnb-login") }}</button>
      </div>
      <div class="join mt20">
        {{ $t("member-findPw-notYet") }}
        <router-link to="/join">{{ $t("gnb-signup") }}</router-link>
      </div>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>

<script>
import { CheckPassword, verifyEmail } from "@/utils/validate.js";
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import { deleteCookie, getEstimateCookie } from "@/utils/cookie";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: {
    modalWrap,
  },
  mixins: [loading],
  props: ["status", "data"],
  data() {
    return {
      title: "",
      //데이터
      password: "",
      email: "",
      emailAlim: "",
      pwAlim: "",
      idok: false,
      pwok: false,
      userAdvertiserSid: "",
    };
  },
  computed: {
    ...mapGetters("member", ["login", "getMe"]),
    ...mapGetters("admain", ["setAdEstimate"]),
  },
  watch: {
    email(n) {
      if (n === "") {
        this.emailAlim = "";
      } else {
        let result = verifyEmail(n);
        if (result == false) {
          this.emailAlim = this.$t("member-signup-alert1");
          this.idok = false;
        } else {
          this.emailAlim = "";
          this.idok = true;
        }
      }
    },
    password(n) {
      if (n === "") {
        this.pwAlim = "";
      } else {
        let result = CheckPassword(n);
        // if (result == 'error-length') {
        // 	this.pwAlim = '비밀번호는 8자리 이상으로 입력해주세요.';
        // 	this.pwok = false;
        // } else if (result == 'error-spe') {
        // 	this.pwAlim = '영문, 숫자, 특수문자를 사용하여 입력해주세요.';
        // 	this.pwok = false;
        // } else
        if (result == true) {
          this.pwAlim = "";
          this.pwok = true;
        }
      }
    },
  },
  created() {
    if (this.status === "estimate") {
      this.title = this.$t("alert-t16");
    }
    if (this.status === "pay") {
      this.title = this.$t("alert-t17");
    }
  },
  methods: {
    async confirm() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/LOGIN", {
          homepageUserEmail: this.email,
          password: this.password,
        });
        if (this.login.addtuneApiResult.errorCode == 200) {
          if (this.status === "pay") {
            this.close();
            await this.$router.push({ name: "pay", params: this.data });
            bus.$emit("login", true);
          } else {
            await this.$store.dispatch("member/ME");
            bus.$emit("login", true);
            if (this.getMe.addtuneApiResult.errorCode == 200) {
              const info = this.getMe.addtuneApiResult.login;
              if (info.userAdvertiserSid !== null) {
                //사업자 등록 되있는 경우
                this.userAdvertiserSid = info.userAdvertiserSid;
                await this.sendData();
              } else {
                //사업자 등록이 안되어 있는 경우
                this.close();
                await this.$router.push({ name: "advertiser_info_init", params: this.data });
              }
            }
          }
        } else {
          this.pwAlim = this.login.addtuneApiResult.errorMessage;
        }
      } catch (error) {
        alert(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    close() {
      this.$emit("close");
    },
    async sendData() {
      if (this.status === "estimate") {
        const data = getEstimateCookie();
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("admain/AD_ESTIMATE", { basic: data, userAdvertiserSid: this.userAdvertiserSid });
          if (this.setAdEstimate.addtuneApiResult.errorCode == 200) {
            alert(this.$t("mypage-advInfo-alert1"));
            deleteCookie("estimate");
            this.close();
            await this.$router.push("/main");
            bus.$emit("login", true);
          } else {
            alert(this.setAdEstimate.addtuneApiResult.errorMessage);
          }
        } catch (error) {
          alert(error);
        } finally {
          bus.$emit("end:spinner");
        }
      } else if (this.status === "product") {
        this.close();
        bus.$emit("login", true);
      }
    },
    pwFind() {
      this.$emit("close");
      this.$router.push("/findPW");
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  @include NotoSans(3, 700, #333333);
  text-align: center;
}

.error-text {
  @include NotoSans(1.3, 400, #ff4d56);
  margin-top: 3px;
}

.alert {
  text-align: center;
}

.subject {
  @include NotoSans(1.7, 400, #000000);
  display: flex;
  justify-content: space-between;
  & span:last-child {
    padding-top: 3px;
    @include NotoSans(1.3, 500, #bdbdbd);
    cursor: pointer;
  }
}

input {
  width: 100%;
  border: 1px solid #c4c4c4;
  height: 53px;
  padding: 0 15px;
  @include NotoSans(1.7, 400, #000000);
}

.btn-wrap {
  text-align: center;

  button {
    background: #ff4d56;
    @include NotoSans(3, 700, #fff);
    height: 70px;
    width: 350px;
  }
}

.join {
  text-align: center;
  @include NotoSans(1.5, 400, #4f4f4f);

  & a {
    color: #4f4f4f;
    font-weight: 700 !important;
    margin-left: 10px;
  }
}
</style>
