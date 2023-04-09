import { getDisplayDate } from './helpers';

describe('getDisplayDate', () => {
  it('should return "-" when input is falsy', () => {
    expect(getDisplayDate(undefined)).toBe('-');
    expect(getDisplayDate(null)).toBe('-');
    expect(getDisplayDate('')).toBe('-');
  });

  it('should return a valid date string when input is a valid date string', () => {
    expect(getDisplayDate('2022-02-14')).toBe('2/14/2022');
    expect(getDisplayDate('2019-09-01')).toBe('9/1/2019');
    expect(getDisplayDate('1995-12-17')).toBe('12/17/1995');
  });

  it('should return "-" when input is an invalid date string', () => {
    expect(getDisplayDate('invalid date')).toBe('-');
  });
});
