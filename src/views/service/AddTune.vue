<template>
  <div class="addtune-intro">
    <u-animate-container>
      <section id="channeltunes1" class="section s1">
        <video-background ref="videobackground" src="https://channeltune-data.s3.ap-northeast-2.amazonaws.com/homepageVideo/homePageMainVideo.mp4" style="max-height: 100vh; height: 100vh">
        </video-background>
      </section>
      <!-- 애드 튠은 간편하고 경제적인 옥외광고 플랫폼입니다. -->
      <section class="section s2">
        <div class="position">
          <div class="copy">
            <span>{{ $t("serviceIntro-addtune-section1-text1") }} </span>
            <u-animate :begin="false" :iteration="1" :offset="300" animateClass="animated" delay="0s" duration="1s" name="animate__fadeIn">
              <div class="txt ml15 mr15">{{ $t("serviceIntro-addtune-section1-text2") }}</div>
            </u-animate>
            <span>{{ $t("serviceIntro-addtune-section1-text3") }}</span>
          </div>
          <div class="comment">
            <u-animate :begin="false" :iteration="1" :offset="200" animateClass="animated" delay="0s" duration="1s" name="animate__fadeInUp">
              <p>{{ $t("serviceIntro-addtune-section1-text4") }}</p>
              <p>{{ $t("serviceIntro-addtune-section1-text5") }}.</p>
              <p>{{ $t("serviceIntro-addtune-section1-text6") }}</p>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //애드 튠은 간편하고 경제적인 옥외광고 플랫폼입니다. -->

      <!-- 애드튠은 데이터를 분석할 수 있는 옥외광고 플랫폼 입니다. -->
      <section class="section s3">
        <div class="position">
          <div class="copy">
            <span>{{ $t("serviceIntro-addtune-section2-text1") }}</span>
            <u-animate :begin="false" :iteration="1" :offset="300" animateClass="animated" delay="0s" duration="1s" name="animate__fadeIn">
              <div class="txt ml15 mr15">{{ $t("serviceIntro-addtune-section2-text2") }}</div>
            </u-animate>
            <span>{{ $t("serviceIntro-addtune-section2-text3") }}</span>
          </div>
          <div class="comment">
            <u-animate :begin="false" :iteration="1" :offset="200" animateClass="animated" delay="0s" duration="1s" name="animate__fadeInUp">
              <p>{{ $t("serviceIntro-addtune-section2-text4") }}</p>
              <p>{{ $t("serviceIntro-addtune-section2-text5") }}</p>
              <p>{{ $t("serviceIntro-addtune-section2-text6") }}</p>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //애드튠은 데이터를 분석할 수 있는 옥외광고 플랫폼 입니다. -->

      <!-- 빅 테이타 기반 광고 효과 측정 -->
      <section class="section s4">
        <div class="wrap">
          <div class="info-wrap">
            <u-animate :begin="false" :iteration="1" :offset="200" animateClass="animated" delay="0s" duration="1s" name="animate__fadeInUp">
              <p class="first">{{ $t("serviceIntro-addtune-section3-text1") }}</p>
              <p class="t-title" v-html="$t('serviceIntro-addtune-section3-text2')"></p>
              <p class="text" v-html="$t('serviceIntro-addtune-section3-text3')"></p>
            </u-animate>
          </div>
          <div class="img-wrap">
            <u-animate :begin="false" :iteration="1" :offset="200" animateClass="animated" delay="0s" duration="1s" name="animate__dung">
              <div class="img"><img alt="" src="@/assets/images/pc.png" /></div>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //빅 테이타 기반 광고 효과 측정 -->

      <!-- 한 눈에 볼 수 있는 광고 실적 리포트 -->
      <section class="section s5">
        <div class="wrap">
          <div class="info-wrap">
            <u-animate :begin="false" :iteration="1" :offset="200" animateClass="animated" delay="0s" duration="1s" name="animate__fadeInUp">
              <p class="first">{{ $t("serviceIntro-addtune-section4-text1") }}</p>
              <p class="t-title" v-html="$t('serviceIntro-addtune-section4-text2')"></p>
              <p class="text" v-html="$t('serviceIntro-addtune-section4-text3')"></p>
            </u-animate>
          </div>
          <div class="img-wrap" style="margin-top: 50px">
            <u-animate :begin="true" :iteration="10000000000" :offset="0" animateClass="animated" delay="0s" duration="2s" name="animate__dung">
              <div class="img1"><img alt="" src="@/assets/images/visual1.png" /></div>
            </u-animate>
            <u-animate :begin="true" :iteration="10000000000" :offset="0" animateClass="animated" delay="0s" duration="3s" name="animate__dung">
              <div class="img2"><img alt="" src="@/assets/images/visual2.png" /></div>
            </u-animate>
            <u-animate :begin="true" :iteration="10000000000" :offset="0" animateClass="animated" delay="0s" duration="4s" name="animate__dung">
              <div class="img3"><img alt="" src="@/assets/images/visual3.png" /></div>
            </u-animate>
          </div>
        </div>
      </section>
      <!-- //한 눈에 볼 수 있는 광고 실적 리포트 -->

      <!-- 1분만에 만드는 옥외광고, 애드튠 -->
      <section class="section s7">
        <div class="wrap pl140">
          <div class="card pt150">
            <div class="d-flex justify-space-between">
              <VueSlickCarousel :arrows="false" :autoplay="true" :autoplaySpeed="3000" :dots="false" :infinite="true" :speed="500" class="photo-right" @beforeChange="handleBeforeChange">
                <div><img alt="" src="@/assets/images/img1.png" /></div>
                <div><img alt="" src="@/assets/images/img2.png" /></div>
                <div><img alt="" src="@/assets/images/img3.png" /></div>
              </VueSlickCarousel>
              <div class="slide-wrap ml50">
                <h2 class="t-title" v-html="$t('serviceIntro-addtune-section5-text1')"></h2>
                <p>{{ $t("serviceIntro-addtune-section5-text2") }}</p>
                <ul>
                  <li v-html="$t('serviceIntro-addtune-section5-area1')"></li>
                  <li v-html="$t('serviceIntro-addtune-section5-area2')"></li>
                  <li v-html="$t('serviceIntro-addtune-section5-area3')"></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="btn">
            <a :href="pdf" class="addtune" target="_blank">{{ $t("button-addtuneIntro") }}</a>
            <router-link to="/ad/adMain">{{ $t("button-buyAd") }}</router-link>
          </div>
        </div>
      </section>
      <!-- //1분만에 만드는 옥외광고, 애드튠 -->
    </u-animate-container>
  </div>
