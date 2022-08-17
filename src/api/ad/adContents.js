import { createInstanceWithAuth } from "../index";

function getAdContents(data) {
  let params = {
    size: data.size,
    page: data.page,
    buyAdvertisingStatus: data.buyAdvertisingStatus,
  };
  return createInstanceWithAuth("/advertisementContents/list", {}, params).get();
}

function getAdContentsDetail(id) {
  return createInstanceWithAuth(`/advertisementContents/${id}`, {}, {}).get();
}

function downloadAdContents(id) {
  return createInstanceWithAuth(`/advertisementContents/download/${id}`, {}, {}).get();
}

function deleteAdContents(id) {
  return createInstanceWithAuth(`/advertisementContents/${id}`, {}, {}).delete();
}

function uploadContents(data, commit) {
  const frm = new FormData();
  frm.append("channeltuneFiles[]", data.channeltuneFiles);
  return createInstanceWithAuth(`/advertisementContents/upload/${data.id}`, frm, {}, commit).post();
}

function tuneStoreDetail(data) {
  let params = {
    advertiseStartDate: data.advertiseStartDate,
    advertiseEndDate: data.advertiseEndDate,
    slotCount: data.slotCount,
  };
  return createInstanceWithAuth(`/search/tuneStore/${data.id}`, {}, params).get();
}
export { getAdContents, getAdContentsDetail, downloadAdContents, deleteAdContents, uploadContents, tuneStoreDetail };
