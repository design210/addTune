<template>
  <modalWrap @close="close">
    <template slot="head">
      <div class="header">
        <h2>{{ $t("modal-pdf") }}</h2>
        <div class="btn-group">
          <v-btn @click="changePdfPage(0)" class="turn" :class="{ grey: currentPage == 1 }">
            <span>{{ $t("button-prev") }}</span>
          </v-btn>
          <span class="page">{{ currentPage }} / {{ pageCount }}</span>
          <v-btn @click="changePdfPage(1)" class="turn" :class="{ grey: currentPage == pageCount }">
            <span>{{ $t("button-next") }}</span>
          </v-btn>
        </div>
      </div>
    </template>
    <template slot="body">
      <div class="v-application">
        <div class="wrap">
          <div class="pdf-wrap">
            <pdf :src="pdfUrl" ref="pdfComponent" :page="currentPage" @num-pages="pageCount = $event" @page-loaded="currentPage = $event" @loaded="loadPdfHandler"></pdf>
          </div>
          <div class="btn-group mt10">
            <v-btn small color="primary mr5" @click="__fileDownload({ id: data.id, fileExt: data.fileExt, name: data.name })">{{ $t("button-download2") }}</v-btn>
            <v-btn small color="success mr5" @click="$refs.pdfComponent.print()">{{ $t("button-print") }}</v-btn>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import pdf from "vue-pdf";
import fileUploadMixin from "@/mixins/fileUpload";
export default {
  components: {
    modalWrap,
    pdf,
  },
  mixins: [fileUploadMixin],
  props: ["data", "status", "apiBaseUrl"],
  data() {
    return {
      //컨펌 데이터
      pdfUrl: "",
      currentPage: 0,
      pageCount: 0,
      name: "",
      ext: "",
    };
  },
  mounted() {
    this.pdfUrl = `${process.env.VUE_APP_API}/file/fileView/${this.data.id}`;
  },
  methods: {
    changePdfPage(val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    // pdf loading time
    loadPdfHandler() {
      this.currentPage = 1;
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  & .pdf-wrap {
    max-height: 700px;
    overflow-y: auto;
    text-align: center;
    & img {
      max-width: 100%;
    }
  }
}
.header {
  display: flex;
  justify-content: space-between;
  & .btn-group {
    margin-right: 50px;
    & button {
      height: 26px;
      min-width: 58px;
    }
    & .page {
      padding: 0 20px;
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
