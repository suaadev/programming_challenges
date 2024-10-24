
"""
Crear una funcion que reciba una lista y esta devuelva o elimina los elementos repetidos
input -> [5,4,4,3,2,1,2,1,3] 
Output -> [5,4,3,2,1]
"""


def solution1(l):
    limit = len(l)
    i = 0
    while i < limit:
        j = i+1
        while j < limit:
            if l[i] == l[j]:
                l.pop(j)
                limit -= 1
                continue
            j += 1
        i += 1


def solution2(l):
    l2 = []
    for i in l:
        if i not in l2:
            l2.append(i)
    return l2


def solution3(l):
    l4 = []
    for i in range(len(l)):
        for j in range(i+1, len(l)):
            if l[i] == l[j] and l[j] != '*':
                l[j] = '*'
    for i in l:
        if i != '*':
            l4.append(i)
    return l4


def solution4(l):
    dic = dict()
    for i in l:
        dic[i] = 1
    return list(dic.keys())


def solution5(l):
    return list(set(l))


l1 = [1, 2, 2, 5, 3, 4, 5, 6, 4, 4, 4, 4, 4, 4, 4, 4, 3]  # 1,2,3,4,5,6
solution1(l1)  # inplace
print(l1)

print(solution2([1, 2, 2, 5, 3, 4, 5, 6, 4, 4, 4, 4, 4, 4, 4, 4, 3]))

print(solution3([1, 2, 2, 5, 3, 4, 5, 6, 4, 4, 4, 4, 4, 4, 4, 4, 3]))

print(solution4([1, 2, 2, 5, 3, 4, 5, 6, 4, 4, 4, 4, 4, 4, 4, 4, 3]))

print(solution5([1, 2, 2, 5, 3, 4, 5, 6, 4, 4, 4, 4, 4, 4, 4, 4, 3]))
