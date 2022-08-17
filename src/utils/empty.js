function isEmpty(value) {
  if (value === "null") {
    return "";
  } else {
    return value ?? "";
  }
}
export default isEmpty;
