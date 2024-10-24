const translate_to_morse = (word) => {
    let str_output = ""
    const dictionary = {
        "a": "._",
        "b": "_..",
        "c": "_._.",
        "d": "_..",
        "e": ".",
        "f": ".._.",
        "g": "__.",
        "h": "....",
        "i": "..",
        "j": ".___",
        "k": "_._",
        "l": ".__..",
        "m": "__",
        "n": "_.",
        "o": "___",
        "p": ".__.",
        "q": "__._",
        "r": "._.",
        "s": "...",
        "t": "_",
        "u": ".._",
        "v": "..._",
        "w": ".__",
        "x": "_.._",
        "y": "_.__",
        "z": "__.."
    }
    let letter_ant = ''
    for (let letter of word.trim()) {
        if (letter !== ' ') {
            str_output += dictionary[letter.toLowerCase()] + " "
        } else if (letter_ant !== " ") {
            str_output += "  "
        }
        letter_ant = letter
    }
    return str_output
}

console.log(translate_to_morse('                  hola como estas'))

