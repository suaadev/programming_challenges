/**
 Dada una lista de números enteros, escribe una función que devuelva el número que más se repite en la lista y cuántas veces aparece.
 */

const numbersRepeat = (n: Array<number>): Record<string, number> | null => {
  if (n.length === 0) return null;
  const numbersCount: Map<number, number> = new Map([]);
  let maxTotalRepeat: number = 0;
  let maxNumberRepeat: number = n[0];
  for (let i = 0; i < n.length; i++) {
    const element = n[i];
    if (numbersCount.has(element)) {
      let total: number = numbersCount.get(element) as number;
      total += 1;
      numbersCount.set(element, total);
      if (total > maxTotalRepeat) {
        maxTotalRepeat = total;
        maxNumberRepeat = element;
      }
    } else {
      numbersCount.set(element, 1);
    }
  }
  return {
    number: maxNumberRepeat,
    total: maxTotalRepeat,
  };
};

console.log(
  numbersRepeat([1, 2, 3, 3, 3, 3, 3, 3, 4, 4, 5, 6, 7, 87, 8, 8, 9])
); // ->3
console.log(numbersRepeat([1, 2, 3, 3, 4, 4])); // -> 3

console.log(numbersRepeat([1, 1, 1, 1, 23, 3, 4])); // -> 1

console.log(numbersRepeat([])); // ->null
