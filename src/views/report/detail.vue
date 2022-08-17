<template>
  <div>
    <div class="sub-wrapper pt100 mb150">
      <section class="campaign justify-space-between d-flex">
        <section class="campaign-header">
          <h1>
            {{ storeData.storeInfo.companyStoreName }}
            <i @click="storeTblToggle"><img src="@/assets/images/arrow_down.png" alt="" :class="{ active: tblToggle }" /></i>
          </h1>
        </section>
        <button type="button" @click="__showModalTemplate(require('@/components/modal/report/CampaignInfo'), { sid: $route.params.campaignId, name: campaignName }, 1200)">
          {{ $t("report-total-view") }}
        </button>
      </section>
      <section>
        <div class="tbl-wrap mt30" :class="{ active: tblToggle }">
          <table>
            <colgroup>
              <col width="150" />
              <col width="*" />
            </colgroup>
            <tr>
              <td>{{ $t("report-detail-storeLocation") }}</td>
              <td>{{ storeData.storeInfo.companyStoreAddress1 }} {{ storeData.storeInfo.companyStoreAddress2 }}</td>
            </tr>
            <tr>
              <td>{{ $t("report-detail-monthTraffic") }}</td>
              <td>
                {{ storeData.storeInfo.storeAppraisalTrafficAvg !== undefined ? `${__localeString(parseInt(storeData.storeInfo.storeAppraisalTrafficAvg))} 명` : "" }}
              </td>
            </tr>
            <tr>
              <td>{{ $t("report-detail-monthStay") }}</td>
              <td>
                {{ storeData.storeInfo.storeAppraisalStayAvg !== undefined ? `${__localeString(parseInt(storeData.storeInfo.storeAppraisalStayAvg))} 명` : "" }}
              </td>
            </tr>
            <tr>
              <td>{{ $t("report-detail-displaySize") }}</td>
              <td>{{ storeData.storeInfo.companyStoreBillboardSize }} inch</td>
            </tr>
          </table>
        </div>
        <div class="add-line" v-show="!tblToggle"></div>
      </section>
      <section class="infomation mt40">
        <!-- 요약 정보 -->
        <section class="summary mt23" v-show="summaryData.summaryShow">
          <section class="search">
            <div>
              <span class="subject">{{ $t("report-detail-range") }}</span>
              <span class="range"
                >{{ buyAdvertisingProductStartDate }} ~ {{ latestUpdatedTime }}
                <i
                  @click="
                    __showModalTemplate(
                      require('@/components/modal/report/Calendar'),
                      {
                        update: updateDate,
                        startDate: buyAdvertisingProductStartDate,
                        endDate: latestUpdatedTime,
                        updateTime: latestUpdatedTimeImmutability,
                        rangeStartDay: rangeStartDay,
                        rangeEndDay: rangeEndDay,
                      },
                      1000,
                    )
                  "
                  ><img src="@/assets/images/arrow_down_xs.png" alt="" /></i
              ></span>
            </div>
            <div class="btn-group">
              <span @click="makePDF"
                ><i><img src="@/assets/images/download_xs.png" alt="" /></i> {{ $t("report-total-download") }}</span
              >
              <span @click="__showModalTemplate(require('@/components/modal/report/Help'), {}, 1000)"
                ><i><img src="@/assets/images/question.png" alt="" /></i> {{ $t("report-total-help") }}</span
              >
            </div>
          </section>
          <section class="info-grid mt80">
            <div class="first">
              <section class="box">
                <div class="haeder">
                  <div class="pos">
                    <div class="infos">
                      {{ $t("report-total-sendRange") }}
                      <div>
                        <img src="@/assets/images/info_xs_op.png" alt="" />
                        <div class="tooltip">
                          <h2>{{ $t("report-total-sendRange") }}</h2>
                          <span v-html="$t('report-total-sendInfo')"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span class="num">{{ summaryData.summary.displayFrequency !== undefined ? summaryData.summary.displayFrequency.toFixed(2) : "" }}</span>
                    <span class="standard ml10">{{ $t("report-total-minute") }}</span>
                  </div>
                </div>
                <div class="info-body">
                  <div>
                    <div class="subject">{{ $t("report-total-day") }}</div>
                    <div>
                      <span class="num">
                        {{ __localeString(summaryData.summary.displayCountByDay) }}
                      </span>
                      <span class="standard">{{ $t("common-unit-number") }}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div class="infos">
                        {{ $t("report-total-totalSend") }}
                        <div>
                          <img src="@/assets/images/info_xs_op.png" alt="" />
                          <div class="tooltip">
                            <h2>{{ $t("report-total-totalSend") }}</h2>
                            <span v-html="$t('report-total-totalSendInfo')"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span class="num">
                        {{ __localeString(summaryData.summary.displayTotalCount) }}
                      </span>
                      <span class="standard">{{ $t("common-unit-number") }}</span>
                    </div>
                  </div>
                </div>
              </section>
              <section class="box">
                <div class="haeder">
                  <div class="pos">
                    <div class="infos">
                      {{ $t("report-total-exposure") }}
                      <div>
                        <img src="@/assets/images/info_xs_op.png" alt="" />
                        <div class="tooltip">
                          <h2>{{ $t("report-total-exposure") }}</h2>
                          <span v-html="$t('report-total-exposureInfo')"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <span class="standard">{{ $t("report-total-count") }}</span>
                    <span class="num ml10 mr10">{{ __localeString(summaryData.summary.exposureFrequency) }}</span>
                    <span class="standard">{{ $t("common-unit-person") }}</span>
                  </div>
                </div>
                <div class="info-body column3 justify-space-between">
                  <div>
                    <div class="subject">{{ $t("report-total-dayExposure") }}</div>
                    <div>
                      <span class="num">{{ __localeString(summaryData.summary.exposureCountByDay) }}</span>
                      <span class="standard">{{ $t("common-unit-person") }}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div class="infos">
                        {{ $t("report-total-totalExposure") }}
                        <div>
                          <img src="@/assets/images/info_xs_op.png" alt="" />
                          <div class="tooltip">
                            <h2>{{ $t("report-total-totalExposure") }}</h2>
                            <span v-html="$t('report-total-totalExposureInfo')"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span class="num">{{ __localeString(summaryData.summary.exposureTotalCount) }}</span>
                      <span class="standard">{{ $t("common-unit-person") }}</span>
                    </div>
                  </div>
                  <div>
                    <div>
                      <div class="infos">
                        {{ $t("report-total-indices") }}
                        <div>
                          <img src="@/assets/images/info_xs_op.png" alt="" />
                          <div class="tooltip right-align">
                            <h2>{{ $t("report-total-indices") }}</h2>
                            <span v-html="$t('report-total-indicesInfo')"></span>
                            <span class="major" v-html="$t('report-total-indicesMojor')"></span>
                            <span class="gray" v-html="$t('report-total-indicesMojorInfo')"> </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span class="num">{{ __localeString(summaryData.summary.exposureIndex) }}</span>
                      <span class="standard">{{ $t("common-unit-number") }}</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </section>
        <!-- //요약 정보 -->

        <!-- 통행량 그래프 -->
        <section class="graph graph-line mt190" v-show="summaryData.summaryShow">
          <div class="title" v-show="summaryData.trafficTab === 1">
            {{ $t("common-unit-total") }}
            <span>{{ __localeString(summaryData.traffic.trafficTotalCount) }}</span
            >{{ $t("report-total-pass") }}
          </div>
          <div class="title" v-show="summaryData.trafficTab === 2">
            {{ $t("common-unit-total") }}
            <span>{{ __localeString(summaryData.stay.stayTotalCount) }}</span
            >{{ $t("report-total-stay") }}
          </div>
          <div class="comment" v-show="summaryData.trafficTab === 1">
            {{ summaryData.traffic.searchDays }}{{ $t("report-total-compare") }} {{ __localeString(summaryData.traffic.trafficChangeRate) }}%
            {{ summaryData.traffic.trafficChangeRate > 0 ? $t("common-unit-plus") : $t("common-unit-plus") }}{{ $t("report-total-end") }}
          </div>
          <div class="comment" v-show="summaryData.trafficTab === 2">
            {{ summaryData.stay.searchDays }}{{ $t("report-total-compare") }} {{ __localeString(summaryData.stay.stayChangeRate) }}%
            {{ summaryData.stay.stayChangeRate > 0 ? $t("common-unit-plus") : $t("common-unit-plus") }}{{ $t("report-total-end") }}
          </div>
          <div class="wraps mt44">
            <ul class="tabs tab1">
              <li :class="{ active: summaryData.trafficTab === 1 }" @click="summaryData.trafficTab = 1">{{ $t("report-total-traffic") }}</li>
              <li :class="{ active: summaryData.trafficTab === 2 }" @click="summaryData.trafficTab = 2">{{ $t("report-total-visit") }}</li>
            </ul>
            <div class="data mt16 mb60" v-show="summaryData.trafficTab === 1">
              <span>{{ __localeString(summaryData.traffic.trafficTotalCount) }}</span
              >{{ $t("common-unit-person") }}
            </div>
            <div class="data mt16 mb60" v-show="summaryData.trafficTab === 2">
              <span>{{ __localeString(summaryData.stay.stayTotalCount) }}</span
              >{{ $t("common-unit-person") }}
            </div>
            <div class="y">({{ $t("common-unit-person") }})</div>
            <line-chart-pass
              v-if="summaryData.trafficTab === 1"
              :height="300"
              :date="summaryData.trafficGraphic.trafficDate"
              :before="summaryData.trafficGraphic.trafficBefore"
              :current="summaryData.trafficGraphic.trafficCurrent"
            ></line-chart-pass>
            <line-chart-pass
              v-if="summaryData.trafficTab === 2"
              :height="300"
              :date="summaryData.stayGraphic.stayDate"
              :before="summaryData.stayGraphic.stayBefore"
              :current="summaryData.stayGraphic.stayCurrent"
            ></line-chart-pass>
          </div>
        </section>
        <!-- //통행량 그래프 -->

        <!-- 시간대, 요일별 그래프 -->
        <section class="graph graph-bar mt150" v-show="summaryData.summaryShow">
          <div class="title" v-show="summaryData.timeTab === 1">
            <span>{{ summaryData.time.bestTime.startHour }}~{{ summaryData.time.bestTime.endHour }}</span
            >{{ $t("report-total-timeStay") }}
          </div>
          <div class="title" v-show="summaryData.timeTab === 2">
            <span>{{ summaryData.day.bestDay }}{{ $t("report-total-dayStay") }}</span>
          </div>
          <div class="wraps mt44">
            <ul class="tabs tab2">
              <li :class="{ active: summaryData.timeTab === 1 }" @click="summaryData.timeTab = 1">{{ $t("report-total-times") }}</li>
              <li :class="{ active: summaryData.timeTab === 2 }" @click="summaryData.timeTab = 2">{{ $t("report-total-days") }}</li>
            </ul>
            <div class="data mt16 mb60" v-show="summaryData.timeTab === 1">
              <span>{{ summaryData.time.bestTime.startHour }}~{{ summaryData.time.bestTime.endHour }}</span
              >시
            </div>
            <div class="data mt16 mb60" v-show="summaryData.timeTab === 2">
              <span>{{ summaryData.day.bestDay }}</span>
            </div>
            <div class="y">({{ $t("common-unit-person") }})</div>
            <div class="x" v-show="summaryData.timeTab === 1">({{ $t("common-unit-hour") }})</div>
            <div class="unit">{{ $t("common-unit-visit") }}</div>
            <bar-chart-pass v-if="summaryData.timeTab === 1" :height="300" :label="summaryData.time.dataByTime" :data="summaryData.time.dataByTimeCount"></bar-chart-pass>
            <bar-chart-pass v-if="summaryData.timeTab === 2" :height="300" :label="summaryData.day.dateDay" :data="summaryData.day.dataByDay"></bar-chart-pass>
          </div>
        </section>
        <!-- //시간대, 요일별 그래프 -->

        <!-- 성별, 연령대 그래프 -->
        <section class="graph graph-bar mt150" v-show="summaryData.summaryShow">
          <div class="title">
            {{ $t("report-total-mainly") }} {{ summaryData.gender.bestGender === "female" ? $t("common-sex-female2") : $t("common-sex-male2") }}, <span>{{ summaryData.age.bestAge }}</span
            >{{ $t("report-total-age") }}
          </div>
          <div class="wraps mt44 d-flex">
            <div class="circle">
              <h2>{{ $t("report-total-sex") }}</h2>
              <div class="doughnut mt27"><doughnut-chart :gender="summaryData.gender.genderData"></doughnut-chart></div>
              <div class="sex d-flex mt22" :class="{ desc: summaryData.gender.genderData.female.count < summaryData.gender.genderData.male.count }">
                <div class="female">
                  <p class="percent">{{ summaryData.gender.genderData.female.percent }}%</p>
                  <p class="num">
                    {{ __localeString(summaryData.gender.genderData.female.count) }}
                    <span>{{ $t("common-unit-person") }}</span>
                  </p>
                </div>
                <div class="male">
                  <p class="percent">{{ summaryData.gender.genderData.male.percent }}%</p>
                  <p class="num">
                    {{ __localeString(summaryData.gender.genderData.male.count) }} <span>{{ $t("common-unit-person") }}</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="bar">
              <h2>{{ $t("report-total-ageRange") }}</h2>
              <bar-chart-age :labels="summaryData.age.range" :data="summaryData.age.count"></bar-chart-age>
            </div>
            <div class="unit">{{ $t("common-unit-traffic") }}</div>
          </div>
        </section>
        <!-- //성별, 연령대 그래프 -->
      </section>
    </div>
  </div>
