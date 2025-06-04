/*
 * Crea una única función (importante que sólo sea una) que sea capaz
 * de calcular y retornar el área de un polígono.
 * - La función recibirá por parámetro sólo UN polígono a la vez.
 * - Los polígonos soportados serán Triángulo, Cuadrado y Rectángulo.
 * - Imprime el cálculo del área de un polígono de cada tipo.
 */

interface Shape {
  calcArea: () => number;
}

class Triangle implements Shape {
  constructor(readonly base: number, readonly h: number) {}

  calcArea(): number {
    return (this.base * this.h) / 2;
  }
}

class Square implements Shape {
  constructor(readonly base: number) {}

  calcArea(): number {
    return this.base * 2;
  }
}

class Rectángule implements Shape {
  constructor(readonly base: number, readonly h: number) {}

  calcArea(): number {
    return this.base * this.h;
  }
}

function calcAreaShape(shape: Shape) {
  return shape.calcArea();
}

const t1 = new Triangle(3, 4);
const s1 = new Square(5);
const r1 = new Rectángule(3, 9);

console.log(calcAreaShape(t1));
console.log(calcAreaShape(s1));
console.log(calcAreaShape(r1));
