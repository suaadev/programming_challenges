/*
 * Crea una función que reciba dos array, un booleano y retorne un array.
 * - Si el booleano es verdadero buscará y retornará los elementos comunes
 *   de los dos array.
 * - Si el booleano es falso buscará y retornará los elementos no comunes
 *   de los dos array.
 * - No se pueden utilizar operaciones del lenguaje que
 *   lo resuelvan directamente.
 */

const check_set = (arr1, arr2, flag) => {
    let commons_elements = []
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (flag && arr1[i] === arr2[j] && !commons_elements.includes(arr1[i])) {
                commons_elements.push(arr1[i])
            }
            if (!flag && arr1[i] !== arr2[j] && !commons_elements.includes(arr1[i])) {
                commons_elements.push(arr1[i])
            }
        }
    }
    return commons_elements
}

console.log(check_set([1, 23, 3, 4, 4, 34, 4, 5], [3, 2, 24, 4], true));