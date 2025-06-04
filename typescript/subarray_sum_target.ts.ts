/**
Enunciado:
Dado un arreglo de números enteros positivos y un número objetivo, encuentra el subarreglo continuo (es decir, elementos seguidos) cuya suma sea exactamente igual al objetivo.

Entrada:
Un arreglo de enteros positivos: arr = [1, 3, 2, 5, 7, 2]

Un número objetivo: target = 12

Salida esperada:
El subarreglo continuo que sume exactamente el objetivo, por ejemplo:
[5, 7] o [3, 2, 5, 2] (si hay más de uno, cualquiera es válido)
**/

const sumSubarray = (n: Array<number>, sumTarget: number) => {
  const subArrays: number[][] = [];

  let left: number = 0;
  let sum: number = 0;

  for (let rigth = 0; rigth < n.length; rigth++) {
    sum += n[rigth];

    while (sum > sumTarget && left <= rigth) {
      sum -= n[left];
      left++;
    }

    if (sum == sumTarget) {
      subArrays.push(n.slice(left, rigth + 1));
    }
  }

  return subArrays.length === 0 ? null : subArrays;
};

console.log(
  sumSubarray([1, 3, 2, 5, 7, 2, 1, 4, 5, 6, 7, 5, 12, 4, 4, 4, 4], 12)
);
/**
[
  [ 5, 7 ],
  [ 2, 1, 4, 5 ],
  [ 7, 5 ],
  [ 12 ],
  [ 4, 4, 4 ],
  [ 4, 4, 4 ]
]
**/
