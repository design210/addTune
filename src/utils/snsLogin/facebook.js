//페이스북 로그인
import { computed, getCurrentInstance, ref } from "@vue/composition-api/dist/vue-composition-api";
import bus from "@/utils/bus";
import { saveAccessTokenCookie, saveHomepageUserEmailCookie, saveHomepageUserKindCookie, saveHomepageUserNameCookie, saveSnsLoginCookie } from "@/utils/cookie";

function facebook() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const facebookEmail = ref("");
  const init = () => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.VUE_APP_FACEBOOK_APP_KEY,
        cookie: true,
        xfbml: true,
        version: "v9.0",
      });
      window.FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };
  const snsLoginResult = computed(() => _this.$store.getters["member/getSnsLogin"]);
  const signup = async () => {
    const req = await getInfo();
    if (req.accessToken !== "") {
      facebookEmail.value = req.email;
      await _this.$store.dispatch("member/SNS_LOGIN", {
        snsKind: "SYS22719B001",
        snsAccessToken: req.accessToken,
      });
      if (snsLoginResult.value.addtuneApiResult.errorCode === 200) {
        bus.$emit("login", true);
        saveAccessTokenCookie(snsLoginResult.value.addtuneApiResult.login.access_token);
        saveHomepageUserNameCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserName);
        saveHomepageUserKindCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserKind);
        saveHomepageUserEmailCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserEmail);
        saveSnsLoginCookie("facebook");
        _this.$router.push({ path: "/main", query: { sns: "join" } });
      } else if (snsLoginResult.value.addtuneApiResult.errorCode === 202) {
        console.log(snsLoginResult.value);
        console.log(facebookEmail.value);
        _this.$router.push({
          name: "join",
          params: {
            homepageUserSnsId: snsLoginResult.value.addtuneApiResult.snsUser.homepageUserSnsId,
            homepageUserSnsKind: snsLoginResult.value.addtuneApiResult.snsUser.homepageUserSnsKind,
            homepageUserSnsEmail: facebookEmail.value,
          },
        });
      } else {
        alert(snsLoginResult.value.addtuneApiResult.errorMessage);
      }
    }
  };
  const LoginFailure = error => {
    console.log(error);
  };
  const getInfo = () => {
    return new Promise((resolve, reject) => {
      window.FB.getLoginStatus(() => {
        window.FB.login(
          response => {
            if (response.status === "connected") {
              const accessToken = response.authResponse.accessToken;
              window.FB.api("/me", { fields: "id, name, email, picture" }, res => {
                if (!res) LoginFailure();
                const req_body = {
                  id: res.id,
                  name: res.name,
                  email: res.email,
                  picture: res.picture.data.url,
                  accessToken,
                  social: "Facebook",
                };
                resolve(req_body);
              });
            } else {
              LoginFailure(reject);
            }
          },
          { scope: "public_profile, email" },
        );
      });
    });
  };
  return { init, signup };
}

export default facebook;
