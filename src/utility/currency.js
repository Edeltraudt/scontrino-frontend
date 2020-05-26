export const {
  decimalSeparator,
  thousandsSeparator,
} = (function getNumberSeparators() {
  // convert a number formatted according to locale
  const str = parseFloat(1234.56).toLocaleString();
  let decimalSeparator = ".";
  let thousandsSeparator = "";

  // if the resulting number does not contain previous number
  // (i.e. in some Arabic formats), return defaults
  if (str.match("1")) {
    decimalSeparator = str.replace(/.*4(.*)5.*/, "$1");
    thousandsSeparator = str.replace(/.*1(.*)2.*/, "$1");
  }

  return { decimalSeparator, thousandsSeparator };
})();
