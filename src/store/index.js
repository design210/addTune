import Vue from "vue";
import Vuex from "vuex";
import contact from "@/store/modules/intro/contact";
import member from "@/store/modules/member/member";
import estimate from "@/store/modules/member/estimate";
import purchase from "@/store/modules/member/purchase";
import notice from "@/store/modules/board/notice";
import event from "@/store/modules/board/event";
import faq from "@/store/modules/board/faq";
import press from "@/store/modules/board/press";
import pay from "@/store/modules/pay/pay";
import common from "@/store/modules/common/common";
import admain from "@/store/modules/ad/adMain";
import adcontents from "@/store/modules/ad/adContents";
import product from "@/store/modules/product/product";
import report from "@/store/modules/report/report";
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    contact,
    member,
    notice,
    event,
    faq,
    pay,
    common,
    admain,
    estimate,
    purchase,
    product,
    adcontents,
    press,
    report,
  },
});
