<template>
  <div>
    <div class="select">
      <div :class="classObject1" @click="contentYN('Y')">
        <div class="title">{{ $t("buyAd-content-title1") }}</div>
        <div class="comment">{{ $t("buyAd-content-comment1") }}</div>
      </div>
      <div :class="classObject2" @click="contentYN('N')">
        <div class="title">{{ $t("buyAd-content-title2") }}</div>
        <div class="comment">{{ $t("buyAd-content-comment2") }}</div>
      </div>
    </div>
    <div class="mt60 movie-length" v-if="classObject1.active === true">
      <div class="radio-group-movie mt30 d-flex">
        <div class="comment bold"><sup>*</sup> {{ $t("buyAd-content-length") }}</div>
        <v-radio-group v-model="movieLength" column>
          <span><v-radio :label="`15${$t('common-unit-milisecond')}`" value="15"></v-radio></span>
          <span><v-radio :label="`30${$t('common-unit-milisecond')}`" value="30"></v-radio></span>
        </v-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["reset", "set"],
  data() {
    return {
      classObject1: {
        active: false,
        item: true,
        bg: false,
      },
      classObject2: {
        active: false,
        item: true,
        bg: false,
      },
      movieLength: "15",
      status: "",
      contentsYN: {
        y: true,
        n: true,
      },
    };
  },
  computed: {
    slot() {
      return this.movieLength / 15;
    },
  },
  watch: {
    //초기 설정
    set(n) {
      const _this = this;
      if (n === "T") {
        _this.contentsYN.n = false;
        _this.classObject2.bg = true;
        this.contentYN("Y");
      } else if (n === "F") {
        _this.contentsYN.y = false;
        _this.classObject1.bg = true;
        this.contentYN("N");
      }
    },
    reset() {
      this.movieLength = "";
      this.classObject1.active = false;
      this.classObject2.active = false;
      this.contentYN("");
    },
    movieLength() {
      this.$emit("contents", {
        estimateExposureContentFlag: this.status,
        time: this.movieLength,
        slot: this.slot,
      });
    },
    status(data) {
      if (data === "N") {
        this.$emit("contents", {
          estimateExposureContentFlag: this.status,
          time: this.movieLength,
          slot: 0,
        });
      } else {
        this.$emit("contents", {
          estimateExposureContentFlag: this.status,
          time: this.movieLength,
          slot: this.slot,
        });
      }
    },
  },
  mounted() {
    this.contentYN("Y");
  },
  methods: {
    contentYN(status) {
      if (status == "Y") {
        if (this.contentsYN.y === true) {
          this.classObject1.active = true;
          this.classObject2.active = false;
        }
      } else if (status == "N") {
        if (this.contentsYN.n === true) {
          this.classObject1.active = false;
          this.classObject2.active = true;
        }
      }
      this.status = status;
    },
  },
};
</script>

<style lang="scss" scoped>
.radio-group-movie::v-deep {
  .v-input--radio-group__input {
    justify-content: flex-start !important;
    margin-left: 50px;
    & .v-radio {
      margin-right: 80px;
    }
  }
}
.select {
  display: flex;
  justify-content: space-between;
  & .item {
    width: 530px;
    border: 1px solid #828282;
    height: 122px;
    border-radius: 61px;
    padding: 30px 0 0 120px;
    cursor: pointer;
    &.bg {
      background: #e5e5e5;
    }

    & .title {
      @include NotoSans(2.3, 700, #828282);
    }
    & .comment {
      @include NotoSans(1.4, 400, #828282);
    }
    &.active {
      padding: 26px 0 0 116px;
      border: 5px solid #ff4d56;
      background: url("../../assets/images/mov_check.png") no-repeat left 35px top 41px;
      & .title {
        color: #ff4d56 !important;
      }
    }
  }
}
.movie-length {
  & .comment {
    @include NotoSans(1.5, 400, #828282);
    &.bold {
      @include NotoSans(1.8, 500, #4f4f4f);
    }
  }
}
.radio-group-movie::v-deep {
  & .v-input--radio-group__input {
    padding: 0 30px;
    flex-direction: row !important;
    justify-content: space-between;

    & .v-icon {
      color: #ff4d56 !important;
      caret-color: #ff4d56 !important;
    }

    & label {
      @include NotoSans(1.7, 400, #4f4f4f);
      margin-left: 14px;
    }

    & .v-input--selection-controls__ripple {
      display: none;
    }

    & .v-item--active {
      & label {
        @include NotoSans(1.7, 700, #ff4d56);
      }
    }
  }
}
</style>
