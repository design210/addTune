<template>
  <div class="area-report-select-wrap">
    <section class="area-wrap">
      <section class="all-awap">
        <ul class="first">
          <!--					<li @click="selectArea('SYS21A15B001')">전국({{ totalStore }})</li>-->
          <li v-for="item in categories" :key="item.sysCodeSid" @click="selectArea(item.sysCodeSid)">
            <span>{{ item.sysCodeName }} ({{ item.storeCount }})</span>
          </li>
        </ul>
      </section>
      <section class="select-area-wrap">
        <section class="select">
          <ul v-if="setCode === 'SYS21A15B005'">
            <li>
              <v-checkbox
                v-model="areaTemp[0].area"
                :label="$t('buyAd-area-all-all1')"
                class="area"
                color="error"
                hide-details
                value="SYS21A15B005"
                @change="check({ sysCodeName: $t('buyAd-area-all-all1'), sysCodeSid: 'SYS21A15B005', order: 0, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[0].area"
                :disabled="areaTemp[0].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone1') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 0 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A15B001'">
            <li>
              <v-checkbox
                v-model="areaTemp[1].area"
                :label="$t('buyAd-area-all-all2')"
                class="area"
                color="error"
                hide-details
                value="SYS21A15B001"
                @change="check({ sysCodeName: $t('buyAd-area-all-all2'), sysCodeSid: 'SYS21A15B001', order: 1, disabled: true })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A18B001'">
            <li>
              <v-checkbox
                v-model="areaTemp[2].area"
                :label="$t('buyAd-area-all-all3')"
                class="area"
                color="error"
                hide-details
                value="SYS21A18B001"
                @change="check({ sysCodeName: $t('buyAd-area-all-all3'), sysCodeSid: 'SYS21A18B001', order: 2, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[2].area"
                :disabled="areaTemp[2].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone2') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 2 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21B22B001'">
            <li>
              <v-checkbox
                v-model="areaTemp[3].area"
                :label="$t('buyAd-area-all-all4')"
                class="area"
                color="error"
                hide-details
                value="SYS21B22B001"
                @change="check({ sysCodeName: $t('buyAd-area-all-all4'), sysCodeSid: 'SYS21B22B001', order: 3, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[3].area"
                :disabled="areaTemp[3].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone3') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 3 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21B22B003'">
            <li>
              <v-checkbox
                v-model="areaTemp[4].area"
                :label="$t('buyAd-area-all-all5')"
                class="area"
                color="error"
                hide-details
                value="SYS21B22B003"
                @change="check({ sysCodeName: $t('buyAd-area-all-all5'), sysCodeSid: 'SYS21B22B003', order: 4, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[4].area"
                :disabled="areaTemp[4].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone4') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 4 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21B22B006'">
            <li>
              <v-checkbox
                v-model="areaTemp[5].area"
                :label="$t('buyAd-area-all-all6')"
                class="area"
                color="error"
                hide-details
                value="SYS21B22B006"
                @change="check({ sysCodeName: $t('buyAd-area-all-all6'), sysCodeSid: 'SYS21B22B006', order: 5, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[5].area"
                :disabled="areaTemp[5].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone5') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 5 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A19B021'">
            <li>
              <v-checkbox
                v-model="areaTemp[6].area"
                :label="$t('buyAd-area-all-all7')"
                class="area"
                color="error"
                hide-details
                value="SYS21A19B021"
                @change="check({ sysCodeName: $t('buyAd-area-all-all7'), sysCodeSid: 'SYS21A19B021', order: 6, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[6].area"
                :disabled="areaTemp[6].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone6') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 6 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A19B014'">
            <li>
              <v-checkbox
                v-model="areaTemp[7].area"
                :label="$t('buyAd-area-all-all8')"
                class="area"
                color="error"
                hide-details
                value="SYS21A19B014"
                @change="check({ sysCodeName: $t('buyAd-area-all-all8'), sysCodeSid: 'SYS21A19B014', order: 7, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[7].area"
                :disabled="areaTemp[7].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone7') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 7 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21B15B001'">
            <li>
              <v-checkbox
                v-model="areaTemp[8].area"
                :label="$t('buyAd-area-all-all9')"
                class="area"
                color="error"
                hide-details
                value="SYS21B15B001"
                @change="check({ sysCodeName: $t('buyAd-area-all-all9'), sysCodeSid: 'SYS21B15B001', order: 8, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[8].area"
                :disabled="areaTemp[8].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone8') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 8 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A18B005'">
            <li>
              <v-checkbox
                v-model="areaTemp[9].area"
                :label="$t('buyAd-area-all-all10')"
                class="area"
                color="error"
                hide-details
                value="SYS21A18B005"
                @change="check({ sysCodeName: $t('buyAd-area-all-all10'), sysCodeSid: 'SYS21A18B005', order: 9, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[9].area"
                :disabled="areaTemp[9].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone9') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 9 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A25B022'">
            <li>
              <v-checkbox
                v-model="areaTemp[10].area"
                :label="$t('buyAd-area-all-all11')"
                class="area"
                color="error"
                hide-details
                value="SYS21A25B022"
                @change="check({ sysCodeName: $t('buyAd-area-all-all11'), sysCodeSid: 'SYS21A25B022', order: 10, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[10].area"
                :disabled="areaTemp[10].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone10') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 10 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21B22B009'">
            <li>
              <v-checkbox
                v-model="areaTemp[11].area"
                :label="$t('buyAd-area-all-all12')"
                class="area"
                color="error"
                hide-details
                value="SYS21B22B009"
                @change="check({ sysCodeName: $t('buyAd-area-all-all12'), sysCodeSid: 'SYS21B22B009', order: 11, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[11].area"
                :disabled="areaTemp[11].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone11') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 11 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21B22B012'">
            <li>
              <v-checkbox
                v-model="areaTemp[12].area"
                :label="$t('buyAd-area-all-all13')"
                class="area"
                color="error"
                hide-details
                value="SYS21B22B012"
                @change="check({ sysCodeName: $t('buyAd-area-all-all13'), sysCodeSid: 'SYS21B22B012', order: 12, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[12].area"
                :disabled="areaTemp[12].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone12') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 12 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A19B006'">
            <li>
              <v-checkbox
                v-model="areaTemp[13].area"
                :label="$t('buyAd-area-all-all14')"
                class="area"
                color="error"
                hide-details
                value="SYS21A19B006"
                @change="check({ sysCodeName: $t('buyAd-area-all-all14'), sysCodeSid: 'SYS21A19B006', order: 13, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[13].area"
                :disabled="areaTemp[13].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone13') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 13 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A19B003'">
            <li>
              <v-checkbox
                v-model="areaTemp[14].area"
                :label="$t('buyAd-area-all-all15')"
                class="area"
                color="error"
                hide-details
                value="SYS21A19B003"
                @change="check({ sysCodeName: $t('buyAd-area-all-all15'), sysCodeSid: 'SYS21A19B003', order: 14, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[14].area"
                :disabled="areaTemp[14].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone14') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 14 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A19B030'">
            <li>
              <v-checkbox
                v-model="areaTemp[15].area"
                :label="$t('buyAd-area-all-all16')"
                class="area"
                color="error"
                hide-details
                value="SYS21A19B030"
                @change="check({ sysCodeName: $t('buyAd-area-all-all16'), sysCodeSid: 'SYS21A19B030', order: 15, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[15].area"
                :disabled="areaTemp[15].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone15') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 15 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21B22B015'">
            <li>
              <v-checkbox
                v-model="areaTemp[16].area"
                :label="$t('buyAd-area-all-all17')"
                class="area"
                color="error"
                hide-details
                value="SYS21B22B015"
                @change="check({ sysCodeName: $t('buyAd-area-all-all17'), sysCodeSid: 'SYS21B22B015', order: 16, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[16].area"
                :disabled="areaTemp[16].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone16') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 16 })"
              ></v-checkbox>
            </li>
          </ul>
          <ul v-if="setCode === 'SYS21A29B039'">
            <li>
              <v-checkbox
                v-model="areaTemp[17].area"
                :label="$t('buyAd-area-all-all18')"
                class="area"
                color="error"
                hide-details
                value="SYS21A29B039"
                @change="check({ sysCodeName: $t('buyAd-area-all-all18'), sysCodeSid: 'SYS21A29B039', order: 17, disabled: true })"
              ></v-checkbox>
            </li>
            <li v-for="item in list" :key="item.sysCodeSid">
              <v-checkbox
                v-model="areaTemp[17].area"
                :disabled="areaTemp[17].disabled"
                :label="item.sysCodeName"
                :value="item.sysCodeSid"
                class="area"
                color="error"
                hide-details
                @change="check({ sysCodeName: $t('buyAd-area-zone-zone17') + ' ' + item.sysCodeName, sysCodeSid: item.sysCodeSid, order: 17 })"
              ></v-checkbox>
            </li>
          </ul>
        </section>
      </section>
    </section>
    <section class="area-chip-wrap mt20">
      <ul>
        <li v-for="item in chip" :key="item.sysCodeSid">
          <span class="aera">{{ item.sysCodeName }}</span>
          <span><img alt="삭제" src="@/assets/images/chip_del.png" @click="deleteZoneChip({ sysCodeName: item.sysCodeName, sysCodeSid: item.sysCodeSid, order: item.order, si: setCode })" /></span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["sid", "reset", "parentInfo"],
  data() {
    return {
      //지역
      totalStore: "",
      categories: [],
      list: [],
      //areaSelect: [],
      setCode: "",
      areaTemp: [
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
        { area: [], disabled: false, siCode: "" },
      ],
      chip: [],
    };
  },
  computed: {
    ...mapGetters("report", ["setAera"]),
  },
  watch: {
    reset() {
      document.querySelector(".all-awap li").classList.remove("active");
      this.totalStore = "";
      this.list = [];
      this.setCode = "";
      this.chip = [];
      this.finalData = [];
      for (let i = 0; i < this.areaTemp.length; i++) {
        this.areaTemp[i].area = [];
        this.areaTemp[i].disabled = false;
      }
    },
    chip(data) {
      this.$emit("area", data);
    },
  },
  async created() {
    //왼쪽 카테고리
    try {
      await this.$store.dispatch("report/STORE_AREA", { id: this.sid });
      if (this.setAera.addtuneApiResult.errorCode == 200) {
        const areaList = this.setAera.addtuneApiResult;
        let count = null;
        if (areaList.errorCode == 200) {
          this.categories = areaList.report;
          areaList.report.forEach(ele => {
            count += ele.storeCount;
          });
        }
        this.totalStore = count;
      } else {
        alert(this.setAera.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  },
  mounted() {
    const list = document.querySelectorAll(".all-awap li");
    list.forEach(ele => {
      ele.addEventListener("click", () => {
        list.forEach(ele => ele.classList.remove("active"));
        ele.classList.add("active");
      });
    });
  },
  methods: {
    async selectArea(code) {
      try {
        await this.$store.dispatch("report/STORE_AREA", { id: this.sid, parentsSid: code });
        if (this.setAera.addtuneApiResult.errorCode == 200) {
          const areaList = this.setAera.addtuneApiResult;
          if (areaList.errorCode == 200) {
            this.list = areaList.report;
          }
          this.setCode = code;
        } else {
          alert(this.setAera.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        alert(error);
      }
    },
    check(data) {
      let init = this.areaTemp[data.order].area;
      let filter = data.sysCodeSid;
      let different = init.includes(filter); //체크 토글
      let total = this.areaTemp.reduce((prev, curr) => {
        return prev + curr.area.length; //전국 전체갯수
      }, 0);
      if (total > 15) {
        alert(this.$t("alert-t8"));
        this.areaTemp[data.order].area.pop(); //15이상 선택 금지
        return false;
      }
      if (different === true) {
        if (data.disabled === true) {
          //전국 전체 선택시
          if (data.sysCodeSid === "SYS21A15B001") {
            this.chip = [];
            this.areaTemp.forEach(ele => {
              ele.area = [];
              ele.disabled = false;
            });
            this.areaTemp[1].area = ["SYS21A15B001"];
          } else {
            //기타 시전체 선택시
            this.areaTemp[data.order].area = [];
            this.areaTemp[data.order].area.push(data.sysCodeSid);
            this.areaTemp[data.order].disabled = true;
            let newChip = [];
            this.chip.forEach(ele => {
              if (ele.order !== data.order) {
                newChip.push(ele);
              }
            });
            this.chip = newChip;
          }
        }
        if (data.sysCodeSid !== "SYS21A15B001") {
          //전국 전체 선택 후 개별 시 전체를 선택하는 경우
          if (this.areaTemp[1].area.length > 0) {
            this.areaTemp[1].area = [];
            this.chip = [];
          }
        }
        //체크 완료
        this.chip.push({
          sysCodeName: data.sysCodeName,
          sysCodeSid: data.sysCodeSid,
          order: data.order,
          siCode: data.si,
        });
        this.areaTemp[1].disabled = false;
      } else {
        //토글 false 시
        let idx = this.chip.findIndex(function (item) {
          return item.sysCodeName === data.sysCodeName;
        });
        this.chip.splice(idx, 1);
        if (data.disabled === true) {
          this.areaTemp[data.order].disabled = false;
        }
      }
    },
    deleteZoneChip(data) {
      let idx = this.chip.findIndex(function (item) {
        return item.sysCodeName === data.sysCodeName;
      });
      this.chip.splice(idx, 1);
      let init = this.areaTemp[data.order].area;
      init.splice(init.indexOf(data.sysCodeSid), 1);
      if (this.areaTemp[data.order].disabled === true) {
        this.areaTemp[data.order].disabled = false;
      }
    },
  },
};
</script>

<style lang="scss">
//지역선택
.area-report-select-wrap {
  & .area-wrap {
    display: flex;
    justify-content: space-between;

    & .all-awap {
      width: 350px;
      border: 1px solid #d1d1d1 !important;
      padding: 25px;
      display: flex;

      & ul {
        margin: 0;
        padding: 0;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        position: relative;

        &:after {
          content: "";
          height: 100%;
          position: absolute;
          top: 0;
          left: 50%;
          border-left: 1px solid #d1d1d1;
        }

        & li {
          margin: 0;
          padding: 0;
          line-height: 30px;
          font-size: 1.5rem;
          color: #828282;
          position: relative;
          cursor: pointer;
          width: 50%;

          &.active {
            color: #ff4d56;
            text-decoration: underline;
            font-weight: 700;

            &:after {
              content: "";
              position: absolute;
              right: 10px;
              top: 10px;
              background: url("../../../assets/images/zone_arrow.png") no-repeat;
              width: 9px;
              height: 14px;
            }
          }

          &:nth-child(2n) {
            padding-left: 15px;

            &.active {
              &:after {
                right: 0px;
              }
            }
          }
        }
      }
    }

    & .select-area-wrap {
      width: calc(100% - 365px);
      border: 1px solid #d1d1d1 !important;
      padding: 25px 25px 15px;

      & .select {
        & ul {
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;

          & li {
            margin: 0;
            padding: 0;
            width: 25%;
            margin-bottom: 10px;

            & .area {
              &.v-input {
                margin-top: 0px !important;
                padding-top: 0px !important;

                & .v-label {
                  font-size: 1.5rem !important;
                  color: #828282 !important;
                }

                & .v-input--selection-controls__ripple {
                  display: none !important;
                }

                & .error--text {
                  color: #ff4d56 !important;
                  caret-color: #ff4d56 !important;
                }

                & .mdi-checkbox-blank-outline {
                  &:before {
                    font-size: 0 !important;
                    border: 1px solid #828282;
                    width: 18px;
                    height: 18px;
                    border-radius: 2px;
                  }
                }
              }

              &.v-input--is-disabled {
                & .v-label {
                  color: #bebebe !important;
                  text-decoration: line-through;
                }

                & .mdi-checkbox-blank-outline {
                  &:before {
                    border: 1px solid #bebebe;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  & .area-chip-wrap {
    width: 1110px;

    & ul {
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;

      & li {
        margin-right: 5px;
        border: 1px solid #ff4d56;
        height: 35px;
        border-radius: 20px;
        line-height: 30px;
        padding: 0 5px 0 10px;
        margin-bottom: 10px;

        & .aera {
          margin-right: 5px;
          font-size: 1.5rem;
          color: #ff4d56;
        }

        & img {
          width: 20px;
          cursor: pointer;
          vertical-align: -5px;
        }
      }
    }
  }
}
</style>
