import {
  isCardNumberAmexInvalid,
  isCardNumberDiscoverInvalid,
  isCardNumberMasterInvalid,
  isCardNumberValid,
  isCardNumberVisaInvalid,
  isCvvValid,
  isExpirationDateFuture,
  isExpirationDateValid,
  isNameValid,
} from '../../src/helpers/validators';

describe('Credit card validators Test', () => {
  /*
    Credit card number validation
  */
  test('given valid card number, isCardNumberValid should be true', () => {
    expect(isCardNumberValid('4111111111111111')).toBe(true);
  });

  test('given invalid card number, isCardNumberValid should be false', () => {
    expect(isCardNumberValid('0000000000000000')).toBe(false);
  });

  test('given valid Visa card number, isCardNumberVisaInvalid should be false', () => {
    expect(isCardNumberVisaInvalid('4929094527549425')).toBe(false);
  });

  test('given invalid Visa card number, isCardNumberVisaInvalid should be true', () => {
    expect(isCardNumberVisaInvalid('492909452754942')).toBe(true);
  });

  test('given valid Mastercard card number, isCardNumberMasterInvalid should be false', () => {
    expect(isCardNumberMasterInvalid('5369748468467459')).toBe(false);
  });

  test('given invalid Mastercard card number, isCardNumberMasterInvalid should be true', () => {
    expect(isCardNumberMasterInvalid('536974846846745')).toBe(true);
  });

  test('given valid American Express card number, isCardNumberAmexInvalid should be false', () => {
    expect(isCardNumberAmexInvalid('378422039332309')).toBe(false);
  });

  test('given invalid American Express card number, isCardNumberAmexInvalid should be true', () => {
    expect(isCardNumberAmexInvalid('37842203933230')).toBe(true);
  });

  test('given valid Discover card number, isCardNumberDiscoverInvalid should be false', () => {
    expect(isCardNumberDiscoverInvalid('6011350522494718')).toBe(false);
  });

  test('given invalid Discover card number, isCardNumberDiscoverInvalid should be true', () => {
    expect(isCardNumberDiscoverInvalid('601135052249471')).toBe(true);
  });

  /*
    Credit card expiration date validation
  */
  test('given valid expiration date, isExpirationDateValid should be true', () => {
    expect(isExpirationDateValid('07/22')).toBe(true);
  });

  test('given invalid expiration date, isExpirationDateValid should be false', () => {
    expect(isExpirationDateValid('aa/aa')).toBe(false);
  });

  test('given future expiration date, isExpirationDateFuture should be true', () => {
    //Making sure it's always future date by getting next year
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let nextYear = parseInt(currentYear.toString().slice(-2), 10) + 1;
    expect(isExpirationDateFuture(`01/${nextYear}`)).toBe(true);
  });

  test('given past expiration date, isExpirationDateFuture should be false', () => {
    //Making sure it's always past date by getting last year
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let nextYear = parseInt(currentYear.toString().slice(-2), 10) - 1;
    expect(isExpirationDateFuture(`01/${nextYear}`)).toBe(false);
  });

  /*
    Credit card cvv validation
  */
  test('given a 3 digits Security code and a non Amex card number, isCvvValid should be true', () => {
    expect(isCvvValid('123', '4929094527549425')).toBe(true);
  });

  test('given a 3 digits Security code and a Amex card number, isCvvValid should be false', () => {
    expect(isCvvValid('123', '378422039332309')).toBe(false);
  });

  test('given a 4 digits Security code and a Amex card number, isCvvValid should be true', () => {
    expect(isCvvValid('1234', '378422039332309')).toBe(true);
  });

  test('given a 4 digits Security code and a non Amex card number, isCvvValid should be false', () => {
    expect(isCvvValid('1234', '4929094527549425')).toBe(false);
  });

  /*
    Credit card name validation
  */
  test('given valid name, isNameValid should be true', () => {
    expect(isNameValid('Renan S')).toBe(true);
  });

  test('given invalid name, isNameValid should be false', () => {
    expect(isNameValid('Renan123')).toBe(false);
  });
});
