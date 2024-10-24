/*
 * Escribe una función que reciba un texto y retorne verdadero o
 * falso (Boolean) según sean o no palíndromos.
 * Un Palíndromo es una palabra o expresión que es igual si se lee
  * de izquierda a derecha que de derecha a izquierda.
 * NO se tienen en cuenta los espacios, signos de puntuación y tildes.
 * Ejemplo: Ana lleva al oso la avellana.
 */

const calc_palindromo = (str1) => {
    let step = 0
    const size_ = str1.length

    for (let i = 0; i < parseInt(size_ / 2); i++) {
        step += 1
        if (str1[i] !== str1[size_ - 1 - i]) {
            return false
        }
    }
    return true
}


console.log(calc_palindromo('raeer'))
console.log(calc_palindromo('reconocer'))