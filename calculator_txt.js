/*
 * Lee el fichero "Challenge21.txt" incluido en el proyecto, calcula su
 * resultado e imprímelo.
 * - El .txt se corresponde con las entradas de una calculadora.
 * - Cada línea tendrá un número o una operación representada por un
 *   símbolo (alternando ambos).
 * - Soporta números enteros y decimales.
 * - Soporta las operaciones suma "+", resta "-", multiplicación "*"
 *   y división "/".
 * - El resultado se muestra al finalizar la lectura de la última
 *   línea (si el .txt es correcto).
 * - Si el formato del .txt no es correcto, se indicará que no se han
 *   podido resolver las operaciones.
 */
const { readFileSync } = require('fs');

const calculator_txt = () => {
    const file = readFileSync('./Challenge21.txt')
    let data = file.toString('utf-8').split('\r\n')
    return resolve_operation_priority(resolve_operation_priority(resolve_operation_priority(data, '^'), '/*'), '-+')[0]
}
const resolve_operation_priority = (exp, operator) => {
    //console.log(exp);
    for (let i = 1; i < exp.length; i += 2) {
        if (!operator.includes(exp[i])) {
            continue
        }
        const ant = parseFloat(exp[i - 1])
        const next = parseFloat(exp[i + 1])
        if (isNaN(ant) || isNaN(next)) {
            throw new Error('El formator del .txt no es correcto')
        }
        let result = 0
        if (exp[i] === '*') result = ant * next
        if (exp[i] === '/') {
            if (next === 0) {
                throw Error('la division entre 0 no es posible')
            }
            result = ant / next
        }
        if (exp[i] === '+') result = ant + next
        if (exp[i] === '-') result = ant - next
        if (exp[i] === '^') result = Math.pow(ant, next)

        exp[i - 1] = undefined
        exp[i] = undefined
        exp[i + 1] = result
    }

    return exp.filter(d => d != undefined)

}

console.log(calculator_txt());



