<template>
  <div class="contents-wrapper sub-wrapper">
    <h1>{{ $t("board-event") }}</h1>
    <div class="tab mt60">
      <span :class="{ active: this.eventKind === 'START' }" @click="kind('START')">{{ $t("board-ing") }}</span>
      <span :class="{ active: this.eventKind === 'END' }" @click="kind('END')">{{ $t("board-end") }}</span>
      <span :class="{ active: this.eventKind === 'REPORT' }" @click="kind('REPORT')">{{ $t("board-eventNotice") }}</span>
    </div>
    <ul class="mt22 event-list">
      <li v-for="item in list" :key="item.boardEventSid" :class="`id-${item.boardEventSid}`" @click="boardDetail({ id: item.boardEventSid, contents: item.boardEventResource })">
        <div class="subject">
          <span v-if="item.boardEventTopFlag === 'Y'">{{ $t("board-event") }}</span>
          <span v-else class="num">{{ item.boardEventSid }}</span>
          <span :class="{ flag: item.boardEventTopFlag === 'Y' }">{{ item.boardEventTitle }}</span>
          <span>{{ item.boardEventStartDateTime.substr(0, 10) }} ~ {{ item.boardEventEndDateTime.substr(0, 10) }}</span>
        </div>
        <div v-if="eventKind === 'START'">
          <div class="contents">
            <iframe :src="iframeSrc" class="frame" frameborder="0" height="800px" scrolling="yes" width="100%"></iframe>
            <div v-if="isLoaded === false" class="loader">
              <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="eventKind === 'REPORT' && item.boardEventContentReport !== null" class="contents">
          <div v-html="item.boardEventContentReport"></div>
          <div class="files">
            <ul>
              <li v-for="item in file" :key="item.fileSid">
                <span @click="__fileDownload({ id: item.fileSid, fileExt: item.fileExt, name: item.fileFileName })">{{ item.fileFileName }} </span>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="eventKind === 'END' && item.boardEventContentEnd !== null" class="contents">
          <div v-html="item.boardEventContentEnd"></div>
        </div>
      </li>
    </ul>
    <div v-if="list.length === 0 && eventKind === 'START'" class="tbl-no-data">{{ $t("board-eventAlert1") }}</div>
    <div v-if="list.length === 0 && eventKind === 'END'" class="tbl-no-data">{{ $t("board-eventAlert2") }}</div>
    <div v-if="list.length === 0 && eventKind === 'REPORT'" class="tbl-no-data">{{ $t("board-eventAlert3") }}</div>
    <div class="text-center mt30">
      <v-pagination v-model="page" :length="len" :total-visible="10"></v-pagination>
    </div>
  </div>
</template>

<script>
import loading from "@/mixins/loading";
import bus from "@/utils/bus";
import { mapGetters } from "vuex";
import fileUploadMixin from "@/mixins/fileUpload";

