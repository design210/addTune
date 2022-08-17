<template>
  <div class="col-flex-center mt162">
    <h1>{{ $t("mypage-outConfirm-title") }}</h1>
    <div class="col-flex-center mt35 des">
      <span v-html="$t('mypage-out-info')"></span>
    </div>
    <div class="select mt70">
      <span :class="['mr23', { lab: !toggle }]">{{ $t("mypage-outConfirm-reason") }}</span>
      <span class="pull-down-big">
        <v-select v-model="selected" :items="reason" item-value="value" return-object item-text="text" outlined :placeholder="$t('mypage-outConfirm-select')"> </v-select>
        <textarea @input="ownText = $event.target.value" v-if="!toggle" class="own" type="text" name="inp" :placeholder="$t('mypage-outConfirm-know')" />
      </span>
      <div class="pl84 tezt" v-show="selected.value !== 'SYS22107B008'">
        <div v-show="selected.value === 'SYS22107B002'" v-html="$t('mypage-outConfirm-option1')"></div>
        <div v-show="selected.value === 'SYS22107B003'">
          {{ $t("mypage-outConfirm-option2") }}<br />
          <a @click="giAlim">{{ $t("mypage-outConfirm-option3") }}</a
          >{{ $t("mypage-outConfirm-option4") }}
        </div>
        <div v-show="selected.value === 'SYS22107B004'">
          {{ $t("mypage-outConfirm-option5") }}<br />
          <a class="btn1">{{ $t("mypage-outConfirm-option6") }}</a
          ><span v-html="$t('mypage-outConfirm-option7')"></span>
        </div>
        <div v-show="selected.value === 'SYS22107B005'">
          {{ $t("mypage-outConfirm-option5") }}<br />
          <a class="btn1">{{ $t("mypage-outConfirm-option6") }}</a
          ><span v-html="$t('mypage-outConfirm-option7')"></span>
        </div>
        <div v-show="selected.value === 'SYS22107B006'">
          <span v-html="$t('mypage-outConfirm-option8')"></span>
        </div>
      </div>
    </div>

    <button :disabled="btnToggle" class="confirm mb200 mt110" @click="goNext">{{ $t("button-next") }}</button>
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
      reason: [],
      selected: "",
      toggle: true,
      ownText: "",
      own: true,
    };
  },
  computed: {
    btnToggle() {
      if (this.selected.value === "SYS22107B008") {
        if (this.ownText !== "") {
          return false;
        } else {
          return true;
        }
      } else if (this.selected === "") {
        return true;
      } else {
        return false;
      }
    },
    ...mapGetters("member", ["getUserWithDrawReson"]),
  },
  watch: {
    selected(val) {
      val.value === "SYS22107B008" ? (this.toggle = false) : (this.toggle = true);
    },
  },
  mounted() {
    this.getReson();
    (function () {
      var w = window;
      if (w.ChannelIO) {
        return (window.console.error || window.console.log || function () {})("ChannelIO script included twice.");
      }
      var ch = function () {
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function (args) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        s.charset = "UTF-8";
        var x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
      }
      if (document.readyState === "complete") {
        l();
      } else if (window.attachEvent) {
        window.attachEvent("onload", l);
      } else {
        window.addEventListener("DOMContentLoaded", l, false);
        window.addEventListener("load", l, false);
      }
    })();
    ChannelIO("boot", {
      pluginKey: "318c0a82-04a0-465b-a3b2-538c580a2447",
      customLauncherSelector: ".btn1, #btn2",
      hideChannelButtonOnBoot: true,
    });
  },
  methods: {
    goNext() {
      this.$router.push({ path: "/mypage/deleteConfirm", query: { reason: this.selected, reasonEtc: this.ownText } });
    },
    async getReson() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("member/GET_USER_WITH_DRAW_RESON");
        const res = this.getUserWithDrawReson.addtuneApiResult;
        if (res.errorCode !== 200) {
          alert(res.errorMessage);
          this.$router.go(-1);
        }
        this.reason = res.userWithdraw.map(item => {
          return {
            text: item.sysCodeName,
            value: item.sysCodeSid,
          };
        });
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    giAlim() {
      this.$router.push("/mypage/alimSettings");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  @include NotoSans(3.8, 700, #333333);
}
.des {
  & span {
    @include NotoSans(1.8, 400, #828282);
  }
}
.select {
  & span {
    &:first-child {
      @include NotoSans(1.6, 500, #4f4f4f);
    }
    &:nth-child(2) {
      width: 620px;
    }
  }
  & .lab {
    position: relative;
    top: -175px;
  }
  & .own {
    width: 620px;
    height: 120px;
    padding: 10px;
    border: 0.5px solid #bdbdbd;
    resize: none;
    overflow: scroll;
  }
  & .tezt {
    @include NotoSans(1.5, 500, #333333);
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
.pull-down-big::v-deep {
  & .v-select__selection--comma {
    @include NotoSans(1.6, 500, #ff3d56);
  }
}
</style>
