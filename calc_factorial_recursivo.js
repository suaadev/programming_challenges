const calc_recursivo = (n) => {
    if (n === 1) {
        return 1
    }
    return n * calc_recursivo(n - 1)
}

console.log(calc_recursivo(10))  