import { parseLines } from './parse';

describe('parse lines', () => {
  it('can parse content', () => {
    const data =
      '' +
      '2016-09-20 16:23:10,994 INFO Some info message\r\n' +
      '2016-09-20 16:23:12,994 WARNING Some warning message of reversed\r\n' +
      '2016-09-20 16:23:14,994 ERROR Some error message\r';

    const result = parseLines(data);

    expect(result[0]).toEqual({
      date: '2016-09-20 16:23:10,994',
      severity: 'INFO',
      message: 'Some info message',
    });

    expect(result[2]).toEqual({
      date: '2016-09-20 16:23:14,994',
      severity: 'ERROR',
      message: 'Some error message',
    });
  });
});
