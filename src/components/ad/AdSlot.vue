<template>
  <div class="slot">
    <div v-if="fixed === false">
      <div class="info-wrap">
        <input class="num" type="number" v-model="slider" @focus="focus" v-show="sliderInputShow === true" />
        <input ref="init" class="num" type="number" v-model="slelectInit" @blur="blur" v-show="sliderInputShow === false" />
        <span class="txt" v-if="store === true">{{ $t("buyAd-slot-t1") }}</span>
        <span class="txt" v-else>{{ $t("buyAd-slot-t2") }}</span>
      </div>
      <div class="slider-wrap ml100">
        <span class="min">{{ min }}</span>
        <v-slider v-model="slider" :thumb-size="24" thumb-label="always" :min="min" :max="max" :step="step" @mouseup="sliderMouseUp" class="slot-slider">
          <template v-slot:thumb-label="{ value }">
            <span
              >{{ value }}
              <div class="discount" v-show="store !== true">
                <span>
                  {{ minute }} <span>{{ second }}</span
                  >{{ $t("buyAd-slot-t3") }}
                </span>
              </div>
            </span>
          </template>
        </v-slider>
        <span class="max">{{ max }}</span>
      </div>
    </div>
    <div v-else>
      <div class="info-wrap">
        <span class="num disabled">{{ slotfixed }}</span>
        <span class="txt">{{ $t("buyAd-slot-t4") }}</span>
      </div>
      <div class="slider-wrap">
        <v-slider v-model="slider" disabled :thumb-size="24" thumb-label="always" :min="0" :max="slotfixed" class="slot-slider">
          <template v-slot:thumb-label="{ value }">
            <span v-if="value !== 0 && value !== max">{{ value }}</span>
          </template>
        </v-slider>
        <span class="min">1</span>
        <span class="max">{{ slotfixed }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["maxSlot", "slotSet", "fixed", "slotfixed", "store", "maxStoreSlot", "changeSlot", "basicSetSlot"],
  data() {
    return {
      slider: null,
      min: 1,
      step: 1,
      slot: 1,
      max: 10,
      temp: null,
      discountSlot: [],
      sliderInputShow: true,
      slelectInit: null,
      clacSe: null,
    };
  },
  computed: {
    second() {
      let c = 0;
      let calc = 0;
      if (this.slotSet === 1 || this.slotSet === 0) {
        c = Number((60 / this.slider) % 1);
        calc = Number(c.toFixed(2) * 60);
      } else {
        c = Number(((60 / this.slider) * 2) % 1);
        calc = Number(c.toFixed(2) * 60);
      }
      if (calc > 0) {
        return `${Math.floor(calc)}${this.$t("common-unit-milisecond")}`;
      } else {
        return "";
      }
    },
    minute() {
      if (this.slotSet === 1 || this.slotSet === 0) {
        return `${Math.floor(60 / this.slider)}${this.$t("common-unit-minute")}`;
      } else {
        return `${Math.floor((60 / this.slider) * 2)}${this.$t("common-unit-minute")}`;
      }
    },
  },
  watch: {
    changeSlot() {
      this.slider = this.slotfixed;
    },
    maxStoreSlot() {
      this.max = this.maxStoreSlot;
    },
    minute() {
      document.querySelector(".slot-slider .v-slider__thumb-label > div > span").style.fontSize = "0px !important";
    },
    discount(n) {
      this.discountSlot = n;
    },
    slotfixed(n) {
      this.slider = n;
    },
    slotSet() {
      if (this.slotSet === "" || this.slotSet === 0) {
        this.min = 1;
        this.max = 50;
      } else {
        this.step = this.slotSet;
        this.min = this.slotSet;
        this.slot = this.min;
        this.slider = this.basicSetSlot;
        this.max = Math.floor(this.maxSlot / this.step) * this.step;
      }
    },
    slelectInit(n) {
      if (this.store === true) {
        n > this.max ? alert(this.$t("alert-t10")) : (this.slider = n);
      } else {
        n > this.max ? alert(this.$t("alert-t11")) : (this.slider = n);
      }
    },
    slider(n) {
      if (this.store === true) {
        this.$emit("storeViewTotal", n);
      }
      this.store === true ? this.$emit("storeSlot", this.slider) : this.$emit("slot", this.slider);
    },
    basicSetSlot(n) {
      this.slider = n;
    },
  },
  methods: {
    sliderMouseUp() {
      this.slelectInit = this.slider;
      this.store === true ? this.$emit("storeSlot", this.slider) : this.$emit("slot", this.slider);
    },
    focus() {
      this.sliderInputShow = false;
      this.slelectInit = this.slider;
      setTimeout(() => {
        this.$refs.init.focus();
      }, 10);
    },
    blur() {
      this.sliderInputShow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.slot {
  position: relative;
  & > div {
    display: flex;
    justify-content: space-between;
    & .info-wrap {
      display: flex;
      align-items: center;
      & .num {
        border: 1px solid #bdbdbd;
        border-radius: 2px;
        height: 43px;
        line-height: 41px !important;
        text-align: center;
        width: 100px;
        @include Montserrat(2.3, 600, #333333);
        &.disabled {
          background: #f2f2f2;
          color: #828282 !important;
        }
      }
      & .txt {
        @include NotoSans(2, 400, #333333);
        margin-left: 15px;
        white-space: nowrap;
      }
    }
    & .slider-wrap {
      margin-top: 20px;
      width: calc(100% - 500px);
      position: relative;
      margin-right: 90px;
      & .min {
        @include Montserrat(1.8, 500, #828282);
        position: absolute;
        left: -62px;
        top: 3px;
        background: #fff;
        padding: 0 6px 0 0;
      }
      & .max {
        @include Montserrat(1.8, 500, #828282);
        position: absolute;
        right: -80px;
        top: 3px;
      }
    }
  }
}
.slot-slider::v-deep {
  & .v-slider--horizontal {
    & .v-slider__track-container {
      height: 7px !important;
    }
  }
  & .v-slider__track-background {
    border-radius: 5px;
  }
  & .v-slider__thumb {
    width: 25px !important;
    height: 25px !important;
    border-radius: 50% !important;
    &.primary {
      background-color: #fff !important;
      border: 1px solid #bdbdbd !important;
      @include boxshadow(3px, 3px, 5px, 0px, rgba(0, 0, 0, 0.05));
      &:before {
        display: none;
      }
    }
  }
  & .v-slider__track-fill {
    border-radius: 10px;
    &.primary {
      background-color: #ff4d56 !important;
      border-color: #ff4d56 !important;
    }
  }
  & .v-slider__track-background {
    &.primary {
      &.lighten-3 {
        background-color: #ffdbdb !important;
        border-color: #ffdbdb !important;
      }
    }
  }
  & .v-slider__thumb-label {
    left: 7px !important;
    bottom: -55px !important;
    &.primary {
      background-color: transparent !important;
      //border-color: none !important;
    }
    & span {
      @include Montserrat(2, 600, #ff4d56);
    }
  }
  & .v-slider--disabled {
    & .v-slider__thumb {
      width: 25px !important;
      height: 25px !important;
      border-radius: 50% !important;
      background-color: #fff !important;
      border: 1px solid #bdbdbd !important;
      @include boxshadow(3px, 3px, 5px, 0px, rgba(0, 0, 0, 0.05));
      left: -9px !important ;
      &:before {
        display: none;
      }
    }
    & .v-slider__track-fill {
      width: 100% !important;
    }
  }
  & .discount {
    position: absolute;
    top: -55px;
    left: 50%;
    transform: translateX(-50%);
    & span {
      white-space: nowrap;
      @include NotoSans(1.5, 900, #7000ff);
    }
  }
}
.discount-last {
  position: absolute;
  top: -25px;
  right: 0%;
  & span {
    white-space: nowrap;
    @include NotoSans(1.5, 900, #7000ff);
  }
}
</style>
