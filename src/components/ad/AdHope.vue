<template>
  <div class="hope-select-ad-wrap">
    <ul>
      <li class="all">
        <v-checkbox v-model="selectStoreAll" label="전체선택" value="SYS21A15B012" @click="select({ sysCodeName: 'all' })"></v-checkbox>
      </li>
      <li v-for="item in list" :key="item.sysCodeSid" class="select">
        <v-checkbox v-model="selectStore" :label="item.sysCodeName" :value="item.sysCodeSid" @click="select({ sysCodeSid: item.sysCodeSid, sysCodeName: item.sysCodeName })"></v-checkbox>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["reset"],
  data() {
    return {
      list: [],
      selectStore: [],
      length: null,
      name: [],
      allName: [],
      allCode: [],
      selectStoreAll: [],
    };
  },
  computed: {
    ...mapGetters("common", ["getSystemCodeList"]),
  },
  watch: {
    reset() {
      this.selectStore = [];
      this.name = [];
      this.$emit("hope", { code: [], name: [] });
    },
  },
  async created() {
    try {
      await this.$store.dispatch("common/SYSCODE", "SYS21A15B012");
      if (this.getSystemCodeList.addtuneApiResult.errorCode == 200) {
        this.list = this.getSystemCodeList.addtuneApiResult.sysCodeList;
        this.length = this.list.length;
        const all = [];
        const allCode = [];
        this.list.forEach(ele => {
          all.push(ele.sysCodeName);
          allCode.push(ele.sysCodeSid);
        });
        this.allName = all;
        this.allCode = allCode;
        //초기 전체선택
        this.selectStoreAll = ["SYS21A15B012"];
        this.selectStore = this.allCode;
        this.name = this.allName;
        this.$emit("hope", { code: this.selectStore, name: this.name, allSelect: this.selectStoreAll[0] });
      } else {
        alert(this.getSystemCodeList.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  },
  methods: {
    select(data) {
      if (data.sysCodeName === "all") {
        if (this.selectStoreAll.includes("SYS21A15B012")) {
          this.selectStore = this.allCode;
          this.name = this.allName;
        } else {
          this.selectStore = [];
          this.name = [];
        }
      } else {
        if (this.selectStore.includes(data.sysCodeSid)) {
          this.name.push(data.sysCodeName);
          if (this.selectStore.length === this.list.length) {
            this.selectStoreAll = ["SYS21A15B012"];
          }
        } else {
          let filtered = this.name.filter(element => element !== data.sysCodeName);
          this.name = filtered;
          this.selectStoreAll = [];
        }
      }
      this.$emit("hope", { code: this.selectStore, name: this.name, allSelect: this.selectStoreAll[0] });
    },
  },
};
</script>

<style lang="scss">
.hope-select-ad-wrap {
  & ul {
    padding: 0 !important;
    display: flex;
    flex-wrap: wrap;

    & li {
      padding: 0 !important;
      margin: 0 15px 15px 0;

      & .v-input {
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
          white-space: nowrap;
          padding: 15px 25px;
          width: 100%;
          text-align: center;
          display: block !important;
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
            padding: 15px 25px;
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
