/**
 * Algoritmo de ordenamiento Quicksort
 * esto algoritmo nos ayuda a organizar una lista de numeros desordenada utilizando metodologia divide y venceras
 * con una complejidad de nlngn
 * 
*/
const quick_sort = (array, low, high) => {
    if (low < high) {
        const p = partition(array, low, high)

        quick_sort(array, low, p - 1)
        quick_sort(array, p + 1, high)
    }
}
const partition = (array, low, high) => {
    const pivot = low
    let r = low
    for (let i = low; i <= high; i++) {
        if (array[i] <= array[pivot]) {
            const aux = array[i]
            array[i] = array[r]
            array[r] = aux
            r++
        }
    }
    const aux = array[r - 1]
    array[r - 1] = array[pivot]
    array[pivot] = aux
    return r - 1
}

let array2 = [4, 2, 3, 33, 324, 543, 4, 5, 7, 34]

quick_sort(array2, 0, 9)
console.log(array2);