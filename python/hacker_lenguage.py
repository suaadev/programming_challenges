"""
 * Escribe un programa que reciba un texto y transforme lenguaje natural a
 * "lenguaje hacker" (conocido realmente como "leet" o "1337"). Este lenguaje
 *  se caracteriza por sustituir caracteres alfanuméricos.
 * - Utiliza esta tabla (https://www.gamehouse.com/blog/leet-speak-cheat-sheet/) 
 *   con el alfabeto y los números en "leet".
 *   (Usa la primera opción de cada transformación. Por ejemplo "4" para la "a")
 """


from functools import reduce


table_codes = {
    "a": "4",
    "b": "13",
    "c": "[",
    "d": ")",
    "e": "3",
    "f": "|=",
    "g": "&",
    "h": "#",
    "i": "1",
    "j": ",_|",
    "k": ">|",
    "l": "1",
    "m": "/\/\\",
    "n": "^/",
    "p": "|*",
    "q": "(_,)",
    "r": "l2",
    "s": "5",
    "t": "7",
    "u": "(_)",
    "v": "\/",
    "w": "\/\/",
    "x": "><",
    "y": "j",
    "z": "z",
    "o": "0",
    " ": " "
}


def code_lenguague_hacker(text):
    def f(x): return table_codes[x] if x in table_codes else x
    return reduce(lambda x, y: f(x)+f(y), text)


print(code_lenguague_hacker("hola mundo !"))
