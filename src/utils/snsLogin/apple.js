//애플 로그인
import { computed, getCurrentInstance } from "@vue/composition-api/dist/vue-composition-api";
import bus from "@/utils/bus";
import { saveAccessTokenCookie, saveHomepageUserEmailCookie, saveHomepageUserKindCookie, saveHomepageUserNameCookie, saveSnsLoginCookie } from "@/utils/cookie";

function apple() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const snsLoginResult = computed(() => _this.$store.getters["member/getSnsLogin"]);
  const callSuccess = async data => {
    if (data.authorization.id_token !== "") {
      await _this.$store.dispatch("member/SNS_LOGIN", {
        snsKind: "SYS22429B001",
        snsAccessToken: data.authorization.id_token,
      });
      if (snsLoginResult.value.addtuneApiResult.errorCode === 200) {
        bus.$emit("login", true);
        saveAccessTokenCookie(snsLoginResult.value.addtuneApiResult.login.access_token);
        saveHomepageUserNameCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserName);
        saveHomepageUserKindCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserKind);
        saveHomepageUserEmailCookie(snsLoginResult.value.addtuneApiResult.login.current_user.homepageUserEmail);
        saveSnsLoginCookie("apple");
        _this.$router.push({ path: "/main", query: { sns: "join" } });
      } else if (snsLoginResult.value.addtuneApiResult.errorCode === 202) {
        _this.$router.push({
          name: "join",
          params: {
            homepageUserSnsId: snsLoginResult.value.addtuneApiResult.snsUser.homepageUserSnsId,
            homepageUserSnsKind: snsLoginResult.value.addtuneApiResult.snsUser.homepageUserSnsKind,
          },
        });
      } else {
        alert(snsLoginResult.value.addtuneApiResult.errorMessage);
      }
    }
  };
  const callFail = error => {
    alert(error);
  };
  return { callSuccess, callFail };
}

export default apple;
