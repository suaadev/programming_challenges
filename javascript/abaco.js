/*
 * Crea una función que sea capaz de leer el número representado por el ábaco.
 * - El ábaco se representa por un array con 7 elementos.
 * - Cada elemento tendrá 9 "O" (aunque habitualmente tiene 10 para realizar
 *   operaciones) para las cuentas y una secuencia de "---" para el alambre.
 * - El primer elemento del array representa los millones, y el último las unidades.
 * - El número en cada elemento se representa por las cuentas que están a
 *   la izquierda del alambre.
 *
 * Ejemplo de array y resultado:
 * ["O---OOOOOOOO",
 *  "OOO---OOOOOO",
 *  "---OOOOOOOOO",
 *  "OO---OOOOOOO",
 *  "OOOOOOO---OO",
 *  "OOOOOOOOO---",
 *  "---OOOOOOOOO"]
 *
 *  Resultado: 1.302.790
 */
const readAbaco = (abaco) => {
    return formatNumber(extracNumber(abaco))
}
const formatNumber = (number) => {
    return `${number[0]}.${number.slice(1, 4).join('')}.${number.slice(4).join('')} `
}
const extracNumber = (arrayAbaco) => {
    return arrayAbaco.map(l => l.split('---')).map(l => l[0].length)
}

console.log(readAbaco(
    ["O---OOOOOOOO",
        "OOO---OOOOOO",
        "---OOOOOOOOO",
        "OOO---OOOOOO",
        "OOOOOOO---OO",
        "OOOOOOOOO---",
        "---OOOOOOOOO"]));
