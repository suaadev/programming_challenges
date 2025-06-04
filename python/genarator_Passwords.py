from random import randint
from string import ascii_lowercase
"""
 * Escribe un programa que sea capaz de generar contraseñas de forma aleatoria.
 * Podrás configurar generar contraseñas con los siguientes parámetros:
 * - Longitud: Entre 8 y 16.
 * - Con o sin letras mayúsculas.
 * - Con o sin números.
 * - Con o sin símbolos.
 * (Pudiendo combinar todos estos parámetros entre ellos)
"""
"""
* Funcionamiento
* Comandos
* -l : genera contraseña con longitud entre 8 a 16 caracteres
* -s : contiene simbolos
* -m : contiene mayuscula
* -n : contiene numeros 
* Ejemplos
* generate-password -l -s 
* generate-password -l 
* generate-password -l -s -m 
* generate-password -s -m 

"""


def init():
    input_ = str(input('!->'))
    params = input_.split()
    if params[0] == "generate-password":
        print(generatePassword(params[1::]))
    else:
        raise Exception('Params incorrects')


def generatePassword(configs: list):
    LETTERS = list(ascii_lowercase)
    SYMBOLS = list(map(chr, range(33, 47)))
    NUMBERS = [x for x in range(11)]
    MAYUS = False

    config_loaded = [LETTERS]
    long = int(randint(5, 11))

    # load configs add
    if configs.count('-n') != 0:
        config_loaded.append(NUMBERS)

    if configs.count('-s') != 0:
        config_loaded.append(SYMBOLS)

    if configs.count('-l') != 0:
        long = int(randint(8, 17))

    if configs.count('-m') != 0:
        MAYUS = True

    passwod = ""
    for i in range(0, long):
        r = randint(0, len(config_loaded)-1)
        n = randint(0, len(config_loaded[r])-1)
        character_generated = str(config_loaded[r][n])
        if MAYUS and r == 0:
            if (randint(0, 1)):
                character_generated = character_generated.upper()
        passwod += character_generated
    return passwod


if __name__ == '__main__':
    try:
        init()
    except Exception as e:
        print(e)
