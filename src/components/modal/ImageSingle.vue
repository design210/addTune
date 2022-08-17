<template>
  <modalWrap @close="close">
    <template slot="head"></template>
    <template slot="body">
      <div class="v-application">
        <div class="wrap thumbnail-modal">
          <div class="img-wrap">
            <img :src="`${apiBaseUrl}/file/fileView/${id}?size=850`" />
          </div>
        </div>
      </div>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>
<script>
import modalWrap from "@/components/modal/ModalTemplate";
export default {
  components: {
    modalWrap,
  },
  props: ["id"],
  data() {
    return {
      apiBaseUrl: process.env.VUE_APP_API,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  & .img-wrap {
    max-height: 700px;
    overflow-y: auto;
    text-align: center;
    & img {
      max-width: 100%;
    }
  }
}
.btn-group {
  text-align: center;
  justify-content: center;
}

@media (max-width: 800px) {
  .wrap {
    & .img-wrap {
      max-height: 300px;
    }
  }
}
</style>
