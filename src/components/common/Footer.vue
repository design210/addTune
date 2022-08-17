<template>
  <footer v-if="!mobileStatus">
    <div v-if="toggle" :class="{ addmargin: marginBottom === true }" class="bg">
      <div class="wrap">
        <div>
          <div class="bi"><img alt="addtune" src="@/assets/images/addtune_bi_md.png" /></div>
          <div class="company-info mt40">
            <p class="company-name">{{ companyData.companyName }}</p>
            <p>
              {{ $t("footer-ceo") }} : {{ companyData.companyCeo }} ㅣ {{ $t("pay-businessNum") }}{{ companyData.companyCrNum }} ㅣ
              {{ companyData.sysCodeVal1Name }}
              {{ companyData.sysCodeVal1 }}
            </p>
            <p>{{ companyData.companyAddress1 }}, {{ companyData.companyAddress2 }}</p>
            <p>
              {{ companyData.sysCodeVal2Name }} {{ companyData.sysCodeVal2 }} | {{ companyData.sysCodeVal4Name }} {{ companyData.sysCodeVal4 }} |
              {{ companyData.sys_code_parent_sys_code_use[1].sysCodeVal }} |
              {{ companyData.sysCodeVal3[0] }}
            </p>
            <p class="mt10">
              <router-link to="/privacy">{{ $t("footer-private") }}</router-link>
              ㅣ
              <router-link to="/terms">{{ $t("footer-service") }}</router-link>
            </p>
            <p class="copy">Copyright © 2022. Interbrid. All rights reserved.</p>
          </div>
          <div class="bottom-wrap mt30">
            <div class="sns">
              <a :href="companyData.snsInfo[4].snsUrl" target="_blank"><img alt="facebook" src="@/assets/images/facebook_w.png" /></a>
              <a :href="companyData.snsInfo[1].snsUrl" target="_blank"><img alt="naver blog" src="@/assets/images/blog_w.png" /></a>
              <a :href="companyData.snsInfo[2].snsUrl" target="_blank"><img alt="youtube" src="@/assets/images/youtube.png" /></a>
              <a :href="companyData.snsInfo[5].snsUrl" target="_blank"><img alt="kakao" src="@/assets/images/kakao.png" /></a>
              <!--						<a :href="companyData.snsInfo[3].snsUrl" target="_blank"><img src="@/assets/images/twitter.png" alt="twitter" /></a>-->
              <a :href="companyData.snsInfo[0].snsUrl" target="_blank"><img alt="instagram" src="@/assets/images/instagram_w.png" /></a>
            </div>
          </div>
        </div>
        <div class="common-menu">
          <ul>
            <li>
              <h2>
                <router-link to="/service/addtune">{{ $t("gnb-gnbMenu1") }}</router-link>
              </h2>
            </li>
            <li>
              <h2>{{ $t("gnb-gnbMenu2") }}</h2>
              <p>
                <router-link to="/ad/adMain">{{ $t("gnb-subMenu2-1") }}</router-link>
              </p>
              <p>
                <router-link to="/ad/productList">{{ $t("gnb-subMenu2-2") }}</router-link>
              </p>
            </li>
            <li>
              <h2>
                <router-link to="/report">{{ $t("gnb-gnbMenu3") }}</router-link>
              </h2>
            </li>
            <li>
              <h2>{{ $t("gnb-gnbMenu4") }}</h2>
              <p>
                <router-link to="/customer/notice">{{ $t("gnb-subMenu4-1") }}</router-link>
              </p>
              <p>
                <router-link to="/customer/event/default">{{ $t("gnb-subMenu4-2") }}</router-link>
              </p>
              <p>
                <router-link to="/customer/faq">{{ $t("gnb-subMenu4-3") }}</router-link>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <a class="main-top top" @click="scrollToTop"></a>
    </div>
  </footer>
</template>

<script>
import pdfFile from "@/assets/data/interbrid_catalog.pdf";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";

