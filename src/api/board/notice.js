import { createInstanceWithAuth } from "../index";

function noticeList(data) {
  const params = {
    size: data.size,
    page: data.page,
  };
  return createInstanceWithAuth("/notice/list", {}, params).get();
}

export { noticeList };
