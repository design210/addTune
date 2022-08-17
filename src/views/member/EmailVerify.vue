<template>
  <div>
    <section class="container-join">
      <div class="bi">
        <router-link to="/main"><img alt="addtune" class="bi" src="@/assets/images/addtune_bi_xs.png" /></router-link>
      </div>
      <div v-if="toggle" class="info-box">
        <h1 class="mt100">{{ $t("member-emailVerify-welcome") }}</h1>
        <p class="mt50">{{ name }}{{ $t("member-emailVerify-welcomeMessage") }}</p>
        <p>
          {{ $t("member-emailVerify-signup") }} <span class="email">{{ email }}</span
          >{{ $t("member-emailVerify-login") }}
        </p>
      </div>
      <div v-else class="info-box">
        <h2 class="mt100">{{ $t("member-emailVerify-certification") }}</h2>
        <p class="mt50">{{ name }}{{ $t("member-emailVerify-loginMessage") }}</p>
      </div>
      <section class="btn-group">
        <a class="home mr10" @click="link('home')">{{ $t("button-home") }}</a>
        <a class="login" @click="link('login')">{{ $t("button-login") }}</a>
      </section>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
      email: "",
      toggle: true,
    };
  },
  computed: {
    ...mapGetters("member", ["getEmailVerify"]),
  },
  created() {
    this.returning();
  },
  methods: {
    async returning() {
      await this.$store.dispatch("member/EMAILVERIFY", this.$route.params.id);
      const info = this.getEmailVerify.addtuneApiResult.homepageUserMaster;
      let errorCode = parseInt(this.getEmailVerify.addtuneApiResult.errorCode);
      errorCode === 200 ? (this.toggle = true) : (this.toggle = false);
      this.name = info.homepageUserName;
      this.email = info.homepageUserEmail;
    },
    link(status) {
      const varUA = navigator.userAgent.toLowerCase();
      if (varUA.indexOf("android") > -1) {
        //안드로이드
        let param = "";
        if (status === "home") {
          param = { path: "AT.ap - 1.0", value: "" };
        } else if (status === "login") {
          param = { path: "AT.ap - 0.2", value: "" };
        }
        const string = JSON.stringify(param);
        window.location.replace(`interbridaddtune://act?${string}`);
        setTimeout(function () {
          window.location.replace("https://play.google.com/store/apps/details?id=net.channeltune.addtune");
        }, 2000);
      } else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) {
        //IOS
        let param = "";
        if (status === "home") {
          param = { path: "AT.ap - 1.0", value: "" };
        } else if (status === "login") {
          param = { path: "AT.ap - 0.2", value: "" };
        }
        const string = JSON.stringify(param);
        window.location.replace(`interbridaddtune://act?path=${param.path}`);
        setTimeout(function () {
          window.location.replace("https://apps.apple.com/app/id1600166344");
        }, 2000);
        webkit.messageHandlers.event.postMessage(string);
      } else {
        //아이폰, 안드로이드 외
        if (status === "home") {
          this.$router.push("/main");
        } else if (status === "login") {
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container-join {
  max-width: 500px;
  margin: 100px auto 50px;
  padding: 0 16px;

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
    & h2 {
      font-size: 3rem;
    }
  }

  & .bi {
    text-align: center;
  }

  & .btn-group {
    margin-top: 85px;
    text-align: center;
    display: flex;
    justify-content: space-between;

    & a {
      width: calc(50% - 20px);
      text-align: center;
      font-size: 2.1rem;
      font-weight: 700;
      height: 60px;
      display: inline-block;
      margin: 0 auto;
      line-height: 60px;
      width: 220px;

      &.home {
        background: #747474;
        color: #fff;
      }

      &.login {
        background: #ff4d56;
        color: #fff;
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
}
</style>
