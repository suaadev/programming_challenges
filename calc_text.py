""" /*
 * Crea un programa que analice texto y obtenga:
 * - Número total de palabras.
 * - Longitud media de las palabras.
 * - Número de oraciones del texto (cada vez que aparecen un punto).
 * - Encuentre la palabra más larga.
 *
 * Todo esto utilizando un único bucle.
 */
 """

def calc_text(text:str):
    size_text = len(text)
    cant_oraciones = 0
    total_word = 0
    aux_word = ''
    sum_sizes = 0
    flag  = True
    max_word = ''
    for i in range(0,len(text)):
        if(text[i] !=' ' and i!=size_text-1):
            if(text[i]=="."):
                cant_oraciones+=1
            aux_word+=text[i]    
            flag= True
        else:
            if(not flag): continue
            size = len(aux_word) if i!=size_text-1 else len(aux_word)+1
            sum_sizes+=size
            total_word+=1
            if i==size_text-1 : aux_word+=text[i]
            if(len(aux_word)>len(max_word)):
                max_word = aux_word
            aux_word=""
            flag = False
            
          
    return {
        "total palabras":total_word,
        "longitud media de palbras":sum_sizes/total_word,
        "Numero oraciones":cant_oraciones,
        "palabra mas larga":max_word
    }

print(calc_text("hola amigos como estan. yo muy  bien y usted como. va mi hermano"))
print(calc_text("vea pedazo de hijuepueta me paga. mi plata malparido oyo"))