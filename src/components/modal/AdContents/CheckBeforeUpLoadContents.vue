<template>
  <modalWrap :hideLine="true" @close="close">
    <template slot="head">
      <h1 class="mt10">{{ title }}</h1>
    </template>
    <template slot="body">
      <div class="mBody">
        <div class="red_box">
          <span>{{ $t("modal-fileUpload-standard") }}</span>
          <ul>
            <li>{{ $t("modal-fileUpload-info1") }}</li>
            <li>{{ $t("modal-fileUpload-info2") }}</li>
            <li>{{ $t("modal-fileUpload-info3") }}</li>
            <li>{{ $t("modal-fileUpload-info4") }}</li>
            <li>{{ $t("modal-fileUpload-info5") }}</li>
          </ul>
        </div>
        <div class="number mt25">
          <ol>
            <li>{{ $t("modal-fileUpload-info6") }}</li>
            <li>{{ $t("modal-fileUpload-info7") }}</li>
            <li>{{ $t("modal-fileUpload-info8") }}</li>
            <li>{{ $t("modal-fileUpload-info9") }}</li>
          </ol>
        </div>
      </div>
    </template>
    <template slot="footer">
      <div class="footer mt35" style="margin-bottom: -40px">
        <div class="btnd" @click="close">
          <span>{{ $t("button-check") }}</span>
        </div>
        <div class="v-application modal-checkbox mt23" v-if="this.notice === undefined">
          <v-checkbox v-model="hide" :label="$t('modal-fileUpload-never')" required></v-checkbox>
        </div>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import { neverSeeAgainCookieAdContents } from "@/utils/cookie";

export default {
  components: {
    modalWrap,
  },
  props: ["notice"],
  data() {
    return {
      hide: false,
      title: "",
    };
  },
  created() {
    this.notice === true ? (this.title = this.$t("modal-fileUpload-alert1")) : (this.title = this.$t("modal-fileUpload-alert2"));
  },
  methods: {
    close() {
      if (this.notice === undefined) {
        if (this.hide === true) {
          neverSeeAgainCookieAdContents("hide");
          this.$attrs.update(false);
        } else {
          this.$attrs.update(true);
        }
      }
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  @include NotoSans(2.5, 700, #333333);
}

.mBody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .red_box {
    width: 430px;
    padding: 20px;
    background-color: #fff4f5;
    border-radius: 10px;
    margin-top: -10x;

    & span {
      @include NotoSans(1.6, 700, #4f4f4f);
      margin-bottom: 5px;
    }

    & li {
      @include NotoSans(1.6, 400, #4f4f4f);
      padding-left: 13px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        top: 12px;
        left: 2px;
        background-color: #000;
        width: 3px;
        height: 3px;
        border-radius: 50%;
      }
    }
  }

  & .number {
    width: 430px;
    @include NotoSans(1.4, 400, #4f4f4f);
    & li {
      margin-left: 20px;
      margin-bottom: 5px;
      padding-left: 4px;
      list-style-type: decimal;
    }
  }
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & .btnd {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 70px;
    background-color: #ff4d56;
    border-radius: 2px;
    & span {
      @include NotoSans(2.3, 700, #fff);
    }
  }
}

.modal-checkbox::v-deep {
  & .v-label {
    margin-left: 10px;
    @include NotoSans(1.5, 400, #828282);
  }
  & .v-input--selection-controls__input {
    width: 18px;
    height: 18px;
  }
  & .primary--text {
    color: #ff4d56 !important;
    caret-color: #ff4d56 !important;
  }
  & .v-messages {
    display: none !important;
  }
  & .v-input--selection-controls__ripple {
    display: none !important;
  }
  & .mdi-checkbox-blank-outline {
    border: 1px solid #828282;
    border-radius: 2px;
    &:before {
      content: "" !important;
    }
  }
}
</style>
