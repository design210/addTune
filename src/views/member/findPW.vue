<template>
  <div>
    <section class="container-join">
      <div class="header">
        <h1>{{ $t("member-findPw-title") }}</h1>
        <p class="mt12">{{ $t("member-findPw-info") }}</p>
      </div>
      <div class="flx">
        <div class="bet mt100">
          <div class="join-title mt15">{{ $t("member-findPw-email") }}</div>
          <div>
            <div class="init" :class="emailAlim.length < 1 ? 'pb18' : ''"><input type="text" v-model="email" /></div>
            <div class="error-text">{{ emailAlim }}</div>
          </div>
        </div>
      </div>
      <section class="btn-group">
        <button @click="send" :disabled="idok">{{ $t("member-findPw-emailRequest") }}</button>
      </section>
      <section class="login">
        <span>{{ $t("member-findPw-notYet") }}</span>
        <router-link to="/join">{{ $t("gnb-signup") }}</router-link>
      </section>
    </section>
  </div>
</template>

<script>
import { verifyEmail } from "@/utils/validate.js";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
export default {
  mixins: [loading],
  data() {
    return {
      email: "",
      idok: true,
      emailAlim: "",
    };
  },
  computed: {
    ...mapGetters("member", ["getPW"]),
  },
  watch: {
    email(n) {
      if (n === "") {
        this.emailAlim = "";
      } else {
        let result = verifyEmail(n);
        if (result === false) {
          this.emailAlim = "이메일 형식이 올바르지 않습니다.";
          this.idok = true;
        } else {
          this.emailAlim = "";
          this.idok = false;
        }
      }
    },
  },
  methods: {
    async send() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/FINDPW", this.email);
        if (this.getPW.addtuneApiResult.errorCode === 200) {
          alert(this.getPW.addtuneApiResult.errorMessage);
        } else {
          alert(this.getPW.addtuneApiResult.errorMessage);
        }
        await this.$router.push("/main");
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
  & .join-title {
    width: 145px;
    @include NotoSans(1.7, 500, #4f4f4f);
    text-align: right;
  }
  & .error-text {
    color: #ff4d56;
    font-size: 1.2rem;
    margin-top: 5px;
  }
  & .login {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 300px;
    @include NotoSans(1.5, 500, #828282);
    & a {
      @include NotoSans(1.5, 700, #4f4f4f);
      margin-left: 5px;
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
      @include NotoSans(2.5, 700, #fff);
      height: 70px;
      display: inline-block;
      margin: 0 auto;
      width: 400px;
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
  & input[type="text"] {
    border: 1px solid #e5e5e5;
    width: 600px;
    height: 50px;
    padding: 0 40px 0 10px;
    font-size: 1.5rem;
  }
}
</style>
