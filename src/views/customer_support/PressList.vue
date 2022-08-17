<template>
  <div class="sub-wrapper mt100">
    <h1>{{ $t("mainPressList-h1") }}</h1>
    <h2 class="mt10">{{ $t("mainPressList-h2") }}</h2>
    <ul class="press-list d-flex mt80">
      <li v-for="item in pressData.list" :key="item.boardNewsURL">
        <div>
          <a :href="item.boardNewsURL" target="_blank"><img :src="item.boardNewsImageURL" :alt="item.boardNewsDescription" /></a>
        </div>
        <div class="info-line">
          <div class="title">
            <a :href="item.boardNewsURL" target="_blank">{{ item.boardNewsTitle }}</a>
          </div>
          <div class="btn mt23">
            <button type="button" v-clipboard:copy="item.boardNewsURL" v-clipboard:success="onCopy" v-clipboard:error="onError"><i></i> {{ $t("common-linkCopy") }}</button>
          </div>
        </div>
      </li>
    </ul>
    <div class="text-center mt30 mb200" v-if="pressData.last_page !== ''">
      <v-pagination v-model="page" :length="pressData.last_page" :total-visible="10"></v-pagination>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, getCurrentInstance, watch, computed } from "@vue/composition-api";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  mixins: [loading],
  setup() {
    return {
      ...press(),
    };
  },
};
function press() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const page = ref(1);
  const pressData = reactive({
    size: 12,
    list: [],
    last_page: "",
  });
  onMounted(() => {
    reload();
  });
  watch(page, () => {
    reload();
  });
  const getter = computed(() => _this.$store.getters["press/pressList"]);
  const reload = async () => {
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("press/PRESS_LIST", { size: pressData.size, page: page.value });
      const res = getter.value.addtuneApiResult;
      if (res.errorCode === 200) {
        pressData.list = res.boardNews.data;
        pressData.last_page = res.boardNews.last_page;
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  };
  const onCopy = () => {
    alert("복사 되었습니다.");
  };
  const onError = () => {
    alert("복사에 실패했습니다.");
  };
  return { pressData, page, onCopy, onError };
}
</script>

<style lang="scss" scoped>
h1 {
  @include NotoSans(2.5, 700, #333333);
}
h2 {
  @include NotoSans(1.5, 400, #828282);
}
.press-list {
  flex-wrap: wrap;
  & li {
    width: calc(33.33333% - 14px);
    margin-right: 21px;
    border: 1px solid #bdbdbd;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 30px;
    &:nth-child(3n) {
      margin-right: 0;
    }
    & img {
      width: 354px;
      height: 220px;
    }
    & .info-line {
      padding: 20px 20px 15px;
      & .title {
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* ellipsis line */
        -webkit-box-orient: vertical;
        @include NotoSans(1.7, 700, #4f4f4f);
        height: 50px;
        & a {
          @include NotoSans(1.7, 700, #4f4f4f);
        }
      }
    }
    & .btn {
      text-align: right;
      & button {
        @include NotoSans(1.4, 700, #bdbdbd);
        & i {
          width: 17px;
          vertical-align: -2px;
          height: 17px;
          background: url("../../assets/images/link.png");
        }
      }
    }
  }
}
</style>
