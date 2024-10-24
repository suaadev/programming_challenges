""" *
 * Crea un programa que invierta el orden de una cadena de texto
 * sin usar funciones propias del lenguaje que lo hagan de forma automática.
 * - Si le pasamos "Hola mundo" nos retornaría "odnum aloH"
 *
  """
def string_invert (word):
    str_out = ''
    for i in range(len(word)-1,-1,-1):
        str_out+= word[i]
    return str_out
print(string_invert('hola amigos de youtube'))
    
    

    