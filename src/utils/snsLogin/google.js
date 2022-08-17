//구글 로그인
import { computed, getCurrentInstance } from "@vue/composition-api/dist/vue-composition-api";
import bus from "@/utils/bus";
import { saveAccessTokenCookie, saveHomepageUserEmailCookie, saveHomepageUserKindCookie, saveHomepageUserNameCookie, saveSnsLoginCookie } from "@/utils/cookie";

function google() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const GoogleLoginBtn = () => {
    window.gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: GoogleLoginSuccess,
      onfailure: GoogleLoginFailure,
    });
    setTimeout(function () {
      document.querySelector(".abcRioButton").click();
    }, 1500);
  };
  const snsLoginResult = computed(() => _this.$store.getters["member/getSnsLogin"]);
  const GoogleLoginSuccess = async googleUser => {
    let keys = Object.keys(googleUser);
    let key = keys[1];
    if (googleUser[key].login_hint !== "") {
      await _this.$store.dispatch("member/SNS_LOGIN", {
        snsKind: "SYS21823B007",
        snsAccessToken: googleUser[key].id_token,
      });
      if (snsLoginResult.value.addtuneApiResult.errorCode === 200) {
        bus.$emit("login", true);
        saveAccessTokenCookie(snsLoginResult.value.addtuneApiResult.login.access_token);
        saveHomepageUserNameCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserName);
        saveHomepageUserKindCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserKind);
        saveHomepageUserEmailCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserEmail);
        saveSnsLoginCookie("google");
        _this.$router.push({ path: "/main", query: { sns: "join" } });
      } else if (snsLoginResult.value.addtuneApiResult.errorCode === 202) {
        _this.$router.push({
          name: "join",
          params: {
            homepageUserSnsId: snsLoginResult.value.addtuneApiResult.snsUser.homepageUserSnsId,
            homepageUserSnsKind: snsLoginResult.value.addtuneApiResult.snsUser.homepageUserSnsKind,
            homepageUserSnsEmail: snsLoginResult.value.addtuneApiResult.snsUser.homepageUserSnsEmail,
          },
        });
      } else {
        alert(snsLoginResult.value.addtuneApiResult.errorMessage);
      }
    }
  };
  const GoogleLoginFailure = error => {
    console.log(error);
  };
  return { GoogleLoginBtn, GoogleLoginSuccess };
}

export default google;
