<template>
  <div>
    <div class="detail-init-wrap mt100">
      <h1>{{ $t("mypage-myinfo-adv") }}</h1>
      <div class="flex_container">
        <div class="init-wrap mt98">
          <div class="bet">
            <div class="subject">{{ $t("mypage-advInfo-typeSelect") }}</div>
            <div class="business-type" v-if="$i18n.locale === 'ko'">
              <input id="private" v-model="userAdvertiserLocalKind" name="business" type="radio" value="SYS21B01B003" /><label for="private">{{ $t("mypage-advInfo-private") }}</label>
              <input id="business" v-model="userAdvertiserLocalKind" name="business" type="radio" value="SYS21B01B004" /><label for="business">{{ $t("mypage-advInfo-business") }}</label>
            </div>
            <div v-else class="private">{{ $t("purchase-detail-buyerType1") }}</div>
          </div>
          <div class="info-wrap" v-if="$i18n.locale === 'ko'">
            <div class="tool-tip">
              <i><img alt="" src="@/assets/images/info.png" /></i>
              {{ $t("mypage-advInfo-discretion") }}
              <div class="info-detail">
                <p>{{ $t("mypage-advInfo-discretionInfo1") }}</p>
                <p v-html="$t('mypage-advInfo-discretionInfo2')"></p>
              </div>
            </div>
          </div>
        </div>
        <!-- 전화 번호 -->
        <div v-if="userAdvertiserLocalKind === 'SYS21B01B003'" style="width: 80%">
          <div class="init-wrap mt38" style="width: 100% !important">
            <div class="bet">
              <div class="subject">{{ $t("mypage-myinfo-hp") }}</div>
              <div>
                <span class="mr5"><NationCode @selected="nationCode" :defaultSelect="userAdvertiserCountryCode" /></span>
                <input v-model="userAdvertiserUserHp" :placeholder="$t('mypage-advMod-hpInfo')" type="text" class="input-hp" />
              </div>
            </div>
          </div>
          <!-- 주소 : 국문만 노출 -->
          <div class="init-wrap" style="width: 100% !important" v-if="$i18n.locale === 'ko'">
            <div class="bet">
              <div class="subject">{{ $t("mypage-myinfo-addr") }}({{ $t("mypage-advInfo-choice") }})</div>
              <div class="with-btn">
                <input v-model="userAdvertiserCompanyAddress1" class="line" type="text" />
                <button type="button" @click="showAddressModalPopup">{{ $t("button-zip") }}</button>
              </div>
            </div>
            <div class="adress">
              <input v-model="userAdvertiserCompanyAddress2" class="mt11" :placeholder="$t('mypage-advMod-addInfo')" type="text" />
            </div>
          </div>
        </div>
      </div>
      <div v-if="userAdvertiserLocalKind === 'SYS21B01B004'" class="flex_container">
        <div class="init-wrap mt38">
          <div class="bet">
            <div class="subject">{{ $t("mypage-myinfo-hp") }}</div>
            <span class="mr5"><NationCode @selected="nationCode" :defaultSelect="userAdvertiserCountryCode" /></span>
            <input v-model="userAdvertiserUserHp" :placeholder="$t('mypage-advMod-hpInfo')" type="text" class="input-hp" />
          </div>
        </div>
        <div class="init-wrap">
          <div class="bet">
            <div class="subject">{{ $t("mypage-myinfo-crnum") }}</div>
            <div class="with-btn">
              <input v-model="userAdvertiserCompanyCrNum" class="line" maxlength="12" :placeholder="$t('mypage-advMod-hpInfo')" type="text" />
              <button v-if="numCheck === false" type="button" @click="businessCheck">{{ $t("button-certification") }}</button>
              <button v-else class="complete" type="button">{{ $t("button-certificationComp") }}</button>
            </div>
          </div>
          <div v-if="numCheck === false" class="error-msg">{{ errMag }}</div>
        </div>
        <div class="init-wrap">
          <div class="bet">
            <div class="subject">{{ $t("mypage-advMod-business") }}</div>
            <div class="width-file">
              <file-upload-single
                id="fileInput"
                :deleteAll="DELETE_ALL_FILES"
                :fileType="'image/*, .pdf'"
                :trigger="click"
                :placeholder="$t('mypage-advMod-file')"
                @uploadFiles="__uploadFiles"
              ></file-upload-single>
              <button type="button" @click="trigger">{{ $t("button-file") }}</button>
            </div>
          </div>
        </div>
        <div class="init-wrap">
          <div class="bet">
            <div class="subject">{{ $t("mypage-myinfo-com") }}</div>
            <input v-model="userAdvertiserCompanyName" type="text" />
          </div>
        </div>
        <div class="init-wrap">
          <div class="bet">
            <div class="subject">{{ $t("mypage-myinfo-ceo") }}</div>
            <input v-model="userAdvertiserCompanyCeo" type="text" />
          </div>
        </div>
        <div class="init-wrap">
          <div class="bet">
            <div class="subject">{{ $t("mypage-myinfo-buaddr") }}</div>
            <div class="with-btn">
              <input v-model="userAdvertiserCompanyAddress1" class="line" type="text" />
              <button type="button" @click="showAddressModalPopup">{{ $t("button-zip") }}</button>
            </div>
          </div>
          <div class="adress">
            <input v-model="userAdvertiserCompanyAddress2" class="mt11" :placeholder="$t('mypage-advMod-addInfo')" type="text" />
          </div>
        </div>
        <div class="init-wrap">
          <div class="bet">
            <div class="subject">{{ $t("mypage-myinfo-type1") }}</div>
            <input v-model="userAdvertiserCompanyTypeOfBusiness" :placeholder="$t('mypage-advMod-type1')" type="text" />
          </div>
        </div>
        <div class="init-wrap">
          <div class="bet">
            <div class="subject">{{ $t("mypage-myinfo-type2") }}</div>
            <input v-model="userAdvertiserCompanyIndustries" :placeholder="$t('mypage-advMod-type2')" type="text" />
          </div>
        </div>
      </div>
      <div class="mt150 mb100">
        <div class="alert">{{ alert }}</div>
        <button class="send" type="button" @click="validate">{{ $t("button-initComp") }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import AddressModal from "@/components/modal/Address";
import { getPopupOpt } from "@/utils/modal";
import fileUploadMixin from "@/mixins/fileUpload";
import FileUploadSingle from "@/components/form/FileUploadSingle.vue";
import { mapGetters } from "vuex";
import { deleteCookie, getEstimateCookie } from "@/utils/cookie";
import BusinessNum from "@/utils/businessNum";
import HpNum from "@/utils/HpNum";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
import NationCode from "@/components/form/NationCode";
export default {
  components: {
    FileUploadSingle,
    NationCode,
  },
  mixins: [fileUploadMixin, loading],
  data() {
    return {
      userAdvertiserLocalKind: "SYS21B01B003",
      zip: "",
      address: "",
      click: true,
      numCheck: false,
      errMag: "",
      userAdvertiserSid: "",
      btnDisabled: true,
      alert: "",
      //정보 등록
      homepageUserSid: "",
      userAdvertiserUserHp: "",
      userAdvertiserCompanyCrNum: "",
      channeltuneFiles: "",
      userAdvertiserCompanyName: "",
      userAdvertiserCompanyCeo: "",
      userAdvertiserCompanyZipCode: "",
      userAdvertiserCompanyAddress1: "",
      userAdvertiserCompanyAddress2: "",
      userAdvertiserCompanyTypeOfBusiness: "",
      userAdvertiserCompanyIndustries: "",
      //국가코드
      userAdvertiserCountryCode: "",
    };
  },
  computed: {
    ...mapGetters("common", ["getBusinessCheck", "getBusinessJoin"]),
    ...mapGetters("member", ["getMe"]),
  },
  watch: {
    userAdvertiserCompanyCrNum(data) {
      this.userAdvertiserCompanyCrNum = BusinessNum(data);
    },
  },
  async created() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/ME");
      if (this.getMe.addtuneApiResult.errorCode == 200) {
        const info = this.getMe.addtuneApiResult.login;
        this.homepageUserSid = info.homepageUserSid;
      } else {
        alert(this.getMe.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  mounted() {
    const tooltip = document.querySelector(".tool-tip");
    if (tooltip) {
      tooltip.addEventListener("mouseover", () => {
        document.querySelector(".tool-tip .info-detail").style.display = "block";
      });
      tooltip.addEventListener("mouseout", () => {
        document.querySelector(".tool-tip .info-detail").style.display = "none";
      });
    }
  },
  methods: {
    //주소찾기 모달
    showAddressModalPopup() {
      this.$modal.show(AddressModal, { updateZip: this.updateZip }, getPopupOpt("AddressModal", "650px", "auto", false));
    },
    //모달에서 주소 선택시
    updateZip(data) {
      this.userAdvertiserCompanyZipCode = data.zip;
      this.userAdvertiserCompanyAddress1 = data.addr1;
    },
    trigger() {
      this.click = !this.click;
    },
    async businessCheck() {
      let crNum = this.userAdvertiserCompanyCrNum.replace(/\-/g, "");
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/BUSINESS_CHECK", crNum);
        if (this.getBusinessCheck.addtuneApiResult.errorCode !== 200) {
          this.errMag = this.getBusinessCheck.addtuneApiResult.errorMessage;
          this.numCheck = false;
        } else {
          this.numCheck = true;
          this.errMag = "";
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async validate() {
      if (this.userAdvertiserLocalKind === "SYS21B01B003") {
        if (this.userAdvertiserUserHp === "") {
          this.alert = this.$t("mypage-advMod-alert2");
          return false;
        }
      } else if (this.userAdvertiserLocalKind === "SYS21B01B004") {
        if (this.userAdvertiserUserHp === "") {
          this.alert = this.$t("mypage-advMod-alert2");
          return false;
        }
        if (this.userAdvertiserCompanyCrNum === "") {
          this.alert = this.$t("mypage-advMod-alert3");
          return false;
        }
        if (this.numCheck === false) {
          this.alert = this.$t("mypage-advMod-alert4");
          this.errMag = this.$t("mypage-advMod-alert5");
          return false;
        }
        if (this.userAdvertiserCompanyName === "") {
          this.alert = this.$t("mypage-advMod-alert6");
          return false;
        }
        if (this.userAdvertiserCompanyCeo === "") {
          this.alert = this.$t("mypage-advMod-alert7");
          return false;
        }
        if (this.userAdvertiserCompanyAddress1 === "") {
          this.alert = this.$t("mypage-advMod-alert8");
          return false;
        }
        if (this.userAdvertiserCompanyAddress2 === "") {
          this.alert = this.$t("mypage-advMod-alert8");
          return false;
        }
        if (this.userAdvertiserCompanyTypeOfBusiness === "") {
          this.alert = this.$t("mypage-advMod-alert9");
          return false;
        }
        if (this.userAdvertiserCompanyIndustries === "") {
          this.alert = this.$t("mypage-advMod-alert10");
          return false;
        }
      }
      this.alert = "";
      this.selectAdvertiserLocalKind();
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/BUSINESS_JOIN", {
          channeltuneFiles: this.channeltuneFiles,
          homepageUserSid: this.homepageUserSid,
          userAdvertiserLocalKind: this.userAdvertiserLocalKind,
          userAdvertiserUserHp: this.userAdvertiserUserHp,
          userAdvertiserCompanyCrNum: this.userAdvertiserCompanyCrNum,
          userAdvertiserCompanyName: this.userAdvertiserCompanyName,
          userAdvertiserCompanyCeo: this.userAdvertiserCompanyCeo,
          userAdvertiserCompanyZipCode: this.userAdvertiserCompanyZipCode,
          userAdvertiserCompanyAddress1: this.userAdvertiserCompanyAddress1,
          userAdvertiserCompanyAddress2: this.userAdvertiserCompanyAddress2,
          userAdvertiserCompanyTypeOfBusiness: this.userAdvertiserCompanyTypeOfBusiness,
          userAdvertiserCompanyIndustries: this.userAdvertiserCompanyIndustries,
          userAdvertiserCountryCode: this.userAdvertiserCountryCode,
        });
        if (this.getBusinessJoin.addtuneApiResult.errorCode === 200) {
          this.userAdvertiserSid = this.getBusinessJoin.addtuneApiResult.userAdvertiser.userAdvertiserSid;
          if (this.$route.params.router === "pay") {
            this.$router.push("/ad/adMain/pay");
          } else {
            this.sendData();
          }
        } else {
          alert(this.getBusinessJoin.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    //국가코드
    nationCode(sid) {
      this.userAdvertiserCountryCode = sid;
    },
    async sendData() {
      if (getEstimateCookie() !== null) {
        const data = getEstimateCookie();
        try {
          bus.$emit("start:spinner");
          await this.$store.dispatch("admain/AD_ESTIMATE", { basic: data, userAdvertiserSid: this.userAdvertiserSid });
          if (this.setAdEstimate.addtuneApiResult.errorCode == 200) {
            deleteCookie("estimate");
            alert(this.$t("mypage-advInfo-alert1"));
            await this.$router.push("/main");
          } else {
            alert(this.setAdEstimate.addtuneApiResult.errorMessage);
          }
        } catch (error) {
          console.log(error);
        } finally {
          bus.$emit("end:spinner");
        }
      }
      const payInfo = this.$route.params;
      if (Object.keys(payInfo).length !== 0) {
        await this.$router.push({ name: "pay", params: payInfo });
      }
      if (getEstimateCookie() == null && Object.keys(payInfo).length === 0) {
        alert(this.$t("mypage-advInfo-alert2"));
        await this.$router.push("/mypage/myinfo");
      }
    },
    //개인광고주 일 때 사업자 광고주 데이터 삭제
    selectAdvertiserLocalKind() {
      if (this.userAdvertiserLocalKind === "SYS21B01B003") {
        this.userAdvertiserCompanyCrNum = "";
        this.channeltuneFiles = [];
        this.userAdvertiserCompanyName = "";
        this.userAdvertiserCompanyCeo = "";
        this.userAdvertiserCompanyTypeOfBusiness = "";
        this.userAdvertiserCompanyIndustries = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-init-wrap {
  width: 1052px;
  margin: 0 auto;
  & .private {
    width: 600px;
  }
  & h1 {
    @include NotoSans(3, 700, #333333);
    border-bottom: 2px solid #ff4d56;
    padding-bottom: 44px;
  }

  & .alert {
    text-align: center;
    @include NotoSans(1.3, 400, #ff4d56);
    margin-bottom: 5px;
  }

  & .init-wrap {
    margin-top: 45px;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & .subject {
      @include NotoSans(1.5, 700, #4f4f4f);

      & span {
        @include NotoSans(1, 400, #ff4d56);
        margin-left: 15px;
      }
    }

    .error-msg {
      width: 460px;
      display: flex;
      justify-content: flex-end;
      @include NotoSans(1.3, 400, #ff4d56);
      margin-top: 5px;
    }

    & .with-btn {
      display: flex;
      width: 600px;

      & input[type="text"] {
        width: calc(600px - 165px);

        &.line {
          border-top: 1px solid #afafaf !important;
          border-left: 1px solid #afafaf !important;
          border-bottom: 1px solid #afafaf !important;
          border-right: 0 !important;
          border-radius: 2px 0 0 2px !important;
        }
      }

      & button {
        width: 165px;
        height: 50px;
        background: #ff4d56;
        border-radius: 0px 2px 2px 0px !important;
        @include NotoSans(1.8, 700, #fff);

        &.complete {
          background: #828282;
        }
      }
    }

    & .width-file {
      position: relative;
      width: 600px;

      & button {
        width: 165px;
        height: 50px;
        background: #ff4d56;
        border-radius: 0px 2px 2px 0px !important;
        @include NotoSans(1.8, 700, #fff);
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    & input[type="text"] {
      border: 1px solid #afafaf !important;
      border-radius: 2px;
      height: 50px;
      width: 600px;
      @include NotoSans(1.5, 400, #333333);
      padding: 0 15px;

      &::placeholder {
        color: #bdbdbd;
      }
    }
  }

  & .send {
    width: 300px;
    height: 70px;
    border-radius: 2px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    @include NotoSans(2.7, 700, #fff);
    background: #ff4d56;

    &:disabled {
      background: #828282;
    }
  }
}

.business-type {
  & input[type="radio"] {
    width: 0;
    height: 0;

    & + label {
      display: inline-block;
      border: 1px solid #000;
      width: 300px;
      cursor: pointer;
      text-align: center;
      border: 1px solid #afafaf;
      height: 54px;
      @include NotoSans(1.7, 400, #828282);
      line-height: 52px !important;
    }

    &:checked {
      & + label {
        @include NotoSans(1.7, 700, #fff);
        border: 1px solid #ff4d56;
        background: #ff4d56;
      }
    }
  }
}

.info-wrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 7px;

  & .tool-tip {
    position: relative;
    cursor: pointer;
    @include NotoSans(1.3, 700, #828282);

    & i {
      vertical-align: 1px;
    }

    & .info-detail {
      display: none;
      position: absolute;
      background: #f2f2f2;
      padding: 10px;
      width: 330px;
      top: 25px;
      right: 0;
      @include NotoSans(1.2, 400, #000);
      border-radius: 3px;
    }
  }
}

.bet {
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .subject {
    width: 115px;
    text-align: right;
  }

  & input[type="text"] {
    width: 600px;
  }
}

.flex_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.adress {
  display: flex;
  justify-content: flex-end;
}
.input-hp {
  width: 448px !important;
}
</style>
