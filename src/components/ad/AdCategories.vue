<template>
  <div class="categories-wrap">
    <div class="radio-group mt30">
      <v-radio-group v-model="categories" column>
        <span v-for="item in notsensitive" :key="item.sysCodeSid"
          ><v-radio v-if="item.sysCodeVal === 'N'" :label="item.sysCodeName" :value="item.sysCodeSid" @click="name(item.sysCodeName)"></v-radio
        ></span>
      </v-radio-group>
      <div class="txt">{{ $t("buyAd-categories-warning") }}</div>
      <v-radio-group v-model="categories" column>
        <span v-for="item in sensitive" :key="item.sysCodeSid"
          ><v-radio v-if="item.sysCodeVal === 'Y'" :label="item.sysCodeName" :value="item.sysCodeSid" @click="name(item.sysCodeName)"></v-radio
        ></span>
      </v-radio-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["reset"],
  data() {
    return {
      notsensitive: [],
      sensitive: [],
      categories: "",
      type: "",
    };
  },
  computed: {
    ...mapGetters("common", ["getSystemCodeList"]),
  },
  watch: {
    reset() {
      this.categories = "";
      this.type = "";
    },
    categories(n) {
      this.$emit("categories", { code: n, name: this.type });
    },
  },
  async created() {
    try {
      await this.$store.dispatch("common/SYSCODE", "SYS21B01B007");
      if (this.getSystemCodeList.addtuneApiResult.errorCode == 200) {
        const categories = this.getSystemCodeList.addtuneApiResult.sysCodeList;
        const sensitive = [];
        const notsensitive = [];
        categories.forEach(ele => {
          if (ele.sysCodeVal === "Y") {
            sensitive.push(ele);
          }
          if (ele.sysCodeVal === "N") {
            notsensitive.push(ele);
          }
        });
        this.sensitive = sensitive;
        this.notsensitive = notsensitive;
      } else {
        alert(this.getSystemCodeList.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      alert(error);
    }
  },
  methods: {
    name(data) {
      this.type = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.categories-wrap {
  & .txt {
    @include NotoSans(1.5, 400, #828282);
    margin-bottom: 15px;
  }
}

.radio-group::v-deep {
  & label {
    margin-left: 14px;
  }
}
</style>
