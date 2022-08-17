<template>
  <div class="v-application pull-down-big">
    <v-select v-model="select" :items="items" attach placeholder="선택하세요"></v-select>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["code", "data", "clear", "codeReload"],
  data() {
    return {
      select: "",
      codelist: [],
      items: [],
    };
  },
  computed: {
    ...mapGetters("common", ["getAreaList"]),
  },
  watch: {
    codeReload() {
      this.reload();
    },
    code() {
      this.reload();
    },
    //초기화
    clear(o, n) {
      if (o !== n) {
        this.select = "";
      }
    },
    //리스트 선택시 상세에 선택값 표기
    data(val) {
      if (val == null) {
        this.select = "";
      } else {
        this.select = val;
      }
    },
    //셀렉트 선택시 시스템 코드 데이터 emit
    select(val) {
      if (val !== "" || val !== undefined) {
        let code = this.codelist.filter(function (arr) {
          return arr.sysCodeName == val;
        });
        if (code[0] !== undefined) {
          this.$emit("selected", code[0]);
        }
      }
    },
  },
  mounted() {
    this.reload();
  },
  methods: {
    //검색 옵션
    searchAction() {
      if (!this.search) {
        this.items = this.itemsCopy;
      }
      this.items = this.itemsCopy.filter(items => {
        return items.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    async reload() {
      if (this.code !== "") {
        try {
          await this.$store.dispatch("common/AREA_LIST", this.code);
          const kind = this.getAreaList.addtuneApiResult.areaList;
          const nameList = [];
          const codeList = [];
          kind.forEach(ele => {
            nameList.push(ele.sysCodeName);
            codeList.push({
              sysCodeName: ele.sysCodeName,
              sysCodeSid: ele.sysCodeSid,
              sysCodeVal: ele.sysCodeVal,
              sysCodeVal1: ele.sysCodeVal1,
              sysCodeVal2: ele.sysCodeVal2,
              sysCodeVal3: ele.sysCodeVal3,
              sysCodeVal4: ele.sysCodeVal4,
            });
          });
          this.codelist = codeList;
          this.items = nameList;
        } catch (error) {
          alert(error);
        }
      }
    },
  },
};
</script>

<style lang="scss">
.pull-down-big {
  border: 1px solid #828282;
  border-radius: 2px;
  height: 60px;

  & .v-input__slot {
    margin-bottom: 0px !important;
    height: 60px;

    &:before {
      border: 0 !important;
    }

    &:after {
      border: 0 !important;
    }

    & .v-select__selections {
      & .v-select__selection {
        font-size: 2.5rem;
        font-weight: 700;
        padding: 2px 0 2px 25px;
        height: 27px;
      }

      & input {
        padding-left: 25px;
      }
    }

    & .v-input__icon {
      margin-right: 20px;
      margin-top: 4px;

      & .v-icon {
        &:before {
          content: "" !important;
        }

        &:after {
          content: "" !important;
        }

        background: url("../../assets/images/arrow_down.png") no-repeat;
        width: 20px;
        height: 11px;
      }
    }
  }

  & .v-text-field__details {
    height: 0px !important;
    display: none;
  }
}
</style>
