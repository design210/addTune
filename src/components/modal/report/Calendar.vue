<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2 class="center">{{ $t("modal-calendar-title") }}</h2>
    </template>
    <template slot="body">
      <div class="report-call-day-wrap">
        <div class="info">
          {{ $t("modal-calendar-report") }}<span>{{ $t("report-total-last") }} : {{ updateTime }}</span>
        </div>
        <ul class="tabs-calendar mt15">
          <li @click="history(1)" class="set">{{ $t("modal-calendar-last1") }}</li>
          <li @click="history(7)" v-show="totalDataDay >= 7" class="set">{{ $t("modal-calendar-last7") }}</li>
          <li v-show="totalDataDay < 7" class="disabled">{{ $t("modal-calendar-last7") }}</li>
          <li @click="history(30)" v-show="totalDataDay >= 30" class="set">{{ $t("modal-calendar-last30") }}</li>
          <li v-show="totalDataDay < 30" class="disabled">{{ $t("modal-calendar-last30") }}</li>
          <li @click="allDay" class="set all-time">{{ $t("modal-calendar-all") }}</li>
        </ul>
        <div class="calendar-relative mt40">
          <div class="calendar-wrap">
            <div :class="[select ? 'start-selected' : 'start']">
              <div class="subject">{{ $t("buyAd-calendar-start") }}</div>
              <div class="date-result">
                <span class="choice" v-if="value.length === 0 || tempHide === true">{{ $t("buyAd-calendar-select") }}</span>
                <span class="result red" v-else
                  >{{ firstDate.substr(0, 4) }}. {{ firstDate.substr(5, 2) }}. {{ firstDate.substr(8, 2) }} <span>{{ firstWeekOfDay }}</span></span
                >
              </div>
            </div>
            <div class="end">
              <div class="subject">{{ $t("buyAd-calendar-end") }}</div>
              <div class="date-result">
                <span class="choice" v-if="value.length === 0 || tempHide === true">{{ $t("buyAd-calendar-select") }}</span>
                <span v-else class="last">
                  <span class="result"
                    >{{ lastDate.substr(0, 4) }}. {{ lastDate.substr(5, 2) }}. {{ lastDate.substr(8, 2) }} <span>{{ lastWeekOfDay }}</span></span
                  >
                  <span class="result"
                    >{{ dateCalc }}<span>{{ $t("common-unit-day") }}</span></span
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
            @pick="handlePick"
            popup-class="ad-date-picker"
            :disabled-date="disabledRange"
          ></date-picker>
          <div class="btn-group mt30">
            <button @click="apply" class="btn">{{ $t("button-apply") }}</button>
          </div>
        </div>
      </div>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import betweenDay from "@/utils/betweenDay";
import "vue2-datepicker/index.css";
import DatePicker from "vue2-datepicker";
import { dayOfWeek } from "@/utils/dayOfWeek";

