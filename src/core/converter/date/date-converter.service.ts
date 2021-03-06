import { injectable } from 'inversify';
import * as moment from 'moment';
import 'moment-timezone';

import { lazyInject, DI_TYPES } from '../../di';
import { DEFAULT_TIME_FROM, DEFAULT_TIME_TO } from '../../definitions.interface';
import { isString, orNull } from '../../util';
import { IApplicationDateTimeSettings, IApplicationSettings } from '../../settings';
import { IDateConverter, DateTimeLikeTypeT } from './date-converter.interface';

@injectable()
export class DateConverter implements IDateConverter {

  private static MONTHS = moment.months();
  private static MONTHS_SHORT = moment.monthsShort();
  private static WEEKDAYS_SHORT = moment.weekdaysShort()
      .slice(1, 7)
      .concat(moment.weekdaysShort()[0]);
  private static WEEKDAYS = moment.weekdays()
      .slice(1, 7)
      .concat(moment.weekdays()[0]);

  @lazyInject(DI_TYPES.Settings) private applicationSettings: IApplicationSettings;

  public format(date: DateTimeLikeTypeT, inputFormat: string, outputFormat: string): string {
    if (!date) {
      return '';
    } else {
      const momentDate = this.toMomentDate(date, inputFormat);
      return momentDate.isValid()
          ? momentDate.format(outputFormat)
          : String(date);
    }
  }

  /**
   * @param {DateTimeLikeTypeT} date
   * @returns {string}
   */
  public fromDateToUiDate(date: DateTimeLikeTypeT): string {
    return this.format(date, this.dateFormat, this.uiDateFormat);
  }

  /**
   * @param {string} date
   * @param {string} time
   * @returns {string}
   */
  public fromDateTimeToUiDateTime(date: string, time: string): string {
    return this.format(
        this.combine(date, time),
        this.dateTimeFormat,
        this.uiDateTimeFormat
    );
  }

  /**
   * @param {string} date
   * @param {string} time
   * @returns {string}
   */
  public fromUiDateTimeToDateTime(date: string, time: string): string {
    return this.format(
        this.combine(date, time),
        this.uiDateTimeFormat,
        this.dateTimeFormat
    );
  }

  /**
   * @param {DateTimeLikeTypeT} date
   * @returns {string}
   */
  public fromDateTimeToPstDateTime(date: DateTimeLikeTypeT = new Date()): string {
    return this.format(date, this.dateTimeFormat, this.pstDateTimeFormat);
  }

  /**
   * @test
   * @param {string} startUiDate [2018-01-31]
   * @param {string} startUiTime [21:58:59]
   * @returns {string} The formatted value [2018-01-31T21:58:59-08:00]
   */
  public fromStartUiDateTimeToDateTime(startUiDate: string, startUiTime = DEFAULT_TIME_FROM): string {
    return this.fromUiDateTimeToDateTime(startUiDate, startUiTime);
  }

  /**
   * @test
   * @param {string} endUiDate [2018-01-31]
   * @param {string} endUiTime [23:59:59]
   * @returns {string} The formatted value [2018-01-31T23:59:59-08:00]
   */
  public fromEndUiDateTimeToDateTime(endUiDate: string, endUiTime = DEFAULT_TIME_TO): string {
    return this.fromUiDateTimeToDateTime(endUiDate, endUiTime);
  }

  /**
   * @test
   * @returns {string}
   */
  public from30DaysAgoUiDateTimeToDateTime(): string {
    return this.fromUiDateTimeToDateTime(
      this.fromDateToUiDate(this.get30DaysAgo()),
      DEFAULT_TIME_FROM
    );
  }

  /**
   * @returns {Date}
   */
  public get30DaysAgo(): Date {
    return this.getCurrentMomentDate().subtract(30, 'days').toDate();
  }

  /**
   * @returns {Date}
   */
  public getCurrentDate(): Date {
    return this.getCurrentMomentDate().toDate();
  }

