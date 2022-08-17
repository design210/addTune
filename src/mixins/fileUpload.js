import { fileDownload } from "@/utils/fileDownload";
let fileUpload = {
  data() {
    return {
      DELETE_ALL_FILES: false,
    };
  },
  methods: {
    //파일 업로드
    __uploadFiles(data) {
      this.channeltuneFiles = data;
    },
    //파일 전체 삭제
    __deleteAllChip() {
      this.DELETE_ALL_FILES = !this.DELETE_ALL_FILES;
    },
    //파일다운로드
    __fileDownload(data) {
      fileDownload(data);
    },
  },
};
export default fileUpload;
