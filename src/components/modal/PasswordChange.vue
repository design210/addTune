<template>
  <modalWrap @close="close">
    <template slot="head">
      <h1>{{ $t("modal-changePw-title") }}</h1>
    </template>
    <template slot="body">
      <div class="comment">{{ $t("mypage-out-pw") }}</div>
      <div class="init">
        <input v-if="pw1 === true" v-model="oldPassword" maxlength="16" type="password" />
        <input v-else v-model="oldPassword" maxlength="16" type="text" />
        <span v-if="pw1" class="pw1 off" @click="pw1 = false"></span>
        <span v-else class="pw1 on" @click="pw1 = true"></span>
        <p class="error mt5">{{ err1 }}</p>
      </div>
      <div class="comment mt30">{{ $t("member-resetPw-new") }}</div>
      <div class="init">
        <input v-if="pw2 === true" v-model="password" maxlength="16" type="password" />
        <input v-else v-model="password" maxlength="16" type="text" />
        <span v-if="pw2" class="pw2 off" @click="pw2 = false"></span>
        <span v-else class="pw2 on" @click="pw2 = true"></span>
        <p class="error mt5">{{ err2 }}</p>
      </div>
      <div class="comment mt30">{{ $t("member-resetPw-reInit") }}</div>
      <div class="init">
        <input v-if="pw3 === true" v-model="password_confirmation" maxlength="16" type="password" />
        <input v-else v-model="password_confirmation" maxlength="16" type="text" />
        <span v-if="pw3" class="pw3 off" @click="pw3 = false"></span>
        <span v-else class="pw3 on" @click="pw3 = true"></span>
        <p class="error mt5">{{ err3 }}</p>
      </div>
    </template>
    <template slot="footer">
      <div class="btn-wrap">
        <button @click="save">변경</button>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { CheckPassword } from "@/utils/validate.js";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";

export default {
  components: {
    modalWrap,
  },
  mixins: [loading],
  props: ["email"],
  data() {
    return {
      oldPassword: "",
      password: "",
      password_confirmation: "",
      pw1: true,
      pw2: true,
      pw3: true,
      err1: "",
      err2: "",
      err3: "",
    };
  },
  computed: {
    ...mapGetters("member", ["getLoginInfo", "setPw"]),
  },
  watch: {
    password(n) {
      if (n !== "") {
        let result = CheckPassword(n);
        if (result == "error-length") {
          this.err2 = this.$t("member-signup-alert2");
        } else if (result == "error-spe") {
          this.err2 = this.$t("member-signup-alert3");
        } else if (result == true) {
          this.err2 = "";
        }
      }
    },
    password_confirmation(n) {
      if (n !== "") {
        if (this.password !== this.password_confirmation) {
          this.err3 = this.$t("member-signup-alert8");
        } else {
          this.err3 = "";
        }
      }
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/CHANGE_PW", {
          homepageUserEmail: this.email,
          oldPassword: this.oldPassword,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
        if (this.setPw.addtuneApiResult.errorCode == 200) {
          this.close();
          alert(this.setPw.addtuneApiResult.errorMessage);
        } else {
          alert(this.setPw.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        alert(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  @include NotoSans(3, 700, #333333);
  text-align: center;
  margin-top: 50px;
}

.comment {
  @include NotoSans(1.7, 400, #333333);
}

input {
  @include NotoSans(1.6, 400, #333333);

  &::placeholder {
    @include NotoSans(1.6, 400, #bdbdbd);
  }

  border: 1px solid #c4c4c4;
  height: 50px;
  padding: 0 20px;
  width: 100%;
  margin-top: 10px;
}

.btn-wrap {
  text-align: center;
  margin-top: 55px;
  margin-bottom: 50px;

  & button {
    width: 250px;
    height: 70px;
    background: #ff4d56;
    border-radius: 2px;
    @include NotoSans(2, 700, #fff);

    &:disabled {
      background: #828282;
    }
  }
}

.init {
  position: relative;

  & .pw1,
  & .pw2,
  & .pw3 {
    width: 20px;
    height: 12px;
    position: absolute;
    right: 15px;
    top: 30px;
    cursor: pointer;

    &.on {
      background: url("../../assets/images/eye_on.png") no-repeat;
    }

    &.off {
      background: url("../../assets/images/eye_off.png") no-repeat;
      background-position: left 0 top 3px;
    }
  }

  & .error {
    @include NotoSans(1.3, 400, #ff4d56);
  }
}
</style>
