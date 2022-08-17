<template>
  <div>
    <div class="detail-init-wrap mt100">
      <h1>{{ $t("mypage-myinfo-adv") }}</h1>
      <div class="flex_container">
        <div class="init-wrap mt98">
          <div class="bet">
            <div class="subject">{{ $t("mypage-myinfo-type") }}</div>
            <div class="business-type">
              <div class="kind mr30">{{ userAdvertiserLocalKindName }}</div>
              <div v-if="userAdvertiserLocalKind === 'SYS21B01B003' && $i18n.locale === 'ko'" class="kind-chang" @click="userAdvertiserChange">
                {{ $t("mypage-advMod-change") }}
                <img alt="" src="@/assets/images/Polygon19.png" />
              </div>
            </div>
          </div>
        </div>
        <div v-if="userAdvertiserLocalKind === 'SYS21B01B003'" class="flex_container" style="width: 100%">
          <div class="init-wrap mt38">
            <div class="bet">
              <div class="subject">{{ $t("mypage-myinfo-hp") }}</div>
              <div>
                <span class="mr5"><NationCode @selected="nationCode" :defaultSelect="userAdvertiserCountryCode" /></span>
                <input v-model="userAdvertiserUserHp" :placeholder="$t('mypage-advMod-hpInfo')" type="text" class="input-hp" />
              </div>
            </div>
          </div>
          <div class="init-wrap" v-if="$i18n.locale === 'ko'">
            <div class="bet">
              <div class="subject">{{ $t("mypage-myinfo-addr") }}({{ $t("mypage-advMod-select") }})</div>
              <div class="with-btn">
                <input v-model="userAdvertiserCompanyAddress1" class="line" type="text" />
                <button type="button" @click="showAddressModalPopup">{{ $t("button-zip") }}</button>
              </div>
            </div>
            <div class="adress mt10">
              <input v-model="userAdvertiserCompanyAddress2" :placeholder="$t('mypage-advMod-addInfo')" type="text" />
            </div>
          </div>
        </div>
        <div v-if="userAdvertiserLocalKind === 'SYS21B01B004'" class="flex_container" style="width: 100%">
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
                <button v-if="!numCheck" type="button" @click="businessCheck">{{ $t("button-certification") }}</button>
                <button v-else class="complete" type="button">{{ $t("button-certificationComp") }}</button>
              </div>
            </div>
            <div class="error-msg">{{ errMag }}</div>
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
            <div class="mt10 adress">
              <input v-model="userAdvertiserCompanyAddress2" :placeholder="$t('mypage-advMod-addInfo')" type="text" />
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
        <div class="mt65 mb100">
          <div class="alert">{{ alert }}</div>
          <button class="send" type="button" @click="validate">{{ $t("button-modifyComp") }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressModal from "@/components/modal/Address";
import businessNumConfirm from "@/components/dialog/Confirm";
import { getPopupOpt } from "@/utils/modal";
import fileUploadMixin from "@/mixins/fileUpload";
import FileUploadSingle from "@/components/form/FileUploadSingle.vue";
import { mapGetters } from "vuex";
import BusinessNum from "@/utils/businessNum";
import HpNum from "@/utils/HpNum";
import isEmpty from "@/utils/empty";
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
      userAdvertiserLocalKind: "",
      userAdvertiserLocalKindName: "",
      zip: "",
      address: "",
      click: true,
      numCheck: false,
      errMag: "",
      alert: "",
      userAdvertiserSid: "",
      //정보 등록
      homepageUserSid: "",
      userAdvertiserUserHp: "",
      userAdvertiserCompanyCrNum: "",
      userAdvertiserCompanyCrNumOrign: "",
      channeltuneFiles: [],
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
    ...mapGetters("common", ["getBusinessCheck", "getBusinessModify"]),
    ...mapGetters("member", ["getAdvertiserDetail"]),
  },
  watch: {
    userAdvertiserCompanyCrNum(data) {
      this.userAdvertiserCompanyCrNum = BusinessNum(data);
    },
  },
  async mounted() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/ADVERTISER_DETAIL", this.$route.params.id);
      if (this.getAdvertiserDetail.addtuneApiResult.errorCode == 200) {
        const info = this.getAdvertiserDetail.addtuneApiResult.userAdvertiser;
        this.homepageUserSid = info.homepageUserSid;
        this.userAdvertiserSid = info.userAdvertiserSid;
        this.userAdvertiserUserHp = info.userAdvertiserUserHp;
        this.userAdvertiserLocalKind = info.userAdvertiserLocalKind;
        this.userAdvertiserCompanyCrNum = isEmpty(info.userAdvertiserCompanyCrNum);
        this.userAdvertiserCompanyCrNumOrign = isEmpty(info.userAdvertiserCompanyCrNum);
        this.userAdvertiserCompanyName = isEmpty(info.userAdvertiserCompanyName);
        this.userAdvertiserCompanyCeo = isEmpty(info.userAdvertiserCompanyCeo);
        this.userAdvertiserCompanyAddress1 = isEmpty(info.userAdvertiserCompanyAddress1);
        this.userAdvertiserCompanyAddress2 = isEmpty(info.userAdvertiserCompanyAddress2);
        this.userAdvertiserCompanyTypeOfBusiness = isEmpty(info.userAdvertiserCompanyTypeOfBusiness);
        this.userAdvertiserCompanyIndustries = isEmpty(info.userAdvertiserCompanyIndustries);
        this.userAdvertiserLocalKindName = info.userAdvertiserLocalKindName;
        this.userAdvertiserCompanyZipCode = info.userAdvertiserCompanyZipCode;
        this.userAdvertiserCountryCode = info.userAdvertiserCountryCode;
        if (info.userAdvertiserCompanyCrNum !== "" && info.userAdvertiserCompanyCrNum !== null) {
          this.numCheck = true;
        }
      } else {
        alert(this.getAdvertiserDetail.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }

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
    //광고주 유형 변경
    userAdvertiserChange() {
      if (confirm(this.$t("mypage-advMod-alert1"))) {
        this.userAdvertiserLocalKindName = this.$t("mypage-advMod-type3");
        document.querySelector(".kind-change").style.display = "none";
        this.userAdvertiserLocalKind = "SYS21B01B004";
      }
    },
    async businessCheck() {
      let crNum = this.userAdvertiserCompanyCrNum.replace(/\-/g, "");
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/BUSINESS_CHECK", crNum);
        if (this.getBusinessCheck.addtuneApiResult.errorCode !== 200) {
          alert(this.getBusinessCheck.addtuneApiResult.errorMessage);
          this.numCheck = false;
        } else {
          let type = this.getBusinessCheck.addtuneApiResult.checkBusiness[0].tax_type;
          this.$modal.show(
            businessNumConfirm,
            {
              update: this.businessNumConfirm,
              type,
            },
            getPopupOpt("businessNumConfirm", "300px", "auto", false),
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    businessNumConfirm() {
      this.numCheck = true;
    },
    //국가코드
    nationCode(sid) {
      this.userAdvertiserCountryCode = sid;
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
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("common/BUSINESS_MODIFY", {
          userAdvertiserSid: this.userAdvertiserSid,
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
        });
        if (this.getBusinessModify.addtuneApiResult.errorCode == 200) {
          let routerInfo = this.$route.params.router.split("-");
          if (routerInfo[0] === "pay") {
            await this.$router.push({ name: "pay", params: this.$route.params });
          }
          if (routerInfo[0] === "estimate") {
            await this.$router.push({
              name: "estimate_confirm",
              params: {
                id: this.$route.params.id,
                price: this.$route.params.price,
              },
            });
          }
          if (routerInfo[0] === "default") {
            await this.$router.push("/mypage/myinfo");
          }
        } else {
          alert(this.getBusinessModify.addtuneApiResult.errorMessage);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-init-wrap {
  width: 1052px;
  margin: 0 auto;

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
    margin-top: 34px;
    width: 80%;

    & .subject {
      @include NotoSans(1.7, 500, #4f4f4f);

      & span {
        @include NotoSans(1, 400, #ff4d56);
        margin-left: 15px;
      }
    }

    .error-msg {
      width: 100%;
      margin-left: calc(100% - 600px);
      display: flex;
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
  display: flex;
  width: 600px;

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

  & .kind {
    @include NotoSans(1.7, 700, #4f4f4f);
    display: flex;
    align-items: center;
  }

  & .kind-chang {
    cursor: pointer;
    width: 200px;
    height: 45px;
    position: relative;
    border-radius: 10px;
    background: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
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
    white-space: nowrap;
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
