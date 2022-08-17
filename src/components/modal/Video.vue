<template>
  <modalWrap @close="close">
    <template slot="head"> </template>
    <template slot="body">
      <video-player ref="videoPlayer" class="video-player vjs-custom-skin" :playsinline="true" :options="playerOptions" />
    </template>
    <template slot="footer"> </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplateVideo";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    modalWrap,
    videoPlayer,
  },
  props: ["videoSid", "videoTransSid", "apiBaseUrl"],
  data() {
    return {
      overrideNative: false,
      playerOptions: {
        // videojs options
        autoplay: true,
        height: "590",
        muted: true,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: `${process.env.VUE_APP_API}/video/view/${this.videoSid}`,
          },
        ],
        poster: `${process.env.VUE_APP_API}/video/view/${this.videoSid}?videoTransSid=${this.videoTransSid}`,
      },
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped></style>
