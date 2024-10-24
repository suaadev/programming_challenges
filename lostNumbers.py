""" /*
 * Dado un array de enteros ordenado y sin repetidos,
 * crea una función que calcule y retorne todos los que faltan entre
 * el mayor y el menor.
 * - Lanza un error si el array de entrada no es correcto.
 */ """


def lostNumbers(l: list) -> list:
    output: list = []
    i = 0
    linit = len(l)
    while i < linit-1:

        if (l[i] >= l[i+1]):
            raise 'El arreglo no es correcto'

        output.append(l[i])

        j = l[i] + 1
        while j < l[i+1]:
            output.append(j)
            j += 1
        i += 1
    output.append(l[-1])
    return output


def lostNumbers2(l: list):
    m = min(l)
    ma = max(l)
    output = []
    for i in range(m, ma+1):
        output.append(i)
    return output


print(lostNumbers2([1, 2, 3, 6, 6, 7, 8, 10, 20, 100]))
