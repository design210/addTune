<template>
  <div v-if="!mobileStatus" :class="{ topbg: this.topBg === true, mainbg: this.main === true, gnbfixed: this.gnbFixed === true }" class="scroll-gnb">
    <div @click="changeLocale" class="change-language">언어변경</div>
    <section class="gnb">
      <div class="top-fix-menu">
        <!-- 상단 오른쪽 메뉴 -->
        <ul v-show="login === false">
          <li>
            <router-link to="/login">{{ $t("gnb-login") }}</router-link>
          </li>
          <li>
            <router-link to="/join">{{ $t("gnb-signup") }}</router-link>
          </li>
        </ul>
        <ul v-show="login === true">
          <li>
            <div class="mypage-wrap">
              <router-link to="/mypage/myinfo">{{ $t("gnb-mypage") }}</router-link>
              <div class="menu-tool-tip">
                <h2>{{ userName }}{{ $t("gnb-hello") }}</h2>
                <p class="mt5">{{ userEmail }}</p>
                <ul class="mt25 menu-list">
                  <li>
                    <router-link to="/mypage/myinfo">{{ $t("gnb-myMenu1") }}</router-link>
                  </li>
                  <li>
                    <router-link to="/mypage/purchase">{{ $t("gnb-myMenu2") }}</router-link>
                  </li>
                  <li>
                    <router-link to="/mypage/adContents">{{ $t("gnb-myMenu3") }}</router-link>
                  </li>
                  <li>
                    <router-link to="/mypage/alimSettings">{{ $t("gnb-myMenu4") }}</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <li>
            <a @click="logout">{{ $t("gnb-logout") }}</a>
          </li>
        </ul>
      </div>
      <div class="logo pt67">
        <router-link to="/main"><img alt="addtune" class="bi" src="@/assets/images/addtune_bi_xs.png" /></router-link>
      </div>
      <div class="layout">
        <div></div>
        <nav class="top-nav pt100">
          <ul>
            <li>
              <span
                ><router-link to="/service">{{ $t("gnb-gnbMenu1") }}</router-link></span
              >
              <!--              <div class="sub sub1">-->
              <!--                <div class="menu">-->
              <!--                  <span><router-link to="/service/addtune">애드튠 소개</router-link></span>-->
              <!--                  <span><router-link to="/service/tune">튠 소개</router-link></span>-->
              <!--                </div>-->
              <!--              </div>-->
            </li>
            <li>
              <span
                ><router-link to="/ad/adMain">{{ $t("gnb-gnbMenu2") }}</router-link></span
              >
              <div class="sub sub2">
                <div class="menu">
                  <span
                    ><router-link to="/ad/adMain">{{ $t("gnb-subMenu2-1") }}</router-link></span
                  >
                  <span
                    ><router-link to="/ad/productList">{{ $t("gnb-subMenu2-2") }}</router-link></span
                  >
                </div>
              </div>
            </li>
            <li>
              <router-link to="/report">{{ $t("gnb-gnbMenu3") }}</router-link>
            </li>
            <li>
              <span
                ><router-link to="/customer">{{ $t("gnb-gnbMenu4") }}</router-link></span
              >

              <div class="sub sub3">
                <div class="menu">
                  <span
                    ><router-link to="/customer/notice">{{ $t("gnb-subMenu4-1") }}</router-link></span
                  >
                  <span
                    ><router-link to="/customer/event/default">{{ $t("gnb-subMenu4-2") }}</router-link></span
                  >
                  <span
                    ><router-link to="/customer/faq">{{ $t("gnb-subMenu4-3") }}</router-link></span
                  >
                  <!-- <span><router-link to="/customer">이용 가이드</router-link></span> -->
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  </div>
</template>

<script>
import pdfFile from "@/assets/data/interbrid_catalog.pdf";
import { getAccessTokenCookie, getHomepageUserEmailCookie, getHomepageUserNameCookie, saveLanguageCookie, getLanguageCookie } from "@/utils/cookie";
import bus from "@/utils/bus";

