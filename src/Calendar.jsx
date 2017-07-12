import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { ITEM_HEIGHT, WEEKDAYS_HEIGHT } from './util/constant';
import { getWeekNumber, getWeekLocale, getMonthLocale, getYearLocale, getDaysCountOfMonth } from './util/utils';
import draggable from './util/draggable';
import translateUtil from './util/translate';
import './Calendar.css';


class Calendar extends Component {
  constructor(props) {
    super(props);
    const current = new Date(props.selectedDate);
    const startDateProps = new Date(props.startDateAt);
    var startDate;
    this.changeToNextMonthOrWeek = this.changeToNextMonthOrWeek.bind(this);
    this.changeToPrevMonthOrWeek = this.changeToPrevMonthOrWeek.bind(this);
    if (props.view === 'month') {
      startDate = new Date(startDateProps.getFullYear(), startDateProps.getMonth());
    } else {
      startDate = current;
    }
    this.state = {
      selectedAt: current,
      dragging: false,
      startDateAt: startDate,
      scrollableData: this.getDefaultScrollableData(props.view, startDate),
      shouldTranslate: true
    };
  }
  componentDidMount() {
    this.translateToStart();
    this.initScrollEvent();
    this.props.onSelectDate(this.state.selectedAt);
    this.props.onChange(this.state.startDateAt);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (!nextState.shouldTranslate && this.state.shouldTranslate) {
      return false;
    }
    return true;
  }
  componentDidUpdate() {
    this.translateToStart();
  }
  translateToStart() {
    if (this.state.shouldTranslate) {
      const {startDateAt} = this.state;
      const wrapper = this.wrapper;
      translateUtil.translateElement(wrapper, null, this.valueToTranslate(startDateAt));
      this.setState({
        shouldTranslate: false
      });
    }
  }
  getFormatedMonth(current, number = 0) {
    const dateValue = new Date(current.getFullYear(), current.getMonth() + number)
    return dateValue.valueOf();
  }
  getFormatedWeek(current, number = 0) {
    const dateValue = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 7 * number);
    var dowOffset = 0;
    if (this.props.startOnMonday) {
      dowOffset = 1;
    }
    return `${dateValue.getFullYear()}-${getWeekNumber(dateValue, dowOffset)}`;
  }
  getDefaultScrollableData(view, current) {
    if (view === 'month') {
      return [-2, -1, 0, 1, 2].map((number) => {
        return this.getFormatedMonth(current, number);
      });
    }
    return [-2, -1, 0, 1, 2].map((number) => {
      return this.getFormatedWeek(current, number);
    });
  }
  getDays(startDate) {
    const {view, startOnMonday} = this.props;
    var days = [];
    let daysLenth,
      leftPadding;
    let startDateAt = new Date(startDate);
    if (view === 'month') {
      daysLenth = 42;
      startDateAt = new Date(startDateAt.getFullYear(), startDateAt.getMonth());
    } else {
      daysLenth = 7;
    }
    const startDay = startDateAt.getDay();

    if (startOnMonday) {
      leftPadding = startDay ? startDay - 1 : 6;
    } else {
      leftPadding = startDay;
    }

    const dayMapCallback = (delta) => {
      const year = startDateAt.getFullYear();
      const month = startDateAt.getMonth();
      const date = startDateAt.getDate() + delta;
      return new Date(year, month, date);
    }

    days = Array.from({
      length: leftPadding
    }, (v, i) => -(i + 1))
      .reverse()
      .map(dayMapCallback);
    days.push(startDateAt);
    days = days.concat(Array.from({
      length: daysLenth - days.length
    }, (v, i) => i + 1).map(dayMapCallback));
    return days;
  }
  getValueIndex(value) {
    const {view} = this.props;
    const {scrollableData} = this.state;
    let formatedValue
    if (view === 'month') {
      value = new Date(value);
      formatedValue = (new Date(value.getFullYear(), value.getMonth())).valueOf();
    } else {
      if (typeof value === 'object') {
        formatedValue = this.getFormatedWeek(value);
      } else {
        formatedValue = value;
      }
    }
    return scrollableData.indexOf(formatedValue);
  }
  initScrollEvent() {
    const el = this.wrapper;
    var dragState = {};
    draggable(el, {
      start: (event) => {
        this.hideOnSlide();
        dragState = {
          range: this.calcDragRange(),
          start: new Date(),
          startLeft: event.pageX,
          startTop: event.pageY,
          startTranslateTop: translateUtil.getElementTranslate(el).top
        };
      },
      drag: (event) => {
        if (!this.state.dragging) {
          this.setState({
            dragging: true
          });
        }
        dragState.left = event.pageX;
        dragState.top = event.pageY;
        var deltaY = dragState.top - dragState.startTop;
        var translate = dragState.startTranslateTop + deltaY;
        translateUtil.translateElement(el, null, translate);
      },
      end: (touches) => {
        this.removeHideClass();
        if (this.state.dragging) {
          var currentTranslate = translateUtil.getElementTranslate(el).top;
          var dragRange = dragState.range;
          setTimeout(() => {
            var translate;
            var {view} = this.props;
            translate = Math.round(currentTranslate / ITEM_HEIGHT[view]) * ITEM_HEIGHT[view];
            translate = Math.max(Math.min(translate, dragRange[1]), dragRange[0]);
            translateUtil.translateElement(el, null, translate);
            const startDate = this.translateToValue(translate);
            this.updateCalendarDate(startDate);
          }, 0);
        } else {
          this.onSelectDay(touches);
        }
        dragState = {};
      }
    })
  }
  isToday(day) {
    const now = new Date();
    return !!(
    day.getFullYear() === now.getFullYear() && day.getMonth() === now.getMonth() && day.getDate() === now.getDate()
    );
  }
  isSelected(day) {
    const {selectedAt} = this.state;
    return !!(
    day.getFullYear() === selectedAt.getFullYear() && day.getMonth() === selectedAt.getMonth() && day.getDate() === selectedAt.getDate()
    );
  }
  isPrevMonth(day) {
    const {startDateAt} = this.state;
    const start = new Date(startDateAt);
    return (day.getFullYear() === start.getFullYear() && day.getMonth() < start.getMonth()) || day.getFullYear() < start.getFullYear();
  }
  isNextMonth(day) {
    const {startDateAt} = this.state;
    const start = new Date(startDateAt);
    return (day.getFullYear() === start.getFullYear() && day.getMonth() > start.getMonth()) || day.getFullYear() > start.getFullYear();
  }
  isCurrentMonth(day) {
    const {startDateAt} = this.state;
    const start = new Date(startDateAt);
    return day.getMonth() === start.getMonth() && day.getFullYear() === start.getFullYear();
  }
  hideOnSlide() {
    this.hideOtherMonthDate('.react-calendar__day--currentmonth');
    this.hideOtherMonthDate('.react-calendar__day--nextmonth');
  }
  hideOtherMonthDate(selector) {
    const startDateElmOnPrevMonth = document.querySelector(selector);
    let currentCount = 0;
    if (startDateElmOnPrevMonth) {
      let nextSibling = startDateElmOnPrevMonth;
      while (nextSibling) {
        nextSibling.classList.add('react-calendar__day--hide');
        nextSibling = nextSibling.nextSibling;
        currentCount++;
      }
    }
    const nextStartElmOnCurrentMonth = document.querySelectorAll(selector)[currentCount];
    if (nextStartElmOnCurrentMonth) {
      let previousSibling = nextStartElmOnCurrentMonth;
      while (previousSibling.previousSibling) {
        previousSibling = previousSibling.previousSibling;
        previousSibling.classList.add('react-calendar__day--hide');
      }
    }
  }
  removeHideClass() {
    const allHideDOM = document.querySelectorAll('.react-calendar__day--hide');
    for (var index = 0; index < allHideDOM.length; index++) {
      var element = allHideDOM[index];
      element.classList.remove('react-calendar__day--hide');
    }
  }
  isDecorated(day) {
    const dateFormat = `${day.getFullYear()}-${`0${(day.getMonth() + 1)}`.slice(-2)}-${`0${(day.getDate())}`.slice(-2)}`;
    return !!this.props.decorate[dateFormat];
  }
  onSelectDay = (e) => {
    const value = new Date(e.target.dataset.value);
    const {startDateAt} = this.state;
    this.props.onSelectDate(value);
    const shouldTranslate = startDateAt.getMonth() !== value.getMonth();
    if (shouldTranslate) {
      this.updateCalendarDate(value);
    }
    this.setState({
      selectedAt: value,
    });
  }
  calcDragRange() {
    const {view} = this.props;
    const {scrollableData} = this.state;
    return [-ITEM_HEIGHT[view] * (scrollableData.length - Math.ceil(1 / 2)), ITEM_HEIGHT[view] * Math.floor(1 / 2)];
  }
  parseWeekDate(weekDate) {
    const splitWeek = weekDate.split('-');
    const newYear = new Date(splitWeek[0], 0, 1);
    var deltaNumber;
    // first week start at 4, so if the first day of that year is after
    // Thursday, add 3 to the date number, otherwise, add 1.
    if (newYear.getDay() >= 5) {
      deltaNumber = 3;
    } else {
      deltaNumber = 1;
    }
    if (this.props.startOnMonday) {
      deltaNumber++;
    }
    return new Date(splitWeek[0], 0, ((parseInt(splitWeek[1], 10) - 1) * 7 + deltaNumber));
  }
  updateCalendarDate(currentValue) {
    const valueIndex = this.getValueIndex(currentValue);
    if (valueIndex === -1) {
      return;
    }
    const {view} = this.props;
    const {scrollableData} = this.state;
    var currentDate;
    if (view === 'month') {
      currentDate = new Date(currentValue);
    } else {
      if (typeof currentValue === 'string') {
        currentDate = this.parseWeekDate(currentValue);
      } else {
        currentDate = currentValue;
      }
    }
    const scrollableLength = scrollableData.length - 1;
    if (valueIndex < 2) {
      for (let index = 2 - valueIndex; index > 0; index--) {
        if (view === 'month') {
          scrollableData.unshift(this.getFormatedMonth(currentDate, index - 3));
        } else {
          scrollableData.unshift(this.getFormatedWeek(currentDate, index - 3));
        }
      }
    } else if (scrollableLength - valueIndex < 2) {
      for (let index = (2 - (scrollableLength - valueIndex)); index > 0; index--) {
        if (view === 'month') {
          scrollableData.push(this.getFormatedMonth(currentDate, 3 - index));
        } else {
          scrollableData.push(this.getFormatedWeek(currentDate, 3 - index));
        }
      }
    }
    this.props.onChange(currentDate);
    this.setState({
      startDateAt: currentDate,
      scrollableData: scrollableData,
      dragging: false,
      shouldTranslate: true
    })
  }

  valueToTranslate(value) {
    const {view} = this.props;
    const itemHeight = ITEM_HEIGHT[view];
    const valueIndex = this.getValueIndex(value);
    if (valueIndex !== -1) {
      return valueIndex * -itemHeight;
    }
  }
  translateToValue(translate) {
    const {view} = this.props;
    const {scrollableData} = this.state;
    const itemHeight = ITEM_HEIGHT[view];
    translate = Math.round(translate / itemHeight) * itemHeight;
    var index = -translate / itemHeight;
    return scrollableData[index];
  }
  changeToPrevMonthOrWeek() {
    var {startDateAt} = this.state;
    var {view} = this.props;
    var prevDate;
    if (view === 'month') {
      prevDate = new Date(startDateAt.getFullYear(), startDateAt.getMonth() - 1);
    } else {
      prevDate = new Date(startDateAt.getFullYear(), startDateAt.getMonth(), startDateAt.getDate() - 7);
    }
    this.updateCalendarDate(prevDate);
  }
  changeToNextMonthOrWeek() {
    var {startDateAt} = this.state;
    var {view} = this.props;
    var nextDate;
    if (view === 'month') {
      nextDate = new Date(startDateAt.getFullYear(), startDateAt.getMonth() + 1);
    } else {
      nextDate = new Date(startDateAt.getFullYear(), startDateAt.getMonth(), startDateAt.getDate() + 7);
    }
    this.updateCalendarDate(nextDate);

  }
  renderHeader() {
    const {i18n, monthFormat, yearFormat} = this.props;
    const month = getMonthLocale(this.state.startDateAt, i18n, monthFormat);
    const year = getYearLocale(this.state.startDateAt, i18n, yearFormat)
    return (
      <div className="react-calendar__control">
        <div className="react-calendar__arrow react-calendar__arrow--left" onClick={ this.changeToPrevMonthOrWeek }></div>
        <div className="react-calendar__title">
          <span className="react-calendar__year">{ year }</span>
          <span className="react-calendar__month">{ month }</span>
        </div>
        <div className="react-calendar__arrow react-calendar__arrow--right" onClick={ this.changeToNextMonthOrWeek }></div>
      </div>
      );
  }
  renderWeekTitle() {
    const {i18n, weekdayFormat} = this.props;
    const weekdays = getWeekLocale(i18n, weekdayFormat);
    if (this.props.startOnMonday) {
      const sunday = weekdays.shift();
      weekdays.push(sunday);
    }
    return weekdays.map((w, i) => (<span key={ i } className="react-calendar__weekday">{ w }</span>))
  }
  renderScrollableWrap() {
    const {scrollableData} = this.state;
    const {view} = this.props;
    return scrollableData.map((item, index) => {
      if (view === 'month') {
        return (
          <div key={ index } className="react-calendar__days">
            { this.renderDays(new Date(item)) }
          </div>
          );
      } else {
        let dateStringSplit = item.split('-');
        return (
          <div key={ index } className="react-calendar__days">
            { this.renderDays(new Date(dateStringSplit[0], 0, dateStringSplit[1] * 7)) }
          </div>
          );
      }
    });
  }
  renderDays(startedDateAt) {
    const days = this.getDays(startedDateAt);
    const daysElm = days.map((day, i) => {
      let className = classnames('react-calendar__day', {
        'react-calendar__day--today': this.isToday(day),
        'react-calendar__day--selected': this.isSelected(day),
        'react-calendar__day--nextmonth': this.isNextMonth(day),
        'react-calendar__day--prevmonth': this.isPrevMonth(day),
        'react-calendar__day--currentmonth': this.isCurrentMonth(day),
        'react-calendar__day--decorate': this.isDecorated(day),
      });
      return (
        <div key={ i } data-value={ day } className={ className }>
          <span data-value={ day }>{ day.getDate() }</span>
        </div>
        );
    });
    return daysElm;
  }
  render() {
    const {className, view} = this.props;
    const {scrollableData} = this.state;
    const wrapClass = classnames('react-calendar', className);
    const daysWrapClass = classnames('react-calendar__scroll-wrapper', {
      dragging: this.state.dragging
    });
    const contentHeight = ITEM_HEIGHT[view] * scrollableData.length;
    var mainDivHeight = WEEKDAYS_HEIGHT;
    if (this.main) {
      mainDivHeight = this.main.height;
    }
    return (
      <div className={ wrapClass }>
        <div className="react-calendar__header">
          { this.renderHeader() }
        </div>
        <div ref={ (main) => this.main = main } className="react-calendar__main" style={ { height: `${ITEM_HEIGHT[view] + mainDivHeight}px` } }>
          <div className="react-calendar__weekdays">
            { this.renderWeekTitle() }
          </div>
          <div ref={ (wrapper) => this.wrapper = wrapper } className={ daysWrapClass } style={ { height: `${contentHeight}px` } }>
            { this.renderScrollableWrap() }
          </div>
        </div>
      </div>
      );
  }
}

Calendar.propTypes = {
  view: PropTypes.string,
  startOnMonday: PropTypes.bool,
  startDateAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  selectedDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  decorate: PropTypes.object,
  className: PropTypes.string,
  i18n: PropTypes.string,
  weekdayFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  yearFormat: PropTypes.string,
  onSelectDate: PropTypes.func,
  onChange: PropTypes.func,
};

Calendar.defaultProps = {
  selectedDate: new Date(),
  startDateAt: new Date(),
  decorate: {},
  onSelectDate: (value) => {
  },
  view: 'month',
  i18n: 'en-US',
  weekdayFormat: 'narrow',
  monthFormat: 'long',
  yearFormat: 'numeric',
  onChange: (value) => {
  },
}

export default Calendar;