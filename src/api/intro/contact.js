import axios from "axios";

async function setContact(data) {
  var frm = new FormData();
  frm.append("inquireKind", data.inquireKind);
  frm.append("inquireStatus", data.inquireStatus);
  frm.append("inquireName", data.inquireName);
  frm.append("inquireEmail", data.inquireEmail);
  frm.append("inquireHp", data.inquireHp);
  frm.append("inquireCompanyName", data.inquireCompanyName);
  frm.append("inquireCompanyAddress", data.inquireCompanyAddress);
  frm.append("inquireBusinessCategory", data.inquireBusinessCategory);
  frm.append("inquireOther", data.inquireOther);
  frm.append("inquireChoice", data.inquireChoice);
  frm.append("inquireWhenother", data.inquireWhenother);
  if (data.channeltuneFiles.length > 0) {
    data.channeltuneFiles.forEach(row => {
      frm.append("channeltuneFiles[]", row);
    });
  }
  frm.append("inquireKnowTune", data.inquireKnowTune);
  try {
    axios.post(`${process.env.VUE_APP_API}/inquire/homepage`, frm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.log("error :", error);
  }
}
export { setContact };
