""" /*
 * Escribe una función que reciba dos palabras (String) y retorne
 * verdadero o falso (Bool) según sean o no anagramas.
 * - Un Anagrama consiste en formar una palabra reordenando TODAS
 *   las letras de otra palabra inicial.
 * - NO hace falta comprobar que ambas palabras existan.
 * - Dos palabras exactamente iguales no son anagrama.
 */ """


def isAnagrama(word1: str, word2: str) -> bool:
    if word1.upper() == word2.upper() or len(word1) != len(word2):
        return False
    for i in range(len(word1)):
        if not word1[i] in word2 or not word2[i] in word1 or word1.count(word1[i]) != word2.count(word1[i]):
            return False
    return True


print(isAnagrama("caraa", "crraa"))
