/* eslint-disable no-bitwise */
/* eslint-disable no-cond-assign */
export const isCardNumberValid = (ccNum: string): boolean => {
  const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  let len = ccNum.length;
  let bit = 1;
  let sum = 0;
  let val;

  while (len) {
    val = parseInt(ccNum.charAt(--len), 10);
    sum += (bit ^= 1) ? arr[val] : val;
  }
  return !!sum && sum % 10 === 0;
};

export const isCardNumberVisaInvalid = (ccNum: string): boolean => {
  return ccNum.startsWith('4') && ccNum.length !== 13 && ccNum.length !== 16;
};

export const isCardNumberMasterInvalid = (ccNum: string): boolean => {
  return ccNum.startsWith('5') && ccNum.length !== 16;
};

export const isCardNumberAmex = (ccNum: string): boolean => {
  return ccNum.startsWith('34') || ccNum.startsWith('37');
};

export const isCardNumberAmexInvalid = (ccNum: string): boolean => {
  return isCardNumberAmex(ccNum) && ccNum.length !== 15;
};

export const isCardNumberDiscoverInvalid = (ccNum: string): boolean => {
  return ccNum.startsWith('6') && ccNum.length !== 16;
};

export const isExpirationDateValid = (date: string): boolean => {
  let isNumber = /^\d+$/.test(date.replace('/', ''));
  return date.length === 5 && isNumber;
};

export const isExpirationDateFuture = (date: string): boolean => {
  try {
    let dateSplit = date.split('/');
    let month = parseInt(dateSplit[0], 10) - 1;
    let year = parseInt(`20${dateSplit[1]}`, 10);
    let dateFormatted = new Date(year, month);

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDateFormatted = new Date(currentYear, currentMonth);

    return dateFormatted >= currentDateFormatted;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const isCvvValid = (cvv: string, ccNum: string): boolean => {
  let isNumber = /^\d+$/.test(cvv);
  let isAmex = isCardNumberAmex(ccNum);
  return (
    isNumber && ((cvv.length === 3 && !isAmex) || (cvv.length === 4 && isAmex))
  );
};

export const isNameValid = (name: string): boolean => {
  let isAlphabetic = /^[A-Za-z\s]+$/.test(name);
  return name.trim().length > 2 && isAlphabetic;
};
