import { createInstanceWithAuth } from "../index";

function getFaqList(data) {
  const params = {
    size: data.size,
    page: data.page,
    boardCategorySids: data.boardCategorySids,
    searchText: data.searchText,
  };
  return createInstanceWithAuth("/faq/list", {}, params).get();
}

function getFaqDetail(id) {
  return createInstanceWithAuth(`/faq/${id}`, {}, {}).get();
}
//
export { getFaqList, getFaqDetail };
