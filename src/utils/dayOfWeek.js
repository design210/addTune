function dayOfWeek(day) {
  var week = new Array("일", "월", "화", "수", "목", "금", "토");

  var today = new Date(day).getDay();
  var todayLabel = week[today];

  return todayLabel;
}

function dayJsWeek(day) {
  day.length > 2 ? (day = day.substring(0, 2)) : day;
  switch (day) {
    case "Mo":
      return "월요일";
    case "Tu":
      return "화요일";
    case "We":
      return "수요일";
    case "Th":
      return "목요일";
    case "Fr":
      return "금요일";
    case "Sa":
      return "토요일";
    case "Su":
      return "일요일";
  }
}

export { dayOfWeek, dayJsWeek };
