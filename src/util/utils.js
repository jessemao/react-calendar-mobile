const DAY = 24 * 60 * 60 * 1000;

export const getDaysCountOfMonth = function (year, month) {
  const d = new Date(year, month, 0);
  return d.getDate();
}

export const getWeekNumber = function(date, dowOffset = 0) {
  var newYear = new Date(date.getFullYear(), 0, 1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = (day >= 0 ? day : day + 7);
  var daynum = Math.floor((date.getTime() - newYear.getTime() -
      (date.getTimezoneOffset() - newYear.getTimezoneOffset()) * 60000) / 86400000) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if (day < 4) {
    weeknum = Math.floor((daynum + day - 1) / 7) + 1;
    if (weeknum > 52) {
      let nYear = new Date(date.getFullYear() + 1, 0, 1);
      let nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      /*if the next year starts before the middle of
        the week, it is week #1 of that year*/
      weeknum = nday < 4 ? 1 : 53;
    }
  } else {
    weeknum = Math.floor((daynum + day - 1) / 7);
  }
  return weeknum;
}

export const getMonthLocale = (date, i18n, month = 'numeric') => {
  return date.toLocaleDateString(i18n, {
    month
  });
}
export const getWeekLocale = (i18n, weekday = 'narrow') => {
  var weekdayArray = [];
  const today = new Date();
  const todayDay = today.getDay();
  const todayTime = today.getTime();
  weekdayArray = Array.from({
    length: todayDay
  }, (v, i) => new Date(todayTime - (todayDay - i) * DAY));
  weekdayArray = weekdayArray.concat(Array.from({
    length: 7 - todayDay
  }, (v, i) => new Date(todayTime + i * DAY)))

  return weekdayArray.map((w) => w.toLocaleDateString(i18n, {
    weekday: weekday
  }))
}
export const getYearLocale = (date, i18n, year = 'numeric') => {
  return date.toLocaleDateString(i18n, {
    year
  });
};