/*
Optmizando algoritmo para saber si un numero es primo o no
*/

const isPrimoOptimized = (n: number) => {
  if (n === 2) {
    return true;
  }
  if (n % 2 === 0) {
    return false;
  }
  for (let i: number = 3; i < n; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

const isPrimo = (n: number) => {
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i: number = n; i > 1; i--) {
    if (i != n && n % i === 0) return false;
  }
  return true;
};

const benchmark = () => {
  const results: Array<Record<string, unknown>> = [];
  const avgs = {
    optimized: 0,
    normal: 0,
  };
  for (let i: number = 1; i < 19999; i += 2) {
    const t1 = performance.now();
    const result1 = isPrimoOptimized(i);
    const t1End = performance.now() - t1;
    avgs.optimized += t1End;
    const t2 = performance.now();
    const result2 = isPrimo(i);
    const t2End = performance.now() - t2;
    avgs.normal += t2End;
    const summary = {
      optimized: { time: t1End, input: i, output: result1 },
      normal: { time: t2End, input: i, output: result2 },
    };
    results.push(summary);
  }
  avgs.normal = avgs.normal / results.length;
  avgs.optimized = avgs.optimized / results.length;
  return { results, avgs };
};

console.log(benchmark().avgs);
