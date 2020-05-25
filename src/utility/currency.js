const {
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

export const format = (value) => {
  value = parseFloat(value);

  let padded = "";
  let amount = "";

  if (isNaN(value)) {
    padded = `00${decimalSeparator}00`;
  } else {
    amount = value.toFixed(2);

    if (amount.length <= 4) padded += "0";

    if (amount.length <= 3) padded += "0";

    if (amount.length <= 2 && !amount.includes(decimalSeparator)) {
      padded += decimalSeparator;
    }
  }

  if (Number(amount) === 0) {
    padded = `00${decimalSeparator}00`;
    amount = "";
  }

  console.log("#", padded, amount);

  const full = padded + amount;

  return { full, padded, amount };
};

export const deformat = (string) =>
  Number(string.replace(thousandsSeparator, "").replace(decimalSeparator, "."));

export const regex = new RegExp(`!//^\d*\\${decimalSeparator}?\d*$//`, "g");
