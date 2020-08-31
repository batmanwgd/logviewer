import { isValidUrl } from './validate';

describe('isValidUrl', () => {
  it('checks max length', () => {
    const hello = 'hello/';
    expect(isValidUrl('https://luke10x.dev/' + hello)).toBeTruthy();
    expect(isValidUrl('https://luke10x.dev/' + hello.repeat(5))).toBeTruthy();
    expect(isValidUrl('https://luke10x.dev/' + hello.repeat(50))).toBeTruthy();
    expect(isValidUrl('https://luke10x.dev/' + hello.repeat(500))).toBeFalsy();
  });

  it('checks pattern', () => {
    expect(isValidUrl('https://luke10x.dev/hello')).toBeTruthy();
    expect(isValidUrl('https://luke10x.dev')).toBeTruthy();
    expect(isValidUrl('http://luke10x.dev/hello')).toBeTruthy();
    expect(isValidUrl('ftp://luke10x.dev/hello')).toBeFalsy();
    expect(isValidUrl('//luke10x.dev/hello')).toBeFalsy();
    expect(isValidUrl('luke10x.dev/hello')).toBeFalsy();
    expect(isValidUrl('https://luke  x.dev/hello')).toBeFalsy();
    expect(isValidUrl('https://luke10x.dev/🐶')).toBeFalsy();
  });
});
