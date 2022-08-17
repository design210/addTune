<template>
  <div class="calendar-relative">
    <div class="calendar-wrap">
      <div :class="[select ? 'start-selected' : 'start']">
        <div class="subject">{{ $t("buyAd-calendar-start") }}</div>
        <div class="date-result">
          <span class="choice" v-if="value.length === 0 || tempHide === true">{{ $t("buyAd-calendar-select") }}</span>
          <span class="result" v-else
            >{{ firstDate.substr(0, 4) }}. {{ firstDate.substr(5, 2) }}. {{ firstDate.substr(8, 2) }} <span>{{ firstWeekOfDay }}</span></span
          >
        </div>
      </div>
      <div class="end">
        <div class="subject">{{ $t("buyAd-calendar-end") }}</div>
        <div class="date-result">
          <span class="choice" v-if="value.length === 0 || tempHide === true">{{ $t("buyAd-calendar-select") }}</span>
          <span v-else class="last">
            <span class="result-end"
              >{{ lastDate.substr(0, 4) }}. {{ lastDate.substr(5, 2) }}. {{ lastDate.substr(8, 2) }} <span>{{ lastWeekOfDay }}</span></span
            >
            <span class="result-end"
              >{{ dateCalc }}<span class="pr12">{{ $t("common-unit-day") }}</span></span
            >
          </span>
        </div>
      </div>
    </div>

    <date-picker
      ref="datepicker"
      v-model="value"
      range
      :lang="lang"
      type="date"
      :inline="true"
      value-type="YYYY-MM-DD"
      :disabled-date="disabledRange"
      @pick="handlePick"
      popup-class="ad-date-picker"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import { dayOfWeek } from "@/utils/dayOfWeek.js";
