<template>
  <div class="sub-wrapper mb200">
    <section class="account-info-wrap">
      <div class="header mt172">
        <h2>{{ $t("mypage-myinfo-title") }}</h2>
        <a @click="accountModify">{{ $t("button-modify") }}</a>
      </div>
      <div class="box">
        <div>
          <span class="subject">{{ $t("mypage-myinfo-email") }} ({{ sns }})</span>
          <span class="data">{{ homepageUserEmail }}</span>
        </div>
        <div>
          <span class="subject">{{ $t("mypage-myinfo-name") }}</span>
          <span class="data">{{ homepageUserName }}</span>
        </div>
        <div v-if="sns === $t('mypage-myinfo-id')">
          <span class="subject">{{ $t("mypage-myinfo-pw") }}</span>
          <span class="data pw"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>
        </div>
      </div>
    </section>
    <section class="advertiser-info-wrap mt57">
      <div class="header">
        <h2>{{ $t("mypage-myinfo-adv") }}</h2>
        <a v-if="advertiserInfo" @click="advertiserModify">{{ $t("button-modify") }}</a>
        <a v-else @click="advertiserReg">{{ $t("button-reg") }}</a>
      </div>
      <div v-if="userAdvertiserLocalKind === 'SYS21B01B003'" class="box">
        <div>
          <span class="subject">{{ $t("mypage-myinfo-type") }}</span>
          <span class="data">{{ userAdvertiserLocalKindName }}</span>
        </div>
        <div>
          <span class="subject">{{ $t("mypage-myinfo-hp") }}</span>
          <span class="data">{{ userAdvertiserUserHp }}</span>
        </div>
        <div v-if="$i18n.locale === 'ko'">
          <span class="subject">{{ $t("mypage-myinfo-addr") }}</span>
          <span class="data">{{ userAdvertiserCompanyAddress1 }} {{ userAdvertiserCompanyAddress2 }}</span>
        </div>
      </div>
      <div v-else-if="userAdvertiserLocalKind === 'SYS21B01B004'" class="box">
        <div>
          <span class="subject">{{ $t("mypage-myinfo-type") }}</span>
          <span class="data">{{ userAdvertiserLocalKindName }}</span>
        </div>
        <div>
          <span class="subject">{{ $t("mypage-myinfo-hp") }}</span>
          <span class="data">{{ userAdvertiserUserHp }}</span>
        </div>
        <div>
          <span class="subject">{{ $t("mypage-myinfo-crnum") }}</span>
          <span class="data">{{ userAdvertiserCompanyCrNum }}</span>
        </div>
        <div>
          <span class="subject">{{ $t("mypage-myinfo-com") }}</span>
          <span class="data">{{ userAdvertiserCompanyName }}</span>
        </div>
        <div>
          <span class="subject">{{ $t("mypage-myinfo-ceo") }}</span>
          <span class="data">{{ userAdvertiserCompanyCeo }}</span>
        </div>
        <div>
          <span class="subject">{{ $t("mypage-myinfo-buaddr") }}</span>
          <span class="data">{{ userAdvertiserCompanyAddress1 }} {{ userAdvertiserCompanyAddress2 }}</span>
        </div>
        <div>
          <span class="subject">{{ $t("mypage-myinfo-type1") }}</span>
          <span class="data">{{ userAdvertiserCompanyTypeOfBusiness }}</span>
        </div>
        <div>
          <span class="subject">{{ $t("mypage-myinfo-type2") }}</span>
          <span class="data">{{ userAdvertiserCompanyIndustries }}</span>
        </div>
      </div>
      <div v-else class="box adInfo">
        <span>{{ $t("mypage-myinfo-alert") }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";

export default {
  mixins: [loading],
  data() {
    return {
      homepageUserName: "",
      homepageUserEmail: "",
      advertiserInfo: false,
      userAdvertiserCompanyCrNum: "",
      userAdvertiserLocalKind: "",
      userAdvertiserLocalKindName: "",
      userAdvertiserUserHp: "",
      userAdvertiserCompanyName: "",
      userAdvertiserCompanyCeo: "",
      userAdvertiserCompanyAddress1: "",
      userAdvertiserCompanyAddress2: "",
      userAdvertiserCompanyTypeOfBusiness: "",
      userAdvertiserCompanyIndustries: "",
      userAdvertiserSid: "",
      homepageUserSnsKind: "",
      sns: "",
    };
  },
  computed: {
    ...mapGetters("member", ["getMe", "getAdvertiserDetail"]),
  },
  watch: {
    homepageUserSnsKind(n) {
      if (n === "SYS21823B006") {
        this.sns = this.$t("mypage-myinfo-kakao");
      } else if (n === "SYS21823B005") {
        this.sns = this.$t("mypage-myinfo-naver");
      } else if (n === "SYS21823B007") {
        this.sns = this.$t("mypage-myinfo-google");
      } else if (n === "SYS22429B001") {
        this.sns = this.$t("mypage-myinfo-apple");
      } else if (n === "SYS22719B001") {
        this.sns = this.$t("mypage-myinfo-facebook");
      } else {
        this.sns = this.$t("mypage-myinfo-id");
      }
    },
  },
  async created() {
    try {
      bus.$emit("start:spinner");
      await this.$store.dispatch("member/ME");
      if (this.getMe.addtuneApiResult.errorCode == 200) {
        const info = this.getMe.addtuneApiResult.login;
        this.homepageUserName = info.homepageUserName;
        this.homepageUserEmail = info.homepageUserEmail;
        this.userAdvertiserSid = info.userAdvertiserSid;
        this.homepageUserSnsKind = info.homepageUserSnsKind;
        await this.$store.dispatch("member/ADVERTISER_DETAIL", this.userAdvertiserSid);
        if (this.getAdvertiserDetail.addtuneApiResult.errorCode == 200) {
          this.advertiserInfo = true;
          const advertiserInfo = this.getAdvertiserDetail.addtuneApiResult.userAdvertiser;
          this.userAdvertiserCompanyCrNum = advertiserInfo.userAdvertiserCompanyCrNum;
          this.userAdvertiserLocalKindName = advertiserInfo.userAdvertiserLocalKindName;
          this.userAdvertiserLocalKind = advertiserInfo.userAdvertiserLocalKind;
          this.userAdvertiserUserHp = advertiserInfo.userAdvertiserUserHp;
          this.userAdvertiserCompanyName = advertiserInfo.userAdvertiserCompanyName;
          this.userAdvertiserCompanyCeo = advertiserInfo.userAdvertiserCompanyCeo;
          this.userAdvertiserCompanyAddress1 = advertiserInfo.userAdvertiserCompanyAddress1;
          this.userAdvertiserCompanyAddress2 = advertiserInfo.userAdvertiserCompanyAddress2;
          this.userAdvertiserCompanyTypeOfBusiness = advertiserInfo.userAdvertiserCompanyTypeOfBusiness;
          this.userAdvertiserCompanyIndustries = advertiserInfo.userAdvertiserCompanyIndustries;
        } else {
          this.advertiserInfo = false;
        }
      } else {
        alert(this.getMe.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      bus.$emit("end:spinner");
    }
  },
  methods: {
    accountModify() {
      this.$router.push("/mypage/accountModify");
    },
    advertiserModify() {
      this.$router.push({ name: "advertiser_info_modify", params: { id: this.userAdvertiserSid, router: "default" } });
    },
    advertiserReg() {
      this.$router.push("/mypage/advertiserInfoInit");
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  @include NotoSans(3, 700, #333333);
}

.header {
  position: relative;
  display: flex;
  justify-content: space-between;

  & h2 {
    @include NotoSans(2.1, 500, #333333);
  }

  & a {
    @include NotoSans(1.5, 400, #828282);
    border: 1px solid #828282;
    height: 35px;
    border-radius: 5px;
    line-height: 33px;
    padding: 0 18px;
    position: absolute;
    right: 10px;
    top: 2px;
  }
}

.box {
  border-radius: 10px;
  background: #f6f6f6;
  padding: 30px 40px;
  margin-top: 20px;

  & > div {
    margin-top: 14px;

    & .subject {
      @include NotoSans(1.6, 400, #4f4f4f);
      width: 200px;
    }

    & .data {
      @include NotoSans(1.6, 700, #4f4f4f);

      &.pw {
        span {
          width: 5px;
          height: 5px;
          display: inline-block;
          border-radius: 50%;
          background: #4f4f4f;
          margin-right: 2px;
        }
      }
    }

    &:first-child {
      margin-top: 0;
    }
  }
}

.adInfo {
  text-align: center;
  height: 120px;
  cursor: pointer;
  @include NotoSans(1.6, 400, #4f4f4f);

  & span {
    margin-top: 18.5px;
  }
}
</style>