export default {
  mixins: [loading],
  data() {
    return {
      item: pdfFile,
      marginBottom: false,
      companyData: {},
      toggle: false,
      mobileStatus: false,
    };
  },
  computed: {
    ...mapGetters("common", ["getInterbridInfo"]),
  },
  watch: {
    $route() {
      this.$route.meta.footerMargin === true ? (this.marginBottom = true) : (this.marginBottom = false);
    },
  },
  created() {
    bus.$on("mobileFooter", this.mobile);
  },
  mounted() {
    this.getCompanyData();
    this.$route.meta.footerMargin === true ? (this.marginBottom = true) : (this.marginBottom = false);

    document.addEventListener("scroll", this.scroll);
    (function () {
      const w = window;
      if (w.ChannelIO) {
        return (window.console.error || window.console.log || function () {})("ChannelIO script included twice.");
      }
      const ch = function () {
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
        const s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
        s.charset = "UTF-8";
        const x = document.getElementsByTagName("script")[0];
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
    // eslint-disable-next-line no-undef
    ChannelIO("boot", {
      pluginKey: "318c0a82-04a0-465b-a3b2-538c580a2447",
    });
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scroll);
    bus.$off("mobileFooter", this.mobile);
  },
  methods: {
    scroll() {
      if (document.querySelector(".main-top")) {
        if (document.querySelector("html").scrollTop > 100) {
          document.querySelector(".main-top").style.display = "block";
        } else {
          document.querySelector(".main-top").style.display = "none";
        }
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    mobile(status) {
      this.mobileStatus = status;
    },
    async getCompanyData() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/INTERBRID_INFO");

        const res = this.getInterbridInfo.addtuneApiResult;
        if (res.errorCode === 200) {
          this.companyData = res.companyInfo;
          this.companyData.companyName = this.companyData.companyName.replace("주식회사", "(주)");
          this.companyData.sysCodeVal3 = this.companyData.sysCodeVal3.split(",");
          return (this.toggle = true);
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
footer {
  height: 435px;
}
.main-top {
  //opacity: none;
  position: fixed;
  bottom: 185px;
  right: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  font-weight: 700;
  background: #0a0a0a url("../../assets/images/top.png") no-repeat left 50% top 50%;
  font-size: 1.8rem;
  z-index: 10;
}

.common-top {
  position: fixed;
  bottom: 85px;
  right: 25px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-align: center;
  line-height: 50px;
  font-weight: 700;
  color: #fff !important;
  font-size: 1.8rem;
}

.top-menu {
  position: fixed;
  bottom: 100px;
  right: 50px;
  background: #fff;
}

.bg {
  background: #333333;
  height: 100%;
  padding-top: 77px;

  &.addmargin {
    padding-bottom: 400px;
  }

  & .wrap {
    width: 1110px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    & .bi {
      & img {
        height: 35px;
      }
    }

    & .company-info {
      color: #fff;
      line-height: 20px;

      & p {
        &.company-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 10px;
        }

        font-size: 1.2rem;

        &.copy {
          font-size: 1.2rem;
        }
      }

      & .private {
        color: #b9b9b9;
        font-weight: 700;
      }

      & .used {
        color: #747474;
      }

      & a {
        color: #fff !important;
      }
    }

    & .bottom-wrap {
      display: flex;

      & .bottom-menu {
        margin-top: 20px;

        & a {
          display: inline-block;
          color: #b9b9b9;
          margin-left: 50px;
        }
      }
    }

    & .sns {
      display: flex;
      align-items: center;

      & a {
        margin-right: 20px;

        & img {
          vertical-align: middle !important;
        }
      }
    }

    & .common-menu {
      & ul {
        margin-top: 0px;
        display: flex;

        & li {
          width: 133px;

          &:last-child {
            width: 80px;
          }

          & h2 {
            color: #fff;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 15px;

            & a {
              color: #fff;
            }
          }

          & p {
            margin-top: 5px;

            & a {
              font-size: 1.3rem;
              color: #bdbdbd;
            }
          }
        }
      }
    }
  }
}
</style>
