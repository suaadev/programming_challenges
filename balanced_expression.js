
/*
 * Crea un programa que comprueba si los paréntesis, llaves y corchetes
 * de una expresión están equilibrados.
 * - Equilibrado significa que estos delimitadores se abren y cieran
 *   en orden y de forma correcta.
 * - Paréntesis, llaves y corchetes son igual de prioritarios.
 *   No hay uno más importante que otro.
 * - Expresión balanceada: { [ a * ( c + d ) ] - 5 }
 * - Expresión no balanceada: { a * ( c + d ) ] - 5 }
 */

const check_expression_equi = (exp) => {
    const del_open = "{[("
    const del_closed = "}])"
    let x_open = []

    for (let letter of exp) {

        if (del_open.includes(letter)) {
            x_open.push(letter)
        }
        if (del_closed.includes(letter)) {
            const i = del_closed.indexOf(letter)
            if (x_open.length === 0) {
                return false
            }

            if (x_open.pop() !== del_open[i]) {
                return false
            }
        }
    }
    return x_open.length === 0
}


console.log(check_expression_equi(' { [ a * ( c + d ) ] - 5 }'))

