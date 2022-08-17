<template>
  <div class="date-picker-basic">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="date" label="" readonly v-bind="attrs" v-on="on" @click="hangleDelete"></v-text-field>
      </template>
      <v-date-picker no-title :min="min" v-model="date" @input="menu = false" locale="ko-kr" :picker-date.sync="pickerDate"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import { ref, watch, getCurrentInstance } from "@vue/composition-api";
export default {
  props: ["min"],
  setup() {
    return {
      ...date(),
    };
  },
};
function date() {
  const vm = getCurrentInstance();
  const date = ref("");
  const menu = ref(false);
  const pickerDate = ref("");
  const hangleDelete = () => {
    let time = setTimeout(function () {
      const day = document.querySelectorAll(".v-date-picker-table .v-btn__content");
      day.forEach(ele => {
        ele.textContent = ele.textContent.replace("일", "");
      });
      clearInterval(time);
    }, 100);
  };
  watch(pickerDate, () => {
    hangleDelete();
  });
  watch(date, date => {
    vm.emit("date", date);
  });
  return { date, menu, hangleDelete, pickerDate };
}
</script>

<style lang="scss">
.theme--light.v-date-picker-header .v-date-picker-header__value:not(.v-date-picker-header__value--disabled) button:not(:hover):not(:focus) {
  color: #bdbdbd !important;
}
.v-date-picker-header {
  & .accent--text {
    & button {
      @include NotoSans(1.8, 700, #bdbdbd);
    }
  }
}
.v-date-picker-table {
  & .v-btn--disabled {
    & .v-btn__content {
      @include NotoSans(1.3, 400, #e0e0e0);
    }
  }
  & .v-date-picker-table__current {
    border: 0 !important;
    background: #f2f2f2;
    & .v-btn__content {
      @include NotoSans(1.3, 400, #828282);
    }
  }
  & .v-btn--active {
    & .v-btn__content {
      @include NotoSans(1.3, 700, #fff);
    }
    &.accent {
      background: #ff4d56 !important;
    }
  }
  & .v-btn__content {
    @include NotoSans(1.3, 400, #828282);
  }
}
.date-picker-basic {
  & .v-text-field__slot {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      background: url("../../assets/images/arrow_down_xs.png") no-repeat;
      width: 20px;
      height: 10px;
      right: 10px;
      top: 12px;
    }
  }
  & .v-input__slot {
    margin-bottom: 0 !important;
    height: 50px !important;
    background: #fff;
    border-radius: 2px;
    & input {
      background: #fff;
      height: 50px !important;
      border-radius: 2px;
      padding: 0 20px;
      @include NotoSans(1.6, 400, #4f4f4f);
    }
    &:before {
      border: 0 !important;
    }
    &:after {
      border: 0 !important;
    }
  }
  & .v-text-field__details {
    min-height: 0 !important;
    height: 0;
    & .v-message {
      display: none;
    }
  }
}
</style>
