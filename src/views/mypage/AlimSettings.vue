<template>
  <div class="mt172 mb200">
    <div class="flx">
      <h1>{{ $t("mypage-alimSet-title") }}</h1>
      <div class="mid">
        <span class="switcher">
          <input id="promotion" v-model="toggle.promotion" type="checkbox" @change="promotion" />
          <label class="switch" for="promotion"></label>
        </span>
      </div>
    </div>
    <span class="agree mt12">{{ $t("mypage-alimSet-agree") }} : {{ configDate }}</span>
    <div class="bx mt55">
      <div class="flx mid imp">
        <span class="txt">{{ $t("mypage-alimSet-sms") }}</span>
        <span class="switcher">
          <input id="sms" v-model="toggle.sms" type="checkbox" @change="toggleSmsValue" />
          <label class="switch" for="sms"></label>
        </span>
      </div>
      <div class="flx mt14 mid imp">
        <span class="txt">{{ $t("mypage-alimSet-email") }}</span>
        <span class="switcher">
          <input id="email" v-model="toggle.email" type="checkbox" @change="toggleEmailValue" />
          <label class="switch" for="email"></label>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import debounce from "lodash.debounce";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  mixins: [loading],
  data() {
    return {
      configDate: "",
      toggle: {
        promotion: false,
        sms: false,
        email: false,
      },
      value: {
        promotion: {
          sysCodeSid: "",
          configValue: "",
        },
        sms: {
          sysCodeSid: "",
          configValue: "",
        },
        email: {
          sysCodeSid: "",
          configValue: "",
        },
      },
    };
  },
  computed: {
    ...mapGetters("member", ["getUserConfig"]),
  },
  async mounted() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/GET_USER_CONFIG");
      const res = this.getUserConfig.addtuneApiResult;
      if (res.errorCode === 200) {
        res.userConfig.forEach(ele => {
          if (ele.sysCodeSid === "SYS22103B002") {
            this.value.promotion.sysCodeSid = ele.sysCodeSid;
            this.value.promotion.configValue = ele.configValue;
          }
          if (ele.sysCodeSid === "SYS22103B003") {
            this.value.sms.sysCodeSid = ele.sysCodeSid;
            this.value.sms.configValue = ele.configValue;
          }
          if (ele.sysCodeSid === "SYS22103B004") {
            this.value.email.sysCodeSid = ele.sysCodeSid;
            this.value.email.configValue = ele.configValue;
          }
        });
        this.value.promotion.configValue === "SYS22103B007" ? (this.toggle.promotion = true) : (this.toggle.promotion = false);
        this.value.sms.configValue === "SYS22103B009" ? (this.toggle.sms = true) : (this.toggle.sms = false);
        this.value.email.configValue === "SYS22103B011" ? (this.toggle.email = true) : (this.toggle.email = false);
        this.configDate = res.userConfig[0].configDate;
      } else {
        alert(res.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    promotion: debounce(function () {
      if (this.toggle.promotion === true) {
        this.toggle.sms = true;
        this.toggle.email = true;
        this.allChangeValue(true);
      } else {
        this.toggle.sms = false;
        this.toggle.email = false;
        this.allChangeValue(false);
      }
    }, 300),
    toggleSmsValue: debounce(function () {
      if (this.toggle.sms === false && this.toggle.email === false) {
        this.toggle.promotion = false;
        this.value.promotion.configValue = "SYS22103B008";
      } else {
        this.toggle.promotion = true;
        this.value.promotion.configValue = "SYS22103B007";
      }
      if (this.toggle.sms === true) {
        this.value.sms.configValue = "SYS22103B009";
      } else {
        this.value.sms.configValue = "SYS22103B010";
      }
      this.changeValue();
    }, 300),
    toggleEmailValue: debounce(function () {
      if (this.toggle.sms === false && this.toggle.email === false) {
        this.toggle.promotion = false;
        this.value.promotion.configValue = "SYS22103B008";
      } else {
        this.toggle.promotion = true;
        this.value.promotion.configValue = "SYS22103B007";
      }
      if (this.toggle.email === true) {
        this.value.email.configValue = "SYS22103B011";
      } else {
        this.value.email.configValue = "SYS22103B012";
      }
      this.changeValue();
    }, 300),
    async changeValue() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/SET_USER_CONFIG", {
          sysCodeSid: "SYS22103B002",
          configValue: this.value.promotion.configValue,
        });
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/SET_USER_CONFIG", {
          sysCodeSid: "SYS22103B003",
          configValue: this.value.sms.configValue,
        });
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/SET_USER_CONFIG", {
          sysCodeSid: "SYS22103B004",
          configValue: this.value.email.configValue,
        });
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async allChangeValue(status) {
      if (status === true) {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("member/SET_USER_CONFIG", {
            sysCodeSid: "SYS22103B002",
            configValue: "SYS22103B007",
          });
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("member/SET_USER_CONFIG", {
            sysCodeSid: "SYS22103B003",
            configValue: "SYS22103B009",
          });
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("member/SET_USER_CONFIG", {
            sysCodeSid: "SYS22103B004",
            configValue: "SYS22103B011",
          });
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      } else {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("member/SET_USER_CONFIG", {
            sysCodeSid: "SYS22103B002",
            configValue: "SYS22103B008",
          });
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("member/SET_USER_CONFIG", {
            sysCodeSid: "SYS22103B003",
            configValue: "SYS22103B010",
          });
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("member/SET_USER_CONFIG", {
            sysCodeSid: "SYS22103B004",
            configValue: "SYS22103B012",
          });
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin def {
  display: flex;
  justify-content: space-between;

  & h1 {
    @include NotoSans(2.1, 500, #333);
  }
  & .txt {
    @include NotoSans(1.6, 400, #4f4f4f);
  }
}

.flx {
  width: 415px;
  @include def;
}

.agree {
  @include NotoSans(1.5, 400, #828282);
}

.bx {
  width: 836px;
  height: 144px;
  background: #f7f7f7;
  border-radius: 10px;
  padding-top: 35px;
  padding-left: 40px;
}

.mid {
  display: flex;
  align-items: center;
}

.imp {
  @include def;
  width: 375px;
}
</style>
