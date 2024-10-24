const convert_to_binarie = (n) => {
  if (n == 1) {
    return "1";
  }
  if (n % 2 === 0) {
    return convert_to_binarie(n / 2) + "0";
  }
  if (n % 2 !== 0) {
    return convert_to_binarie(parseInt(n / 2)) + "1";
  }
};

const convert_to_binarie_slt2 = (n) => {
  let output = "";
  while (n !== 1) {
    if (n % 2 === 0) {
      output = "0" + output;
    } else {
      output = "1" + output;
    }
    n = parseInt(n / 2);
  }
  return "1" + output;
};

console.log(convert_to_binarie(565)); //1000110101
console.log(convert_to_binarie(100)); //1100100
console.log(convert_to_binarie(344)); //1100100

console.log(convert_to_binarie_slt2(565)); //1000110101
console.log(convert_to_binarie_slt2(100)); //1100100
console.log(convert_to_binarie_slt2(344)); //1100100
