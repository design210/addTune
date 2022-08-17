import { createInstanceWithAuth } from "../index";

function pressList(data) {
  const params = {
    size: data.size,
    page: data.page,
  };
  return createInstanceWithAuth("/news/list", {}, params).get();
}

export { pressList };
