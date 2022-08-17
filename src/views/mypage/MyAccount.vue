<template>
  <div>
    <section class="container-join">
      <div class="header">
        <h1>{{ $t("mypage-account-title") }}</h1>
        <a @click="deleteAccount">{{ $t("button-out") }}</a>
      </div>

      <div class="inp_container mb150">
        <div class="flex_container">
          <div class="bet mt111">
            <div class="join-title">
              {{ $t("mypage-myinfo-email") }} <span v-if="sns !== ''">({{ sns }})</span>
            </div>
            <div class="init email">{{ homepageUserEmail }}</div>
          </div>
          <div class="bet">
            <div class="join-title">{{ $t("mypage-myinfo-name") }}</div>
            <div class="init"><input type="text" v-model="homepageUserName" /></div>
          </div>
          <div class="bet" v-if="hasPassword === 'T'">
            <div class="join-title">{{ $t("mypage-myinfo-pw") }}</div>
            <div class="init">
              <input type="password" v-model="password" maxlength="16" readonly />
              <button type="button" class="change" @click="passwordChange(homepageUserEmail)">{{ $t("button-change") }}</button>
            </div>
          </div>
        </div>
      </div>
      <section class="btn-group mb200">
        <button class="confirm" @click="nameChange">{{ $t("button-modifyComp") }}</button>
      </section>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import passChangeModal from "@/components/modal/PasswordChange.vue";
import { getPopupOpt } from "@/utils/modal";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  mixins: [loading],
  data() {
    return {
      homepageUserEmail: "",
      homepageUserName: "",
      password: "",
      hasPassword: "",
      homepageUserSnsKind: "",
      sns: "",
    };
  },
  computed: {
    ...mapGetters("member", ["getMe", "setName"]),
  },
  watch: {
    homepageUserSnsKind(n) {
      if (n === "SYS21823B006") {
        this.sns = this.$t("mypage-myinfo-kakao");
      } else if (n === "SYS21823B005") {
        this.sns = this.$t("mypage-myinfo-naver");
      } else if (n === "SYS21823B007") {
        this.sns = this.$t("mypage-myinfo-google");
      } else if (n === "SYS22719B001") {
        this.sns = this.$t("mypage-myinfo-facebook");
      } else if (n === "SYS22429B001") {
        this.sns = this.$t("mypage-myinfo-apple");
      }
    },
  },
  async created() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/ME");
      if (this.getMe.addtuneApiResult.errorCode == 200) {
        const info = this.getMe.addtuneApiResult.login;
        this.homepageUserName = info.homepageUserName;
        this.homepageUserEmail = info.homepageUserEmail;
        this.homepageUserSnsKind = info.homepageUserSnsKind;
      } else {
        alert(this.getMe.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    async nameChange() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/CHANGE_NAME", {
          homepageUserEmail: this.homepageUserEmail,
          homepageUserName: this.homepageUserName,
        });
        if (this.setName.addtuneApiResult.errorCode == 200) {
          this.homepageUserName = this.setName.addtuneApiResult.homepageUserMaster.homepageUserName;
          alert(this.setName.addtuneApiResult.errorMessage);
          await this.$router.push("/mypage/myinfo");
        } else {
          alert(this.setName.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    passwordChange(email) {
      this.$modal.show(passChangeModal, { email }, getPopupOpt("passChangeModal", "615px", "auto", false));
    },
    deleteAccount() {
      this.$router.push("/mypage/deleteAccount");
    },
  },
};
</script>

<style lang="scss" scoped>
.inp_container {
  display: flex;
  flex-direction: column;
  align-items: center;

  & .flex_container {
    width: 80%;
  }
}

.bet {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;

  & .join-title {
    @include NotoSans(1.7, 500, #4f4f4f);
    white-space: nowrap;
    width: 115px;
    text-align: right;
  }
}
.container-join {
  width: 1052px;
  margin: 100px auto 50px;
  & h1 {
    @include NotoSans(3, 700, #333333);
    width: 100%;
    padding-bottom: 16px;
    border-bottom: 2px solid #ff4d56;
  }
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;

    & a {
      @include NotoSans(1.5, 400, #828282);
      border: 1px solid #f2f2f2;
      background: #f2f2f2;
      height: 35px;
      border-radius: 5px;
      line-height: 33px;
      padding: 0 18px;
      position: absolute;
      right: 10px;
      top: 8px;
    }
  }

  & .bi {
    text-align: center;
  }
  & .btn-group {
    margin-top: 85px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    & .confirm {
      display: block;
      background: #ff4d56;
      width: 300px;
      text-align: center;
      @include NotoSans(2.7, 700, #fff);
      margin: 0 auto;
      height: 70px;
      line-height: 70px;
      border-radius: 2px;
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

  & .init {
    position: relative;
    width: 600px;
    &.email {
      @include NotoSans(1.7, 400, #828282);
    }
    & .change {
      position: absolute;
      right: 0;
      top: 0;
      height: 50px;
      width: 165px;
      @include NotoSans(1.8, 700, #fff);
      background: #ff4d56;
      border-radius: 0px 2px 2px 0px;
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
