/*
 * Dado un array de enteros ordenado y sin repetidos,
 * crea una función que calcule y retorne todos los que faltan entre
 * el mayor y el menor.
 * - Lanza un error si el array de entrada no es correcto.
 */

const calc_lost_solution1 = (array: number[]): Array<number> => {
  const output: number[] = [];
  let asc = false;
  let desc = false;

  for (let i: number = 0; i < array.length; i++) {
    //caluclo si falta su consecutivo
    if (
      i < array.length - 1 &&
      (array[i + 1] !== array[i] + 1 || array[i + 1] !== array[i] - 1)
    ) {
      if (array[i + 1] < array[i]) {
        if (asc) throw new Error("El array debe de ser ascendente");
        desc = true;
        for (let j: number = array[i] - 1; j > array[i + 1]; j--) {
          output.push(j);
        }
        continue;
      }
      asc = true;
      if (desc) throw new Error("El array debe de ser descendente");
      for (let j: number = array[i] + 1; j < array[i + 1]; j++) {
        output.push(j);
      }
    }
    if (array[i + 1] === array[i])
      throw new Error("No pueden haber elementos repetidos");
  }
  return output;
};
7;

const calc_lost_solution2 = (array: number[]): Array<number> => {
  const output: number[] = [];
  const asc = array[0] < array[array.length - 1];

  for (let i: number = 0; i < array.length - 1; i++) {
    if (asc && array[i] < array[i + 1]) {
      continue;
    }
    if (!asc && array[i] > array[i + 1]) {
      continue;
    }
    throw new Error("La entrada es incorrecta");
  }
  //relleno el arreglo con los que faltan
  if (asc) {
    for (let i = array[0]; i <= array[array.length - 1]; i++) {
      if (!array.includes(i)) {
        output.push(i);
      }
    }
  } else {
    for (let i = array[0]; i >= array[array.length - 1]; i--) {
      if (!array.includes(i)) {
        output.push(i);
      }
    }
  }

  return output;
};

try {
  console.log(calc_lost_solution1([-10, 1, 2, 3, 5, 20, 21, 23, 43, 65, 100]));
  console.log(calc_lost_solution1([20, 21, 43, 65, 100, 150]));
  console.log(calc_lost_solution1([43, 45, 65, 100, 150]));
  console.log(calc_lost_solution1([10, 3, 2, 1, 0, -10]));

  /*     console.log(calc_lost_solution1([43, 100, 12, 100, 150]));//devuelve una excepcion
        console.log(calc_lost_solution1([10, 3, 1, 2]));//devuelve una excepcion */

  console.log(calc_lost_solution2([-10, 1, 2, 3, 5, 20, 21, 23, 43, 65, 100]));
  console.log(calc_lost_solution2([20, 21, 43, 65, 100, 150]));
  console.log(calc_lost_solution2([43, 45, 65, 100, 150]));
  console.log(calc_lost_solution2([10, 3, 2, 1, 0, -10]));
} catch (e) {
  console.log(e);
}
