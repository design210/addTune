<template>
  <div class="slider-wrap">
    <div class="slider" v-if="bottomBanner.length > 0">
      <VueSlickCarousel v-bind="settings" v-if="loaded">
        <div v-for="item in bottomBanner" :key="item">
          <img :src="item" alt="" />
        </div>
      </VueSlickCarousel>
    </div>
    <div class="slider mt15">
      <VueSlickCarousel v-bind="settings2" v-if="loaded">
        <div v-for="item in bottomBanner" :key="item">
          <img :src="item" alt="" />
        </div>
      </VueSlickCarousel>
    </div>
  </div>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  components: { VueSlickCarousel },
  props: ["bottomBanner"],
  data() {
    return {
      addList: [],
      loaded: false,
      settings: {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 11,
        autoplay: true,
        speed: 30000,
        autoplaySpeed: 100,
        cssEase: "linear",
        pauseOnHover: false,
      },
      settings2: {
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 11,
        autoplay: true,
        speed: 35000,
        autoplaySpeed: 100,
        cssEase: "linear",
        pauseOnHover: false,
      },
    };
  },
  watch: {
    bottomBanner(n) {
      if (n) {
        this.loaded = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.slider-wrap {
  width: 100%;
  position: relative;
  & .slider {
    width: 1920px;
    margin: 0 auto;
  }
}
</style>
