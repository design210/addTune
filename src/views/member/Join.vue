<template>
  <div>
    <section class="container-join">
      <h1>{{ $t("member-join-title") }}</h1>
      <div class="flx">
        <div class="ck mt95">
          <input id="all" v-model="allAgree" class="ck-img posit" type="checkbox" />
          <label for="all"
            ><span class="allC">{{ $t("member-join-agree") }}</span></label
          >
        </div>
        <div class="ck mt47">
          <input id="age" v-model="age" class="ck-img" type="checkbox" /><label for="age"
            >{{ $t("member-join-age") }} <span class="required">({{ $t("member-join-required") }})</span>
          </label>
        </div>
        <div class="ck mt47">
          <input id="use" v-model="use" class="ck-img" type="checkbox" /><label for="use"
            >{{ $t("member-join-tune") }} <span class="required">({{ $t("member-join-required") }})</span>
          </label>
        </div>
        <div class="use-info" v-html="terms"></div>
        <div class="ck">
          <input id="private" v-model="pri" class="ck-img" type="checkbox" /><label for="private"
            >{{ $t("member-join-private") }} <span class="required">({{ $t("member-join-required") }})</span>
          </label>
        </div>
        <div class="use-info" v-html="privacy"></div>
        <div class="ck">
          <input id="promotion" v-model="promotion" class="ck-img" type="checkbox" /><label for="promotion"
            >{{ $t("member-join-event") }} <span class="def">({{ $t("member-join-select") }})</span>
          </label>
        </div>
        <div class="use-info" v-html="promotionData"></div>
      </div>
      <section class="btn-group mt100">
        <button class="confirm" @click="confirm">{{ $t("button-next") }}</button>
      </section>
    </section>
    <!-- 알럿 -->
    <alim :color="color" :open="snackbar" :txt="text" @reset="emitReset"></alim>
  </div>
</template>

<script>
import alim from "@/components/dialog/Alim.vue";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: { alim },
  mixins: [loading],
  data() {
    return {
      allAgree: false,
      age: false,
      use: false,
      pri: false,
      promotion: false,
      disable: false,
      terms: "",
      privacy: "",
      promotionData: "",
      //알림 데이터
      snackbar: false,
      text: "",
      color: "",
      errorColor: "orange darken-3",
      successColor: "light-blue darken-4",
    };
  },
  computed: {
    ...mapGetters("member", ["getTerms", "getPrivacy", "getPromotionInfo"]),
  },
  watch: {
    allAgree(n) {
      if (n === true) {
        this.age = true;
        this.use = true;
        this.pri = true;
        this.promotion = true;
        this.disable = true;
      } else {
        if (this.disable === true) {
          this.age = false;
          this.use = false;
          this.pri = false;
          this.promotion = false;
        }
      }
    },
    age(n) {
      if (n === false) {
        this.disable = false;
        this.allAgree = false;
      } else {
        if (this.age === true && this.use === true && this.pri === true && this.promotion === true) {
          this.allAgree = true;
          this.disable = true;
        }
      }
    },
    use(n) {
      if (n === false) {
        this.disable = false;
        this.allAgree = false;
      } else {
        if (this.age === true && this.use === true && this.pri === true && this.promotion === true) {
          this.allAgree = true;
          this.disable = true;
        }
      }
    },
    pri(n) {
      if (n === false) {
        this.disable = false;
        this.allAgree = false;
      } else {
        if (this.age === true && this.use === true && this.pri === true && this.promotion === true) {
          this.allAgree = true;
          this.disable = true;
        }
      }
    },
    promotion(n) {
      if (n === false) {
        this.disable = false;
        this.allAgree = false;
      } else {
        if (this.age === true && this.use === true && this.pri === true && this.promotion === true) {
          this.allAgree = true;
          this.disable = true;
        }
      }
    },
  },
  async mounted() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/GET_TERMS");
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/GET_PRICACY");
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/GET_PROMOTION_INFO");
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
    this.terms = this.getTerms;
    this.privacy = this.getPrivacy;
    this.promotionData = this.getPromotionInfo;
  },
  methods: {
    confirm() {
      if (this.age === false) {
        this.alim(this.$t("member-join-alert1"), this.errorColor);
        return false;
      }
      if (this.use === false) {
        this.alim(this.$t("member-join-alert2"), this.errorColor);
        return false;
      }
      if (this.pri === false) {
        this.alim(this.$t("member-join-alert3"), this.errorColor);
        return false;
      }
      let pro = "";
      this.promotion ? (pro = "SYS22103B007") : (pro = "SYS22103B008");

      this.$router.push({
        name: "joinInit",
        query: { promotion: pro },
        params: {
          homepageUserSnsId: this.$route.params.homepageUserSnsId,
          homepageUserSnsKind: this.$route.params.homepageUserSnsKind,
          homepageUserSnsEmail: this.$route.params.homepageUserSnsEmail,
        },
      });
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
.required {
  @include NotoSans(1.2, 400, #ff4d56);
}

.def {
  @include NotoSans(1.2, 400, #828282);
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
    padding-bottom: 51px;
    border-bottom: 2px solid #ff4d56;
  }

  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  & .bi {
    text-align: center;
  }

  & .ck1 {
    margin-top: 40px;
  }

  & .ck {
    margin-top: 50px;
    padding-left: 30px;
    width: 900px;
  }

  & .use-info {
    margin-top: 20px;
    width: 900px;
    border: 0.5px solid #e5e5e5;
    border-radius: 5px;
    padding: 17px 25px 45px;
    font-size: 1.2rem;
    color: #a4a4a4;
    height: 155px;
    overflow-y: auto;
  }

  & .btn-group {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    & .cancel {
      background: #747474;
      width: 220px;
      text-align: center;
      color: #fff;
      font-size: 2.1rem;
      font-weight: 700;
      height: 60px;
      line-height: 60px;
      margin-right: 10px;
    }

    & .confirm {
      display: block;
      background: #ff4d56;
      width: 300px;
      text-align: center;
      @include NotoSans(2.5, 700, #ffffff);
      margin: 0 auto;
      height: 70px;

      &:disabled {
        background: #828282;
      }
    }
  }

  & .copyright {
    margin-top: 50px;
    text-align: center;

    & span {
      @include NotoSans(1.2, 400, #747474);
    }

    & .bi {
      margin-right: 10px;
      height: 15px;
      vertical-align: -2px;
    }
  }

  & .allC {
    @include NotoSans(2.2, 700, #4f4f4f);
  }

  input[type="checkbox"] {
    display: none;
  }

  input[type="checkbox"] + label {
    @include NotoSans(1.8, 400, #bdbdbd);
    cursor: pointer;
    display: inline-block;
    position: relative;
  }

  input[type="checkbox"] + label::after {
    content: "";
    width: 22px;
    height: 17px;
    background: url("../../assets/images/Path3.png");
    font-size: 25px;
    text-align: center;
    position: absolute;
    left: -30px;
    top: 4px;
  }

  input[type="checkbox"] {
    &.posit {
      & + label::after {
        top: 10px;
      }
    }
  }

  input[type="checkbox"]:checked + label {
    @include NotoSans(1.8, 700, #4f4f4f);
  }

  input[type="checkbox"]:checked + label::after {
    content: "";
    background: url("../../assets/images/Path4.png");
    @include NotoSans(1.8, 400, #ff4d56);
  }

  label {
    padding-left: 10px;
  }
}
</style>
