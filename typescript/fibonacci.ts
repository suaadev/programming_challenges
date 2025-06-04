/*
 * Escribe un programa que imprima los 50 primeros números de la sucesión
 * de Fibonacci empezando en 0.
 * - La serie Fibonacci se compone por una sucesión de números en
 *   la que el siguiente siempre es la suma de los dos anteriores.
 *   0, 1, 1, 2, 3, 5, 8, 13...
 */

function calcFibonacci(n: number): void {
  let a = 0;
  let b = 1;
  for (let i = 0; i < n; i++) {
    const k = a + b;
    console.log(a);
    a = b;
    b = k;
  }
}
const t1: number = performance.now();
calcFibonacci(1000);
const timeLoop = performance.now() - t1;

console.log(
  "--------------------WITH RECURSIVITY AND DINAMIC PROGRAMMING------------------"
);

const memory: Map<number, number> = new Map();
function calcFibonacciRecursive(n: number): number {
  if (memory.has(n)) {
    return memory.get(n) as number;
  }

  if (n === 0 || n === 1) return n;

  // calcula el fibonacci
  const result: number =
    calcFibonacciRecursive(n - 1) + calcFibonacciRecursive(n - 2);

  // guardo en memoria el fibonacci ya calculado
  memory.set(n, result);

  return result;
}
function generateFibonacciSerie(n: number): void {
  for (let i = 0; i < n; i++) {
    console.log(calcFibonacciRecursive(i));
  }
}
const t2: number = performance.now();
generateFibonacciSerie(1000);
const timeRecursivity: number = performance.now() - t2;

console.log(`times: loop:${timeLoop} , recursivity:${timeRecursivity}`);
