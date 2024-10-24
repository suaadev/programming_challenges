arbol1 = [1, [23, [23, None, None], [33, [2, [76, None, None], [
    96, None, None]], None]], [53, [23, [54, None, None], None], None]]


def recorrido(arbol):
    reco = []
    if (arbol[1] is not None):
        reco.extend(recorrido(arbol[1]))
    if (arbol[2] is not None):
        reco.extend(recorrido(arbol[2]))
    reco.append(arbol[0])
    return reco


def search(arbol, element):
    if (arbol[0] == element):
        print(arbol[0])
        return True
    if (arbol[1] is not None and arbol[2] is not None):
        return False or search(arbol[1], element) or search(arbol[2], element)

    if (arbol[2] is not None):
        return False or search(arbol[2], element)

    if (arbol[1] is not None):
        return False or search(arbol[1], element)


print(search(arbol1, 96))
