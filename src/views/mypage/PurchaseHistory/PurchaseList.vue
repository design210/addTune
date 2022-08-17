<template>
  <div class="sub-wrapper mt100 mb100">
    <div class="d-flex pt20 pb20 tab-menu">
      <div :class="{ active: ad === true }" @click="tab(true)">{{ $t("purchase-list-adBuy") }}</div>
      <div :class="{ active: ad === false }" @click="tab(false)">{{ $t("purchase-list-videoContact") }}</div>
    </div>
    <!-- 광고 구매 상품 리스트 -->
    <section v-if="ad" class="wrap mt52">
      <section class="tab punched">
        <ul class="d-flex">
          <li :class="{ active: buyAdvertisingStatus === '' }" @click="filter('')">
            <div>{{ $t("purchase-list-all") }}</div>
            <div>{{ purchaseCount.countTotal }}</div>
          </li>
          <li :class="{ active: buyAdvertisingStatus === 'SYS21C10B002' }" @click="filter('SYS21C10B002')">
            <div>{{ $t("purchase-list-before") }}</div>
            <div>{{ purchaseCount.count1 }}</div>
          </li>
          <li :class="{ active: buyAdvertisingStatus === 'SYS21C10B003' }" @click="filter('SYS21C10B003')">
            <div>{{ $t("purchase-list-current") }}</div>
            <div>{{ purchaseCount.count2 }}</div>
          </li>
          <li :class="{ active: buyAdvertisingStatus === 'SYS21C10B004' }" @click="filter('SYS21C10B004')">
            <div>{{ $t("purchase-list-complete") }}</div>
            <div>{{ purchaseCount.count3 }}</div>
          </li>
          <li :class="{ active: buyAdvertisingStatus === 'SYS21C10B005' }" @click="filter('SYS21C10B005')">
            <div>{{ $t("purchase-list-cancel") }}</div>
            <div>{{ purchaseCount.count4 }}</div>
          </li>
        </ul>
        <div class="sort" @click="sort">
          <i><img alt="" src="@/assets/images/arrow_up_down.png" /></i>{{ latestSort === "DESC" ? $t("purchase-list-currentBuy") : $t("purchase-list-oldBuy") }}
        </div>
      </section>
      <section class="purchase-list">
        <ul v-if="purchaseList.length > 0 && view === true">
          <li v-for="item in purchaseList" :key="item.buyAdvertisingProductSid" :class="{ cancel: item.buyStatusCode === 'SYS21B19B006' }">
            <div class="d-flex align-center">
              <!-- 환불 처리 -->
              <section v-if="item.buyStatusCode === 'SYS21B19B006'">
                <div class="thumbnail refund">
                  <span class="none"><em v-html="$t('purchase-list-cancelComp')"></em></span>
                </div>
              </section>
              <!-- //환불 처리 -->
              <section v-else>
                <div class="thumbnail refund" v-if="item.buyAdvertisingStatus === 'SYS21C10B005'" :class="{ none: item.buyAdvertisingStatus === 'SYS21C10B005' }">
                  <span><em v-html="$t('purchase-list-cancelComp')"></em></span>
                </div>
                <div v-else>
                  <!-- 컨텐츠 업로드 -->
                  <div v-if="item.video === null" class="thumbnail" @click="$router.push('/mypage/adContents/adContentsList')" :class="{ upload: item.video === null }">
                    <div class="icon mt33"><img alt="" src="@/assets/images/plus_24.png" /></div>
                    <div class="text mt10">{{ $t("purchase-detail-upload") }}</div>
                  </div>
                  <!-- //컨텐츠 업로드 -->
                  <div
                    v-else
                    class="thumbnail active"
                    @click="
                      __showModalTemplate(
                        require('@/components/modal/Video'),
                        {
                          videoSid: item.video.videoSid,
                          videoTransSid: item.video.video_trans[0].videoTransSid,
                        },
                        1200,
                      )
                    "
                  >
                    <div>
                      <div v-if="item.video.video_trans[1] !== undefined">
                        <img :src="`${apiBaseUrl}/video/view/${item.video.videoSid}?videoTransSid=${item.video.video_trans[1].videoTransSid}`" alt="" />
                      </div>
                      <div v-else>
                        <img :src="`${apiBaseUrl}/video/view/${item.video.videoSid}?videoTransSid=${item.video.video_trans[0].videoTransSid}`" alt="" />
                      </div>
                      <div class="time">{{ item.time }}</div>
                    </div>
                  </div>
                </div>
              </section>
              <div class="ml25 info-wrap" @click="detail(item.buySid)">
                <p v-if="item.buyPaymentKindCode === 'SYS21B22B032' || item.buyPaymentKindCode === 'SYS21B22B033'">
                  <span v-if="item.buyStatusCode === 'SYS21B19B003' || item.buyStatusCode === 'SYS21C01B001'"
                    >{{ $date(item.buyDateTime).format("YYYY년 MM월 DD일") }} <span class="pay-checking">({{ $t("purchase-detail-depositCheck") }})</span></span
                  >
                  <span v-if="item.buyStatusCode === 'SYS21B19B004'">{{ $date(item.buyDateTime).format("YYYY년 MM월 DD일") }} {{ $t("purchase-detail-depositCopm") }}</span>
                  <span v-if="item.buyStatusCode === 'SYS21B19B006'">{{ $date(item.buyRefundDate).format("YYYY년 MM월 DD일") }} {{ $t("purchase-detail-cancelComp") }}</span>
                </p>
                <p v-if="item.buyPaymentKindCode === 'SYS21B22B030' || item.buyPaymentKindCode === 'SYS21B22B031'">
                  <em v-if="item.buyStatusCode === 'SYS21B19B006'">{{ $date(item.buyRefundDate).format("YYYY년 MM월 DD일") }} {{ $t("purchase-detail-cancelComp") }}</em>
                  <span v-else>{{ $date(item.buyDateTime).format("YYYY년 MM월 DD일") }} {{ $t("purchase-detail-payComp") }}</span>
                </p>
                <p class="campaign">{{ item.campaignName }}</p>
                <p class="name">{{ item.advertisingProductName }}</p>
              </div>
              <div
                :class="{
                  before: item.buyAdvertisingStatus === 'SYS21C10B002',
                  current: item.buyAdvertisingStatus === 'SYS21C10B003',
                  after: item.buyAdvertisingStatus === 'SYS21C10B004',
                  cancel: item.buyStatusCode === 'SYS21B19B006',
                }"
                class="status"
              >
                {{ item.buyAdvertisingStatusName }}
              </div>
              <div class="price">{{ __localeString(item.buyPrice) }}원</div>
            </div>
          </li>
        </ul>
        <ul v-else-if="purchaseList.length === 0 && view === true">
          <li class="none-data">
            <h2 class="mt105">{{ $t("purchase-list-notYet") }}</h2>
            <div class="comment mt15">{{ $t("purchase-list-fast") }}</div>
            <div class="btn-wrap mt96 mb200">
              <button type="button" @click="$router.push('/ad/adMain')">{{ $t("button-makeAd") }}</button>
            </div>
          </li>
        </ul>
        <div class="text-center mt30">
          <v-pagination v-model="page" :length="len" :total-visible="10"></v-pagination>
        </div>
        <section class="notice-wrap mt66 pt60">
          <h3 v-html="$t('purchase-list-customer')"></h3>

          <h4 class="mt30">{{ $t("purchase-list-adCancel") }}</h4>
          <ul class="mt5">
            <li>{{ $t("purchase-list-adCancelInfo1") }}</li>
            <li>{{ $t("purchase-list-adCancelInfo2") }}</li>
            <li>{{ $t("purchase-list-adCancelInfo3") }}</li>
          </ul>
          <h4 class="mt30">{{ $t("purchase-list-refundStandard") }}</h4>
          <ul class="mt5">
            <li v-html="$t('purchase-list-refundInfo1')"></li>
            <li>{{ $t("purchase-list-refundInfo2") }}</li>
            <li>{{ $t("purchase-list-refundInfo3") }}</li>
          </ul>
          <h4 class="mt30">{{ $t("purchase-list-responsibility") }}</h4>
          <ul class="mt5">
            <li v-html="$t('purchase-list-responsibilityInfo')"></li>
          </ul>
        </section>
      </section>
    </section>
    <!-- //광고 구매 상품 리스트 -->
    <!-- 영상 구매 상품 리스트 -->
    <section v-else class="wrap mt52">
      <section class="tab">
        <ul class="d-flex">
          <li :class="{ active: buyAdvertisingProductVideoStatus === '' }" @click="filterVideo('')">
            <div>{{ $t("purchase-list-all") }}</div>
            <div>{{ videoCount.countTotal }}</div>
          </li>
          <li :class="{ active: buyAdvertisingProductVideoStatus === 'SYS21C23B002' }" @click="filterVideo('SYS21C23B002')">
            <div>{{ $t("purchase-list-beforeWork") }}</div>
            <div>{{ videoCount.count1 }}</div>
          </li>
          <li :class="{ active: buyAdvertisingProductVideoStatus === 'SYS21C23B003' }" @click="filterVideo('SYS21C23B003')">
            <div>{{ $t("purchase-list-currentWork") }}</div>
            <div>{{ videoCount.count2 }}</div>
          </li>
          <li :class="{ active: buyAdvertisingProductVideoStatus === 'SYS21C23B004' }" @click="filterVideo('SYS21C23B004')">
            <div>{{ $t("purchase-list-completeWork") }}</div>
            <div>{{ videoCount.count3 }}</div>
          </li>
          <li :class="{ active: buyAdvertisingProductVideoStatus === 'SYS21C23B005' }" @click="filterVideo('SYS21C23B005')">
            <div>{{ $t("purchase-list-cancel") }}</div>
            <div>{{ videoCount.count4 }}</div>
          </li>
        </ul>
        <div v-if="videoList.length > 0" class="sort" @click="sortVideo">
          <i><img alt="" src="@/assets/images/arrow_up_down.png" /></i>{{ $t("purchase-list-currentBuy") }}
        </div>
      </section>
      <section class="purchase-list">
        <ul v-if="videoList.length > 0 && viewVideo === true">
          <li v-for="item in videoList" :key="item.buyAdvertisingProductVideoSid" :class="{ cancel: item.buyAdvertisingProductVideoStatus === 'SYS21C23B005' }">
            <div class="d-flex align-center">
              <section v-if="item.buyStatusCode === 'SYS21B19B006'">
                <div class="thumbnail">
                  <span class="none"><em v-html="$t('purchase-list-cancelComp')"></em></span>
                </div>
              </section>
              <section v-else>
                <div v-if="item.advertising_product.advertising_product_video_trans === null" class="thumbnail">
                  <div class="text mt40">{{ $t("purchase-list-makingVideo") }}</div>
                </div>
                <div
                  v-else
                  class="thumbnail active"
                  @click="
                    __showModalTemplate(
                      require('@/components/modal/Video'),
                      {
                        videoSid: item.advertising_product.advertising_product_video_trans.video.videoSid,
                        videoTransSid: item.advertising_product.advertising_product_video_trans.video.video_trans[0].videoTransSid,
                      },
                      1200,
                    )
                  "
                >
                  <div v-for="file in item.advertising_product.advertising_product_video_trans.video.video_trans" :key="file.videoTransSid">
                    <span v-if="file.videoTransKind === 'SYS21C21B016'">
                      <img :src="`${apiBaseUrl}/video/view/${file.videoSid}?videoTransSid=${file.videoTransSid}`" alt="" />
                    </span>
                    <div class="time">{{ item.time }}</div>
                  </div>
                </div>
              </section>
              <div class="ml25 info-wrap" @click="videoDetail(item.buySid)">
                <p v-if="item.buyPaymentKindCode === 'SYS21B22B032' || item.buyPaymentKindCode === 'SYS21B22B033'">
                  <span v-if="item.buyStatusCode === 'SYS21B19B003' || item.buyStatusCode === 'SYS21C01B001'"
                    >{{ $date(item.buyDateTime).format("YYYY년 MM월 DD일") }} <span class="pay-checking">({{ $t("purchase-detail-depositCheck") }})</span></span
                  >
                  <span v-if="item.buyStatusCode === 'SYS21B19B004'">{{ $date(item.buyDateTime).format("YYYY년 MM월 DD일") }} {{ $t("purchase-detail-depositCopm") }}</span>
                  <em v-if="item.buyStatusCode === 'SYS21B19B006'">{{ $date(item.buyRefundDate).format("YYYY년 MM월 DD일") }} {{ $t("purchase-detail-cancelComp") }}</em>
                </p>
                <p v-if="item.buyPaymentKindCode === 'SYS21B22B030' || item.buyPaymentKindCode === 'SYS21B22B031'">
                  <em v-if="item.buyStatusCode === 'SYS21B19B006'">{{ $date(item.buyRefundDate).format("YYYY년 MM월 DD일") }} {{ $t("purchase-detail-cancelComp") }}</em>
                  <span v-else>{{ $date(item.buyDateTime).format("YYYY년 MM월 DD일") }} {{ $t("purchase-detail-payComp") }}</span>
                </p>
                <p class="campaign">{{ item.advertisingProductName }}</p>
              </div>
              <div
                :class="{
                  before: item.buyAdvertisingProductVideoStatus === 'SYS21C23B002',
                  current: item.buyAdvertisingProductVideoStatus === 'SYS21C23B003',
                  after: item.buyAdvertisingProductVideoStatus === 'SYS21C23B004',
                  cancel: item.buyAdvertisingProductVideoStatus === 'SYS21C23B005',
                }"
                class="status"
              >
                {{ item.buyAdvertisingProductVideoStatusName }}
              </div>
              <div class="price">{{ __localeString(item.buyPrice) }}원</div>
            </div>
          </li>
        </ul>
        <ul v-else-if="videoList.length === 0 && viewVideo === true">
          <li class="none-data">
            <h2 class="mt105">{{ $t("purchase-list-notMakeVideo") }}</h2>
            <div class="comment mt15">{{ $t("purchase-list-csLab") }}</div>
            <div class="btn-wrap mt96 mb200">
              <button type="button" @click="$router.push('/ad/productList')">{{ $t("button-goMake") }}</button>
            </div>
          </li>
        </ul>
        <div class="text-center mt30">
          <v-pagination v-model="pageVideo" :length="lenVideo" :total-visible="10"></v-pagination>
        </div>
        <section class="notice-wrap mt66 pt60">
          <h3 v-html="$t('purchase-list-customer')"></h3>
          <h4 class="mt30">{{ $t("purchase-list-refundBasic") }}</h4>
          <ul class="mt5">
            <li>{{ $t("purchase-list-refundBasicInfo1") }}</li>
            <li>{{ $t("purchase-list-refundBasicInfo2") }}</li>
            <li>{{ $t("purchase-list-refundBasicInfo3") }}</li>
          </ul>
          <h4 class="mt30">{{ $t("purchase-list-refundGuide") }}</h4>
          <h5 class="mt5">{{ $t("purchase-list-refundGuideTitle1") }}</h5>
          <ul class="mt5">
            <li>{{ $t("purchase-list-refundVideoInfo1") }}</li>
            <li>{{ $t("purchase-list-refundVideoInfo2") }}</li>
            <li>{{ $t("purchase-list-refundVideoInfo3") }}</li>
            <li>{{ $t("purchase-list-refundVideoInfo4") }}</li>
          </ul>
          <h5 class="mt10">{{ $t("purchase-list-refundGuideTitle2") }}</h5>
          <ul class="mt5">
            <li>{{ $t("purchase-list-refundVideoInfo1") }}</li>
            <li>{{ $t("purchase-list-refundVideoInfo3") }}</li>
            <li>{{ $t("purchase-list-refundVideoInfo4") }}</li>
          </ul>
          <h4 class="mt30">{{ $t("purchase-list-responsibility") }}</h4>
          <ul class="mt5">
            <li>{{ $t("purchase-list-responsibilityVideo1") }}</li>
            <li>{{ $t("purchase-list-responsibilityVideo2") }}</li>
          </ul>
          <h4 class="mt30">{{ $t("purchase-list-client") }}</h4>
          <ul class="mt5">
            <li>{{ $t("purchase-list-clientInfo") }}</li>
          </ul>
        </section>
      </section>
      <!-- //영상 구매 상품 리스트 -->
    </section>
  </div>
