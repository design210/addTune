function BusinessNum(companyNum) {
  companyNum = companyNum.replace(/[^0-9]/g, "");
  var tempNum = "";
  if (companyNum.length < 4) {
    return companyNum;
  } else if (companyNum.length < 6) {
    tempNum += companyNum.substr(0, 3);
    tempNum += "-";
    tempNum += companyNum.substr(3, 2);
    return tempNum;
  } else if (companyNum.length < 11) {
    tempNum += companyNum.substr(0, 3);
    tempNum += "-";
    tempNum += companyNum.substr(3, 2);
    tempNum += "-";
    tempNum += companyNum.substr(5);
    return tempNum;
  } else {
    tempNum += companyNum.substr(0, 3);
    tempNum += "-";
    tempNum += companyNum.substr(3, 2);
    tempNum += "-";
    tempNum += companyNum.substr(5);
    return tempNum;
  }
}
export default BusinessNum;
