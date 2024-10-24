const insertion_sort = (array) => {
    const size = array.length - 1
    let i = 0
    while (i < size) {
        const next_element = array[i + 1]
        let k = i
        while (k >= 0 && array[k] > next_element) {
            array[k + 1] = array[k]
            k--
        }
        array[k + 1] = next_element
        i++
    }
    return array
}

console.log(insertion_sort([6, 5, 3, 2, 1100, 23, 45, 64, 76, 86, 3, 4, 5]))