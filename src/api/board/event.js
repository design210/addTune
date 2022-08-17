import { createInstanceWithAuth } from "../index";

function getEventList(data) {
  const params = {
    size: data.size,
    page: data.page,
    eventKind: data.eventKind,
  };
  return createInstanceWithAuth("/event/list", {}, params).get();
}

function getEventDetail(id) {
  return createInstanceWithAuth(`/event/${id}`, {}, {}).get();
}

function tuneEvent(data) {
  const frm = new FormData();
  frm.append("channeltuneFiles[]", data.channeltuneFiles);
  frm.append("tuneEventMasterSid", 2);
  frm.append("tuneEventTrans_text01", data.name);
  frm.append("tuneEventTrans_text02", data.birth);
  frm.append("tuneEventTrans_text03", data.pNum);
  frm.append("tuneEventTrans_text04", data.email);
  return createInstanceWithAuth(`/tuneevent`, frm, {}).post();
}
export { getEventList, getEventDetail, tuneEvent };