export default {
  mixins: [loading, fileUploadMixin],
  data() {
    return {
      size: 10,
      page: 1,
      len: null,
      list: [],
      eventKind: "START",
      file: [],
      selected: "",
      childHeight: null,
      iframeSrc: "",
      isLoaded: false,
    };
  },
  computed: {
    ...mapGetters("event", ["getEventList", "getEventDetail"]),
  },
  watch: {
    page() {
      this.reload();
    },
    eventKind() {
      this.reload();
    },
  },
  mounted() {
    this.reload();
    document.addEventListener("click", this.toggleList);
    window.addEventListener("message", e => {
      if (e.data.functionName) {
        this.isLoaded = true;
      }
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", this.toggleList);
  },
  methods: {
    toggleList(e) {
      if (this.$route.name === "eventList") {
        const data = this.hasClass(e.target, "event-list");
        if (data !== undefined) {
          const list = document.querySelectorAll(`.event-list li:not(.${data.id})`);
          list.forEach(ele => {
            ele.classList.remove("active");
          });
          if (data.ele !== undefined) {
            console.log(data.ele);
            if (data.ele.classList.contains("active")) {
              data.ele.classList.remove("active");
            } else {
              data.ele.classList.add("active");
            }
          }
        }
      }
    },
    hasClass(elem, className) {
      if (elem.closest("." + className)) {
        const DOMTockenList = elem.closest("ul").classList.value;
        const selectedId = elem.closest("li").classList[0];
        if (DOMTockenList.includes(className)) {
          return { ele: elem.closest("li"), id: selectedId };
        }
      }
    },
    async reload() {
      try {
        bus.$emit("start:spinner");
        await this.$store.dispatch("event/EVENT_LIST", {
          page: this.page,
          size: this.size,
          eventKind: this.eventKind,
        });
        if (this.getEventList.addtuneApiResult.errorCode == 200) {
          const list = this.getEventList.addtuneApiResult.boardEvent;
          this.list = list.data;
          if (this.list.length > 0) {
            this.list.forEach(ele => {
              ele.boardEventStartDateTime = this.$date(ele.boardEventStartDateTime).utc().format("YYYY-MM-DD HH:mm:ss");
              ele.boardEventEndDateTime = this.$date(ele.boardEventEndDateTime).utc().format("YYYY-MM-DD HH:mm:ss");
            });
          }
          this.len = list.last_page;
          const id = parseInt(this.$route.params.id);
          if (typeof id === "number") {
            const eventSrc = this.list.map(ele => {
              if (ele.boardEventSid === id) {
                return ele.boardEventResource;
              }
            });
            await this.boardDetail({ id, contents: eventSrc[0] });
            setTimeout(() => {
              const item = document.querySelector(`.id-${id}`);
              if (item !== null) {
                item.classList.add("active");
              }
            }, 100);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        bus.$emit("end:spinner");
      }
    },
    kind(status) {
      this.eventKind = status;
    },
    async boardDetail(data) {
      if (data.contents !== undefined) {
        if (this.eventKind === "START") {
          this.isLoaded = false;
          this.iframeSrc = data.contents;
        } else {
          if (data.id !== this.selected) {
            try {
              bus.$emit("start:spinner");
              await this.$store.dispatch("event/EVENT_DETAIL", data.id);
              if (this.getEventDetail.addtuneApiResult.errorCode === 200) {
                this.selected = data.id;
                if (this.eventKind === "REPORT") {
                  if (this.getEventDetail.addtuneApiResult.boardEvent.fileResult.length > 0) {
                    this.file = this.getEventDetail.addtuneApiResult.boardEvent.fileResult;
                  }
                }
              }
            } catch (error) {
              console.log(error);
            } finally {
              bus.$emit("end:spinner");
            }
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  @include NotoSans(2.5, 700, #333333);
}

.tab {
  text-align: left;
  justify-content: flex-start;

  & span {
    margin-right: 30px;
    cursor: pointer;
    @include NotoSans(1.6, 400, #828282);

    &.active {
      color: #ff4d56;
      font-weight: 700;
    }
  }
}

.event-list {
  border-top: 2px solid #ff4d56;

  & li {
    border-bottom: 1px solid #dddddd;
    padding: 15px 0;
    cursor: pointer;

    & .subject {
      & span {
        &:nth-child(1) {
          @include NotoSans(1.6, 700, #333333);
          padding-left: 30px;
          width: 130px;

          &.num {
            @include Montserrat(1.6, 700, #333333);
          }
        }

        &:nth-child(2) {
          font-size: 1.6rem;
          color: #333333;
          width: calc(100% - 340px);
        }

        &:nth-child(3) {
          @include Montserrat(1.6, 600, #828282);
          width: 210px;
          text-align: right;
          padding-right: 15px;
          white-space: nowrap;
        }

        &.flag {
          font-weight: 700;
        }
      }
    }

    & .contents {
      width: calc(100% - 230px);
      margin-left: 130px;
      font-size: 1.5rem;
      color: #000;
      margin-top: 20px;
      margin-bottom: 20px;
      display: none;
      position: relative;
      & .files {
        margin-top: 20px;

        & li {
          @include NotoSans(1.4, 400, #828282);
          border: 0;
          padding: 0;
          margin-bottom: 5px;
        }
      }
    }

    &.active {
      background: rgba(241, 92, 92, 0.03);

      & .contents {
        display: block;
      }

      & .subject {
        & span:nth-child(2) {
          font-weight: 700;
        }
      }
    }
  }
}
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  top: -40px;
}

.lds-roller {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%);
}

.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}

.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ff6600;
  margin: -4px 0 0 -4px;
}

.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}

.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}

.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}

.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}

.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}

.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}

.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}

.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}

.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}

.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}

.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}

.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}

.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}

.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}

.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}

.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}

@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
