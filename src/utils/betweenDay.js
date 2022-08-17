function betweenDay(firstDate, secondDate) {
  var firstDateObj = new Date(firstDate.substring(0, 4), firstDate.substring(4, 6) - 1, firstDate.substring(6, 8));
  var secondDateObj = new Date(secondDate.substring(0, 4), secondDate.substring(4, 6) - 1, secondDate.substring(6, 8));
  var betweenTime = Math.abs(secondDateObj.getTime() - firstDateObj.getTime());
  return Math.floor(betweenTime / (1000 * 60 * 60 * 24)) + 1; //당일 포함
}
export default betweenDay;
