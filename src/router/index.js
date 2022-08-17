import Vue from "vue";
import VueRouter from "vue-router";
import { getAccessTokenCookie } from "@/utils/cookie";
//메인
const ui = () => import("@/components/common/Gnb.vue");
const footer = () => import("@/components/common/Footer.vue");
//마이페이지 lnb
const mypageLnb = () => import("@/components/common/Lnb_Mypage.vue");
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: "/",
      redirect: "/main",
    },
    {
      path: "*",
      redirect: "/404",
    },
    {
      path: "/ad",
      redirect: "/ad/adMain",
    },
    {
      path: "/mypage",
      redirect: "/mypage/myinfo",
    },
    {
      path: "/mypage/adContents",
      redirect: "/mypage/adContents/adContentsList",
    },
    {
      path: "/mypage/purchase",
      redirect: "/mypage/purchase/ad",
    },
    {
      path: "/mypage/estimate",
      redirect: "/mypage/estimate/list",
    },
    {
      path: "/service",
      redirect: "/service/addtune",
    },
    {
      path: "/customer",
      redirect: "/customer/notice",
    },
    //광고 상품
    {
      path: "/ad/adMain",
      name: "ad_main",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/ad/AdMain.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/ad/adMain/adManage/:id",
      name: "ad_manage_step1",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/ad/AdManage.vue"),
      },
      meta: { unauthorized: true, footerMargin: true },
    },
    //영상제작 의뢰
    {
      path: "/ad/productList",
      name: "product_list",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/product/ProductList.vue"),
      },
      meta: { unauthorized: true, topBg: true },
    },
    {
      path: "/ad/productList/productDetail/:id",
      name: "product_detail",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/product/ProductDetail.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/product/pay",
      name: "prod_pay",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/product/Pay.vue"),
      },
    },
    {
      path: "/product/result/:id",
      name: "prod_result",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/product/Result.vue"),
      },
    },
    //결제
    {
      path: "/ad/adMain/pay",
      name: "pay",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/pay/Pay.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/pay/result/:id",
      name: "pay_result",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/pay/Result.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/pay/resultBank",
      name: "result_bank",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/pay/ResultBank.vue"),
      },
      meta: { unauthorized: true },
    },
    //고객센터
    {
      path: "/customer/notice",
      name: "noticeList",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/customer_support/Notice.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/customer/event/:id",
      name: "eventList",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/customer_support/Event.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/customer/faq",
      name: "faq",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/customer_support/Faq.vue"),
      },
      meta: { unauthorized: true },
    },
    //메인
    {
      path: "/main",
      name: "main",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/Main.vue"),
      },
      meta: { unauthorized: true, main: true },
    },
    {
      path: "/main/press",
      name: "press-list",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/customer_support/PressList.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/main/product",
      name: "product-list",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/common/ProductList.vue"),
      },
      meta: { unauthorized: true },
    },
    //회원 가입
    {
      path: "/join",
      name: "join",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/member/Join.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/joinInit",
      name: "joinInit",

      components: {
        top: ui,
        singlepage: () => import("@/views/member/JoinInit.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/welcome",
      name: "welcome",
      components: {
        singlepage: () => import("@/views/member/Welcome.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/login",
      name: "login",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/member/Login.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/login/email",
      name: "email_login",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/member/LoginEmail.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/emailverify/:id",
      name: "emailverify",
      components: {
        singlepage: () => import("@/views/member/EmailVerify.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/findPW",
      name: "findPW",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/member/findPW.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/emaipassword/:id",
      name: "resetPW",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/member/resetPW.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/reseterror",
      name: "resetError",
      components: {
        singlepage: () => import("@/views/member/resetPwError.vue"),
      },
      meta: { unauthorized: true },
    },
    //약관
    {
      path: "/privacy",
      name: "privacy",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/common/Privacy.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/terms",
      name: "terms",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/common/Terms.vue"),
      },
      meta: { unauthorized: true },
    },
    //마이페이지
    {
      path: "/mypage/myinfo",
      name: "myinfo",
      components: {
        top: ui,
        footer,
        lnb: mypageLnb,
        container: () => import("@/views/mypage/MyInfo.vue"),
      },
    },
    {
      path: "/mypage/accountModify",
      name: "account_modify",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/mypage/MyAccount.vue"),
      },
    },
    {
      path: "/mypage/deleteAccount",
      name: "delete_account",
      components: {
        top: ui,
        footer,
        container: () => import("@/views/mypage/DeleteAccount.vue"),
      },
    },
    {
      path: "/mypage/deleteConfirm",
      name: "delete_confirm",
      components: {
        top: ui,
        footer,
        container: () => import("@/views/mypage/DeleteAccountCheck.vue"),
      },
    },
    {
      path: "/mypage/alimSettings",
      name: "alimSettings",
      components: {
        top: ui,
        footer,
        lnb: mypageLnb,
        container: () => import("@/views/mypage/AlimSettings.vue"),
      },
    },

    //광고주 세부정부 입력
    {
      path: "/mypage/advertiserInfoInit",
      name: "advertiser_info_init",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/mypage/AdvertiserInfoInit.vue"),
      },
    },
    //광고주 세부정부 수정
    {
      path: "/mypage/advertiserInfoModify",
      name: "advertiser_info_modify",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/mypage/AdvertiserInfoModify.vue"),
      },
    },
    //내 구매내역
    {
      path: "/mypage/purchase/ad",
      name: "purchase_history",
      components: {
        top: ui,
        footer,
        lnb: mypageLnb,
        container: () => import("@/views/mypage/PurchaseHistory/PurchaseList.vue"),
      },
    },
    {
      path: "/mypage/purchase/adDetail/:id",
      name: "purchase_Detail",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/mypage/PurchaseHistory/AdPurchaseDetail.vue"),
      },
    },
    {
      path: "/mypage/purchase/videoDetail/:id",
      name: "video_purchase_Detail",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/mypage/PurchaseHistory/VideoPurchaseDetail.vue"),
      },
    },
    //광고 컨텐츠 관리
    {
      path: "/mypage/adContents/adContentsList",
      name: "ad_contents_list",
      components: {
        top: ui,
        footer,
        lnb: mypageLnb,
        container: () => import("@/views/mypage/adContentsManage/AdContentsList.vue"),
      },
    },
    {
      path: "/mypage/adContents/adContentsDetail/:id",
      name: "ad_contents_detail",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/mypage/adContentsManage/AdContentsDetail.vue"),
      },
    },
    //리포트
    {
      path: "/report",
      name: "report",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/report/Report.vue"),
      },
      meta: { unauthorized: true },
    },
    {
      path: "/report/detail/:campaignId/:companyId/:startDay/:endDay/:lastUpdate",
      name: "report_detail",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/report/detail.vue"),
      },
    },
    //서비스 소개
    {
      path: "/service/addtune",
      name: "addtune",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/service/AddTune.vue"),
      },
      meta: { unauthorized: true, gnbFixed: true },
    },
    {
      path: "/service/tune",
      name: "tune",
      components: {
        top: ui,
        footer,
        singlepage: () => import("@/views/service/Tune.vue"),
      },
      meta: { unauthorized: true, gnbFixed: true },
    },
    //404
    {
      path: "/404",
      name: "pageNotFound",
      components: {
        singlepage: () => import("@/views/error/NotFoundPage.vue"),
      },
      meta: { unauthorized: true },
    },
  ],
});

//router guard
router.beforeEach(async (to, from, next) => {
  //액세스 토큰이 있을 경우
  if (getAccessTokenCookie() !== null) {
    return next();
  }

  //로그인 필요 없는 페이지
  if (to.matched.some(record => record.meta.unauthorized) || getAccessTokenCookie()) {
    return next();
  }

  //액세스 토큰이 없을 경우
  return next("/login");
});

export default router;
