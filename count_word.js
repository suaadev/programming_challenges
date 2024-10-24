/*
 * Crea un programa que cuente cuantas veces se repite cada palabra
 * y que muestre el recuento final de todas ellas.
 * - Los signos de puntuación no forman parte de la palabra.
 * - Una palabra es la misma aunque aparezca en mayúsculas y minúsculas.
 * - No se pueden utilizar funciones propias del lenguaje que
 *   lo resuelvan automáticamente.
 */

const count_word = (word, text) => {
    let current_word = ''
    let count = 0
    for (let letter of text) {
        current_word += letter

        if (letter === ' ') {
            current_word = ''
        }
        if (current_word.toUpperCase() === word.toUpperCase()) {
            count += 1
        }

    }
    return count
}

console.log(count_word('llamo', 'hola me llamo jose, soy jose y me llamo jose jose jose nose     jose'))