""" /*
* Crea una función que sea capaz de dibujar el "Triángulo de Pascal"
* indicándole únicamente el tamaño del lado.
*
* - Aquí puedes ver rápidamente cómo se calcula el triángulo:
    *   https: // commons.wikimedia.org/wiki/File: PascalTriangleAnimated2.gif
    */
 """


def pascalTriangle(l: int):
    pascalShape = []
    for k in range(1, l+1):
        row = []
        for j in range(k):
            row.append(0)
        pascalShape.append(row)
    pascalShape[0][0] = 1

    for i in range(1, l):
        for j in range(len(pascalShape[i])):
            previusRow = pascalShape[i-1]
            if (j > 0 and j < len(previusRow)):
                pascalShape[i][j] = previusRow[j-1] + previusRow[j]
            else:
                pascalShape[i][j] = previusRow[0]

    printTriangle(pascalShape)


def printTriangle(matriz: list):
    size = len(matriz)
    for i, row in enumerate(matriz):
        for z in range(size-i-1):
            print(' ', end='')
        for k in row:
            print(str(k), end=" ")
        print('')


pascalTriangle(6)
