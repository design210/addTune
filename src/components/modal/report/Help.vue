<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>{{ $t("modal-help-title") }}</h2>
    </template>
    <template slot="body">
      <h3>
        <i><img src="@/assets/images/alim_red.png" alt="" /></i> {{ $t("modal-help-info") }}
      </h3>
      <ul class="dot mt5 red">
        <li v-if="date !== ''">
          <span>{{ $t("report-total-last") }} : {{ date }}</span>
        </li>
        <li>{{ $t("modal-help-info1") }}</li>
      </ul>
      <h4>{{ $t("modal-help-traffic") }}</h4>
      <div class="txt mt3">{{ $t("modal-help-trafficInfo") }}</div>
      <h4>{{ $t("modal-help-stay") }}</h4>
      <div class="txt mt3">{{ $t("modal-help-stayInfo") }}</div>
      <h4>{{ $t("modal-help-how") }}</h4>
      <ul class="txt mt3">
        <li>{{ $t("modal-help-howInfo1") }}</li>
        <li>
          <p>{{ $t("modal-help-howInfo2") }}</p>
          <p>{{ $t("modal-help-howInfo3") }}</p>
          <p>{{ $t("modal-help-howInfo4") }}</p>
          <p>{{ $t("modal-help-howInfo5") }}</p>
        </li>
        <li v-html="$t('modal-help-howInfo6')"></li>
      </ul>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: {
    modalWrap,
  },
  mixins: [loading],
  data() {
    return {
      date: "",
    };
  },
  computed: {
    ...mapGetters("report", ["getReportUpdateDate"]),
  },
  async created() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("report/REPORT_UPDATE_DATE");
      if (this.getReportUpdateDate.addtuneApiResult.errorCode === 200) {
        this.date = this.getReportUpdateDate.addtuneApiResult.latestUpdatedDate;
      } else {
        alert(this.getReportUpdateDate.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      alert(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  text-align: center;
  @include NotoSans(3, 700, #333333);
}
h3 {
  @include NotoSans(1.6, 500, #4f4f4f);
  & img {
    vertical-align: -3px;
  }
}
h4 {
  margin-top: 18px;
  @include NotoSans(1.6, 500, #4f4f4f);
}
.dot {
  & li {
    @include NotoSans(1.4, 400, #4f4f4f);
    padding-left: 20px;
    position: relative;
    & span {
      color: #ff4d56 !important;
    }
    &:after {
      content: "";
      position: absolute;
      left: 6px;
      top: 8px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: #4f4f4f;
    }
  }
  &.red {
    & li {
      &:after {
        background: #ff4d56;
      }
    }
  }
}
.txt {
  @include NotoSans(1.4, 400, #4f4f4f);
  & p {
    padding-left: 13px;
    &:first-child {
      padding-left: 0;
    }
  }
  & span {
    color: #ff4d56 !important;
  }
}
</style>
