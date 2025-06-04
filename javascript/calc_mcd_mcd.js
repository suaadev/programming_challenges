/*
 * Crea dos funciones, una que calcule el máximo común divisor (MCD) y otra
 * que calcule el mínimo común múltiplo (mcm) de dos números enteros.
 * - No se pueden utilizar operaciones del lenguaje que
 *   lo resuelvan directamente.
 */

const mcd = (n1, n2) => {
    let mcd = 1
    let i = 2
    while (i <= n1 && i <= n2) {
        if (n1 % i === 0 && n2 % i === 0) {
            mcd = i
        }
        i++
    }
    return mcd
}
console.log(mcd(120, 6));



const mcd2 = (n1, n2) => {
    var a = n1
    var b = n2
    while (a != 0 && b != 0) {
        let temp = b
        b = a % b
        a = temp
    }
    return a + b
}


console.log(mcd2(120, 6));





const mcm = (n1, n2) => {
    return (n1 * n2) / mcd2(n1, n2);
}
console.log(mcm(75, 23));