<template>
  <div class="addtune-intro">
    <u-animate-container>
      <!-- tune -->
      <section class="section s11" id="tune">
        <div class="container">
          <u-animate name="animate__fadeInUp" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
            <div class="bi-wrap"><img src="@/assets/images/tune.png" alt="channeltune" /></div>
            <div class="info-wrap mt20">
              <p>{{ $t("serviceIntro-tune-intro-text1") }}</p>
              <p>{{ $t("serviceIntro-tune-intro-text2") }}</p>
            </div>
          </u-animate>
        </div>
      </section>
      <!-- //tune -->

      <!-- 우리 가게 유리창도 디지털 광고 디스플레이로 변신 -->
      <section class="section s12">
        <div class="wrap pt200">
          <div class="info-wrap">
            <u-animate name="animate__fadeInUp" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <p class="first">{{ $t("serviceIntro-tune-section1-text1") }}</p>
              <p class="t-title" v-html="$t('serviceIntro-tune-section1-text2')"></p>
              <p class="text" v-html="$t('serviceIntro-tune-section1-text3')"></p>
            </u-animate>
          </div>
          <div class="img-wrap pt200">
            <u-animate name="animate__dung" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <div class="img"><img src="@/assets/images/mov1.gif" alt="" /></div>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //우리 가게 유리창도 디지털 광고 디스플레이로 변신 -->

      <!-- 눈높이에서 볼 수 있는 생활밀착형 옥외광고 -->
      <section class="section s13">
        <div class="wrap pt200">
          <div class="info-wrap">
            <u-animate name="animate__fadeInUp" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <p class="first">{{ $t("serviceIntro-tune-section2-text1") }}</p>
              <p class="t-title" v-html="$t('serviceIntro-tune-section2-text2')"></p>
              <p class="text" v-html="$t('serviceIntro-tune-section2-text3')"></p>
            </u-animate>
          </div>
          <div class="img-wrap pt200">
            <u-animate name="animate__dung" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <div class="img"><img src="@/assets/images/tune2.png" alt="" /></div>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //눈높이에서 볼 수 있는 생활밀착형 옥외광고 -->

      <!-- 제한없는 사이즈 확장, 유연한 화면 분할 기술 -->
      <section class="section s14">
        <div class="wrap pt200">
          <div class="info-wrap">
            <u-animate name="animate__fadeInUp" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <p class="first">{{ $t("serviceIntro-tune-section3-text1") }}</p>
              <p class="t-title" v-html="$t('serviceIntro-tune-section3-text2')"></p>
              <p class="text" v-html="$t('serviceIntro-tune-section3-text3')"></p>
            </u-animate>
          </div>
          <div class="img-wrap pt200">
            <u-animate name="animate__dung" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <div class="img"><img src="@/assets/images/mov2.gif" alt="" /></div>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //제한없는 사이즈 확장, 유연한 화면 분할 기술 -->

      <!-- Dark Grey 필름으로 낮에도 잘 보이는 광고 -->
      <section class="section s15">
        <div class="wrap pt200">
          <div class="info-wrap">
            <u-animate name="animate__fadeInUp" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <p class="first">{{ $t("serviceIntro-tune-section4-text1") }}</p>
              <p class="t-title" v-html="$t('serviceIntro-tune-section4-text2')"></p>
              <p class="text" v-html="$t('serviceIntro-tune-section4-text3')"></p>
            </u-animate>
          </div>
          <div class="img-wrap pt200">
            <u-animate name="animate__dung" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <div class="img" v-if="film === true"><img src="@/assets/images/milk.gif" alt="" /></div>
              <div class="img" v-else><img src="@/assets/images/gray.gif" alt="" /></div>
              <div class="pl40 pr40">
                <div class="tab mt30">
                  <span :class="{ active: this.film === true }" @click="show('milky')">{{ $t("serviceIntro-tune-section4-milky") }}</span>
                  <span :class="{ active: this.film === false }" @click="show('gray')">{{ $t("serviceIntro-tune-section4-dark") }}</span>
                </div>
              </div>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //Dark Grey 필름으로 낮에도 잘 보이는 광고 -->

      <!-- 기존 LED 전광판 대비 저렴한 TUNE -->
      <section class="section s16">
        <div class="wrap pt200">
          <div class="info-wrap">
            <u-animate name="animate__fadeInUp" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <p class="first">{{ $t("serviceIntro-tune-section5-text1") }}</p>
              <p class="t-title" v-html="$t('serviceIntro-tune-section5-text2')"></p>
              <p class="text" v-html="$t('serviceIntro-tune-section5-text3')"></p>
            </u-animate>
          </div>
          <div class="graph-wrap pt200">
            <div class="graph">
              <div class="label">
                <div class="price"><i></i>{{ $t("serviceIntro-tune-section5-price") }}</div>
                <div class="electo"><i></i>{{ $t("serviceIntro-tune-section5-elect") }}</div>
              </div>
              <div class="group">
                <div>
                  <div class="graph1 common"></div>
                  <div class="led">{{ $t("serviceIntro-tune-section5-led") }}</div>
                </div>
                <div>
                  <div class="subject">{{ $t("serviceIntro-tune-section5-sale") }}</div>
                  <div class="graph2 common"></div>
                  <div class="tune">{{ $t("serviceIntro-tune-section5-tune") }}</div>
                </div>
                <div class="dotted"></div>
                <div>
                  <div class="graph3 common"></div>
                  <div class="led">{{ $t("serviceIntro-tune-section5-led") }}</div>
                </div>
                <div>
                  <div class="subject">{{ $t("serviceIntro-tune-section5-reduction") }}</div>
                  <div class="graph4 common"></div>
                  <div class="tune">{{ $t("serviceIntro-tune-section5-tune") }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- //기존 LED 전광판 대비 저렴한 TUNE -->

      <!-- TUNE을 활용하는 3가지 방법 -->
      <section class="section s17">
        <div class="wrap pt200 pb200">
          <div class="info-wrap">
            <h1 class="mt10" v-html="$t('serviceIntro-tune-section6-text1')"></h1>
            <div class="txt mt20">{{ $t("serviceIntro-tune-section6-text2") }}</div>
          </div>
          <ul class="list mt50">
            <li>
              <h2 v-html="$t('serviceIntro-tune-section6-title1')"></h2>
              <div class="img"><img src="@/assets/images/icon3.png" alt="" /></div>
              <div class="comment" v-html="$t('serviceIntro-tune-section6-comment1')"></div>
            </li>
            <li>
              <h2 v-html="$t('serviceIntro-tune-section6-title2')"></h2>
              <div class="img"><img src="@/assets/images/icon4.png" alt="" /></div>
              <div class="comment" v-html="$t('serviceIntro-tune-section6-comment2')"></div>
            </li>
            <li>
              <h2 v-html="$t('serviceIntro-tune-section6-title3')"></h2>
              <div class="img"><img src="@/assets/images/icon2.png" alt="" /></div>
              <div class="comment" v-html="$t('serviceIntro-tune-section6-comment3')"></div>
            </li>
          </ul>
          <a class="btn">{{ $t("button-contact") }}</a>
        </div>
      </section>
      <!-- //TUNE을 활용하는 3가지 방법 -->

      <!-- 광고 컨텐츠 관리도, 설정도 편리하게! -->
      <section class="section s12">
        <div class="wrap">
          <div class="info-wrap">
            <u-animate name="animate__fadeInUp" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <p class="first">{{ $t("serviceIntro-tune-section7-text1") }}</p>
              <p class="t-title" v-html="$t('serviceIntro-tune-section7-text2')"></p>
              <p class="text" v-html="$t('serviceIntro-tune-section7-text3')"></p>
            </u-animate>
          </div>
          <div class="img-wrap">
            <u-animate name="animate__dung" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <div class="img"><img src="@/assets/images/pc_point3.png" alt="" /></div>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //광고 컨텐츠 관리도, 설정도 편리하게! -->

      <!-- 언제 어디서나 어느 기기로든 OK!-->
      <section class="section s12 pt200 pb200">
        <div class="wrap">
          <div class="info-wrap">
            <u-animate name="animate__fadeInUp" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <p class="first">{{ $t("serviceIntro-tune-section8-text1") }}</p>
              <p class="t-title" v-html="$t('serviceIntro-tune-section8-text2')"></p>
              <p class="text" v-html="$t('serviceIntro-tune-section8-text3')"></p>
            </u-animate>
          </div>
          <div class="img-wrap">
            <u-animate name="animate__dung" delay="0s" duration="1s" :iteration="1" :offset="200" animateClass="animated" :begin="false">
              <div class="img"><img src="@/assets/images/cms_visual_new.png" alt="" /></div>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //언제 어디서나 어느 기기로든 OK!-->

      <!-- TUNE BEST PRACTICE -->
      <section class="section s18 pt100">
        <div class="wrap">
          <div class="info-wrap">
            <h2>{{ $t("serviceIntro-tune-section9-text1") }}</h2>
            <div class="labtop">
              <iframe
                src="https://www.youtube.com/embed/videoseries?list=PLKXz1D5fKg02bfKsBo65fYu2tpoZmsOR9"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
          <h2>{{ $t("serviceIntro-tune-section9-text2") }}</h2>
          <VueSlickCarousel class="photo-right" :arrows="false" :dots="true" :infinite="true" :autoplay="true" :speed="1000" :autoplaySpeed="5000">
            <div class="photo-right mt70">
              <div class="photo-group">
                <span
                  ><img src="@/assets/images/ex01.png" alt="복합문화공간" /><em>{{ $t("serviceIntro-tune-section9-store1") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex02.png" alt="관공서" /><em>{{ $t("serviceIntro-tune-section9-store2") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex03.png" alt="휴대폰매장" /><em>{{ $t("serviceIntro-tune-section9-store3") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex04.png" alt="카페" /><em>{{ $t("serviceIntro-tune-section9-store4") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex05.png" alt="의류 매장" /><em>{{ $t("serviceIntro-tune-section9-store5") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex06.png" alt="주유소" /><em>{{ $t("serviceIntro-tune-section9-store6") }}</em></span
                >
              </div>
              <div class="photo-group mt30">
                <span
                  ><img src="@/assets/images/ex07.png" alt="약국" /><em>{{ $t("serviceIntro-tune-section9-store7") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex08.png" alt="노래방" /><em>{{ $t("serviceIntro-tune-section9-store8") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex09.png" alt="안경점" /><em>{{ $t("serviceIntro-tune-section9-store9") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex10.png" alt="은행" /><em>{{ $t("serviceIntro-tune-section9-store10") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex11.png" alt="병원" /><em>{{ $t("serviceIntro-tune-section9-store11") }}</em></span
                >
                <span
                  ><img src="@/assets/images/ex12.png" alt="편의점" /><em>{{ $t("serviceIntro-tune-section9-store12") }}</em></span
                >
              </div>
            </div>
          </VueSlickCarousel>
        </div>
      </section>
      <!-- //TUNE BEST PRACTICE -->

      <!-- TUNE UNIVERSE -->
      <section class="section s19">
        <div class="wrap">
          <div class="info-wrap">
            <h2>{{ $t("serviceIntro-tune-section10-h2") }}</h2>
            <p class="comment" v-html="$t('serviceIntro-tune-section10-comment')"></p>
            <p class="ing">({{ $t("serviceIntro-tune-section10-ing") }})</p>
          </div>
          <div>
            <p class="extend">{{ $t("serviceIntro-tune-section10-extend") }}(2021~)</p>
            <ul>
              <li>
                <div><img src="@/assets/images/canada.svg" alt="캐나다" /></div>
                <div class="nation">{{ $t("serviceIntro-tune-section10-nation1") }}</div>
              </li>
              <li>
                <div><img src="@/assets/images/brazil.svg" alt="브라질" /></div>
                <div class="nation">{{ $t("serviceIntro-tune-section10-nation2") }}</div>
              </li>
              <li>
                <div><img src="@/assets/images/betnam.svg" alt="베트남" /></div>
                <div class="nation">{{ $t("serviceIntro-tune-section10-nation3") }}</div>
              </li>
              <li>
                <div><img src="@/assets/images/tailand.svg" alt="태국" /></div>
                <div class="nation">{{ $t("serviceIntro-tune-section10-nation4") }}</div>
              </li>
              <li>
                <div><img src="@/assets/images/malasia.svg" alt="말레이시아" /></div>
                <div class="nation">{{ $t("serviceIntro-tune-section10-nation5") }}</div>
              </li>
              <li>
                <div><img src="@/assets/images/indonesia.svg" alt="인도네시아" /></div>
                <div class="nation">{{ $t("serviceIntro-tune-section10-nation6") }}</div>
              </li>
            </ul>
            <div class="btn_grp">
              <a :href="item" target="_blank" class="company_btn">{{ $t("button-tuneIntroView") }}</a>
            </div>
          </div>
        </div>
      </section>
      <!-- //TUNE UNIVERSE -->
    </u-animate-container>
  </div>
</template>

<script>
import { UAnimateContainer, UAnimate } from "vue-wow";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import pdfFile from "@/assets/data/interbrid_catalog.pdf";
export default {
  metaInfo() {
    return {
      title: "튠 TUNE 소개｜내 가계 쇼윈도우가 광고 디스플레이가 되는 스마트 미디어 솔루션",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "평범한 우리 가게의 유리창을 생동감 있는 디스플레이로 변신! 부가 수익도 누릴 수 있는 TUNE에 대해 소개해드립니다.",
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: "TUNE, 자영업자 투잡, 소상공인부수입, 유리창광고, 유리광고, 투명유리광고, 디지털사이니지, 옥외광고디스플레이, 옥외광고",
        },
      ],
    };
  },
  components: { UAnimateContainer, UAnimate, VueSlickCarousel },
  data() {
    return {
      film: true,
      item: pdfFile,
    };
  },
  mounted() {
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
    ChannelIO("boot", {
      pluginKey: "318c0a82-04a0-465b-a3b2-538c580a2447",
      customLauncherSelector: ".btn, #btn2",
      hideChannelButtonOnBoot: true,
    });
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scroll);
  },
  methods: {
    scroll() {
      if (document.querySelector("html").scrollTop > 4200) {
        document.querySelector(".common").classList.add("active");
      }
    },
    show(status) {
      if (status === "milky") {
        this.film = true;
      } else if (status === "gray") {
        this.film = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-gnb {
  transition: all 0.5s ease-in;
  &.actived {
    top: 71px;
  }
}
.scroll-ani-wrap {
  position: fixed;
  bottom: 50px;
  left: 50%;
  width: 40px;
  height: 60px;
  border: 3px solid #fff;
  border-radius: 25px;
  transform: translateX(-50%);
  & .ball {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 20px;
    left: 15px;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }
  &.active {
    border: 3px solid #424242;
    & .ball {
      background: #424242;
    }
  }
}
.s12,
.s13,
.s14,
.s15 {
  & .img-wrap {
    & .img {
      & img {
        width: 500px;
      }
    }
  }
}
.s4 {
  @at-root .wrap {
    margin-top: 300px;
    & .info-wrap {
      & .first {
        color: #222222;
        font-size: 2.4rem;
      }
      & .t-title {
        margin-top: 20px;
        font-size: 5rem;
        color: #222222;
        & span {
          color: #ff4d56;
          font-weight: 700;
        }
      }
      & .text {
        margin-top: 50px;
        color: #747474;
        font-size: 1.8rem;
        line-height: 36px;
      }
    }
    & .img-wrap {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      & .img1 {
        position: absolute;
        z-index: 3;
        right: -50px;
        top: 0;
      }
      & .img2 {
        position: absolute;
        z-index: 2;
        right: 70px;
        top: -300px;
      }
      & .img3 {
        position: absolute;
        z-index: 1;
        right: 230px;
        top: -100px;
      }
    }
  }
}
.s11 {
  position: relative;
  background: url("../../assets/images/key_visual2.png");
  background-size: cover;
  height: 100vh;
  margin-top: -160px;
  & .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    & .bi-wrap {
      text-align: center;
    }
    & .info-wrap {
      color: #fff;
      font-weight: 600;
      text-align: center;
      font-size: 1.8rem;
      & p {
        margin-bottom: 5px;
      }
    }
  }
}
.tab {
  display: flex;
  justify-content: center;
  background: #f2f2f2;
  border-radius: 30px;
  padding: 4px;
  & span {
    width: 50%;
    border-radius: 30px;
    @include NotoSans(1.6, 600, #828282);
    text-align: center;
    height: 48px;
    line-height: 48px !important;
    cursor: pointer;
    &.active {
      background: #fff;
      color: #ff4d56;
    }
  }
}
.s16 {
  & .graph-wrap {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 16px;
    & .graph {
      height: 350px;
      width: 400px;
      position: relative;
      border-bottom: 1px solid #dedede;
      & .label {
        display: flex;
        & .price {
          width: 50%;
          margin-left: 24px;
          @include NotoSans(1.6, 700, #4f4f4f);
          & i {
            display: inline-block;
            background: url("../../assets/images/icon_bill.svg");
            width: 27px;
            height: 27px;
            vertical-align: -9px;
            margin-right: 15px;
          }
        }
        & .electo {
          width: 50%;
          margin-left: 60px;
          @include NotoSans(1.6, 700, #4f4f4f);
          & i {
            display: inline-block;
            background: url("../../assets/images/icon_battery.svg");
            width: 31px;
            height: 22px;
            vertical-align: -4px;
            margin-right: 15px;
          }
        }
      }
      & .group {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        position: absolute;
        bottom: -21px;
        left: 0;
        & .dotted {
          height: 350px;
          border-left: 2px dotted #e0e0e0;
          margin-bottom: 20px;
        }
        & > div {
          position: relative;
          & .common {
            width: 42px;
            border-radius: 10px 10px 0 0;
            margin-top: 15px;
          }
          & .graph1 {
            height: 0px;
            background: #c4c4c4;
            transition: height 0.5s ease-in-out;
            &.active {
              height: 300px;
            }
          }
          & .graph2 {
            height: 0px;
            background: #ff4d56;
            transition: height 0.3s ease-in-out;
            transition-delay: 0.5s;
            &.active {
              height: 180px;
            }
          }
          & .graph3 {
            height: 0px;
            background: #c4c4c4;
            transition: height 0.8s ease-in-out;
            &.active {
              height: 300px;
            }
          }
          & .graph4 {
            height: 0px;
            background: #ff4d56;
            transition: height 0.3s ease-in-out;
            transition-delay: 0.8s;
            &.active {
              height: 60px;
            }
          }
          & .tune {
            @include NotoSans(1.4, 600, #ff4d56);
            text-align: center;
          }
          & .led {
            @include NotoSans(1.4, 400, #747474);
            text-align: center;
          }
          & .subject {
            @include NotoSans(1.8, 700, #ff4d56);
            position: absolute;
            top: -20px;
            left: 50%;
            white-space: nowrap;
            transform: translateX(-50%);
          }
        }
      }
    }
  }
}
.s17 {
  background: #fff9f9;
  & h1 {
    font-size: 4.4rem;
    text-align: center;
    font-weight: 400;
    & b {
      color: #ff4d56;
    }
  }
  & .txt {
    text-align: center;
    font-size: 2.1rem;
  }
  & .list {
    display: flex;
    justify-content: space-between;
    & li {
      width: calc(33.33333% - 18px);
      background: #fff;
      padding: 45px 25px;
      border-radius: 10px;
      & h2 {
        font-size: 1.8rem;
        font-weight: 700;
        & span {
          color: #ff4d56;
        }
      }
      & .img {
        text-align: center;
        margin: 50px 0;
      }
      & .comment {
        font-size: 1.4rem;
        color: #747474;
        text-align: center;
        line-height: 25px;
      }
      &:hover {
        box-shadow: 0px 0px 50px rgba(255, 77, 86, 0.12);
      }
    }
  }
  & .btn {
    display: block;
    margin: 80px auto 0;
    width: 240px;
    background: #ff4d56;
    color: #fff;
    font-weight: 700;
    text-align: center;
    font-size: 2.2rem;
    height: 70px;
    line-height: 70px;
    border-radius: 2px;
  }
}
.s18 {
  & .wrap {
    margin: 120px auto 0;
  }
  & h2 {
    text-align: center;
    font-size: 3.2rem;
  }
  & .info-wrap {
    & .labtop {
      background: url("../../assets/images/mockup1.png");
      width: 701px;
      height: 398px;
      position: relative;
      margin: 60px auto 180px;
      & iframe {
        position: absolute;
        left: 80px;
        top: 23px;
        width: 541px;
        height: 340px;
      }
    }
  }
  & .photo-right {
    width: 100%;
    & .photo-group {
      display: flex;
      justify-content: space-between;
      & span {
        position: relative;
        padding: 0 8px;
        width: 16.666666%;
        & img {
          width: 100%;
        }
        & em {
          font-style: normal;
          color: #747474;
          font-weight: 700;
          text-align: center;
          display: block;
          margin-top: 5px;
        }
      }
    }
  }
}
.s19 {
  background: url("../../assets/images/earth.png");
  background-size: cover;
  & .wrap {
    margin-top: 140px;
    padding-bottom: 78px;
  }
  & .info-wrap {
    padding-top: 135px;
    & h2 {
      text-align: center;
      font-size: 4.4rem;
      color: #fff;
    }
    & .comment {
      color: #fff;
      font-size: 2rem;
      margin: 60px 0 30px;
      text-align: center;
    }
    & .ing {
      color: #747474;
      font-size: 1.6rem;
      text-align: center;
    }
  }
  & .extend {
    color: #fff;
    font-size: 1.6rem;
    margin: 100px 0 50px;
    text-align: center;
    font-weight: 700;
  }
  & ul {
    display: flex;
    justify-content: center;
    & li {
      color: #fff;
      margin: 15px;
      & div {
        text-align: center;
        &.nation {
          margin-top: 10px;
          font-size: 1.4rem;
        }
        & img {
          width: 60px;
          height: 40px;
        }
      }
    }
  }
  & .btn_grp {
    display: flex;
    justify-content: center;
    & .company_btn {
      display: block;
      margin: 80px 30px 0 30px;
      width: 240px;
      background: #fff;
      color: #333333;
      border-radius: 2px;
      font-weight: 700;
      text-align: center;
      font-size: 2.2rem;
      height: 70px;
      line-height: 70px;
    }
    & .company_btn1 {
      display: block;
      margin: 80px auto 0;
      width: 240px;
      background: #747474;
      color: #fff;
      font-weight: 700;
      text-align: center;
      font-size: 2.2rem;
      height: 70px;
      line-height: 70px;
    }
  }
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 50%, 0);
    transform: translate3d(0, 50%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 50%, 0);
    transform: translate3d(0, 50%, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.animate__fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
@-webkit-keyframes dung {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  50% {
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes dung {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  50% {
    -webkit-transform: translate3d(0, -30px, 0);
    transform: translate3d(0, -30px, 0);
  }
  100% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
.animate__dung {
  -webkit-animation-name: dung;
  animation-name: dung;
}
</style>
