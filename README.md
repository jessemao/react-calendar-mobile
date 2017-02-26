# React Calendar Mobile
React Calendar Mobile is a component very easy to use with no extra effort. It can be used in any project with great performance! Different from other calendar/date picker components, this component uses **touches** and **scrolls** to move to different months or weeks like native calendar on mobile device. Besides, it supports both **monthly** and **weekly** view.

# How to install
```
npm install react-calendar-mobile --save
```

# How to use
## ES6
```
import Calendar from 'react-calendar-mobile';
```

## CommonJS
```
var Calendar = require('react-calendar-mobile');
```

# Properties

| Name          | Type        | Default    | Description                                                                                                                                                                                                                                                                                                 |
|---------------|-------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selectedDate  | String/Date | new Date() | The date selected on calendar. Default to today's date.                                                                                                                                                                                                                                                     |
| startDateAt   | String/Date | new Date() | The date of calendar displaying starts at. e.g., startDateAt is `2017-02-01` if the calendar displays February 2017.                                                                                                                                                                                        |
| startOnMonday | Boolean     | false      | If false, week starts from Sunday, otherwise, from Monday.                                                                                                                                                                                                                                                  |
| decorate      | object      | {}         | It indicates if there is any event on specific day. A key/value object that maps decorates to calendar. Key format is "YYYY-MM-DD", value can be any value, e.g. {"2017-02-15": true} will add an origin dot under the date of 2017-02-15 on calendar which indicates that there is/are events on that day. |
| view          | String      | "month"    | Value will be `"month"/"week"`. If set to "month", then a monthly calendar will be displayed, otherwise, it displays a week.                                                                                                                                                                                |
| className     | String      | ""         | Customized class for the Calendar.                                                                                                                                                                                                                                                                          |
| onSelectDate  | Function    |            | Callback function when a date is selected. Output is a `Date` object and value is the selected date                                                                                                                                                                                                         |
| onChange      | Function    |            | Callback function when calendar scrolls to a different month or week. Output is a `Date` object and value is the start date of the month or week displaying.                                                                                                                                                |


# Style
| Class Name                       | Description                                                                                    |
|----------------------------------|------------------------------------------------------------------------------------------------|
| .react-calendar                  | root div of calendar.                                                                          |
| .react-calendar__header          | header div of calendar, where `year` and `month` display                                       |
| .react-calendar__year            | year div of calendar.                                                                          |
| .react-calendar__month           | month div of calendar.                                                                         |
| .react-calendar__main            | main body div of calendar.                                                                     |
| .react-calendar__weekdays        | weekdays title div of calendar.                                                                |
| .react-calendar__weekday         | each weekday title div of calendar.                                                            |
| .react-calendar__days            | days root div of calendar.                                                                     |
| .react-calendar__day             | each day div of calendar. use `.react-calendar__day span` for date text style.                 |
| .react-calendar__day--today      | today's date div.                                                                              |
| .react-calendar__day--othermonth | dates of other months div.                                                                     |
| .react-calendar__day--selected   | selected date div.                                                                             |
| .react-calendar__day--decorate   | date with decorates on. To modify decorate's style, use `.react-calendar__day--decorate:after` |


# Getting Started
To play it yourself, you can clone this repo and run the example in your local space.

Or you can play with the picker [**Online here**](https://jessemao.github.io/react-calendar-mobile/)
```
git clone https://github.com/jessemao/react-calendar-mobile.git
cd react-calendar-mobile && cd example
npm install
npm start
```

# License
MIT