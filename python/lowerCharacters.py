""" /*
 * Crea una función que reciba un String de cualquier tipo y se encargue de
 * poner en mayúscula la primera letra de cada palabra.
 * - No se pueden utilizar operaciones del lenguaje que
 *   lo resuelvan directamente.
 */ """


def upperWords(text: str) -> str:
    textUpper = ''
    for word in text.split():
        textUpper += word[0].upper() + word[1:] + ' '
    return textUpper


print(upperWords('hola mundo como estan ? gente'))
