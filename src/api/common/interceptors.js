import router from "@/router/index";
import { getAccessTokenCookie, deleteCookie } from "@/utils/cookie";
import i18n from "@/locales/i18n";
export function setInterceprors(instance, data, commit) {
  let Language = i18n.locale;
  let setLanguage;
  Language === "ko" ? (setLanguage = "SYS22617B017") : (setLanguage = "SYS22617B018");
  const accessCookie = getAccessTokenCookie();
  const isHaveCommit = arguments[2] === undefined ? false : true;
  instance.interceptors.request.use(
    function (config) {
      config.headers["Language"] = setLanguage;
      config.headers["Content-Type"] = "application/json; charset=utf-8";
      config.headers["Authorization"] = "Bearer " + accessCookie;
      if (isHaveCommit) {
        config.onUploadProgress = ProgressEvent => {
          let percentage = (ProgressEvent.loaded * 100) / ProgressEvent.total;
          let percentCompleted = Math.round(percentage);

          commit("common/percentage", percentCompleted, { root: true }); // 퍼센테이지 리턴
        };
      }
      config.data = data;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      if (response.status === 401) {
        deleteCookie("accessToken");
        deleteCookie("homepageUserName");
        router.push("/main");
      }
      return response;
    },
    function (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error.message);
    },
  );

  return instance;
}
