/*
 * Crea una función que ordene y retorne una matriz de números.
 * - La función recibirá un listado (por ejemplo [2, 4, 6, 8, 9]) y un parámetro
 *   adicional "Asc" o "Desc" para indicar si debe ordenarse de menor a mayor
 *   o de mayor a menor.
 * - No se pueden utilizar funciones propias del lenguaje que lo resuelvan
 *   automáticamente.
 */
//utilizo el algoritmo de ordenamiento bubble sort uno de las mas famosos pero lento debido a su complejidad de O(N^2)
const array_sort = (array, flag = true) => {
    //el algoritmo de ordenamiento lo hace inplace lo que significa que modifica la propia estructura de dato
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (flag) {
                if (array[j] < array[j + 1]) {
                    continue
                }
            } else {
                if (array[j] > array[j + 1]) {
                    continue
                }
            }
            const aux = array[j]
            array[j] = array[j + 1]
            array[j + 1] = aux
        }
    }
    return array
}
let array1 = [2, 3, 4, 5, 6, 7, 8, 5, 3, 3, 2, 4, 5, 6, 6, 6, 5, 6, 6, 5]
console.log(array1);
array_sort(array1, false)
console.log(array1);