import betweenDay from "@/utils/betweenDay.js";
export default {
  components: {
    DatePicker,
  },
  props: ["month", "reset", "adRange", "today", "disabledDay"],
  data() {
    return {
      value: [],
      lang: {
        formatLocale: {
          firstDayOfWeek: 0,
          months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          monthsShort: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        },
        monthBeforeYear: false,
        yearFormat: "YYYY.",
      },
      select: true,
      endDay: "",
      firstDate: "",
      firstWeekOfDay: "",
      lastDate: "",
      lastWeekOfDay: "",
      firstSelectDate: "",
      dateCalc: "",
      space: false,
      tempHide: false,
      tempFirstDate: "",
      tempLastDate: "",
      max: "",
      min: "",
    };
  },
  computed: {
    time() {
      return new Date().getTime();
    },
  },
  watch: {
    reset() {
      this.value = "";
      this.$emit("dayRange", { firstDate: "", lastDate: "", range: "" });
    },
    value(n) {
      if (n !== "") {
        this.firstDate = n[0].substr(0, 10);
        this.lastDate = n[1].substr(0, 10);
        this.firstWeekOfDay = dayOfWeek(this.firstDate);
        this.lastWeekOfDay = dayOfWeek(this.lastDate);
        this.$emit("dayRange", { firstDate: this.firstDate, lastDate: this.lastDate, range: this.dateCalc });
      }
    },
    month() {
      var regex = /[^0-9]/g;
      var result = this.month.replace(regex, "");
      const today = new Date();
      let setDate1 = today.setDate(today.getDate() + 7);
      let startDay = new Date(setDate1).toISOString().substr(0, 10);
      let setDate2 = today.setDate(today.getDate() + 30 * result);
      let endDay = new Date(setDate2).toISOString().substr(0, 10);
      this.firstDate = startDay;
      this.lastDate = endDay;
      let valueArray = [startDay, endDay];
      this.value = valueArray;
    },
    disabledDay() {
      this.basicSet();
    },
  },
  mounted() {
    this.basicSet();
  },
  methods: {
    basicSet() {
      setTimeout(() => {
        if (this.today !== "") {
          if (this.disabledDay === 6) {
            this.value = [this.$date().add(7, "day").format("YYYY-MM-DD"), this.$date().add(8, "day").format("YYYY-MM-DD")];
            this.dateCalc = betweenDay(this.$date().add(7, "day").format("YYYYMMDD"), this.$date().add(8, "day").format("YYYYMMDD"));
          } else {
            this.value = [this.$date().add(14, "day").format("YYYY-MM-DD"), this.$date().add(15, "day").format("YYYY-MM-DD")];
            this.dateCalc = betweenDay(this.$date().add(14, "day").format("YYYYMMDD"), this.$date().add(15, "day").format("YYYYMMDD"));
          }
          setTimeout(() => {
            const td = document.querySelectorAll(".mx-date-row td");
            td.forEach(ele => {
              if (ele.getAttribute("title") === this.value[0]) {
                ele.classList.add("start");
              }
              if (ele.getAttribute("title") === this.value[1]) {
                ele.classList.add("end");
              }
            });
          }, 120);
        }
      }, 1000);
    },
    disabledRange(date) {
      let today = new Date();
      let disableDay = today.setDate(today.getDate() + this.disabledDay);
      let endDay = new Date(disableDay).toISOString().substr(0, 10);
      if (this.select === false) {
        return (date > new Date(today) && date < new Date(endDay)) || date < new Date(this.firstSelectDate);
      } else {
        return (date > new Date(today) && date < new Date(endDay)) || date < new Date(today);
      }
    },
    handlePick(data) {
      if (this.tempFirstDate !== "" && this.tempLastDate !== "") {
        const td = document.querySelectorAll(".mx-date-row td");
        td.forEach(ele => {
          ele.classList.remove("end");
        });
        this.tempFirstDate = "";
        this.tempLastDate = "";
      }
      this.tempFirstDate === "" ? (this.tempFirstDate = this.$date(data).format("YYYY-MM-DD")) : (this.tempLastDate = this.$date(data).format("YYYY-MM-DD"));
      if (this.tempLastDate !== "") {
        if (this.tempFirstDate > this.tempLastDate) {
          this.max = this.tempFirstDate;
          this.min = this.tempLastDate;
        } else {
          this.min = this.tempFirstDate;
          this.max = this.tempLastDate;
        }
        setTimeout(() => {
          const td = document.querySelectorAll(".mx-date-row td");
          td.forEach(ele => {
            if (ele.getAttribute("title") === this.min) {
              ele.classList.add("start");
            }
            if (ele.getAttribute("title") === this.max) {
              ele.classList.add("end");
            }
          });
        }, 100);
        if (this.tempFirstDate === this.tempLastDate) {
          setTimeout(() => {
            const td = document.querySelectorAll(".mx-date-row td");
            td.forEach(ele => {
              ele.classList.remove("start");
              ele.classList.remove("end");
            });
          }, 120);
        }
      }
      this.select = !this.select;
      if (this.select === false) {
        this.tempHide = true;
        this.firstSelectDate = data;
        let first = data.toISOString().substr(0, 10);
        let tDate = new Date(first);
        let dates = tDate.setDate(tDate.getDate() + 30);
        this.endDay = new Date(dates).toISOString().substr(0, 10);
      } else {
        this.tempHide = false;
        let startDay = this.value[0].replace(/\-/g, "");
        let endDay = this.value[1].replace(/\-/g, "");
        let calc = betweenDay(startDay, endDay); //날짜 차이 계산
        if (this.adRange === true) {
          if (calc > 90) {
            this.value = "";
            alert(this.$t("alert-t9"));
            setTimeout(() => {
              const td = document.querySelectorAll(".mx-date-row td");
              td.forEach(ele => {
                ele.classList.remove("start");
                ele.classList.remove("end");
              });
            }, 120);
          } else {
            this.dateCalc = calc;
          }
        } else {
          this.dateCalc = calc;
        }
        this.space = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
//date picker
.calendar-relative::v-deep {
  &.mx-datepicker-main {
    color: #333 !important;
    box-shadow: none !important;
  }
  & .mx-calendar {
    width: 525px !important;
    padding: 6px 12px;
    & .mx-calendar-header {
      margin-top: 30px;
      height: 80px !important;
      & .mx-btn {
        color: #333333 !important;
        & i {
          margin-top: 5px;
          &:before {
            position: relative;
            left: 4px;
            width: 14px !important;
            height: 14px !important;
          }
          &:after {
            position: relative;
            left: -4px;
            width: 14px !important;
            height: 14px !important;
          }
        }
      }
      & .mx-btn-icon-double-left {
        color: #bdbdbd !important;
      }
      & .mx-btn-icon-left {
        color: #bdbdbd !important;
      }
      & .mx-btn-icon-double-right {
        color: #bdbdbd !important;
      }
      & .mx-btn-icon-right {
        position: relative;
        left: -10px;
        color: #bdbdbd !important;
      }
      & .mx-calendar-header-label {
        & .mx-btn {
          position: relative;
          top: -5px;
          @include Montserrat(3.5, 700, #333333);
        }
      }
    }
    & .mx-calendar-content {
      height: auto !important;
      & .mx-table {
        & th {
          @include Montserrat(1.5, 500, #333333);
          height: 40px;
          width: 40px;
        }
        & td {
          @include Montserrat(1.5, 500, #828282);
          height: 50px;
          position: relative;

          &:hover {
            background: none !important;
            &:before {
              content: "";
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              height: 40px;
              background: rgba(241, 92, 92, 0.1) !important;
              transform: translateY(-50%);
            }
            &.active {
              background: none !important;
              color: #fff !important;
              &:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #ff4d56 !important;
                transform: translate(-50%, -50%);
                z-index: 9;
              }
            }
            &.today {
              color: #333333 !important;
              position: relative;
              &:before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #f2f2f2 !important;
                transform: translate(-50%, -50%);
                z-index: 9;
              }
              &.not-current-month {
                height: 0 !important;
                &:before {
                  background: none !important;
                }
              }
            }
          }
          &.disabled {
            background: none !important;
            color: #e0e0e0 !important;
            &:hover {
              &:before {
                background: none !important;
              }
            }
          }
          &.not-current-month {
            font-size: 0px !important;
            height: 0 !important;
            &:hover {
              &:before {
                background: none !important;
              }
            }
          }
          &.today {
            color: #333333 !important;
            position: relative;
            &:before {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: #f2f2f2 !important;
              transform: translate(-50%, -50%);
              z-index: 9;
            }
            &:hover {
              &:before {
                background: #f2f2f2 !important;
              }
            }
            &.not-current-month {
              &:before {
                background: none !important;
              }
            }
          }
          &.active {
            background: none !important;
            color: #fff !important;
            &:before {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background: #ff4d56 !important;
              transform: translate(-50%, -50%);
              z-index: 9;
            }
          }
          &.in-range,
          &.hover-in-range {
            background: none !important;
            &:after {
              content: "";
              position: absolute;
              top: 50%;
              left: 0;
              width: 100%;
              height: 40px;
              background: rgba(241, 92, 92, 0.1) !important;
              transform: translateY(-50%);
              z-index: 8;
            }
            &.not-current-month {
              & div {
                display: none;
              }
              &:after {
                background: none !important;
              }
            }
          }
          & > div {
            position: relative;
            z-index: 10;
          }
          &.start {
            &:after {
              content: "";
              position: absolute;
              top: 50%;
              left: 50%;
              width: 50%;
              height: 40px;
              background: rgba(241, 92, 92, 0.1) !important;
              transform: translateY(-50%);
              z-index: 7;
            }
          }
          &.end {
            &:after {
              content: "";
              position: absolute;
              top: 50%;
              left: 0%;
              width: 50%;
              height: 40px;
              background: rgba(241, 92, 92, 0.1) !important;
              transform: translateY(-50%);
              z-index: 7;
            }
          }
          &.not-current-month {
            &:after {
              background: none !important;
            }
          }
        }
      }
      & .mx-table-date {
        & .not-current-month {
          & > div {
            display: none;
          }
        }
      }
    }
  }
}
.calendar-relative::v-deep {
  position: relative;
  & .mx-datepicker {
    & input {
      width: 1110px;
      border: 0;
      background: transparent;
      box-shadow: none;
      font-size: 0;
    }
  }
  & .calendar-wrap {
    display: flex;
    width: 1051px;
    & .start {
      width: 50%;
      border-bottom: 2px solid #333333;
    }
    & .start-selected {
      width: 50%;
      border-bottom: 2px solid #ff4d56;
    }
    & .end {
      width: 50%;
      border-bottom: 2px solid #333333;
    }
    & .subject {
      @include NotoSans(1.5, 700, #4f4f4f);
    }
    & .date-result {
      margin-top: 10px;
      & .choice {
        @include NotoSans(2, 400, #bdbdbd);
      }
      & .last {
        display: flex;
        justify-content: space-between;
      }
      & .result {
        @include Montserrat(2, 600, #ff4d56);
        margin-bottom: 5px;
        & span {
          @include NotoSans(2, 700, #ff4d56);
        }
      }
      & .result-end {
        @include Montserrat(2, 600, #333333);
        margin-bottom: 5px;
        & span {
          @include NotoSans(2, 700, #333333);
        }
      }
    }
  }
}
.space {
  height: 462px;
}
</style>
