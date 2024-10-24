""" /*
 * Crea un función que reciba un texto y retorne la vocal que
 * más veces se repita.
 * - Ten cuidado con algunos casos especiales.
 * - Si no hay vocales podrá devolver vacío.
 */ """
 
def vocal_common(text:str)-> str:
    common = {
        "a":0,
        "e":0,
        "i":0,
        "u":0,
        "o":0
    }
    #recorro el el texto contando cada vocal
    for i in text:
       if common.get(i) is not None:
           common[i]+=1
    
    values:list = list(common.values())
    max_repet = max(values)
    index_max = values.index(max_repet)
    vocal = list(common.keys())[index_max]
    return (vocal,max_repet) if max_repet!=0 else ''  
    
    
print(vocal_common('hola como estan mis amigos'))
print(vocal_common('rrlldfgdarrozconpan'))