//카카오 로그인
import { computed, getCurrentInstance, ref } from "@vue/composition-api/dist/vue-composition-api";
import axios from "axios";
import bus from "@/utils/bus";
import { saveAccessTokenCookie, saveHomepageUserEmailCookie, saveHomepageUserKindCookie, saveHomepageUserNameCookie, saveSnsLoginCookie } from "@/utils/cookie";

function kakao() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const access_token = ref("");
  const kakaoLoginBtn = () => {
    const params = {
      redirectUri: "https://dev.addtune.net/login",
      //redirectUri: "http://localhost:8080/login",
    };
    window.Kakao.Auth.authorize(params);
  };
  const snsLoginResult = computed(() => _this.$store.getters["member/getSnsLogin"]);
  const kakaoRestApi = async () => {
    const kakaoHeader = {
      Authorization: "36765d8d58a4b609322dfdf758785b70",
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    };
    try {
      const data = {
        grant_type: "authorization_code",
        client_id: "2f699504b8b1c686e08a842b4c3d72a9",
        redirect_uri: "https://dev.addtune.net/login",
        code: _this.$route.query.code,
      };
      const queryString = Object.keys(data)
        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
        .join("&");
      const result = await axios.post("https://kauth.kakao.com/oauth/token", queryString, { headers: kakaoHeader });
      access_token.value = result.data.access_token;
      window.Kakao.Auth.setAccessToken(access_token.value); // 엑세스 토큰 init
      //api 정보 전송
      await _this.$store.dispatch("member/SNS_LOGIN", {
        snsKind: "SYS21823B006",
        snsAccessToken: access_token.value,
      });
      if (snsLoginResult.value.addtuneApiResult.errorCode === 200) {
        bus.$emit("login", true);
        saveAccessTokenCookie(snsLoginResult.value.addtuneApiResult.login.access_token);
        saveHomepageUserNameCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserName);
        saveHomepageUserKindCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserKind);
        saveHomepageUserEmailCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserEmail);
        saveSnsLoginCookie("kakao");
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
      } else if (snsLoginResult.value.addtuneApiResult.errorCode === 403) {
        alert(snsLoginResult.value.addtuneApiResult.errorMessage);
        _this.$router.push("/main");
      } else {
        alert(snsLoginResult.value.addtuneApiResult.errorMessage);
      }
    } catch (e) {
      return e;
    }
  };
  return { kakaoLoginBtn, kakaoRestApi, access_token };
}

export default kakao;
