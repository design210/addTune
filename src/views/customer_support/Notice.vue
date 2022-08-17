<template>
  <div class="contents-wrapper sub-wrapper">
    <h1>{{ $t("board-noticeTitle") }}</h1>
    <ul class="notice-list mt60">
      <li v-for="item in list" :key="item.boardNoticeSid">
        <div class="subject">
          <span v-if="item.boardNoticeTopFlag === 'Y'">{{ $t("board-notice") }}</span>
          <span v-else class="num">{{ item.boardNoticeSid }}</span>
          <span :class="{ flag: item.boardNoticeTopFlag === 'Y' }">{{ item.boardNoticeTitle }}</span>
          <span>{{ item.created_at.substr(0, 10) }}</span>
        </div>
        <div class="contents" v-html="item.boardNoticeContent"></div>
      </li>
      <div class="tbl-no-data" v-if="list.length === 0">{{ $t("board-noticeNone") }}</div>
    </ul>
    <div class="text-center mt30">
      <v-pagination v-model="page" :length="len" :total-visible="10"></v-pagination>
    </div>
  </div>
</template>

<script>
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import { mapGetters } from "vuex";
export default {
  mixins: [loading],
  data() {
    return {
      size: 10,
      page: 1,
      len: null,
      list: [],
    };
  },
  computed: {
    ...mapGetters("notice", ["noticeList"]),
  },
  watch: {
    page() {
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
      if (this.$route.name === "noticeList") {
        const data = this.hasClass(e.target, "notice-list");
        if (data !== undefined) {
          const list = document.querySelectorAll(`.notice-list li:not(.${data.id})`);
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
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("notice/NOTICE_LIST", { page: this.page, size: this.size });
        const res = this.noticeList.addtuneApiResult;
        const list = res.boardNotice;
        this.list = list.data;
        this.len = list.last_page;
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  @include NotoSans(2.5, 700, #333333);
}
.notice-list {
  border-top: 2px solid #ff4d56;
  & li {
    border-bottom: 1px solid #dddddd;
    padding: 15px 0;
    cursor: pointer;
    & .subject {
      & span {
        &:nth-child(1) {
          @include NotoSans(1.6, 700, #333333);
          padding-left: 30px;
          width: 130px;
          &.num {
            @include Montserrat(1.6, 700, #333333);
          }
        }
        &:nth-child(2) {
          font-size: 1.6rem;
          color: #333333;
          width: calc(100% - 230px);
        }
        &:nth-child(3) {
          @include Montserrat(1.6, 600, #828282);
          width: 100px;
          text-align: right;
          padding-right: 15px;
        }
        &.flag {
          font-weight: 700;
        }
      }
    }
    & .contents {
      width: calc(100% - 230px);
      margin-left: 130px;
      font-size: 1.5rem;
      color: #000;
      margin-top: 20px;
      margin-bottom: 20px;
      display: none;
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