export default {
  data() {
    return {
      item: pdfFile,
      BiChange: null,
      login: false,
      active1: false,
      userName: "",
      userEmail: "",
      topBg: false,
      main: true,
      gnbFixed: false,
      mobileStatus: false,
    };
  },
  watch: {
    $route() {
      this.$route.meta.topBg === true ? (this.topBg = true) : (this.topBg = false);
      this.$route.meta.main === true ? (this.main = true) : (this.main = false);
      this.$route.meta.gnbFixed === true ? (this.gnbFixed = true) : (this.gnbFixed = false);
      this.checkLoginStatus();
    },
  },
  created() {
    bus.$on("login", this.loginCheck);
    bus.$on("mobile", this.mobile);
    this.userName = getHomepageUserNameCookie();
    this.userEmail = getHomepageUserEmailCookie();
    this.$route.meta.topBg === true ? (this.topBg = true) : (this.topBg = false);
    this.$route.meta.main === true ? (this.main = true) : (this.main = false);
    this.$route.meta.gnbFixed === true ? (this.gnbFixed = true) : (this.gnbFixed = false);
    const cookie = getLanguageCookie();
    if (cookie) {
      this.$i18n.locale = cookie;
    } else {
      const language = navigator.language || navigator.userLanguage;
      language === "ko-KR" ? (this.$i18n.locale = "ko") : (this.$i18n.locale = "en");
    }
  },
  mounted() {
    this.checkLoginStatus();
    const list = document.querySelectorAll(".top-nav li");
    list.forEach(ele => {
      ele.addEventListener("mouseover", () => {
        ele.classList.add("active");
      });
    });
    list.forEach(ele => {
      ele.addEventListener("mouseout", () => {
        ele.classList.remove("active");
      });
    });
    const mypage = document.querySelector(".mypage-wrap");
    mypage.addEventListener("mouseover", () => {
      mypage.classList.add("active");
    });
    mypage.addEventListener("mouseout", () => {
      mypage.classList.remove("active");
    });
  },
  beforeDestroy() {
    bus.$off("login", this.loginCheck);
    bus.$off("mobile", this.mobile);
  },
  methods: {
    changeLocale() {
      if (this.$i18n.locale === "en") {
        this.$i18n.locale = "ko";
      } else {
        this.$i18n.locale = "en";
      }
      saveLanguageCookie(this.$i18n.locale);
      this.$router.go();
    },
    async logout() {
      const _this = this;
      try {
        await this.$store.dispatch("member/LOGOUT");
        if (this.$route.name !== "main") {
          _this.$router.push("/main");
        } else {
          this.checkLoginStatus();
        }
      } catch (error) {
        alert(error);
      }
    },
    loginCheck(status) {
      this.login = status;
    },
    mobile(status) {
      this.mobileStatus = status;
    },
    checkLoginStatus() {
      const token = getAccessTokenCookie();
      this.userName = getHomepageUserNameCookie();
      this.userEmail = getHomepageUserEmailCookie();
      token == null ? (this.login = false) : (this.login = true);
    },
  },
};
</script>

