<template>
  <modalWrap @close="close">
    <template slot="head">
      <h2>{{ $t("modal-filter-title") }}</h2>
    </template>
    <template slot="body">
      <ul class="type-tabs mb28">
        <li :class="{ active: tabs === 1 }" @click="tabs = 1">{{ $t("report-total-sectors") }}</li>
        <li :class="{ active: tabs === 2 }" @click="tabs = 2">{{ $t("report-total-area") }}</li>
      </ul>
      <section v-show="tabs === 1" class="hope-wrap">
        <ul>
          <li v-for="item in list" :key="item.sysCodeSid">
            <v-checkbox
              v-model="selectStore"
              :label="item.sysCodeName"
              :value="item.sysCodeSid"
              @click="select({ sysCodeSid: item.sysCodeSid, sysCodeName: item.sysCodeName, count: item.storeCount })"
            ></v-checkbox>
          </li>
        </ul>
      </section>
      <section v-show="tabs === 2" class="hope-wrap">
        <area-select :parentInfo="areaParentInfo" :reset="resetArea" :sid="sid" @area="areaEmit"></area-select>
      </section>
      <div class="btn-group mt80">
        <button v-show="tabs === 1" class="reset" @click="typeReset">
          <i><img alt="" src="@/assets/images/reset.png" /></i> {{ $t("modal-filter-sector") }}
        </button>
        <button v-show="tabs === 2" class="reset" @click="areaReset">
          <i><img alt="" src="@/assets/images/reset.png" /></i> {{ $t("modal-filter-zone") }}
        </button>
        <button class="store" @click="apply">{{ $t("button-apply") }}</button>
      </div>
    </template>
    <template slot="footer"></template>
  </modalWrap>
</template>

<script>
import { mapGetters } from "vuex";
import modalWrap from "@/components/modal/ModalTemplate";
import AreaSelect from "@/components/modal/report/AreaSelect";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";

export default {
  components: {
    modalWrap,
    AreaSelect,
  },
  mixins: [loading],
  props: ["type", "sid", "setStore", "setStoreName", "areaParentInfo"],
  data() {
    return {
      selectStore: [],
      selectArea: [],
      storeTypeName: [],
      list: [],
      tabs: 1,
      resetArea: false,
      typeTotalCount: 0,
      selectParentWidthId: [],
    };
  },
  computed: {
    ...mapGetters("report", ["setStoreType"]),
  },
  async mounted() {
    this.type === "type" ? (this.tabs = 1) : (this.tabs = 2);
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("report/STORE_TYPE", this.sid); //임시 sid 매칭 할것
      if (this.setStoreType.addtuneApiResult.errorCode === 200) {
        this.list = this.setStoreType.addtuneApiResult.report;
      } else {
        alert(this.setStoreType.addtuneApiResult.errorMessage);
      }
      if (this.setStore !== undefined && this.setStore !== "") {
        this.selectStore = this.setStore.split(",");
        this.storeTypeName = this.setStoreName;
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
    select(data) {
      this.selectStore.includes(data.sysCodeSid) ? this.storeTypeName.push(data.sysCodeName) : (this.storeTypeName = this.storeTypeName.filter(ele => ele !== data.sysCodeName));
    },
    areaEmit(data) {
      let area = [];
      let parent = [];
      data.forEach(ele => {
        area.push(ele.sysCodeSid); //필터링 ID
        parent.push({
          siCode: ele.siCode,
          guCode: ele.sysCodeSid,
          name: ele.sysCodeName,
        });
      });
      this.selectArea = area;
      this.selectParentWidthId = parent;
    },
    typeReset() {
      this.selectStore = [];
    },
    areaReset() {
      this.resetArea = !this.resetArea;
    },
    apply() {
      this.$attrs.update({
        area: this.selectParentWidthId,
        storeCode: this.selectStore,
        storeName: this.storeTypeName,
      });
      this.close();
    },
  },
};
</script>
<style lang="scss" scoped>
.btn-group {
  text-align: center;

  & .reset {
    height: 70px;
    padding: 0 34px;
    @include NotoSans(1.8, 400, #828282);
    border-top: 1px solid #828282;
    border-bottom: 1px solid #828282;
    border-left: 1px solid #828282;
    border-radius: 2px 0 0 2px;

    & i {
      margin-right: 5px;
    }
  }

  & .store {
    height: 70px;
    padding: 0 50px;
    @include NotoSans(2, 700, #fff);
    background: #ff4d56;
    width: 200px;
    border-radius: 0 2px 2px 0;
  }
}

h2 {
  @include NotoSans(3, 700, #333333);
  text-align: center;
}

.type-tabs {
  display: flex;

  & li {
    margin-right: 10px;
    @include NotoSans(1.6, 400, #828282);
    cursor: pointer;

    &.active {
      @include NotoSans(1.6, 700, #ff4d56);
    }
  }
}

.hope-wrap {
  & ul::v-deep {
    padding: 0 !important;
    display: flex;
    flex-wrap: wrap;

    & li {
      padding: 0 !important;
      margin: 0 15px 15px 0;

      & .v-input {
        width: 170px;
        height: 55px;
        position: relative;

        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 1px solid #828282;
          border-radius: 30px;
        }

        & label {
          font-size: 1.8rem;
          color: #828282;
          position: absolute !important;
          left: 50% !important;
          transform: translateX(-50%);
          white-space: nowrap;
          top: 1px !important;
          padding: 15px;
        }

        &.v-input--is-label-active {
          &:before {
            color: #ff4d56;
            border: 4px solid #ff4d56;
          }

          & label {
            color: #ff4d56;
            font-weight: 700;
          }
        }

        & .v-input--selection-controls__input {
          display: none;
        }
      }

      &.all {
        & .v-input {
          &:before {
            border: 2px solid #333333;
          }

          & label {
            color: #333333;
            font-weight: 500;
            top: 1px !important;
            padding: 15px;
          }

          &.v-input--is-label-active {
            &:before {
              color: #ff4d56;
              border: 4px solid #ff4d56;
            }

            & label {
              color: #ff4d56;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>
