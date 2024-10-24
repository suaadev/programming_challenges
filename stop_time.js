/*
 * Crea una función que sume 2 números y retorne su resultado pasados
 * unos segundos.
 * - Recibirá por parámetros los 2 números a sumar y los segundos que
 *   debe tardar en finalizar su ejecución.
 * - Si el lenguaje lo soporta, deberá retornar el resultado de forma
 *   asíncrona, es decir, sin detener la ejecución del programa principal.
 *   Se podría ejecutar varias veces al mismo tiempo.
 */


/**
 * 
 * @param {*} n1 
 * @param {*} n2 
 * @param {*} stop_time 
 */
const stop_time = async (n1, n2, time) => {
    setTimeout(() => {
        console.log(n1 + n2)
    }, time * 1000)
}

stop_time(5, 5, 60)
stop_time(1, 5, 4)
stop_time(2, 5, 2)
