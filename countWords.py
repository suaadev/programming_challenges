""" /*
 * Crea un programa que cuente cuantas veces se repite cada palabra
 * y que muestre el recuento final de todas ellas.
 * - Los signos de puntuación no forman parte de la palabra.
 * - Una palabra es la misma aunque aparezca en mayúsculas y minúsculas.
 * - No se pueden utilizar funciones propias del lenguaje que
 *   lo resuelvan automáticamente.
 */ """


def countWords(text: str):
    wordsCounts = dict()
    wordAux = ''
    for letter in text:
        if letter in ',.':
            continue

        if (letter == ' '):
            if (wordsCounts.get(wordAux) is not None):
                wordsCounts[wordAux] += 1
            else:
                wordsCounts[wordAux.lower()] = 1
            wordAux = ''
            continue
        wordAux += letter
    return wordsCounts


print(countWords('Hola JoSe esto es una prueba con el texto, para probar una prueba, hola jose esto es una prueba para probar'))
