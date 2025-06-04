const merge_sort = (array) => {
    const size = array.length
    const middle = parseInt(size / 2)
    if (size === 1) {
        return array
    }
    const left = array.slice(0, middle)
    const right = array.slice(middle, size)

    const l = merge_sort(left)
    const r = merge_sort(right)

    return merge(l, r)
}

const merge = (arr1, arr2) => {
    let arraySorted = []
    while (arr1.length !== 0 && arr2.length !== 0) {
        if (arr1[0] > arr2[0]) {
            arraySorted.push(arr2.shift())
            continue
        }
        arraySorted.push(arr1.shift())

    }
    if (arr1.length !== 0) {
        arraySorted = [...arraySorted, ...arr1]
    }
    if (arr2.length !== 0) {
        arraySorted = [...arraySorted, ...arr2]
    }
    return arraySorted
}

console.log(merge_sort([1, 3, 3, 45, 10, 6, 7, 8, 34, 3, 4, 2]))