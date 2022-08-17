<template>
  <div>
    <div class="sub-wrapper pt100 mb150" v-if="loginStatus === true && campaignListLength === true">
      <section class="campaign">
        <section class="campaign-header">
          <h1 @click="campaignShowHide">
            {{ campaignName }}
            <i><img src="@/assets/images/arrow_down.png" alt="" :class="{ active: campaignData.campaignShow }" /></i>
          </h1>
          <ul v-show="campaignData.campaignShow">
            <li
              class="campaign-list"
              v-for="item in campaignData.data"
              :key="item.buyAdvertisingProductSid"
              @click="campaignSelect({ sid: item.buyAdvertisingProductSid, name: item.buyAdvertisingCampaignName, status: item.buyAdvertisingStatus })"
            >
              <i
                :class="{
                  before: item.buyAdvertisingStatus === 'SYS21C10B002',
                  ing: item.buyAdvertisingStatus === 'SYS21C10B003',
                  after: item.buyAdvertisingStatus === 'SYS21C10B004',
                  cancel: item.buyAdvertisingStatus === 'SYS21C10B005',
                }"
                >{{ item.buyAdvertisingStatusName }}</i
              >
              {{ item.buyAdvertisingCampaignName }}
            </li>
          </ul>
        </section>
        <button type="button" @click="__showModalTemplate(require('@/components/modal/report/CampaignInfo'), { sid: buyAdvertisingProductSid, name: campaignName }, 1200)">
          {{ $t("report-total-view") }}
        </button>
      </section>
      <section v-if="campaignData.today > buyAdvertisingProductStartDate && latestUpdatedTimeImmutability > buyAdvertisingProductStartDate">
        <section class="infomation mt50">
          <ul class="tabs">
            <li :class="{ active: summaryData.summaryShow }" @click="summaryToggle">{{ $t("report-total-summary") }}</li>
            <li :class="{ active: summaryData.storeShow }" @click="storeToggle">{{ $t("report-total-store") }}</li>
          </ul>
          <!-- 요약 정보 -->
          <section class="summary mt23" v-show="summaryData.summaryShow">
            <section class="search">
              <div>
                <span class="subject">{{ $t("report-total-range") }}</span>
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
                          startOriginDate: campaignData.startDayOrigin,
                        },
                        1000,
                      )
                    "
                    ><img src="@/assets/images/arrow_down_xs.png" alt="" /></i
                ></span>
              </div>
              <div class="btn-group">
                <span @click="reportDownload"
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
                          <span class="tooltip"
                            ><h2>{{ $t("report-total-sendRange") }}</h2>
                            <span v-html="$t('report-total-sendInfo')"></span
                          ></span>
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
                  <div class="info-body">
                    <div>
                      <div class="subject">{{ $t("report-total-dayExposure") }}</div>
                      <div>
                        <span class="num">{{ summaryData.summary.exposureCountByDay !== undefined ? parseInt(summaryData.summary.exposureCountByDay.toFixed(0)).toLocaleString() : 0 }}</span>
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
                        <span class="num">{{ summaryData.summary.exposureTotalCount !== undefined ? parseInt(summaryData.summary.exposureTotalCount.toFixed(0)).toLocaleString() : 0 }}</span>
                        <span class="standard">{{ $t("common-unit-person") }}</span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div class="second mt20">
                <section class="box-xs">
                  <div class="d-flex">
                    <div>
                      <div class="infos">
                        {{ $t("report-total-indices") }}
                        <div>
                          <img src="@/assets/images/info_xs_op.png" alt="" />
                          <div class="tooltip">
                            <h2>{{ $t("report-total-indices") }}</h2>
                            <span v-html="$t('report-total-indicesInfo')"></span>
                            <span class="major" v-html="$t('report-total-indicesMojor')"></span>
                            <span class="gray" v-html="$t('report-total-indicesMojorInfo')"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--										<div class="indices"><i class="up"></i> {{ summaryData.summary.exposureChangeRate }}%</div>-->
                  </div>
                  <div class="data">
                    <span class="num">{{ __localeString(summaryData.summary.exposureIndex) }}</span>
                    <span class="standard">{{ $t("common-unit-number") }}</span>
                  </div>
                </section>
                <section class="box-xs">
                  <div class="d-flex">
                    <div>
                      <div class="infos">
                        {{ $t("report-total-traffic") }}
                        <div>
                          <img src="@/assets/images/info_xs_op.png" alt="" />
                          <div class="tooltip">
                            <h2>{{ $t("report-total-traffic") }}</h2>
                            <span v-html="$t('report-total-trafficInfo')"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="indices" v-if="summaryData.summary.trafficChangeRate !== null">
                      <i :class="[summaryData.summary.trafficChangeRate > 0 ? 'up' : 'down']"></i>
                      {{ __localeString(summaryData.summary.trafficChangeRate) }}%
                    </div>
                  </div>
                  <div class="data">
                    <span class="num">{{ __localeString(summaryData.summary.trafficTotalCount) }}</span>
                    <span class="standard">{{ $t("common-unit-person") }}</span>
                  </div>
                </section>
                <section class="box-xs">
                  <div class="d-flex">
                    <div>
                      <div class="infos">
                        {{ $t("report-total-visit") }}
                        <div>
                          <img src="@/assets/images/info_xs_op.png" alt="" />
                          <div class="tooltip">
                            <h2>{{ $t("report-total-visit") }}</h2>
                            <span v-html="$t('report-total-visitInfo')"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="indices" v-if="summaryData.summary.stayChangeRate !== null">
                      <i :class="[summaryData.summary.stayChangeRate > 0 ? 'up' : 'down']"></i>
                      {{ __localeString(summaryData.summary.stayChangeRate) }}%
                    </div>
                  </div>
                  <div class="data">
                    <span class="num">{{ __localeString(summaryData.summary.stayTotalCount) }}</span>
                    <span class="standard">{{ $t("common-unit-person") }}</span>
                  </div>
                </section>
              </div>
            </section>
          </section>
          <!-- //요약 정보 -->

          <!-- 스토어별 정보 -->
          <section class="store mt23" v-show="summaryData.storeShow">
            <section class="header">
              <div class="d-flex">
                <div
                  class="pop"
                  @click="
                    __showModalTemplate(
                      require('@/components/modal/report/StoreFilter'),
                      {
                        update: filterStore,
                        type: 'type',
                        sid: buyAdvertisingProductSid,
                        setStore: storeType,
                        setStoreName: sectorsNameTemp,
                        areaParentInfo: areaTempWithParent,
                      },
                      1080,
                    )
                  "
                >
                  {{ sectorsName }} {{ sectorsNum }}<i><img src="@/assets/images/arrow_down_xs.png" alt="" /></i>
                </div>
                <div
                  class="pop mr0"
                  @click="
                    __showModalTemplate(
                      require('@/components/modal/report/StoreFilter'),
                      {
                        update: filterStore,
                        type: 'area',
                        sid: buyAdvertisingProductSid,
                        areaParentInfo: areaTempWithParent,
                        setStore: storeType,
                        setStoreName: sectorsNameTemp,
                      },
                      1080,
                    )
                  "
                >
                  {{ areaName }} {{ areaNum }}<i><img src="@/assets/images/arrow_down_xs.png" alt="" /></i>
                </div>
              </div>
              <div class="init">
                <input type="text" :placeholder="$t('report-total-search')" v-model="searchText" @keyup.enter="searchList" />
                <i class="search" @click="searchList"></i>
              </div>
            </section>
            <section class="favor mt110" v-show="favoriteStore.length > 0">
              <h2>{{ $t("report-total-favorite") }}</h2>
              <table class="store-tbl mt44">
                <colgroup>
                  <col width="50" />
                  <col width="300" />
                  <col width="130" />
                  <col width="160" />
                  <col width="*" />
                  <col width="100" />
                </colgroup>
                <tr>
                  <th></th>
                  <th>{{ $t("report-total-storeName") }}</th>
                  <th>{{ $t("report-total-monthTraffic") }}</th>
                  <th>{{ $t("report-total-sectors") }}</th>
                  <th>{{ $t("report-total-address") }}</th>
                  <th></th>
                </tr>
                <tr v-for="(item, index) in storeListData.storeList" :key="item.companyStoreSid">
                  <td v-if="item.favoriteFlag === true">
                    <input type="checkbox" :id="`fav${index}`" :checked="item.favoriteFlag" />
                    <label
                      :for="`fav${index}`"
                      @click="
                        storeFavorite({
                          companyStoreSid: item.companyStoreSid,
                          favoriteFlag: item.favoriteFlag,
                        })
                      "
                    ></label>
                  </td>
                  <td v-if="item.favoriteFlag === true" @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">
                    {{ item.companyStoreName }}
                  </td>
                  <td v-if="item.favoriteFlag === true" @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">
                    <span class="num">{{ parseInt(item.storeAppraisalTrafficAvg).toLocaleString() }}</span>
                  </td>
                  <td v-if="item.favoriteFlag === true" @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">
                    {{ item.companyStoreBusinessTypeName }}
                  </td>
                  <td v-if="item.favoriteFlag === true" @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">
                    {{ item.companyStoreAddress1 }}
                  </td>
                  <td v-if="item.favoriteFlag === true" @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">
                    <button class="detail-view">
                      {{ $t("button-detail") }} <i><img src="@/assets/images/arrow_right_xs.png" alt="" /></i>
                    </button>
                  </td>
                </tr>
              </table>
            </section>
            <section class="all mt110">
              <h2>{{ $t("report-total-total") }}</h2>
              <table class="store-tbl mt44">
                <colgroup>
                  <col width="50" />
                  <col width="300" />
                  <col width="130" />
                  <col width="160" />
                  <col width="*" />
                  <col width="100" />
                </colgroup>
                <tr>
                  <th></th>
                  <th>{{ $t("report-total-storeName") }}</th>
                  <th v-show="sortTraffic === 'DESC'">
                    {{ $t("report-total-high") }} <i class="sort" @click="trafficSort"><img src="@/assets/images/traffic_up.png" alt="" /></i>
                  </th>
                  <th v-show="sortTraffic === 'ASC'">
                    {{ $t("report-total-low") }} <i class="sort" @click="trafficSort"><img src="@/assets/images/traffic_down.png" alt="" /></i>
                  </th>
                  <th>{{ $t("report-total-sectors") }}</th>
                  <th>{{ $t("report-total-address") }}</th>
                  <th></th>
                </tr>
                <tr v-for="(item, index) in storeListData.storeList" :key="item.companyStoreSid">
                  <td>
                    <input type="checkbox" :id="`fav${index}`" :checked="item.favoriteFlag" />
                    <label
                      :for="`fav${index}`"
                      @click="
                        storeFavorite({
                          companyStoreSid: item.companyStoreSid,
                          favoriteFlag: item.favoriteFlag,
                        })
                      "
                    ></label>
                  </td>
                  <td @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">{{ item.companyStoreName }}</td>
                  <td @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">
                    <span class="num">{{ parseInt(item.storeAppraisalTrafficAvg).toLocaleString() }}</span>
                  </td>
                  <td @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">
                    {{ item.companyStoreBusinessTypeName }}
                  </td>
                  <td @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">
                    {{ item.companyStoreAddress1 }}
                  </td>
                  <td @click="detailView({ companyId: item.companyStoreSid, campaignId: buyAdvertisingProductSid })">
                    <button class="detail-view">
                      {{ $t("button-detail") }} <i><img src="@/assets/images/arrow_right_xs.png" alt="" /></i>
                    </button>
                  </td>
                </tr>
              </table>
            </section>
          </section>
          <!-- //스토어별 정보 -->

          <!-- 통행량 그래프 -->
          <section class="graph graph-line mt190" v-show="summaryData.summaryShow">
            <div class="title" v-show="summaryData.trafficTab === 1">
              {{ $t("common-unit-total") }}
              <span>{{ summaryData.traffic.trafficTotalCount !== undefined ? summaryData.traffic.trafficTotalCount.toLocaleString() : summaryData.traffic.trafficTotalCount }}</span
              >{{ $t("report-total-pass") }}
            </div>
            <div class="title" v-show="summaryData.trafficTab === 2">
              {{ $t("common-unit-total") }}
              <span>{{ __localeString(summaryData.stay.stayTotalCount) }}</span
              >{{ $t("report-total-stay") }}
            </div>
            <div class="comment" v-show="summaryData.trafficTab === 1">
              <div v-if="summaryData.traffic.trafficChangeRate !== null">
                {{ summaryData.traffic.searchDays }}{{ $t("report-total-compare") }} {{ __localeString(summaryData.traffic.trafficChangeRate) }}%
                {{ summaryData.traffic.trafficChangeRate > 0 ? $t("common-unit-plus") : $t("common-unit-minus") }}{{ $t("report-total-end") }}
              </div>
            </div>
            <div class="comment" v-show="summaryData.trafficTab === 2">
              <div v-if="summaryData.stay.stayChangeRate !== null">
                {{ summaryData.stay.searchDays }}{{ $t("report-total-compare") }} {{ __localeString(summaryData.stay.stayChangeRate) }}%
                {{ summaryData.stay.stayChangeRate > 0 ? $t("common-unit-plus") : $t("common-unit-minus") }}{{ $t("report-total-end") }}
              </div>
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
                >{{ $t("common-unit-hour") }}
              </div>
              <div class="data mt16 mb60" v-show="summaryData.timeTab === 2">
                <span>{{ summaryData.day.bestDay }}</span>
              </div>
              <div class="y">({{ $t("common-unit-person") }})</div>
              <div class="x">({{ $t("common-unit-hour") }})</div>
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
                      {{ __localeString(summaryData.gender.genderData.male.count) }}
                      <span>{{ $t("common-unit-person") }}</span>
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

          <!-- 스토어 현황 그래프 -->
          <section class="graph graph-store mt150" v-show="summaryData.summaryShow">
            <div class="title">
              {{ $t("report-total-select") }} <span>{{ summaryData.storeGraph.count }}</span
              >{{ $t("report-total-storeState") }}
            </div>
            <div class="d-flex">
              <div class="divide4 pr10">
                <div class="wraps mt44 pr47 pl47 pt48 pb67">
                  <h2>{{ $t("report-total-sectorsType") }}</h2>
                  <div class="data-wrap d-flex mt30">
                    <pie-sector :data="summaryData.storeGraph.typeData" :width="185" :height="185"></pie-sector>
                    <ul class="list">
                      <li v-for="item in summaryData.storeGraph.type" :key="item.name">
                        <span class="per">{{ item.percent }}%</span>
                        <span class="store">{{ item.name }}</span>
                        <span class="num">{{ item.count }}{{ $t("common-unit-amount") }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="divide4 pl10">
                <div class="wraps mt44 pr47 pl47 pt48 pb67">
                  <h2>{{ $t("report-total-areaType") }}</h2>
                  <div class="data-wrap d-flex mt30">
                    <pie-sector :data="summaryData.storeGraph.areaData" :width="185" :height="185"></pie-sector>
                    <ul class="list">
                      <li v-for="item in summaryData.storeGraph.area" :key="item.name">
                        <span class="per">{{ item.percent }}%</span>
                        <span class="store">{{ item.name }}</span>
                        <span class="num">{{ item.count }}{{ $t("common-unit-amount") }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="d-flex mt20">
              <div class="divide4 pr10">
                <div class="wraps pr47 pl47 pt48 pb67">
                  <h2>{{ $t("report-total-size") }}</h2>
                  <div class="data-wrap mt30">
                    <div class="inch">(inch)</div>
                    <ul class="vertical-graph">
                      <li v-for="(item, index) in summaryData.storeGraph.size" :key="index" :class="{ first: item.align === 'first', second: item.align === 'second' }">
                        <span class="label">{{ item.maxSize }}</span>
                        <span class="bar-graph">
                          <span class="percent" :style="{ width: `${item.percent}%` }"> </span>
                        </span>
                        <span class="num">{{ item.count }}{{ $t("common-unit-amount") }}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="divide4 pl10">
                <div class="wraps pr0 pl5 pt48 pb67">
                  <h2 class="pl40">{{ $t("report-total-sendTime") }}</h2>
                  <div class="data-wrap d-flex mt30">
                    <bar-chart-age :labels="summaryData.storeGraph.time.labels" :data="summaryData.storeGraph.time.data" :height="300" :width="500"></bar-chart-age>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <!-- //스토어 현황 그래프 -->
        </section>
      </section>
      <!-- 집형전일 경우 -->
      <section class="d-day mt55" v-else>
        <div v-if="buyAdvertisingProductStartDate !== ''">
          <div class="name" v-if="dDay !== 0">{{ campaignName }} {{ $t("report-total-dday") }}</div>
          <div class="count mt10" v-if="dDay > 0">
            <span v-if="dDay === 1">D-DAY</span>
            <span v-else-if="dDay > 1">D-{{ dDay - 1 }}</span>
          </div>
          <div v-if="dDay === 0" class="center"><img src="@/assets/images/report_ready.png" alt="" /></div>
          <div class="infos mt20" v-if="dDay !== 0" v-html="$t('report-total-wait1')"></div>
          <div class="infos mt20" v-else-if="dDay === 0">
            <div v-html="$t('report-total-wait2')"></div>
            <div class="update">{{ $t("report-total-last") }}:{{ summaryData.updatedate }}</div>
          </div>
        </div>
      </section>
      <!-- //집형전일 경우 -->
    </div>
    <!-- 로그인 전 -->
    <div class="sub-wrapper pt100 mb150 login-before" v-if="loginStatus === false || campaignListLength === false">
      <h2>{{ $t("report-total-ad") }}</h2>
      <div class="img-wrap"><img src="@/assets/images/report.svg" alt="광고 구매하고 효과 측정하기" @click="$router.push('/ad/adMain')" /></div>
      <div class="help mt30">
        <span @click="__showModalTemplate(require('@/components/modal/report/Help'), { date: summaryData.updatedate }, 1000)">{{ $t("report-total-data") }}</span>
      </div>
    </div>
    <!-- //로그인 전 -->
  </div>
</template>

<script>
import localeString from "@/mixins/localeString";
import { getCampaignSidCookie, deleteCookie } from "@/utils/cookie";
import { ref, watch, reactive, computed, onMounted, getCurrentInstance } from "@vue/composition-api";
import roundNumber from "@/utils/toFixed";
import showModal from "@/mixins/showModal";
import LineChartPass from "@/components/chart/LineChartPass";
import BarChartPass from "@/components/chart/BarChartPass";
import DoughnutChart from "@/components/chart/DoughnutChart";
import BarChartAge from "@/components/chart/BarChartAge";
import PieSector from "@/components/chart/PieSector";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import { dayJsWeek } from "@/utils/dayOfWeek";
import { getAccessTokenCookie } from "@/utils/cookie";
import betweenDay from "@/utils/betweenDay";
import axios from "axios";
export default {
  metaInfo() {
    return {
      title: "리포트｜옥외광고 성과 리포트 보기",
      meta: [
        {
          vmid: "description",
          name: "description",
          content: "빅데이터 기반의 옥외 광고 성과 분석 리포트를 제공해요. 옥외광고를 감으로 하는 시대는 이제 끝!",
        },
        {
          vmid: "keywords",
          name: "keywords",
          content: "애드튠,  ADDTUNE, 옥외광고, 옥외광고 성과측정, 디지털옥외광고, 옥외광고물, 지역광고, 전국광고, 택시광고, 버스광고, 지하철광고, 튠, 채널튠, TUNE, 디지털사이니지, 인터브리드",
        },
      ],
    };
  },
  components: {
    PieSector,
    LineChartPass,
    BarChartPass,
    DoughnutChart,
    BarChartAge,
  },
  mixins: [showModal, loading, localeString],
  setup() {
    return {
      ...campaigns(),
      ...summary(),
      ...storeList(),
    };
  },
};
//캠페인
function campaigns() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const campaignName = ref("");
  const buyAdvertisingProductSid = ref("");
  const buyAdvertisingProductStartDate = ref("");
  const buyAdvertisingProductEndDate = ref("");
  const buyAdvertisingStatus = ref("");
  const latestUpdatedTime = ref("");
  const latestUpdatedTimeImmutability = ref("");
  const loginStatus = ref(true);
  const campaignListLength = ref(true);
  const dDay = ref(null);
  const rangeStartDay = ref("");
  const rangeEndDay = ref("");
  const campaignData = reactive({
    today: _this.$date().format("YYYY-MM-DD"),
    updateDate: "",
    latestUpdatedTimeTemp: "",
    campaignShow: false,
    data: [],
    startDayOrigin: "",
  });
  //
  watch(buyAdvertisingProductStartDate, () => {
    if (campaignData.today < buyAdvertisingProductStartDate.value) {
      dDay.value = betweenDay(_this.$date().format("YYYYMMDD"), _this.$date(buyAdvertisingProductStartDate.value).format("YYYYMMDD"));
    } else {
      dDay.value = 0;
    }
  });
  const getCampaignList = computed(() => _this.$store.getters["report/getCampaignList"]);
  onMounted(async () => {
    getAccessTokenCookie() ? (loginStatus.value = true) : (loginStatus.value = false);
    if (loginStatus.value === false) {
      return false;
    } else {
      try {
        await _this.$store.dispatch("report/CAMPAIGN_LIST");
        const campaignListData = getCampaignList.value.addtuneApiResult;
        campaignListData.campaignList.data.length === 0 ? (campaignListLength.value = false) : (campaignListLength.value = true);
        if (campaignListLength.value !== false) {
          if (campaignListData.errorCode === 200) {
            let tempValue = {
              buyAdvertisingProductStartDate: "1",
              buyAdvertisingProductEndDate: "1",
              buyAdvertisingCampaignName: "",
              buyAdvertisingProductSid: "",
              buyAdvertisingStatus: "",
            };
            if (getCampaignSidCookie() !== null) {
              const tempSid = parseInt(getCampaignSidCookie());
              campaignListData.campaignList.data.forEach(ele => {
                if (ele.buyAdvertisingProductSid === tempSid) {
                  tempValue.buyAdvertisingProductStartDate = ele.buyAdvertisingProductStartDate;
                  tempValue.buyAdvertisingProductEndDate = ele.buyAdvertisingProductEndDate;
                  tempValue.buyAdvertisingCampaignName = ele.buyAdvertisingCampaignName;
                  tempValue.buyAdvertisingProductSid = ele.buyAdvertisingProductSid;
                }
              });
              campaignData.startDayOrigin = tempValue.buyAdvertisingProductStartDate;
              buyAdvertisingProductStartDate.value = tempValue.buyAdvertisingProductStartDate;
              buyAdvertisingProductEndDate.value = tempValue.buyAdvertisingProductEndDate;
              rangeStartDay.value = tempValue.buyAdvertisingProductStartDate;
              campaignName.value = tempValue.buyAdvertisingCampaignName;
              _this.$route.params.id !== undefined ? (buyAdvertisingProductSid.value = _this.$route.params.id) : (buyAdvertisingProductSid.value = tempValue.buyAdvertisingProductSid);
              buyAdvertisingStatus.value = tempValue.buyAdvertisingStatus;
              deleteCookie("campaignSid");
              _this.summaryData.summaryShow = false;
              _this.summaryData.storeShow = true;
            } else {
              campaignData.startDayOrigin = campaignListData.campaignList.data[0].buyAdvertisingProductStartDate;
              buyAdvertisingProductStartDate.value = campaignListData.campaignList.data[0].buyAdvertisingProductStartDate;
              buyAdvertisingProductEndDate.value = campaignListData.campaignList.data[0].buyAdvertisingProductEndDate;
              rangeStartDay.value = campaignListData.campaignList.data[0].buyAdvertisingProductStartDate;
              campaignName.value = campaignListData.campaignList.data[0].buyAdvertisingCampaignName;
              _this.$route.params.id !== undefined
                ? (buyAdvertisingProductSid.value = _this.$route.params.id)
                : (buyAdvertisingProductSid.value = campaignListData.campaignList.data[0].buyAdvertisingProductSid);
              buyAdvertisingStatus.value = campaignListData.campaignList.data[0].buyAdvertisingStatus;
            }
            //추가 로직
            latestUpdatedTimeImmutability.value = campaignListData.campaignList.latestUpdatedTime;
            if (buyAdvertisingProductEndDate.value < latestUpdatedTimeImmutability.value) {
              latestUpdatedTime.value = buyAdvertisingProductEndDate.value;
              rangeEndDay.value = buyAdvertisingProductEndDate.value;
            } else {
              latestUpdatedTime.value = latestUpdatedTimeImmutability.value;
              rangeEndDay.value = latestUpdatedTimeImmutability.value;
            }
            campaignData.data = campaignListData.campaignList.data;
          } else {
            alert(campaignListData.errorMessage);
          }
          _this.reload();
          _this.reloadStore();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  const campaignShowHide = () => {
    campaignData.campaignShow = !campaignData.campaignShow;
  };
  const campaignSelect = data => {
    campaignName.value = data.name;
    buyAdvertisingProductSid.value = data.sid;
    campaignData.campaignShow = false;
    let selectCampaignDate = campaignData.data.find(value => value.buyAdvertisingProductSid === data.sid);
    campaignData.startDayOrigin = selectCampaignDate.buyAdvertisingProductStartDate;
    buyAdvertisingProductStartDate.value = selectCampaignDate.buyAdvertisingProductStartDate;
    rangeStartDay.value = selectCampaignDate.buyAdvertisingProductStartDate;
    buyAdvertisingProductEndDate.value = selectCampaignDate.buyAdvertisingProductEndDate;
    if (buyAdvertisingProductEndDate.value < latestUpdatedTimeImmutability.value) {
      latestUpdatedTime.value = buyAdvertisingProductEndDate.value;
      rangeEndDay.value = buyAdvertisingProductEndDate.value;
    } else {
      latestUpdatedTime.value = latestUpdatedTimeImmutability.value;
      rangeEndDay.value = latestUpdatedTimeImmutability.value;
    }
    buyAdvertisingStatus.value = data.status;
    _this.reload();
    _this.reloadStore();
    _this.summaryData.summaryShow = true;
    _this.summaryData.storeShow = false;
  };
  return {
    campaignShowHide,
    campaignData,
    campaignListLength,
    campaignSelect,
    campaignName,
    buyAdvertisingProductSid,
    buyAdvertisingProductStartDate,
    latestUpdatedTime,
    loginStatus,
    buyAdvertisingStatus,
    dDay,
    buyAdvertisingProductEndDate,
    latestUpdatedTimeImmutability,
    rangeStartDay,
    rangeEndDay,
  };
}
//스토어 리스트 : 즐겨찾기, 전체
function storeList() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const favoriteStore = ref([]);
  const storeArea = ref("");
  const storeType = ref("");
  const searchText = ref("");
  const sortTraffic = ref("DESC");
  const sectorsName = ref(_this.$t("report-total-sectors"));
  const sectorsNum = ref(null);
  const sectorsNameTemp = ref([]);
  const areaName = ref(_this.$t("report-total-area"));
  const areaNum = ref(null);
  const areaTempWithParent = ref([]);
  const storeListData = reactive({
    storeList: [],
  });
  const storeListAll = computed(() => _this.$store.getters["report/getStoreList"]);
  const reloadStore = async () => {
    try {
      await _this.$store.dispatch("report/STORE_LIST", {
        storeArea: storeArea.value,
        storeType: storeType.value,
        searchText: searchText.value,
        sortTraffic: sortTraffic.value,
        id: _this.buyAdvertisingProductSid,
      });
      const storeData = storeListAll.value.addtuneApiResult;
      if (storeData.errorCode === 200) {
        storeListData.storeList = storeData.report.data;
        favoriteStore.value = storeListData.storeList.filter(ele => ele.favoriteFlag === "Y");
        storeListData.storeList.forEach(ele => {
          // if (ele.storeAppraisalTrafficAvg > 10000) {
          //   ele.storeAppraisalTrafficAvg = `${roundNumber(ele.storeAppraisalTrafficAvg / 10000, 0)} 만`;
          // } else {
          //   ele.storeAppraisalTrafficAvg = Math.round(ele.storeAppraisalTrafficAvg);
          // }
          ele.favoriteFlag === "Y" ? (ele.favoriteFlag = true) : (ele.favoriteFlag = false);
        });
      } else {
        alert(storeData.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const favoriteResult = computed(() => _this.$store.getters["report/setStoreFavorite"]);
  const storeFavorite = async data => {
    data.favoriteFlag === true ? (data.favoriteFlag = "N") : (data.favoriteFlag = "Y");
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("report/STORE_FAVORITE", {
        companyStoreSid: data.companyStoreSid,
        favoriteFlag: data.favoriteFlag,
        id: _this.buyAdvertisingProductSid,
      });
      if (favoriteResult.value.addtuneApiResult.errorCode === 200) {
        reloadStore();
      } else {
        alert(favoriteResult.value.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  };
  const searchList = () => {
    reloadStore();
  };
  const trafficSort = () => {
    sortTraffic.value === "DESC" ? (sortTraffic.value = "ASC") : (sortTraffic.value = "DESC");
    reloadStore();
  };
  const filterStore = data => {
    if (data.area.length > 0) {
      let num = data.area.length - 1;
      num > 0 ? (areaNum.value = `+${num}`) : (areaNum.value = null);
      areaName.value = data.area[0].name;
      let storeAreaTemp = [];
      let parentWithTemp = [];
      data.area.forEach(ele => {
        storeAreaTemp.push(ele.guCode);
        parentWithTemp.push({
          si: ele.siCode,
          gu: ele.guCode,
          guName: ele.name,
        });
      });
      storeArea.value = storeAreaTemp.join(",");
      areaTempWithParent.value = parentWithTemp;
    } else {
      storeArea.value = "";
      areaTempWithParent.value = [];
      areaName.value = "지역";
      areaNum.value = null;
      storeArea.value = "";
    }
    if (data.storeCode.length > 0) {
      let num = data.storeCode.length - 1;
      num > 0 ? (sectorsNum.value = `+${num}`) : (sectorsNum.value = null);
      sectorsName.value = data.storeName[0];
      sectorsNameTemp.value = data.storeName;
      storeType.value = data.storeCode.join(",");
    } else {
      sectorsName.value = _this.$t("report-total-sectors");
      sectorsNum.value = null;
      storeType.value = "";
    }
    reloadStore();
  };
  const detailView = data =>
    _this.$router.push(`/report/detail/${data.campaignId}/${data.companyId}/${_this.buyAdvertisingProductStartDate}/${_this.latestUpdatedTime}/${_this.latestUpdatedTimeImmutability}`);
  return {
    storeArea,
    storeType,
    searchText,
    storeListData,
    sortTraffic,
    sectorsName,
    sectorsNum,
    areaName,
    areaNum,
    sectorsNameTemp,
    areaTempWithParent,
    favoriteStore,
    storeFavorite,
    searchList,
    trafficSort,
    filterStore,
    reloadStore,
    detailView,
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
    updatedate: "",
  });
  const getReportAll = computed(() => _this.$store.getters["report/getReportAll"]);
  const getReportUpdateDate = computed(() => _this.$store.getters["report/getReportUpdateDate"]);
  onMounted(async () => {
    try {
      await _this.$store.dispatch("report/REPORT_UPDATE_DATE");
      if (getReportUpdateDate.value.addtuneApiResult.errorCode === 200) {
        summaryData.updatedate = getReportUpdateDate.value.addtuneApiResult.latestUpdatedDate;
      } else {
        alert(getReportUpdateDate.value.addtuneApiResult.errorMessage);
      }
      _this.reload();
    } catch (error) {
      console.log(error);
    }
  });
  const reload = async () => {
    if (_this.campaignData.today > _this.buyAdvertisingProductStartDate && _this.latestUpdatedTimeImmutability > _this.buyAdvertisingProductStartDate) {
      try {
        bus.$emit("start:spinner");
        await _this.$store.dispatch("report/REPORT_ALL", {
          id: _this.buyAdvertisingProductSid,
          searchStartDate: _this.$date(_this.buyAdvertisingProductStartDate).format("YYYY-MM-DD"),
          searchEndDate: _this.$date(_this.latestUpdatedTime).format("YYYY-MM-DD"),
          companyStoreSid: "",
        });
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
          summaryData.storeGraph.count = reportData.report.storeGraph.count;
          reportData.report.storeGraph.time.forEach(ele => {
            summaryData.storeGraph.time.labels.push(`${ele.maxTime}시간 이하`);
            summaryData.storeGraph.time.data.push(ele.count);
          });
          reportData.report.storeGraph.type.forEach(ele => {
            summaryData.storeGraph.type.push({ name: ele.name, count: ele.count.toLocaleString(), percent: Math.floor(ele.percent) });
            summaryData.storeGraph.typeData.push(Math.floor(ele.percent));
          });
          reportData.report.storeGraph.area.forEach(ele => {
            summaryData.storeGraph.area.push({ name: ele.name, count: ele.count.toLocaleString(), percent: Math.floor(ele.percent) });
            summaryData.storeGraph.areaData.push(Math.floor(ele.percent));
          });
          reportData.report.storeGraph.size.forEach(ele => {
            ele.maxSize === "over110" ? (ele.maxSize = "110 이상") : (ele.maxSize = `${ele.maxSize} 이하`);
            summaryData.storeGraph.size.push({ maxSize: ele.maxSize, count: ele.count.toLocaleString(), percent: Math.floor(ele.percent) });
            summaryData.storeGraph.sizeData.push(Math.floor(ele.percent));
          });
          //높은값 순차 index 찾기
          const origin = summaryData.storeGraph.sizeData.concat();
          const index = [];
          const calc = function (arr) {
            for (let i = 0; i < arr.length; i++) {
              let max = Math.max.apply(null, arr);
              let indexCalc = arr.indexOf(max);
              index.push(indexCalc);
              origin[indexCalc] = -1;
            }
          };
          calc(origin);
          summaryData.storeGraph.size[index[0]].align = "first";
          summaryData.storeGraph.size[index[1]].align = "second";
          for (let i = 2; i < index.length; i++) {
            summaryData.storeGraph.size[index[i]].align = "etc";
          }
        } else {
          alert(reportData.errorMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    }
  };
  const summaryToggle = () => {
    summaryData.summaryShow = true;
    summaryData.storeShow = false;
    _this.reload();
  };
  const storeToggle = () => {
    summaryData.storeShow = true;
    summaryData.summaryShow = false;
    _this.reload();
  };
  const updateDate = date => {
    _this.buyAdvertisingProductStartDate = date.startDate;
    _this.latestUpdatedTime = date.endDate;
    _this.reload();
  };
  const reportDownload = async () => {
    try {
      bus.$emit("start:spinner");
      //리포트 다운로드
      const startDate = _this.$date(_this.buyAdvertisingProductStartDate).format("YYYY-MM-DD");
      const endDate = _this.$date(_this.latestUpdatedTime).format("YYYY-MM-DD");
      await axios({
        method: "get",
        url: `${process.env.VUE_APP_API}/report/campaign/${_this.buyAdvertisingProductSid}/summary/download?searchStartDate=${startDate}&searchEndDate=${endDate}`,
        responseType: "arraybuffer",
      }).then(res => {
        var file = new Blob([res.data], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = `애드튠 ${_this.campaignName} 리포트_${_this.buyAdvertisingProductStartDate}-${_this.latestUpdatedTime}.pdf`;
        link.click();
      });
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  };
  return { summaryData, summaryToggle, storeToggle, updateDate, reload, reportDownload };
}
</script>

<style lang="scss" scoped>
.d-day {
  & .name {
    @include NotoSans(1.8, 400, #4f4f4f);
    text-align: center;
  }
  & .update {
    @include NotoSans(1.8, 400, #ff4d56);
    margin-top: 5px;
  }
  & .count {
    background: url("../../assets/images/dday.png") no-repeat;
    width: 413px;
    height: 264px;
    margin: 0 auto;
    position: relative;
    & span {
      position: absolute;
      left: 0;
      top: 80px;
      width: 100%;
      text-align: center;
      @include Montserrat(8, 600, #4f4f4f);
    }
  }
  & .infos {
    @include NotoSans(1.8, 400, #4f4f4f);
    text-align: center;
    & span {
      font-weight: 700 !important;
    }
  }
}
.login-before {
  & h2 {
    text-align: center;
    @include NotoSans(3, 700, #4f4f4f);
  }
  & .img-wrap {
    text-align: center;
    & img {
      cursor: pointer;
    }
  }
  & .help {
    text-align: center;
    & span {
      cursor: pointer;
      @include NotoSans(1.5, 500, #828282);
      text-decoration: underline;
    }
  }
}
.store {
  & .header {
    display: flex;
    justify-content: space-between;
    & .pop {
      margin-right: 6px;
      @include Montserrat(1.7, 500, #828282);
      background: #f2f2f2;
      height: 50px;
      line-height: 50px !important;
      padding: 0 25px;
      border-radius: 25px;
      cursor: pointer;
      & i {
        margin-left: 13px;

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
        top: 12px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        background: url("../../assets/images/search-icon.png") no-repeat;
        background-size: 100%;
      }
    }
  }
  & .favor {
    & h2 {
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
    & h2 {
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
    & h1 {
      @include NotoSans(3, 700, #333333);
      cursor: pointer;
      &.title {
        @include NotoSans(3, 700, #333333);
        cursor: pointer;
      }
      & i {
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
      max-height: 370px;
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
          }
        }
      }
      & .infos {
        display: inline-block;
        @include NotoSans(1.8, 500, #4f4f4f);
        & > div {
          position: relative;
          margin-left: 5px;
          cursor: pointer;
          display: inline-block;
          & h2 {
            @include NotoSans(1.4, 700, #fff);
          }
          & .tooltip {
            display: none;
          }
          &:hover {
            & .tooltip {
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
          vertical-align: -1px;
          margin-left: 5px;
          width: 6px;
          height: 12px;
        }
      }
    }
    & td {
      height: 50px;
      cursor: pointer;
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
