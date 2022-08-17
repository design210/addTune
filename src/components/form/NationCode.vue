<template>
  <div>
    <div class="v-application">
      <v-select v-model="select" :items="itemList" item-text="item" item-value="value" attach @blur="blurEvent" ref="vSelect">
        <template slot="selection" slot-scope="{ item }">{{ item.item }}</template>
        <template slot="item" slot-scope="{ item }">{{ item.name }}</template>
        <template v-slot:prepend-item>
          <v-list-item>
            <v-list-item-content>
              <v-text-field v-model="search" placeholder="검색" @input="searchAction"></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-select>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["defaultSelect"],
  data() {
    return {
      select: "",
      itemsCopy: [],
      search: "",
      itemList: [],
    };
  },
  computed: {
    ...mapGetters("common", ["nationCode"]),
  },
  watch: {
    codeReload() {
      this.reload();
    },
    code() {
      this.reload();
    },
    //리스트 선택시 상세에 선택값 표기
    defaultSelect(val) {
      if (val == null) {
        this.select = "";
      } else {
        this.select = val;
      }
    },
    //셀렉트 선택시 시스템 코드 데이터 emit
    select(val) {
      this.$emit("selected", val);
    },
  },
  mounted() {
    this.reload();
    this.select = this.defaultSelect;
  },
  methods: {
    // 모달에서 바깥쪽 클릭해도 v-select 안사라져서 추가
    blurEvent() {
      if (this.onlySelectPullDown !== "" && this.onlySelectPullDown) {
        this.$refs.vSelect.blur();
      }
    },
    async reload() {
      try {
        await this.$store.dispatch("common/GET_NATION_CODE");
        if (this.nationCode.addtuneApiResult.errorCode === 200) {
          const list = [];
          const telList = this.nationCode.addtuneApiResult.sysCodeList;
          await telList.sort((a, b) => (a.nationName.toLowerCase() < b.nationName.toLowerCase() ? -1 : 1));
          await telList.forEach(ele => {
            list.push({ value: ele.sysCodeSid, item: `+${ele.nationTel}`, name: `+${ele.nationTel} (${ele.nationName})` });
          });

          this.itemList = list;
          this.itemsCopy = [...this.itemList];
        } else {
          alert(this.nationCode.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        alert(error);
      }
    },
    //검색 옵션
    searchAction() {
      if (!this.search) {
        this.itemList = this.itemsCopy;
      } else {
        this.itemList = this.itemsCopy.filter(items => {
          return items.name.includes(this.search);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application::v-deep {
  & .v-input {
    width: 145px;
    & .v-list {
      & .v-list-item {
        @include NotoSans(1.4, 500, #000);
        letter-spacing: -1px;
        background-color: #fff !important;
        &:first-child {
          & .v-input__slot {
            margin-bottom: 2px;
            height: 30px;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom: 1px solid #ccc;
            & input {
              padding: 0px 10px 10px;
              @include NotoSans(1.4, 400, #000);
              &::placeholder {
                @include NotoSans(1.4, 400, #bdbdbd);
                color: #bdbdbd !important;
              }
            }
          }
        }
        &.v-list-item--active {
          color: #ff4d56 !important;
        }
      }
    }
    & .v-text-field__details {
      display: none;
    }
    & .v-input__control {
      & .v-input__slot {
        margin-bottom: 0;
        height: 50px;
        border: 1px solid #afafaf;
        border-radius: 2px;
        &:before {
          border: 0;
        }
        &:after {
          border: 0;
        }
        & .v-input__append-inner {
          & .v-input__icon {
            position: relative;
            &:after {
              content: "";
              position: absolute;
              background: url("../../assets/images/select_arrow.svg") no-repeat;
              width: 16px;
              height: 10px;
              right: 8px;
              top: 8px;
            }
            & i {
              display: none;
            }
          }
        }
      }
    }
  }
  & .v-select__slot {
    & .v-select__selections {
      padding: 0px 10px;
    }
  }
  & .v-menu__content {
    min-width: 220px !important;
  }
}
</style>
