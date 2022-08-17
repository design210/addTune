<template>
  <modalWrap @close="close">
    <template slot="head">
      <h1>{{ $t("button-campaignModify") }}</h1>
    </template>
    <template slot="body">
      <div class="comment">{{ $t("pay-complete-campaignName") }} ({{ byteLength }}/12{{ $t("common-unit-text") }})</div>
      <div>
        <input v-model="nameChange" maxlength="12" placeholder="광고 #1" type="text" />
      </div>
    </template>
    <template slot="footer">
      <div class="btn-wrap">
        <button :disabled="status" @click="save">{{ $t("button-save") }}</button>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { mapGetters } from "vuex";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";

export default {
  components: {
    modalWrap,
  },
  mixins: [loading],
  props: ["name", "id"],
  data() {
    return {
      nameChange: "",
      status: true,
      byteLength: null,
    };
  },
  computed: {
    ...mapGetters("pay", ["getCampaignNameModify"]),
  },
  watch: {
    nameChange(n) {
      if (n === "") {
        this.status = true;
      } else {
        this.status = false;
      }
      if (n !== "" && n !== null) {
        this.byteLength = n.replace(/[\0-\x7f]:([0-\u07ff]:(.))/g, "$&$1$2").length;
      }
    },
  },
  created() {
    this.nameChange = this.name;
    if (this.nameChange !== "" && this.nameChange !== null) {
      this.byteLength = this.nameChange.replace(/[\0-\x7f]:([0-\u07ff]:(.))/g, "$&$1$2").length;
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    async save() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("pay/CAMPAIGN_NAME_MODIFY", {
          id: this.id,
          campaignName: this.nameChange,
        });
        if (this.getCampaignNameModify.addtuneApiResult.errorCode == 200) {
          this.$attrs.update(this.nameChange);
          this.close();
        } else {
          alert(this.getCampaignNameModify.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        alert(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  @include NotoSans(3, 700, #333333);
  text-align: center;
  margin-top: 50px;
}

.comment {
  @include NotoSans(1.7, 400, #333333);
}

input {
  @include NotoSans(1.6, 400, #333333);

  &::placeholder {
    @include NotoSans(1.6, 400, #bdbdbd);
  }

  border: 1px solid #c4c4c4;
  height: 50px;
  padding: 0 20px;
  width: 100%;
  margin-top: 10px;
}

.btn-wrap {
  text-align: center;
  margin-top: 35px;
  margin-bottom: 50px;

  & button {
    width: 250px;
    height: 70px;
    background: #ff4d56;
    border-radius: 2px;
    @include NotoSans(2, 700, #fff);

    &:disabled {
      background: #828282;
    }
  }
}
</style>
