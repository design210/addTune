<template>
  <div class="contents-wrapper sub-wrapper">
    <h1>{{ $t("board-faq1") }}</h1>
    <div class="search mt50">
      <input v-model="searchText" placeholder="검색으로 더 빠르게 찾아보세요" type="text" @keyup.enter="reload()" /><i v-if="searchText !== ''" class="del" @click="cleanSearchText"></i>
      <!--			<i class="search-btn" @click="reload()"></i>-->
    </div>
    <div class="tab mt35 d-flex justify-space-between">
      <div>
        <span :class="{ active: this.boardCategorySids === 'SYS21A13B003' }" @click="categories('SYS21A13B003')">{{ $t("board-faq1") }}</span>
        <span :class="{ active: this.boardCategorySids === 'SYS21A13B004' }" @click="categories('SYS21A13B004')">{{ $t("board-faq2") }}</span>
        <span :class="{ active: this.boardCategorySids === 'SYS21A13B005' }" @click="categories('SYS21A13B005')">{{ $t("board-faq3") }}</span>
        <span :class="{ active: this.boardCategorySids === 'SYS21A13B006' }" @click="categories('SYS21A13B006')">{{ $t("board-faq4") }}</span>
        <span :class="{ active: this.boardCategorySids === 'SYS21A13B007' }" @click="categories('SYS21A13B007')">{{ $t("board-faq5") }}</span>
        <span :class="{ active: this.boardCategorySids === 'SYS21A13B008' }" @click="categories('SYS21A13B008')">{{ $t("board-faq6") }}</span>
        <span :class="{ active: this.boardCategorySids === '' }" @click="categories('')">{{ $t("board-faq7") }}</span>
      </div>
    </div>
    <ul class="mt22 faq-list">
      <li v-for="item in list" :key="item.boardFaqSid" @click="boardDetail(item.boardFaqSid)">
        <div class="subject">
          <span>{{ item.boardCategoryName }}</span>
          <span v-html="item.boardFaqTitle.replace(searchText, `<span style='font-weight:700'>${searchText}</span>`)"></span>
        </div>
        <div class="contents">
          <div v-html="item.boardFaqContent"></div>
          <div class="files">
            <ul>
              <li v-for="item in file" :key="item.fileSid">
                <span @click="__fileDownload({ id: item.fileSid, fileExt: item.fileExt, name: item.fileFileName })">{{ item.fileFileName }} </span>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
    <div v-if="list.length === 0 && searchText !== ''" class="tbl-no-data">{{ $t("board-faqAlert1") }}</div>
    <div v-if="list.length === 0 && searchText === ''" class="tbl-no-data">{{ $t("board-faqAlert2") }}</div>
    <div class="text-center mt30">
      <v-pagination v-model="page" :length="len" :total-visible="10"></v-pagination>
    </div>
  </div>
</template>

<script>
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import fileUploadMixin from "@/mixins/fileUpload";

export default {
  mixins: [loading, fileUploadMixin],
  data() {
    return {
      size: 10,
      page: 1,
      len: null,
      list: [],
      eventKind: "START",
      file: [],
      searchText: "",
      boardCategorySids: "",
      selected: "",
    };
  },
  computed: {
    ...mapGetters("faq", ["getFaqList", "getFaqDetail"]),
  },
  watch: {
    page() {
      this.reload();
    },
    eventKind() {
      this.reload();
    },
    boardCategorySids() {
      this.reload();
    },
  },
  mounted() {
    this.reload();
    document.addEventListener("click", this.toggleList);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.toggleList);
  },
  methods: {
    toggleList(e) {
      if (this.$route.name === "faq") {
        const data = this.hasClass(e.target, "faq-list");
        if (data !== undefined) {
          const list = document.querySelectorAll(`.faq-list li:not(.${data.id})`);
          list.forEach(ele => {
            ele.classList.remove("active");
          });
          if (data.ele !== undefined) {
            if (data.ele.classList.contains("active")) {
              data.ele.classList.remove("active");
            } else {
              data.ele.classList.add("active");
            }
          }
        }
      }
    },
    hasClass(elem, className) {
      if (elem.closest("." + className)) {
        const DOMTockenList = elem.closest("ul").classList.value;
        const selectedId = elem.closest("li").classList[0];
        if (DOMTockenList.includes(className)) {
          return { ele: elem.closest("li"), id: selectedId };
        }
      }
    },
    async reload(id) {
      if (id !== undefined) {
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("faq/FAQ_DETAIL", id);
          this.selected = id;
          this.file = this.getFaqDetail.addtuneApiResult.boardFaq.fileResult;
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      }
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("faq/FAQ_LIST", {
          page: this.page,
          size: this.size,
          searchText: this.searchText,
          boardCategorySids: this.boardCategorySids,
        });
        const list = this.getFaqList.addtuneApiResult.boardFaq;
        this.list = list.data;
        this.len = list.last_page;
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    boardDetail(id) {
      if (id !== this.selected) {
        this.file = [];
        this.reload(id);
      }
    },
    kind(status) {
      this.eventKind = status;
    },
    cleanSearchText() {
      this.searchText = "";
    },
    categories(id) {
      this.boardCategorySids = id;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  @include NotoSans(2.5, 700, #333333);
}

.search {
  position: relative;

  & input {
    border: 1px solid #bdbdbd;
    width: 100%;
    height: 47px;
    border-radius: 5px;
    padding: 0 20px 0 20px;
  }

  & .search-btn {
    position: absolute;
    top: 17px;
    right: 17px;
    background: url("../../assets/images/search.png") no-repeat;
    background-size: 100%;
    width: 14px;
    height: 13px;
    cursor: pointer;
  }

  & .del {
    position: absolute;
    top: 12px;
    right: 20px;
    background: url("../../assets/images/delete.png");
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
}

.tab {
  text-align: right;

  & span {
    margin-right: 30px;
    cursor: pointer;
    @include NotoSans(1.6, 400, #828282);

    &.active {
      color: #ff4d56;
      font-weight: 700;
    }
  }
}

.faq-list {
  border-top: 2px solid #ff4d56;

  & li {
    border-bottom: 1px solid #dddddd;
    padding: 15px 0;
    cursor: pointer;

    & .subject {
      & span {
        &:nth-child(1) {
          @include NotoSans(1.5, 700, #333333);
          padding-left: 30px;
          width: 200px;
        }

        &:nth-child(2) {
          font-size: 1.5rem;
          color: #333333;
          width: calc(100% - 200px);
        }
      }
    }

    & .contents {
      margin-left: 200px;
      font-size: 1.5rem;
      color: #333333;
      margin-top: 20px;
      margin-bottom: 20px;
      display: none;

      & .files {
        margin-top: 20px;

        & li {
          border: 0;
          @include NotoSans(1.4, 400, #828282);
          padding: 0;
          margin-bottom: 5px;
        }
      }
    }

    &.active {
      background: rgba(241, 92, 92, 0.03);

      & .contents {
        display: block;
      }

      & .subject {
        & span:nth-child(2) {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