export default {
  components: {
    modalWrap,
    DatePicker,
  },
  props: ["startDate", "endDate", "updateTime", "rangeStartDay", "rangeEndDay", "startOriginDate"],
  data() {
    return {
      today: this.$date().format("YYYY-MM-DD"),
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
      disabledDay: 6,
      firstDate: "",
      firstWeekOfDay: "",
      lastDate: "",
      lastWeekOfDay: "",
      dateCalc: "",
      tempHide: false,
      tempFirstDate: "",
      tempLastDate: "",
      max: "",
      min: "",
      yesterday: "",
      before7: "",
      before30: "",
      updateTimefix: "",
      totalDataDay: null,
    };
  },
  computed: {
    time() {
      return new Date().getTime();
    },
  },
  watch: {
    value(n) {
      if (n !== "") {
        this.firstDate = n[0].substr(0, 10);
        this.lastDate = n[1].substr(0, 10);
        this.firstWeekOfDay = dayOfWeek(this.firstDate);
        this.lastWeekOfDay = dayOfWeek(this.lastDate);
        this.$emit("dayRange", { firstDate: this.firstDate, lastDate: this.lastDate, range: this.dateCalc });
      }
    },
  },
  mounted() {
    const calendar = document.querySelectorAll(".tabs-calendar .set");
    calendar.forEach(ele => {
      ele.addEventListener("click", () => {
        calendar.forEach(ele => ele.classList.remove("active"));
        ele.classList.add("active");
      });
    });
    if (this.startDate === this.rangeEndDay) {
      setTimeout(() => {
        const start = document.querySelectorAll(".mx-date-row td");
        const end = document.querySelectorAll(".mx-date-row td");
        start.forEach(ele => ele.classList.remove("start"));
        end.forEach(ele => ele.classList.remove("end"));
      }, 120);
    }
    this.rangeEndDay < this.updateTime ? (this.updateTimefix = this.rangeEndDay) : (this.updateTimefix = this.updateTime);
    this.yesterday = this.$date().subtract(1, "day").format("YYYY-MM-DD");
    this.$date(this.updateTimefix).subtract(6, "day").format("YYYY-MM-DD") < this.startOriginDate
      ? (this.before7 = this.startOriginDate)
      : (this.before7 = this.$date(this.updateTimefix).subtract(6, "day").format("YYYY-MM-DD"));

    this.$date(this.updateTimefix).subtract(29, "day").format("YYYY-MM-DD") < this.startOriginDate
      ? (this.before30 = this.startOriginDate)
      : (this.before30 = this.$date(this.updateTimefix).subtract(29, "day").format("YYYY-MM-DD"));

    this.value = [this.startDate, this.endDate];
    setTimeout(() => {
      const td = document.querySelectorAll(".mx-date-row td");
      td.forEach(ele => {
        if (ele.getAttribute("title") === this.startDate) {
          ele.classList.add("start");
        }
        if (ele.getAttribute("title") === this.endDate) {
          ele.classList.add("end");
        }
      });
    }, 100);

    if (this.startDate === this.startOriginDate && this.endDate === this.updateTimefix) {
      document.querySelector(".all-time").classList.add("active");
    }
    this.dateRangeCalc();
    this.totalDataDay = this.dateCalc;
  },
  methods: {
    //초기 기간 선택 설정
    disabledRange(date) {
      let startday = this.$date(this.rangeStartDay).subtract(1, "day").format("YYYY-MM-DD");
      let yesterday = this.$date(this.rangeEndDay).format("YYYY-MM-DD");
      return date < new Date(startday) || date > new Date(yesterday);
    },
    close() {
      this.$emit("close");
    },
    apply() {
      if (this.lastDate !== "") {
        this.$attrs.update({ startDate: this.firstDate, endDate: this.lastDate });
      }
      this.close();
    },
    handlePick(data) {
      const list = document.querySelectorAll(".tabs-calendar li");
      list.forEach(ele => ele.classList.remove("active"));
      if (this.tempFirstDate !== "" && this.tempLastDate !== "") {
        const td = document.querySelectorAll(".mx-date-row td");
        td.forEach(ele => ele.classList.remove("end"));
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
      } else {
        this.tempHide = false;
        this.dateRangeCalc();
      }
    },
    dateRangeCalc() {
      let startDay = this.value[0].replace(/\-/g, "");
      let endDay = this.value[1].replace(/\-/g, "");
      let calc = betweenDay(startDay, endDay); //날짜 차이 계산
      this.dateCalc = calc;
    },
    history(day) {
      if (day === 1) {
        this.value = [this.updateTimefix, this.updateTimefix];
        const td = document.querySelectorAll(".mx-date-row td");
        td.forEach(ele => {
          ele.classList.remove("start");
          ele.classList.remove("end");
        });
      }
      if (day === 7) {
        if (this.before7 <= this.updateTimefix) {
          this.value = [this.before7, this.updateTimefix];
        }
        setTimeout(() => {
          const td = document.querySelectorAll(".mx-date-row td");
          td.forEach(ele => {
            if (ele.getAttribute("title") === this.before7) {
              ele.classList.add("start");
            }
            if (ele.getAttribute("title") === this.updateTimefix) {
              ele.classList.add("end");
            }
          });
        }, 100);
      }
      if (day === 30) {
        if (this.before30 <= this.updateTimefix) {
          this.value = [this.before30, this.updateTimefix];
        }
        setTimeout(() => {
          const td = document.querySelectorAll(".mx-date-row td");
          td.forEach(ele => {
            if (ele.getAttribute("title") === this.before30) {
              ele.classList.add("start");
            }
            if (ele.getAttribute("title") === this.updateTimefix) {
              ele.classList.add("end");
            }
          });
        }, 100);
      }
      this.dateRangeCalc();
    },
    allDay() {
      this.value = [this.startOriginDate, this.updateTimefix];
      setTimeout(() => {
        const td = document.querySelectorAll(".mx-date-row td");
        td.forEach(ele => {
          if (ele.getAttribute("title") === this.startOriginDate) {
            ele.classList.add("start");
          }
          if (ele.getAttribute("title") === this.updateTimefix) {
            ele.classList.add("end");
          }
        });
      }, 100);
    },
  },
};
</script>

<style lang="scss">
.report-call-day-wrap {
  & .btn-group {
    text-align: center;
    & .btn {
      width: 250px;
      height: 70px;
      padding: 0 50px;
      @include NotoSans(2.7, 700, #fff);
      background: #ff4d56;
    }
  }

  & h2 {
    text-align: center;
    @include NotoSans(3, 700, #333333);
  }
  & .info {
    text-align: center;
    @include NotoSans(1.4, 500, #4f4f4f);
    & span {
      font-weight: 700 !important;
      margin-left: 10px;
    }
  }
  & .tabs-calendar {
    display: flex;
    width: 80%;
    margin: 0 auto;
    & li {
      @include NotoSans(1.4, 400, #828282);
      text-align: center;
      width: 25%;
      border: 1px solid #e0e0e0;
      height: 45px;
      line-height: 44px !important;
      margin-left: -1px;
      position: relative;
      z-index: 1;
      cursor: pointer;
      &.active {
        background-color: #ff4d56;
        color: #fff !important;
        font-weight: 700;
        border: 1px solid #ff4d56;
        z-index: 3;
      }
      &.disabled {
        border: 1px solid #bdbdbd;
        background-color: #f2f2f2;
        color: #828282 !important;
        font-weight: 400;
        z-index: 2;
      }
    }
  }
  & .calendar-relative {
    &.mx-datepicker-main {
      color: #333 !important;
      box-shadow: none !important;
    }
    & .mx-calendar {
      width: 424px !important;

      & .mx-calendar-header {
        margin-top: 30px;
        height: 80px !important;
        & .mx-btn {
          color: #333333 !important;
          & i {
            margin-top: 5px;
            &:before {
              width: 14px !important;
              height: 14px !important;
            }
            &:after {
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
                  &:after {
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
  & .calendar-relative {
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
          @include Montserrat(2, 600, #333333);
          & span {
            @include NotoSans(2, 700, #333333);
          }
          &.red {
            color: #ff4d56 !important;
            & span {
              color: #ff4d56 !important;
            }
          }
        }
      }
    }
  }
}
</style>