</template>

<script>
import VideoBackground from "vue-responsive-video-background-player";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { UAnimate, UAnimateContainer } from "vue-wow";
import pdfFile from "@/assets/data/addTune Service.pdf";

export default {
  metaInfo() {
    return {
      title: "애드튠 소개｜성과측정 가능한 디지털 옥외광고! 합리적인 비용, 한번에 전국광고!",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "1분만 투자하면 견적 상담 없이 바로 구매 가능! 광고 효과도 측정해주는 옥외광고는 처음일 거예요. 똑똑한 옥외광고 애드튠.",
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: "애드튠,  ADDTUNE, 옥외광고, 옥외광고 성과측정, 디지털옥외광고, 옥외광고물, 지역광고, 전국광고, 택시광고, 버스광고, 지하철광고, 튠, 채널튠, TUNE, 디지털사이니지, 인터브리드",
        },
      ],
    };
  },
  components: { VideoBackground, VueSlickCarousel, UAnimateContainer, UAnimate },
  data() {
    return {
      pdf: pdfFile,
    };
  },
  methods: {
    handleBeforeChange() {
      const list = document.querySelectorAll(".slide-wrap span");
      list.forEach(ele => ele.classList.remove("active"));
      let ranNum01 = Math.floor(Math.random() * 4) + 1;
      let ranNum02 = Math.floor(Math.random() * 3) + 1;
      let ranNum03 = Math.floor(Math.random() * 4) + 1;
      document.querySelector(".slide-wrap li:nth-child(1) span:nth-child(" + ranNum01 + ")").classList.add("active");
      document.querySelector(".slide-wrap li:nth-child(2) span:nth-child(" + ranNum02 + ")").classList.add("active");
      document.querySelector(".slide-wrap li:nth-child(3) span:nth-child(" + ranNum03 + ")").classList.add("active");
      let pos1 = document.querySelector(".slide-wrap li:nth-child(1) span:nth-child(" + ranNum01 + ")").offsetLeft;
      let pos2 = document.querySelector(".slide-wrap li:nth-child(2) span:nth-child(" + ranNum02 + ")").offsetLeft;
      let pos3 = document.querySelector(".slide-wrap li:nth-child(3) span:nth-child(" + ranNum03 + ")").offsetLeft;
      let width1 = document.querySelector(".slide-wrap li:nth-child(1) span:nth-child(" + ranNum01 + ")").offsetWidth;
      let width2 = document.querySelector(".slide-wrap li:nth-child(1) span:nth-child(" + ranNum02 + ")").offsetWidth;
      let width3 = document.querySelector(".slide-wrap li:nth-child(1) span:nth-child(" + ranNum03 + ")").offsetWidth;
      if (ranNum02 === 2) {
        width2 = width2 + 20;
      }
      if (ranNum02 === 3) {
        width2 = width2 + 36;
      }
      document.querySelector(".slide-wrap li:nth-child(1) em").style.left = `${pos1}px`;
      document.querySelector(".slide-wrap li:nth-child(2) em").style.left = `${pos2}px`;
      document.querySelector(".slide-wrap li:nth-child(3) em").style.left = `${pos3}px`;
      document.querySelector(".slide-wrap li:nth-child(1) em").style.width = `${width1}px`;
      document.querySelector(".slide-wrap li:nth-child(2) em").style.width = `${width2}px`;
      document.querySelector(".slide-wrap li:nth-child(3) em").style.width = `${width3}px`;
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

.s1 {
  height: 100vh;
  margin-top: -160px;

  & .banner {
    cursor: pointer;
    top: 0;
    position: sticky;
    z-index: 1;
    width: 100%;
    background: #1f2b87;
    display: flex;
    justify-content: center;
    padding: 10px 0;

    & img {
      width: 35%;
    }
  }

  & .copy-wrap {
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 100;
    width: 1200px;
    transform: translate(-50%, -50%);

    & .copyright {
      color: #fff;
      font-size: 6rem;
      font-weight: 700;
    }

    & .center {
      text-align: center;
      padding-top: 45px;
    }
  }
}

.s2 {
  position: relative;
  background: url("../../assets/images/s2_bg.png");
  background-size: cover;
  height: 100vh;

  & .position {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & .copy {
    text-align: center;
    font-size: 6rem;
    color: #fff;
    font-weight: 700;
    display: flex;
    justify-content: center;

    & .txt {
      white-space: nowrap;
    }

    & span {
      white-space: nowrap;
    }
  }

  & .comment {
    text-align: center;
    font-size: 2.7rem;
    color: #fff;
    margin-top: 10%;
    animation-fill-mode: forwards;
  }
}

.s3 {
  position: relative;
  background: url("../../assets/images/s3_bg.png");
  background-size: cover;
  height: 100vh;

  & .position {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  & .copy {
    text-align: center;
    font-size: 6rem;
    color: #fff;
    font-weight: 700;
    display: flex;
    justify-content: center;

    & .txt {
      white-space: nowrap;
    }

    & span {
      white-space: nowrap;
    }
  }

  & .comment {
    text-align: center;
    font-size: 2.7rem;
    color: #fff;
    margin-top: 10%;
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
      right: -150px;
      top: 50%;
      transform: translateY(-50%);

      & .img1 {
        position: absolute;
        z-index: 3;
        right: 230px;
        top: -20px;
      }

      & .img2 {
        position: absolute;
        z-index: 2;
        right: 190px;
        top: -300px;
      }

      & .img3 {
        position: absolute;
        z-index: 1;
        right: 0px;
        top: -100px;
      }
    }
  }
}

.s5 {
  & .wrap {
    margin-top: 500px;
  }
}

.s7 {
  background: #fff9f9;
  padding: 0 0 150px 0;

  & h1 {
    font-size: 4.4rem;
    font-weight: 400;
  }

  & .txt {
    font-size: 2.1rem;
  }

  & .list4 {
    display: flex;
    justify-content: space-between;

    & li {
      width: calc(25% - 8px);
      background: #fff;
      padding: 20px 20px 40px;

      & h2 {
        font-size: 1.8rem;

        & span {
          color: #ff4d56;
        }
      }

      & .comment {
        font-size: 1.4rem;
        color: #747474;
        text-align: center;
        margin-top: 30px;
      }

      & .img {
        text-align: center;
        margin: 30px 0 0 0;
        height: 90px;
      }
    }
  }

  & .card {
    width: 80%;

    & .photo-right {
      width: 470px;
    }

    & .slide-wrap {
      & h2 {
        margin-top: 0px;
        color: #222222;
        font-size: 3rem;
        font-weight: 400;
        white-space: nowrap;

        & span {
          color: #ff4d56;
        }
      }

      & p {
        color: #222222;
        font-size: 1.8rem;
        margin-top: 10px;
        text-align: center;
      }

      & ul {
        margin-top: 30px;
        padding-left: 0 !important;

        & li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 40px;
          position: relative;

          & span {
            color: #c4c4c4;
            font-size: 2.2rem;
            transition: color 0.5s ease-in-out;
            padding: 5px 20px 0;
            position: relative;
            z-index: 2;

            &.active {
              color: #fff;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }

          & em {
            transition: all 0.5s ease-in-out;
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 45px;
            background: #ff4d56;
            border-radius: 30px;
          }
        }
      }
    }
  }

  & .btn {
    text-align: center;
    width: 100%;

    & a {
      text-align: center;
      margin-top: 100px;
      width: 240px;
      height: 70px;
      background: #ff4d56;
      color: #fff;
      line-height: 70px;
      font-size: 2.2rem;
      font-weight: 700;
      transition: all 0.3s ease-in-out;
      border-radius: 2px;
    }

    & .addtune {
      height: 70px;
      width: 240px;
      background: #fff;
      border: 1px solid #ff4d56;
      color: #ff4d56;
      font-size: 2.2rem;
      font-weight: 700;
      border-radius: 2px;
      margin-right: 20px;
      line-height: 70px;
    }
  }
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate__fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
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
