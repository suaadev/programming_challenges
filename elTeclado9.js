/*
 * Los primeros dispositivos móviles tenían un teclado llamado T9
 * con el que se podía escribir texto utilizando únicamente su
 * teclado numérico (del 0 al 9).
 *
 * Crea una función que transforme las pulsaciones del T9 a su
 * representación con letras.
 * - Debes buscar cuál era su correspondencia original.
 * - Cada bloque de pulsaciones va separado por un guión.
 * - Si un bloque tiene más de un número, debe ser siempre el mismo.
 * - Ejemplo:
 *     Entrada: 6-666-88-777-33-3-33-888
 *     Salida: MOUREDEV
 */
const decodedPulses = (input) => {
  keyboard = {
    1: " ",
    2: "ABC",
    3: "DEF",
    4: "GHI",
    5: "JKL",
    6: "MN0",
    7: "PQRS",
    8: "TUV",
    9: "WXYZ",
  };
  return input.split("-").reduce((a, c) => a + keyboard[c[0]][c.length - 1], '');
};
console.log(decodedPulses("6-666-88-777-33-3-33-888"));
console.log(decodedPulses("7777-666-999-1-3-2-888-444-555-33-9999"));
