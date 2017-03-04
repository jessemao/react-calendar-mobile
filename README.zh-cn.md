# React Calendar Mobile
React Calendar Mobile 是一个简单易用的React插件。与其他诸多日历插件不太一样的是，该插件使用 **touches** 和 **scrolls** 操作来改变**月/周**。同时，该插件还支持**单月**显示或者**单周**显示方式。

Click for [English](https://github.com/jessemao/react-calendar-mobile/blob/master/README.md) language documentation.

# 安装
```
npm install react-calendar-mobile --save
```

# 使用
## ES6
```
import Calendar from 'react-calendar-mobile';
```

## CommonJS
```
var Calendar = require('react-calendar-mobile');
```

# 其他语言格式
React Calendar Component 支持其他语言格式。（具体支持的格式参见[**Javascript Date API**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)）在使用该插件是，只需要传入正确的值给 *i18n*, *weekdayFormat*, *monthFormat*, *yearFormat* 就能正常显示其他语言了。更多详细信息请参看**参数**表格。

# 参数

| 名称          | 类型        | 默认值    | 详细说明                                                                                                                                                                                                                                                                                                 |
|---------------|-------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| selectedDate  | String/Date | new Date() | 当前选择的日期。                                                                                                                                                                                                                                                     |
| startDateAt   | String/Date | new Date() | 当前显示日历中的第一天，根据日历的显示格式决定是**月/周**第一天。例如，如果日历当前显示2017年2月，那么`startDateAt`就是 `2017-02-01`。                                                                                                                                                                                        |
| startOnMonday | Boolean     | false      | 如果是`true`，那么每周从周一开始，如果是`false`，那么周是从周日开始                                                                                                                                                                                                                                                  |
| decorate      | object      | {}         | 如果某天有活动，则会显示该`decorate`。这个值是一个`key/value`对象。 `key`的格式是`YYYY-MM-DD`, `value`则可为任意值。例如，如果`decorate`的值是`{"2017-02-15": true}`，那么在`2017-02-15`这一天会出现一个**小圆圈**来标识这一天有**活动**。 |
| view          | String      | "month"    | 值只能是 `"month"/"week"`。 如果是`"month"`，那么日历就按**月**来展示，如果是`"week"`，那么日历就按照**周**来显示。                                                                                                                                                                               |
| className     | String      | ""         | 用户可以自定义`class`给日历插件。                                                                                                                                                                                                                                                                          |
| i18n          | String      | "en-US"    | 应该传入符合[**BCP 47**](https://tools.ietf.org/rfc/bcp/bcp47.txt) 规范的标签。                                                                                                                                                                               |
| weekdayFormat | String      | "narrow"   | 日历上**周**的名称显示格式，可以传入的值有`"narrow", "short", "long"`。                                                                                                                                                                                                                            |
| monthFormat   | String      | "long"     | 日历上**月**的名称显示格式，可以传入的值有`"numeric", "2-digit", "narrow", "short", "long"`.                                                                                                                                                                                                |
| yearFormat    | String      | "numeric"  | 日历上**年**的名称显示格式，可以传入的值有`"numeric", "2-digit"`.                                                                                                                                                                                                                                    |
| onSelectDate  | Function    |            | 回调函数。改函数第一个参数就是当前选定的`日期`，格式是`Date`对象。                                                                                                                                                                                              |
| onChange      | Function    |            | 回调函数。改函数第一个参数就是当前显示的**月/周**的第一个`日期`，格式是`Date`对象。                                                                                                                                                |


# CSS参数
| Class                       | 详细说明                                                                                    |
|----------------------------------|------------------------------------------------------------------------------------------------|
| .react-calendar                  | 日历的根`div           `                                                               |
| .react-calendar__header          | 日历标题`div`，`年`和`月`                               |
| .react-calendar__year            | 日历`年` `div`.                                                                          |
| .react-calendar__month           | 日历`月` `div`.                                                                          |
| .react-calendar__main            | 日历`body` `div`                                         |
| .react-calendar__weekdays        | 日历*所有***周名称**`div`                                                                |
| .react-calendar__weekday         | 日历*单个***周名称** `div`                                                          |
| .react-calendar__days            | 日历**所有日期**`div`                                                                     |
| .react-calendar__day             | **单个日期**`div`。使用`.react-calendar__day span`来改变**日期**显示.                 |
| .react-calendar__day--today      | 标明**今天** `div`                                                                              |
| .react-calendar__day--othermonth | 标明**其他月份日期** `div`                                                                     |
| .react-calendar__day--selected   | 标明**选定日期** `div`                                                                             |
| .react-calendar__day--decorate   | 标明有**小圆圈** `div`。如果要改变**小圆圈**形式，使用`.react-calendar__day--decorate:after` |


# 例子
你可以复制该`repo`并在电脑上运行`example`。

或者可以[**在线**]试用(https://jessemao.github.io/react-calendar-mobile/)
```
git clone https://github.com/jessemao/react-calendar-mobile.git
cd react-calendar-mobile && cd example
npm install
npm start
```

# License
MIT