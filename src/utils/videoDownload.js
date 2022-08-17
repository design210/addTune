import axios from "axios";
import bus from "@/utils/bus";
export default function videoDownload(data, contents) {
  bus.$emit("start:spinner");
  axios({
    url: contents !== true ? `${process.env.VUE_APP_API}/video/view/${data.id}` : `${process.env.VUE_APP_API}/advertisementContents/download/${data.id}`,
    method: "GET",
    responseType: "blob",
  }).then(response => {
    var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement("a");
    fileLink.href = fileUrl;
    fileLink.setAttribute("download", `${data.name}`);
    document.body.appendChild(fileLink);
    fileLink.click();
    bus.$emit("end:spinner");
  });
}
