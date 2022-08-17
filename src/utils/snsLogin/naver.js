//네이버 로그인
import { computed, getCurrentInstance } from "@vue/composition-api/dist/vue-composition-api";
import bus from "@/utils/bus";
import { saveAccessTokenCookie, saveHomepageUserEmailCookie, saveHomepageUserKindCookie, saveHomepageUserNameCookie, saveSnsLoginCookie } from "@/utils/cookie";
import axios from "axios";

function naver() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const naverLoginBtn = () => {
    window.name = "opener";
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: "G1JoHJtkfh6LsURR_M4h", // Naver client key
      callbackUrl: "https://dev.addtune.net/login",
      callbackHandle: true,
    });
    naverLogin.init();
    naverLogin.reprompt();
  };
  const snsLoginResult = computed(() => _this.$store.getters["member/getSnsLogin"]);
  const naverRestApi = async params => {
    const token = params.access_token;
    const type = params.token_type;
    const header = type + token;
    if (token !== "") {
      await _this.$store.dispatch("member/SNS_LOGIN", {
        snsKind: "SYS21823B005",
        snsAccessToken: token,
      });
      if (snsLoginResult.value.addtuneApiResult.errorCode === 200) {
        bus.$emit("login", true);
        saveAccessTokenCookie(snsLoginResult.value.addtuneApiResult.login.access_token);
        saveHomepageUserNameCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserName);
        saveHomepageUserKindCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserKind);
        saveHomepageUserEmailCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserEmail);
        saveSnsLoginCookie("naver");
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
    // const result = await axios.post("https://openapi.naver.com/v1/nid/me", {
    //   headers: header,
    // });
  };
  return { naverLoginBtn, naverRestApi };
}

export default naver;
