/**
 * ## Reto 2: El Cifrador César Dinámico (Intermedio)
 *
 * ### Descripción
 * Encripta un texto desplazando cada letra N posiciones en el abecedario.
 *
 * ### Reglas de oro (Requisitos)
 * 1. Mantener mayúsculas y minúsculas en su lugar.
 * 2. Ignorar y mantener igual caracteres especiales (espacios, números, comas, etc.).
 * 3. Soportar desbordamientos usando módulo (desplazamiento > 26).
 * 4. (Opcional) Soportar desplazamientos negativos.
 *
 * ### Casos de Prueba (Test Cases)
 * - ("abc", 1) -> "bcd"
 * - ("xyz", 3) -> "abc"
 * - ("¡Hola, 123!", 5) -> "¡Mtqa, 123!"
 * - ("Prueba", 28) -> "Rtwgdc" (28 % 26 = 2 posiciones)
 * - ("Python", -3) -> "Mv qelk"
 */

const stringDicc =
  "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyzÁÉÍÓÚÜáéíóúü .,;:_!¡?¿()[]{}/\\@#$%" +
  '"' +
  "'*+=<>";

function ceaserCipher(tex: string, key: number): string {
  let cipherText: string = "";

  for (const caracter of tex) {
    const valueCharacterFound = stringDicc.indexOf(caracter);

    if (valueCharacterFound < 0) {
      cipherText += caracter;
      continue;
    }
    const diccSize = stringDicc.length - 1;

    const c = (valueCharacterFound + key) % diccSize;

    cipherText += stringDicc[c];
  }

  return cipherText;
}

function decipher(text: string, key: number) {
  let decipherText: string = "";

  for (const caracter of text) {
    const valueCharacterFound = stringDicc.indexOf(caracter);

    if (valueCharacterFound < 0) {
      decipherText += caracter;
      continue;
    }
    const diccSize = stringDicc.length - 1;

    const m = (valueCharacterFound - (key % diccSize) + diccSize) % diccSize;

    decipherText += stringDicc[m];
  }

  return decipherText;
}
const cipherText = ceaserCipher("¡Hola, 123!", 45);

console.log(cipherText);
console.log(decipher(cipherText, 45));
