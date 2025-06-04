
const equilibrar_palabra = (str1, str2) => {

    let out1 = ''
    let out2 = ''

    for (let letter of str1) {
        if (!str2.includes(letter)) {
            out1 += letter
        }
    }

    for (let letter of str2) {
        if (!str1.includes(letter)) {
            out2 += letter
        }
    }

    return [out1, out2]
}


console.log(equilibrar_palabra('arroz', 'pan'));