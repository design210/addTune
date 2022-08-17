<template>
  <div class="col-flex-center mt162">
    <h1>{{ $t("mypage-out-title") }}</h1>
    <div class="col-flex-center mt35 des">
      <span v-html="$t('mypage-out-info')"></span>
    </div>
    <div class="col-flex-center check_box mt60">
      <ul class="mt15">
        <li v-html="$t('mypage-out-alim1')"></li>
        <li v-html="$t('mypage-out-alim2')"></li>
        <li v-html="$t('mypage-out-alim3')"></li>
      </ul>
      <div class="chk mt15">
        <input type="checkbox" id="check1" v-model="check" />
        <label for="check1">{{ $t("mypage-out-agree") }}</label>
      </div>
    </div>
    <div class="password mt50">
      <label>{{ $t("mypage-out-pw") }}</label
      ><br />
      <input class="mt16" type="password" @input="pwd = $event.target.value" :placeholder="$t('mypage-out-inj')" />
    </div>

    <button :disabled="btnToggle" class="confirm mb200 mt140" @click="confirm">{{ $t("button-out2") }}</button>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import { mapGetters } from "vuex";
export default {
  mixins: [loading],
  data() {
    return {
      toggle: true,
      check: false,
      pwd: "",
    };
  },
  computed: {
    btnToggle() {
      if (this.pwd === "" || !this.check) {
        return true;
      } else {
        return false;
      }
    },
    ...mapGetters("member", ["userWithDraw"]),
  },
  mounted() {
    if (this.$route.query.reason === "[object Object]") {
      this.$router.go(-1);
    }
  },
  methods: {
    async confirm() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/USER_WITH_DRAW", {
          password: this.pwd,
          reason: this.$route.query.reason.value,
          reasonEtc: this.$route.query.reasonEtc,
        });
        const res = this.userWithDraw.addtuneApiResult;
        if (res.errorCode !== 200) {
          return alert(res.errorMessage);
        }
        alert(res.errorMessage);
        await this.$router.replace("/main");
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
li {
  @include NotoSans(1.6, 500, #4f4f4f);
  list-style-type: decimal !important;
  margin: 5px 0;
}
h1 {
  @include NotoSans(3.8, 700, #333333);
}
.des {
  & span {
    @include NotoSans(1.8, 400, #828282);
  }
}
.check_box {
  width: 620px;
  height: 235px;
  padding: 25px 25px 50px;
  border-radius: 10px;
  background: #fff9f9;
}
.chk {
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + label {
    @include NotoSans(1.7, 500, #bdbdbd);
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
  input[type="checkbox"]:checked + label {
    @include NotoSans(1.7, 500, #ff4d56);
  }
  input[type="checkbox"]:checked + label::after {
    content: "";
    background: url("../../assets/images/Path4.png");
    @include NotoSans(1.7, 500, #ff4d56);
  }
}
.password {
  display: inline-block;
  & label {
    @include NotoSans(1.5, 500, #4f4f4f);
  }
  & input {
    width: 620px;
    height: 50px;
    padding: 0 10px;
    border: 0.5px solid #bdbdbd;
    border-radius: 2px;
  }
}
.confirm {
  display: block;
  background: #ff4d56;
  width: 300px;
  text-align: center;
  @include NotoSans(2.7, 700, #fff);
  margin: 0 auto;
  height: 70px;
  line-height: 70px;
  &:disabled {
    background: #747474;
  }
}
</style>