</template>

<script>
import localeString from "@/mixins/localeString";
import { mapGetters } from "vuex";
import showModal from "@/mixins/showModal";
import loading from "@/mixins/loading";
import bus from "@/utils/bus";

export default {
  mixins: [showModal, loading, localeString],
  props: ["apiBaseUrl"],
  data() {
    return {
      pageVideo: 1,
      sizeVideo: 5,
      lenVideo: null,
      page: 1,
      size: 5,
      len: null,
      purchaseCount: {
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
      },
      purchaseList: [],
      buyAdvertisingStatus: "",
      ad: true,
      videoCount: {
        count1: 0,
        count2: 0,
        count3: 0,
        count4: 0,
      },
      videoList: [],
      buyAdvertisingProductVideoStatus: "",
      latestSort: "DESC",
      latestSortVideo: "DESC",
      view: false,
      viewVideo: false,
      routerStatus: "",
    };
  },
  computed: {
    ...mapGetters("purchase", ["getPurchaseList", "getVideoPurchaseList"]),
  },
  watch: {
    page() {
      this.reload();
    },
    latestSort() {
      this.reload();
    },
    pageVideo() {
      this.videoReload();
    },
    latestSortVideo() {
      this.videoReload();
    },
  },
  mounted() {
    this.reload();
    this.videoReload();
    //탭 활성
    if (this.$route.params.status === "ing") {
      this.filter("SYS21C10B003");
      const tab = document.querySelectorAll(".tab.punched li");
      tab.forEach(ele => {
        ele.classList.remove("active");
      });
      document.querySelector(".tab.punched li:nth-child(3)").classList.add("active");
    }
  },
  methods: {
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("purchase/PURCHASE_LIST", {
          page: this.page,
          size: this.size,
          buyAdvertisingStatus: this.buyAdvertisingStatus,
          latestSort: this.latestSort,
        });
        if (this.getPurchaseList.addtuneApiResult.errorCode == 200) {
          const PurchaseInfo = this.getPurchaseList.addtuneApiResult.paymentList.buyInfo;
          PurchaseInfo.forEach(ele => {
            if (ele.sysCodeSid === "SYS21C10B002") {
              this.purchaseCount.count1 = ele.statusCount;
            }
            if (ele.sysCodeSid === "SYS21C10B003") {
              this.purchaseCount.count2 = ele.statusCount;
            }
            if (ele.sysCodeSid === "SYS21C10B004") {
              this.purchaseCount.count3 = ele.statusCount;
            }
            if (ele.sysCodeSid === "SYS21C10B005") {
              this.purchaseCount.count4 = ele.statusCount;
            }
            this.purchaseCount.countTotal = this.purchaseCount.count1 + this.purchaseCount.count2 + this.purchaseCount.count3 + this.purchaseCount.count4;
          });
          this.getPurchaseList.addtuneApiResult.paymentList.buyList.data.forEach(ele => {
            ele.buyDateTime = this.$date(ele.buyDateTime).utc().local().format();
            ele.minute = parseInt((ele.buyAdvertisingContentLength % 3600) / 60);
            ele.second = ele.buyAdvertisingContentLength % 60;
            if (ele.minute === 0) {
              ele.minute = "00";
            }
            ele.time = ele.minute + ":" + ele.second;
          });
          this.purchaseList = this.getPurchaseList.addtuneApiResult.paymentList.buyList.data;
          this.len = this.getPurchaseList.addtuneApiResult.paymentList.buyList.last_page;
          this.view = true;
        } else {
          this.alim(this.getPurchaseList.addtuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    async videoReload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("purchase/VIDEO_PURCHASE_LIST", {
          page: this.pageVideo,
          size: this.sizeVideo,
          buyAdvertisingProductVideoStatus: this.buyAdvertisingProductVideoStatus,
          latestSort: this.latestSortVideo,
        });
        if (this.getVideoPurchaseList.addtuneApiResult.errorCode == 200) {
          const videoInfo = this.getVideoPurchaseList.addtuneApiResult.paymentList.buyInfo;
          videoInfo.forEach(ele => {
            if (ele.sysCodeSid === "SYS21C23B002") {
              this.videoCount.count1 = ele.statusCount;
            }
            if (ele.sysCodeSid === "SYS21C23B003") {
              this.videoCount.count2 = ele.statusCount;
            }
            if (ele.sysCodeSid === "SYS21C23B004") {
              this.videoCount.count3 = ele.statusCount;
            }
            if (ele.sysCodeSid === "SYS21C23B005") {
              this.videoCount.count4 = ele.statusCount;
            }
            this.videoCount.countTotal = this.videoCount.count1 + this.videoCount.count2 + this.videoCount.count3 + this.videoCount.count4;
          });
          this.getVideoPurchaseList.addtuneApiResult.paymentList.buyList.data.forEach(ele => {
            ele.buyDateTime = this.$date(ele.buyDateTime).utc().local().format();
            ele.minute = parseInt((ele.buyAdvertisingProductVideoLengthName % 3600) / 60);
            ele.second = ele.buyAdvertisingProductVideoLengthName % 60;
            if (ele.minute === 0) {
              ele.minute = "00";
            }
            ele.time = ele.minute + ":" + ele.second;
          });
          this.videoList = this.getVideoPurchaseList.addtuneApiResult.paymentList.buyList.data;
          this.lenVideo = this.getVideoPurchaseList.addtuneApiResult.paymentList.buyList.last_page;
          this.viewVideo = true;
        } else {
          this.alim(this.getVideoPurchaseList.addtuneApiResult.errorMessage, this.errorColor);
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    tab(status) {
      if (status === true) {
        this.ad = true;
        this.filter("");
      } else {
        this.ad = false;
        this.filterVideo("");
      }
    },
    sort() {
      this.latestSort === "DESC" ? (this.latestSort = "ASC") : (this.latestSort = "DESC");
    },
    sortVideo() {
      this.latestSortVideo === "DESC" ? (this.latestSortVideo = "ASC") : (this.latestSortVideo = "DESC");
    },
    detail(id) {
      if (this.routerStatus !== "") {
        this.$router.push({ path: `/mypage/purchase/adDetail/${id}`, query: { status: "ing" } });
      } else {
        this.$router.push(`/mypage/purchase/adDetail/${id}`);
      }
    },
    videoDetail(id) {
      this.$router.push(`/mypage/purchase/videoDetail/${id}`);
    },
    filter(id) {
      this.buyAdvertisingStatus = id;
      this.latestSort = "DESC";
      this.page = 1;
      this.reload();
      id === "SYS21C10B003" ? (this.routerStatus = "ing") : (this.routerStatus = "");
    },
    filterVideo(id) {
      this.buyAdvertisingProductVideoStatus = id;
      this.pageVideo = 1;
      this.videoReload();
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-menu {
  display: flex;
  border-bottom: 2px solid #ff4d56;
  padding: 0 !important;

  & > div {
    @include NotoSans(1.6, 500, #bdbdbd);
    width: 180px;
    height: 42px;
    line-height: 42px !important;
    text-align: center;
    border-top: 1px solid #bdbdbd;
    border-left: 1px solid #bdbdbd;
    border-right: 1px solid #bdbdbd;
    border-radius: 5px 5px 0 0;
    margin-left: -1px;
    cursor: pointer;
    position: relative;

    &.active {
      @include NotoSans(1.6, 700, #fff);
      line-height: 42px !important;
      background: #ff4d56;
      border: 0;
      z-index: 2;
    }

    &:first-child {
      margin-left: 0;
    }
  }
}
.wrap {
  width: 100%;

  & .tab {
    display: flex;
    justify-content: space-between;

    & ul {
      width: 100%;
      height: 55px;
      background: #f2f2f2;
      display: flex;
      justify-content: space-between;
      border-radius: 28px;
      padding: 5px !important;

      & li {
        @include NotoSans(1.7, 400, #828282);
        cursor: pointer;
        line-height: 45px !important;
        text-align: center;
        width: 20%;
        display: flex;
        justify-content: center;

        &.active {
          background: #fff;
          border-radius: 25px;
          @include boxshadow(4px, 0px, 10px, 0px, rgba(0, 0, 0, 0.1));
          color: #4f4f4f !important;
        }

        & > div {
          &:first-child {
            margin-right: 5px;
          }
        }
      }
    }

    & .sort {
      white-space: nowrap;
      line-height: 55px;
      margin-left: 22px;
      cursor: pointer;

      & i {
        & img {
          vertical-align: -5px;
          margin-right: 5px;
        }
      }
    }
  }
}

.purchase-list {
  & ul {
    margin-top: 48px;

    & li {
      border: 1px solid #e0e0e0;
      margin-bottom: 15px;
      padding: 22px 28px;
      border-radius: 4px;

      &:last-child {
        margin-bottom: 0;
      }

      & .thumbnail {
        border-radius: 4px;
        width: 178px;
        height: 100px;
        overflow: hidden;
        position: relative;
        &.upload {
          border: 1px solid #828282;
        }
        &.refund {
          cursor: default !important;
        }
        &.active {
          &:after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: url("../../../assets/images/play.png") no-repeat;
            width: 20px;
            height: 22px;
            background-size: 100%;
          }
        }
        & span {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          &.none {
            background: #f2f2f2;
          }
          & em {
            @include NotoSans(1.4, 400, #828282);
            font-style: normal;
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            width: 100%;
            padding-top: 27px;
          }
        }

        & .time {
          position: absolute;
          right: 6px;
          bottom: 6px;
          @include NotoSans(1.1, 500, #fff);
          background: rgba(0, 0, 0, 0.5);
          padding: 0 5px;
          height: 20px;
          line-height: 20px !important;
        }

        cursor: pointer;

        & img {
          width: 100%;
          height: 100px;
        }

        & .icon {
          text-align: center;

          & img {
            width: 24px;
            height: 24px;
          }
        }

        & .text {
          text-align: center;
          @include NotoSans(1.1, 400, #bdbdbd);
        }
      }

      & .info-wrap {
        cursor: pointer;
        width: 370px;

        & .date {
          @include NotoSans(1.4, 400, #828282);
        }

        & .campaign {
          @include NotoSans(2, 400, #4f4f4f);
        }

        & .name {
          @include NotoSans(1.6, 500, #828282);
        }
      }

      & .status {
        padding: 0 20px;
        width: 110px;
        white-space: nowrap;

        &.before {
          @include NotoSans(1.5, 500, #828282);
        }

        &.current {
          @include NotoSans(1.5, 500, #ff0000);
        }

        &.after {
          @include NotoSans(1.5, 500, #0047ff);
        }

        &.cancel {
          @include NotoSans(1.5, 500, #bdbdbd);
        }
      }

      & .price {
        @include NotoSans(1.6, 500, #4f4f4f);
        text-align: right;
        width: 150px;
      }

      &.cancel {
        & .info-wrap {
          & .date {
            color: #bdbdbd !important;
          }

          & .campaign {
            color: #bdbdbd !important;
            text-decoration: line-through;
          }

          & .name {
            color: #bdbdbd !important;
            text-decoration: line-through;
          }
          & span {
            color: #bdbdbd !important;
            text-decoration: line-through;
          }
          & em {
            font-style: normal;
          }
        }

        & .price {
          color: #bdbdbd !important;
          text-decoration: line-through;
        }
      }
    }
  }

  & .none-data {
    border: 0;

    & h2 {
      @include NotoSans(3, 500, #4f4f4f);
      text-align: center;
    }

    & .comment {
      @include NotoSans(2, 400, #4f4f4f);
      text-align: center;
    }

    & .btn-wrap {
      text-align: center;

      & button {
        height: 70px;
        padding: 0 50px;
        @include NotoSans(2.5, 700, #fff);
        background: #ff4d56;
      }
    }
  }
}

.notice-wrap {
  border-top: 2px solid #ff4d56;

  & h3 {
    @include NotoSans(1.8, 500, #4f4f4f);
  }

  & h4 {
    @include NotoSans(1.5, 500, #4f4f4f);
  }

  & h5 {
    @include NotoSans(1.5, 400, #4f4f4f);
  }

  & ul {
    margin-top: 0;

    & li {
      border: 0;
      padding: 0;
      color: #828282;
      margin-bottom: 0;
      padding-left: 20px;
      position: relative;

      &:after {
        content: "";
        position: absolute;
        left: 10px;
        top: 9px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: #828282;
      }
    }
  }
}
</style>
