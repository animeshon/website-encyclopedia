export class _Date {
  year: number;
  month: number;
  day: number;
}

export const fromJSDate = (date: Date): _Date => {
  return {
    year: date.getFullYear(),
    month: date.getMonth()+1,
    day: date.getDay()
  }
} 

export const toJSDate = (date: _Date): Date => {
  if (undefined == date) {
    return undefined;
  }
  return new Date(date.year, date.month-1, date.day) ;
}

export const toString = (date: _Date): string => {
  const _date = new Date(date.year, date.month-1, date.day) 

  if (date.month == 0 && date.day == 0) {
    return _date.toLocaleDateString('en-US', { year: 'numeric', month: undefined, day: undefined})
  }
  if (date.day == 0) {
    return _date.toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: undefined})
  }
  if (date.year == 0) {
    return _date.toLocaleDateString('en-US', { year: undefined, month: 'numeric', day: 'numeric'})
  }
  if (date.day == 99 || date.month == 99 || date.year == 9999) {
    return "?";
  }
  return _date.toLocaleDateString('en-US');
}

export const getTime = (date: _Date): number => {
  return date.year * 30758400 + date.month * 2592000 + date.day * 86400;
}

export const sanitize = (date: _Date): _Date | undefined => {
  if (date.day == 99 || date.month == 99 || date.year == 9999) {
    date.day = 99;
    date.month = 99;
    date.year = 9999;
  }
  if (!date.day && !date.month && !date.year) {
    return undefined;
  }
  return date
}

export default _Date;