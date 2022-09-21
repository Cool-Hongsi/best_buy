import { dateFormat } from 'service/util/dateFormat';

describe('src/service/util/dateFormat', () => {
  it('should return empty string', () => {
    const dateStr = '';
    const result = dateFormat(dateStr);
    expect(result).toStrictEqual('');
  });
  it('should return specific date format', () => {
    const dateStr = '2022-09-18T17:09:06';
    const result = dateFormat(dateStr);
    expect(result).toStrictEqual('Sep 18, 2022');
  });
});