<style lang="scss" scoped>
.mypage-wrap {
  position: relative;
  padding-bottom: 20px;

  & .menu-tool-tip {
    position: absolute;
    width: 250px;
    top: 35px;
    left: -80px;
    background: #fff;
    border: 1px solid #777777;
    border-radius: 10px;
    padding: 30px 50px 40px 30px;
    z-index: 100;
    display: none;

    & h2 {
      @include NotoSans(1.9, 700, #333333);
    }

    & p {
      @include NotoSans(1.3, 400, #828282);
    }

    & ul {
      flex-direction: column;

      & li {
        margin-bottom: 10px;

        & a {
          @include NotoSans(1.6, 400, #828282);
          margin-left: 0 !important;

          &.router-link-active {
            font-weight: 700;
            color: #eb5757 !important;
          }
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    &:after {
      content: "";
      position: absolute;
      top: -11px;
      left: 50%;
      transform: translateX(-50%);
      width: 18px;
      height: 11px;
      background: url("../../assets/images/menu_tooltip.png") no-repeat;
    }
  }

  &.active {
    & .menu-tool-tip {
      display: block;
    }
  }
}

.scroll-gnb {
  width: 100%;
  height: 160px;
  border-bottom: 1px solid #e0e0e0;

  & .gnb {
    transition: background 0.3s ease-in-out;
    width: 1110px;
    margin: 0 auto;
    position: relative;

    & .top-fix-menu {
      position: absolute;
      top: 20px;
      right: 0;

      & ul {
        display: flex;
        justify-content: flex-end;

        & li {
          & a {
            color: #828282;
            font-size: 1.2rem;
            margin-left: 15px;

            &.router-link-active {
              color: #ff4d56;
            }
          }
        }

        &.menu-list {
          & li {
            & a {
              color: #828282 !important;
              &.router-link-active {
                color: #ff4d56 !important;
              }
            }
          }
        }
      }
    }

    & .logo {
      position: absolute;
      top: 33px;
      left: 0;

      & .bi {
        width: 158px;
      }
    }

    & .layout {
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .top-nav {
        & ul {
          display: flex;
          justify-content: flex-end;

          & li {
            position: relative;
            margin-left: 100px;
            padding-bottom: 100px;

            & a {
              @include NotoSans(1.6, 700, #4f4f4f);

              &.router-link-active {
                color: #ff4d56 !important;
              }
            }

            & .sub {
              display: none;
              position: absolute;
              left: 0;
              top: 60px;
              width: 500px;
              z-index: 1;

              &:before {
                content: "";
                background: #333333;
                position: absolute;
                height: 70px;
                width: 1000%;
                left: -2000px;
              }

              & .menu {
                position: relative;
                z-index: 3;

                & span {
                  margin: 24px 30px 0 0;

                  & a {
                    @include NotoSans(1.4, 400, #fff);
                    white-space: nowrap;

                    &:hover {
                      color: #ff4d56 !important;
                    }
                  }
                }
              }

              &.sub1 {
                & .menu {
                  position: absolute;
                  left: -40px;
                }
              }

              &.sub2 {
                & .menu {
                  position: absolute;
                  left: -63px;
                }
              }

              &.sub3 {
                & .menu {
                  position: absolute;
                  left: -170px;
                }
              }
            }

            &.active {
              & .sub {
                display: block;
                z-index: 1000;
              }
            }
          }
        }
      }
    }
  }

  & .menu-bg {
    position: absolute;
    width: 100%;
    height: 70px;
    background: #333333;
    left: 0;
    top: 175px;
    z-index: 10;
    opacity: 0;
    transition: all 0.3s ease-in-out;

    &.active {
      opacity: 1;
    }
  }

  &.topbg {
    background: #14090a url("../../assets/images/video_bg_header.png") no-repeat;
    background-position: center top;

    & .gnb {
      & .top-fix-menu {
        & ul {
          & li {
            & a {
              color: #bdbdbd;
            }
          }
        }
      }

      & .layout {
        & .top-nav {
          & ul {
            & li {
              & a {
                @include NotoSans(1.6, 700, #fff);
              }
            }
          }
        }
      }
    }
  }

  &.gnbfixed {
    position: relative;
    z-index: 10;
    background: rgba(0, 0, 0, 0.25);
    & .gnb {
      & .layout {
        & ul {
          & li {
            & a {
              color: #fff;
            }
          }
        }
      }

      & .top-fix-menu {
        & ul {
          & li {
            & a {
              color: #fff;
            }
          }
        }
      }
    }
  }
}
.change-language {
  opacity: 0;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
