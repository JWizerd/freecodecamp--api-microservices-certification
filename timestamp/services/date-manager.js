/**
 * While at first glance this class might seem unnecessary I believe this solution offers scalability benefits.
 * 1. the underlying implementation can be replaced. For instance, if we wanted to swap out the native Date impl with Moment.js
 * 2. if we didn't implement a service, all of this logic would be inside of the request action. I am an advocate for dumb controller actions.
 * 3. easier and faster to test
 */
class DateManager {
  constructor(date) {
    this._setDate(date);
  }

  _setDate(date) {
    const onlyNumbers = /^-?\d+$/;

    if (date && onlyNumbers.test(date)) {
      date = parseInt(date, 10);
    }

    this.date = date ? new Date(date) : new Date();
  }

  get isValidDate() {
    return this.date.getTime() === this.date.getTime();
  }

  get unix() {
    return parseInt(this.date.getTime());
  }

  get utc() {
    return this.date.toGMTString();
  }

  get error() {
    return this.date.toString();
  }
}

module.exports = DateManager;