  public formatDate(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateFormat, outputFormat);
  }

  public formatDateFromDateTime(date: DateTimeLikeTypeT): string {
    return this.formatDateTime(date, this.dateFormat);
  }

  public formatTimeFromDateTime(date: DateTimeLikeTypeT): string {
    return this.formatDateTime(date, this.timeFormat);
  }

  public formatDateTime(date: DateTimeLikeTypeT, outputFormat: string): string {
    return this.format(date, this.dateTimeFormat, outputFormat);
  }

  public formatPSTDate(date: DateTimeLikeTypeT = new Date()): string {
    return this.formatDate(date, this.dateTimeSettings.pstDateFormat);
  }

  public parseDate(date: DateTimeLikeTypeT, inputFormat: string): Date {
    const result = this.tryConvertToDate(date, inputFormat);
    return orNull<Date>(!isString(result), result as Date);
  }

  public parseDateFromDateTime(date: DateTimeLikeTypeT): Date {
    return this.parseDate(date, this.dateTimeFormat);
  }

  public tryConvertToDate(date: DateTimeLikeTypeT, inputFormat): DateTimeLikeTypeT {
    const momentDate = this.toMomentDate(date, inputFormat);
    return momentDate.isValid() ? momentDate.toDate() : date;
  }

  public appendToDate(date: DateTimeLikeTypeT, data: Array<Array<number|string>>, inputFormat: string = this.dateFormat): Date {
    let momentDate = this.toMomentDate(date, inputFormat);
    data.forEach((item) => {
      momentDate = momentDate.add(item[0] as moment.DurationInputArg1, item[1] as moment.DurationInputArg2);
    });
    return momentDate.toDate();
  }

  public getLocalizedMonth(index: number): string {
    return DateConverter.MONTHS[index];
  }

  public getLocalizedMonthShort(index: number): string {
    return DateConverter.MONTHS_SHORT[index];
  }

  public getLocalizedWeekday(index: number): string {
    return DateConverter.WEEKDAYS[index];
  }

  public getLocalizedWeekdayShort(index: number): string {
    return DateConverter.WEEKDAYS_SHORT[index];
  }

  public getFirstDayOfMonth(): Date {
    return moment().startOf('month').toDate();
  }

  public combine(dateAsString: string, timeAsString: string): string {
    return [dateAsString, timeAsString].join(' ');
  }

  private toMomentDate(date: DateTimeLikeTypeT, inputFormat?: string): moment.Moment {
    const momentDate = date instanceof Date
      ? moment(date)
      : moment(date, inputFormat, true);
    const zone = this.timeZone;
    return zone ? moment.tz(date, zone) : momentDate;
  }

  private getCurrentMomentDate(): moment.Moment {
    return this.toMomentDate(this.currentDate);
  }

  private get timeZone(): string {
    return this.dateTimeSettings.timeZone;
  }

  private get currentDate(): Date {
    return this.dateTimeSettings.currentDate;
  }

  private get dateTimeFormat(): string {
    return this.dateTimeSettings.dateTimeFormat;
  }

  private get dateFormat(): string {
    return this.dateTimeSettings.dateFormat;
  }

  private get timeFormat(): string {
    return this.dateTimeSettings.timeFormat;
  }

  private get uiDateFormat(): string {
    return this.dateTimeSettings.uiDateFormat;
  }

  private get uiTimeFormat(): string {
    return this.dateTimeSettings.uiTimeFormat;
  }

  private get uiDateTimeFormat(): string {
    return this.combine(this.uiDateFormat, this.uiTimeFormat);
  }

  private get pstDateTimeFormat(): string {
    return this.combine(this.dateTimeSettings.pstDateFormat, this.dateTimeSettings.pstTimeFormat);
  }

  private get dateTimeSettings(): IApplicationDateTimeSettings {
    return this.applicationSettings.dateTime || {};
  }
}