</template>
<script>
import localeString from "@/mixins/localeString";
import { saveCampaignSidCookie } from "@/utils/cookie";
import { ref, reactive, computed, onMounted, getCurrentInstance, onUnmounted } from "@vue/composition-api";
import showModal from "@/mixins/showModal";
import LineChartPass from "@/components/chart/LineChartPass";
import BarChartPass from "@/components/chart/BarChartPass";
import DoughnutChart from "@/components/chart/DoughnutChart";
import BarChartAge from "@/components/chart/BarChartAge";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import { dayJsWeek } from "@/utils/dayOfWeek";
import axios from "axios";
export default {
  components: {
    LineChartPass,
    BarChartPass,
    DoughnutChart,
    BarChartAge,
  },
  mixins: [loading, showModal, localeString],
  setup() {
    return {
      ...campaigns(),
      ...summary(),
      ...storeInfomation(),
      ...Pdf(),
    };
  },
};
//스토어 정보
function storeInfomation() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const tblToggle = ref(false);
  const storeData = reactive({
    storeInfo: {},
    today: _this.$date().format("YYYY-MM-DD"),
  });
  const getStoreInfo = computed(() => _this.$store.getters["report/getStoreInfo"]);
  onMounted(async () => {
    await _this.$store.dispatch("report/STORE_INFO", { campaignId: _this.$route.params.campaignId, companyId: _this.$route.params.companyId });

    if (getStoreInfo.value.addtuneApiResult.errorCode === 200) {
      storeData.storeInfo = getStoreInfo.value.addtuneApiResult.storeInfo;
    } else {
      alert(getStoreInfo.value.addtuneApiResult.errorMessages);
    }
  });
  const storeTblToggle = () => {
    tblToggle.value = !tblToggle.value;
  };
  return { storeData, storeTblToggle, tblToggle };
}
//캠페인
function campaigns() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const campaignName = ref("");
  const buyAdvertisingProductSid = ref("");
  const buyAdvertisingProductStartDate = ref("");
  const latestUpdatedTime = ref("");
  const latestUpdatedTimeImmutability = ref("");
  const rangeStartDay = ref("");
  const rangeEndDay = ref("");
  const campaignData = reactive({
    latestUpdatedTimeTemp: "",
    campaignShow: false,
    data: [],
  });
  const getCampaignList = computed(() => _this.$store.getters["report/getCampaignList"]);
  onMounted(async () => {
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("report/CAMPAIGN_LIST");
      const campaignListData = getCampaignList.value.addtuneApiResult;
      if (campaignListData.errorCode === 200) {
        buyAdvertisingProductStartDate.value = _this.$route.params.startDay;
        rangeStartDay.value = _this.$route.params.startDay;
        latestUpdatedTime.value = _this.$route.params.endDay;
        rangeEndDay.value = _this.$route.params.endDay;
        latestUpdatedTimeImmutability.value = _this.$route.params.lastUpdate;
        campaignData.data = campaignListData.campaignList.data;
        buyAdvertisingProductSid.value = _this.$route.params.campaignId;
      } else {
        alert(campaignListData.errorMessage);
      }
      //뒤로가기 시 캠페인 유지 쿠키
      saveCampaignSidCookie(_this.$route.params.campaignId);
      _this.reload();
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  });
  const campaignShowHide = () => {
    campaignData.campaignShow = !campaignData.campaignShow;
  };
  return {
    campaignShowHide,
    campaignData,
    campaignName,
    buyAdvertisingProductSid,
    buyAdvertisingProductStartDate,
    latestUpdatedTime,
    latestUpdatedTimeImmutability,
    rangeStartDay,
    rangeEndDay,
  };
}
//리포트 요약 정보
function summary() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const summaryData = reactive({
    summaryShow: true,
    storeShow: false,
    trafficTab: 1,
    timeTab: 1,
    summary: {},
    traffic: {},
    trafficGraphic: {
      trafficDate: [],
      trafficBefore: [],
      trafficCurrent: [],
    },
    stay: {},
    stayGraphic: {
      stayDate: [],
      stayBefore: [],
      stayCurrent: [],
    },
    time: {
      bestTime: {},
      dataByTime: [],
      dataByTimeCount: [],
    },
    day: {
      bestDay: "",
      dataByDay: {},
      dateDay: [_this.$t("day-mo"), _this.$t("day-tu"), _this.$t("day-we"), _this.$t("day-th"), _this.$t("day-fr"), _this.$t("day-sa"), _this.$t("day-su")],
    },
    gender: {
      bestGender: "",
      genderData: {
        female: {
          percent: 0,
          count: 0,
        },
        male: {
          percent: 0,
          count: 0,
        },
      },
    },
    age: {
      bestAge: "",
      range: [],
      count: [],
    },
    storeGraph: {
      count: 0,
      time: {
        labels: [],
        data: [],
      },
      type: [],
      typeData: [],
      area: [],
      areaData: [],
      size: [],
      sizeData: [],
      bgColor: [],
    },
    SidTemp: "",
  });
  const getReportAll = computed(() => _this.$store.getters["report/getReportAll"]);
  onMounted(async () => {
    const list = document.querySelectorAll(".infos > div");
    list.forEach(ele => {
      ele.addEventListener("mouseover", () => {
        ele.querySelector(".tooltip").classList.add("active");
      });
    });
    list.forEach(ele => {
      ele.addEventListener("mouseout", () => {
        ele.querySelector(".tooltip").classList.remove("active");
      });
    });
  });
  onUnmounted(() => {
    saveCampaignSidCookie(summaryData.SidTemp);
  });
  const reload = async () => {
    try {
      bus.$emit("start:spinner");
      if (_this.storeData.today > _this.buyAdvertisingProductStartDate && _this.latestUpdatedTime > _this.buyAdvertisingProductStartDate) {
        await _this.$store.dispatch("report/REPORT_ALL", {
          id: _this.buyAdvertisingProductSid,
          searchStartDate: _this.buyAdvertisingProductStartDate,
          searchEndDate: _this.latestUpdatedTime,
          companyStoreSid: _this.$route.params.companyId,
        });
        summaryData.SidTemp = _this.buyAdvertisingProductSid;
        const reportData = getReportAll.value.addtuneApiResult;
        if (reportData.errorCode === 200) {
          //data 초기화
          summaryData.time.dataByTime = [];
          summaryData.time.dataByTimeCount = [];
          summaryData.age.range = [];
          summaryData.age.count = [];
          summaryData.storeGraph.time.labels = [];
          summaryData.storeGraph.time.data = [];
          summaryData.storeGraph.type = [];
          summaryData.storeGraph.typeData = [];
          summaryData.storeGraph.area = [];
          summaryData.storeGraph.areaData = [];
          summaryData.storeGraph.size = [];
          summaryData.storeGraph.sizeData = [];
          summaryData.summary = reportData.report.summary;
          summaryData.traffic = reportData.report.trafficStayGraph.traffic;
          const trafficGraph = reportData.report.trafficStayGraph.traffic.dataByDate; //누적통행량 그래프
          summaryData.trafficGraphic.trafficDate = trafficGraph.map(ele => _this.$date(ele.date).format("MM/DD"));
          summaryData.trafficGraphic.trafficBefore = trafficGraph.map(ele => ele.before);
          summaryData.trafficGraphic.trafficCurrent = trafficGraph.map(ele => ele.current);
          summaryData.stay = reportData.report.trafficStayGraph.stay;
          const stayGraphic = reportData.report.trafficStayGraph.stay.dataByDate; //누적체류량 그래프
          summaryData.stayGraphic.stayDate = stayGraphic.map(ele => _this.$date(ele.date).format("MM/DD"));
          summaryData.stayGraphic.stayBefore = stayGraphic.map(ele => ele.before);
          summaryData.stayGraphic.stayCurrent = stayGraphic.map(ele => ele.current);
          summaryData.time.bestTime = reportData.report.stayGraph.time.bestTime;
          reportData.report.stayGraph.time.dataByTime.forEach(ele => {
            summaryData.time.dataByTime.push(`${ele.startHour} ~ ${ele.endHour}`);
            summaryData.time.dataByTimeCount.push(ele.count);
          });
          summaryData.day.bestDay = dayJsWeek(reportData.report.stayGraph.day.bestDay);
          summaryData.day.dataByDay = Object.values(reportData.report.stayGraph.day.dataByDay);
          summaryData.gender.bestGender = reportData.report.trafficByGenderAndAgeGraph.bestGender;
          summaryData.gender.genderData = reportData.report.trafficByGenderAndAgeGraph.gender;
          summaryData.age.bestAge = reportData.report.trafficByGenderAndAgeGraph.bestAge;
          reportData.report.trafficByGenderAndAgeGraph.age.forEach(ele => {
            summaryData.age.range.push(`${ele.range}대`);
            summaryData.age.count.push(ele.count);
          });
        } else {
          alert(reportData.errorMessage);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  };
  const summaryToggle = () => {
    summaryData.summaryShow = true;
    summaryData.storeShow = false;
  };
  const storeToggle = () => {
    summaryData.storeShow = true;
    summaryData.summaryShow = false;
  };
  const updateDate = date => {
    _this.buyAdvertisingProductStartDate = date.startDate;
    _this.latestUpdatedTime = date.endDate;
    _this.reload();
  };
  return { summaryData, summaryToggle, storeToggle, updateDate, reload };
}

//pdf 출력
function Pdf() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const makePDF = async () => {
    try {
      bus.$emit("start:spinner");
      //리포트 다운로드
      await axios({
        method: "get",
        url: `${process.env.VUE_APP_API}/report/campaign/${_this.buyAdvertisingProductSid}/summary/download?companyStoreSid=${_this.$route.params.companyId}&searchStartDate=${_this.buyAdvertisingProductStartDate}&searchEndDate=${_this.latestUpdatedTime}`,
        responseType: "arraybuffer",
      }).then(res => {
        var file = new Blob([res.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `애드튠 ${_this.storeData.storeInfo.companyStoreName} 리포트_${_this.buyAdvertisingProductStartDate}-${_this.latestUpdatedTime}.pdf`;
        link.click();
      });
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  };
  return { makePDF };
}
</script>

<style lang="scss" scoped>
.pdf {
  position: absolute;
  left: -999999999999px;
  top: -999999999999px;
  padding: 0 40px;
  background: #fff;
  & .subject {
    @include NotoSans(2, 700, #828282);
  }
  & .pdf-subject {
    @include NotoSans(2.5, 400, #4f4f4f);
  }
  & .pdf-range {
    @include Montserrat(2.5, 500, #4f4f4f);
  }
  & .graph-title {
    @include NotoSans(2, 500, #828282);
    text-align: center;
    margin-bottom: 5px;
  }
  & .y {
    top: 140px !important;
  }
  & .box {
    border: 3px solid #e0e0e0 !important;
    box-shadow: none !important;
  }
  & .graph {
    & .wraps {
      border: 3px solid #e0e0e0 !important;
      box-shadow: none !important;
    }
  }
  & .report-info {
    text-align: right;
    @include NotoSans(1.8, 400, #828282);
    & span {
      @include Montserrat(1.7, 500, #828282);
    }
  }
}
.add-line {
  border-top: 1px solid #828282;
}
.tbl-wrap {
  overflow: hidden;
  transition: all 0.5s ease;
  height: 0px;
  & table {
    border-top: 2px solid #ff4d56;
    & tr {
      & td {
        height: 54px;
        border-bottom: 1px solid #dddddd;
        @include NotoSans(1.5, 400, #333333);
        padding-left: 10px;
        &:first-child {
          font-weight: 700 !important;
        }
      }
      &:last-child {
        & td {
          border-bottom: 1px solid #828282;
        }
      }
    }
  }
  &.active {
    height: 218px;
  }
}
.store {
  & .header {
    display: flex;
    justify-content: space-between;
    & .pop {
      margin-right: 23px;
      @include Montserrat(1.7, 500, #828282);
      background: #f2f2f2;
      height: 50px;
      line-height: 50px !important;
      padding: 0 25px;
      border-radius: 25px;
      & i {
        margin-left: 13px;
        cursor: pointer;
        & img {
          vertical-align: 1px;
        }
      }
    }
    & .init {
      width: 400px;
      position: relative;
      & input {
        border: 1px solid #828282 !important;
        height: 47px;
        padding: 0 50px 0 10px;
        border-radius: 5px;
        @include NotoSans(1.5, 400, #828282);
        width: 100%;
      }
      & i {
        position: absolute;
        right: 9px;
        top: 15px;
        width: 15px;
        height: 14px;
        cursor: pointer;
        background: url("../../assets/images/search-icon.png") no-repeat;
      }
    }
  }
  & .favor {
    & h1 {
      @include NotoSans(3, 700, #333333);
      & i {
        cursor: pointer;
        & img {
          vertical-align: 5px;
          margin-left: 20px;
          margin-right: 40px;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  & .all {
    & h1 {
      @include NotoSans(3, 700, #333333);
      & i {
        cursor: pointer;
        & img {
          vertical-align: 5px;
          margin-left: 20px;
          margin-right: 40px;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}
.campaign {
  display: flex;
  & .campaign-header {
    position: relative;
    & h1,
    .title {
      @include NotoSans(3, 700, #333333);
      & i {
        cursor: pointer;
        & img {
          vertical-align: 5px;
          margin-left: 20px;
          margin-right: 40px;
          &.active {
            transform: rotate(180deg);
          }
        }
      }
    }
    & ul {
      border: 1px solid #bdbdbd;
      position: absolute;
      left: 0;
      top: 50px;
      z-index: 10;
      @include boxshadow(4px, 4px, 40px, 0px, rgba(0, 0, 0, 0.1));
      overflow: auto;
      max-height: 200px;
      & li {
        height: 60px;
        padding: 0 25px 0 10px;
        @include NotoSans(1.6, 400, #4f4f4f);
        line-height: 60px !important;
        background: #fff;
        white-space: nowrap;
        cursor: pointer;
        & i {
          font-style: normal;
          display: inline-block;
          text-align: center;
          width: 70px;
          &.ing {
            @include NotoSans(1.4, 700, #ff0000);
          }
          &.after {
            @include NotoSans(1.4, 700, #0047ff);
          }
          &.before {
            @include NotoSans(1.4, 500, #828282);
          }
        }
        &:hover {
          background: #fff6f7;
          font-weight: 700;
        }
      }
    }
  }
  & button {
    @include NotoSans(1.4, 400, #ff4d56);
    background: #ffeeef;
    border-radius: 10px;
    padding: 13px;
    height: 42px;
    line-height: 0px !important;
  }
}
.infomation {
  & .tabs {
    display: flex;
    border-bottom: 2px solid #ff4d56;
    padding-bottom: 22px;
    & li {
      @include NotoSans(1.6, 400, #828282);
      margin-right: 30px;
      cursor: pointer;
      &.active {
        @include NotoSans(1.6, 500, #ff4d56);
      }
    }
  }
  & .summary {
    & .search {
      display: flex;
      justify-content: space-between;
      & .subject {
        @include NotoSans(1.5, 500, #4f4f4f);
      }
      & .range {
        margin-left: 23px;
        @include Montserrat(1.7, 500, #828282);
        background: #f2f2f2;
        height: 50px;
        line-height: 50px !important;
        padding: 0 25px;
        border-radius: 25px;
        & i {
          margin-left: 13px;
          cursor: pointer;
          & img {
            vertical-align: 1px;
          }
        }
      }
      & .btn-group {
        @include NotoSans(1.5, 400, #4f4f4f);
        & span {
          cursor: pointer;
          &:nth-child(1) {
            & img {
              vertical-align: -4px;
            }
          }
          &:nth-child(2) {
            margin-left: 25px;
            & img {
              vertical-align: -4px;
            }
          }
        }
      }
    }
    & .info-grid {
      & .second {
        display: flex;
        justify-content: space-between;
        & .box-xs {
          width: calc(33.33333% - 12px);
          @include boxshadow(4px, 4px, 40px, 0px, rgba(0, 0, 0, 0.1));
          background: #fff;
          border-radius: 20px;
          padding: 25px;
          & .d-flex {
            justify-content: space-between;
            align-items: center;
            & .indices {
              @include Montserrat(1.8, 600, #4f4f4f);
              & i {
                display: inline-block;
                margin-right: 5px;
                &.up {
                  background: url("../../assets/images/up_arrow.png");
                  width: 12px;
                  height: 15px;
                }
                &.down {
                  background: url("../../assets/images/down_arrow.png");
                  width: 12px;
                  height: 15px;
                }
              }
            }
          }
          & .data {
            text-align: right;
            margin-top: 20px;
            & .num {
              @include Montserrat(2.8, 600, #333333);
            }
            & .standard {
              @include NotoSans(2.5, 400, #828282);
              margin-left: 5px;
            }
          }
        }
      }
      & .first {
        display: flex;
        justify-content: space-between;
        & .box {
          width: calc(50% - 12px);
          @include boxshadow(4px, 4px, 40px, 0px, rgba(0, 0, 0, 0.1));
          background: #fff;
          border-radius: 20px;
          padding: 30px;
          & .haeder {
            border-bottom: 1px solid #e0e0e0;
            padding-bottom: 10px;
            margin-bottom: 30px;
            & .num {
              @include Montserrat(4, 600, #333333);
            }
            & .standard {
              @include NotoSans(2.8, 400, #828282);
            }
            & .pos {
              position: relative;
              display: inline-block;
            }
          }
          & .info-body {
            display: flex;
            & > div {
              width: 50%;
              & .subject {
                @include NotoSans(1.4, 400, #4f4f4f);
              }
              & .infos {
                @include NotoSans(1.4, 400, #4f4f4f);
              }
              & .num {
                @include Montserrat(2.3, 600, #333333);
              }
              & .standard {
                @include Montserrat(2, 400, #828282);
                margin-left: 5px;
              }
            }
            &.column3 {
              & > div {
                width: 33.33333%;
              }
            }
          }
        }
      }
      & .infos {
        display: inline-block;
        @include NotoSans(1.8, 500, #4f4f4f);
        & > div {
          display: inline-block;
          position: relative;
          margin-left: 5px;
          cursor: pointer;
          & h2 {
            @include NotoSans(1.4, 700, #fff);
          }
          & .tooltip {
            display: none;
            &.active {
              display: block;
            }
          }
          & img {
            vertical-align: -3px;
          }
          & .tooltip {
            position: absolute;
            left: -30px;
            top: 35px;
            background: #000000;
            @include NotoSans(1.4, 400, #fff);
            white-space: nowrap;
            padding: 20px;
            border-radius: 10px;
            font-style: normal;
            z-index: 10;
            &:after {
              content: "";
              width: 20px;
              height: 20px;
              background: #000;
              transform: rotate(45deg);
              position: absolute;
              top: -5px;
              left: 30px;
            }
            & .gray {
              @include NotoSans(1.4, 400, #bdbdbd);
              display: block;
            }
            & .major {
              @include NotoSans(1.4, 400, #ec5b5c);
              display: block;
            }
            &.right-align {
              left: auto;
              right: -50px;
              &:after {
                left: auto;
                right: 50px;
              }
            }
          }
        }
      }
    }
  }
}
.store-tbl {
  & tr {
    & th {
      border-top: 2px solid #ff4d56;
      border-bottom: 1px solid #828282;
      height: 46px;
      text-align: left;
      @include NotoSans(1.5, 400, #333333);
      & .sort {
        cursor: pointer;
        & img {
          vertical-align: 0px;
          margin-left: 5px;
        }
      }
    }
    & td {
      height: 50px;
      border-bottom: 1px solid #bdbdbd;
      @include NotoSans(1.5, 400, #333333);
      & input[type="checkbox"] {
        position: absolute;
        left: -999999999px;
        & + label {
          margin: 8px 0 0 15px;
          cursor: pointer;
          display: inline-block;
          background: url("../../assets/images/notfav.png") no-repeat;
          width: 22px;
          height: 19px;
        }
        &:checked + label {
          background: url("../../assets/images/fav.png") no-repeat;
        }
      }
      & .detail-view {
        cursor: pointer;
        & img {
          vertical-align: -2px;
          margin-left: 5px;
        }
      }
    }
  }
}
.graph {
  & .title {
    @include NotoSans(3, 700, #4f4f4f);
    & span {
      @include Montserrat(3, 700, #4f4f4f);
    }
  }
  & .comment {
    @include NotoSans(1.9, 400, #4f4f4f);
  }
  & .divide4 {
    width: 50%;
  }
  & .wraps {
    background: #fff;
    @include boxshadow(4px, 4px, 40px, 0px, rgba(0, 0, 0, 0.1));
    border-radius: 30px;
    padding: 35px 90px 75px;
    position: relative;
    & .tabs {
      width: 358px;
      margin: 0 auto;
      height: 55px;
      background: #f2f2f2;
      border-bottom: 0 !important;
      border-radius: 28px;
      padding: 5px !important;
      & li {
        @include NotoSans(1.7, 400, #bdbdbd);
        width: 50%;
        text-align: center;
        line-height: 43px !important;
        margin: 0 !important;
        &.active {
          @include NotoSans(1.7, 500, #4f4f4f);
          background: #fff;
          border-radius: 25px;
          @include boxshadow(4px, 0px, 10px, 0px, rgba(0, 0, 0, 0.1));
        }
      }
    }
    & .data {
      text-align: center;
      @include NotoSans(1.5, 500, #4f4f4f);
      & span {
        @include Montserrat(2.5, 600, #4f4f4f);
      }
    }
    & .y {
      position: absolute;
      @include NotoSans(1.5, 500, #bdbdbd);
      left: 96px;
      top: 169px;
    }
    & .x {
      position: absolute;
      @include NotoSans(1.5, 500, #bdbdbd);
      right: 96px;
      bottom: 83px;
    }
    & .unit {
      position: absolute;
      @include NotoSans(1.4, 500, #828282);
      right: 50px;
      bottom: 55px;
    }
    & .circle {
      width: 40%;
      & h2 {
        @include NotoSans(2.5, 700, #4f4f4f);
      }
      & .doughnut {
        width: 70%;
        margin-left: 30px;
      }
      & .sex {
        & .female {
          padding: 5px 0 0 60px;
          background: url("../../assets/images/female.png") no-repeat left 0 top 10px;
          & .percent {
            @include Montserrat(2.4, 600, #ff8a00);
          }
        }
        & .num {
          margin-top: -6px;
          @include Montserrat(1.8, 500, #4f4f4f);
          & span {
            @include NotoSans(1.7, 400, #4f4f4f);
          }
        }
        & .male {
          padding: 5px 0 0 60px;
          margin-left: 30px;
          background: url("../../assets/images/male.png") no-repeat left 0 top 10px;
          & .percent {
            @include Montserrat(2.4, 600, #25ba00);
          }
        }
        &.desc {
          & .female {
            order: 2;
            margin-left: 30px;
          }
          & .male {
            order: 1;
            margin-left: 0px;
          }
        }
      }
    }
    & .bar {
      padding-left: 50px;
      width: 60%;
      & h2 {
        margin-left: 40px;
        @include NotoSans(2.5, 700, #4f4f4f);
      }
    }
    & .unit {
      bottom: 40px !important;
    }
    & h2 {
      @include NotoSans(2.5, 700, #4f4f4f);
      white-space: nowrap;
    }

    & .data-wrap {
      width: 100%;
      & .list {
        width: 100%;
        margin-left: 25px;
        overflow-y: auto;
        max-height: 178px;
        & li {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          position: relative;
          &:before {
            content: "";
            position: absolute;
            left: 0;
            top: 10px;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #f2f2f2;
          }
          &:nth-child(1) {
            &:before {
              background: #ff4d56;
            }
          }
          &:nth-child(2) {
            &:before {
              background: #ff8f95;
            }
          }
          &:nth-child(3) {
            &:before {
              background: #ffb8bb;
            }
          }
          &:nth-child(4) {
            &:before {
              background: #ffdbdd;
            }
          }
          & .per {
            @include Montserrat(1.6, 600, #4f4f4f);
            width: 60px;
            padding-left: 15px;
          }
          & .store {
            @include NotoSans(1.5, 400, #4f4f4f);
            width: calc(100% - 120px);
          }
          & .num {
            @include NotoSans(1.5, 400, #828282);
            width: 60px;
            text-align: right;
          }
        }
      }
      & .inch {
        @include NotoSans(1.2, 400, #828282);
      }
      & .vertical-graph {
        & li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
          & .label {
            @include NotoSans(1.4, 400, #4f4f4f);
            width: 70px;
          }
          & .bar-graph {
            position: relative;
            height: 30px;
            background: #fafafa;
            border-radius: 7px;
            width: calc(100% - 150px);
            & .percent {
              position: absolute;
              top: 0;
              left: 0;
              width: 0;
              border-radius: 7px;
              height: 30px;
              background: #e0e0e0;
              transition: width 0.3s ease-in-out;
              cursor: pointer;
              & .data {
                position: absolute;
                top: 5px;
                left: 10px;
                @include Montserrat(1.4, 600, #4f4f4f);
                display: none;
              }
              &:hover {
                & .data {
                  display: block;
                }
              }
            }
          }
          & .num {
            @include NotoSans(1.7, 400, #4f4f4f);
            text-align: right;
            width: 80px;
          }
          &.first {
            & .label {
              font-weight: 700 !important;
              color: #ff4d56 !important;
            }
            & .bar-graph {
              & .percent {
                background: #ff4d56;
                & .data {
                  color: #fff !important;
                }
              }
            }
            & .num {
              font-weight: 700 !important;
              color: #ff4d56 !important;
            }
          }
          &.second {
            & .bar-graph {
              & .percent {
                background: #828282;
                & .data {
                  color: #fff !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
