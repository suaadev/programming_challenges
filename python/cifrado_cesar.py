"""/*
 * Crea un programa que realize el cifrado César de un texto y lo imprima.
 * También debe ser capaz de descifrarlo cuando así se lo indiquemos.
 *
 */
 """

alphabet_dict = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13,'Ñ': 14, 'O': 15, 'P': 16, 'Q': 17, 'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26, 'Ñ': 27}

alphabet_list = list(alphabet_dict.items())

def cipher(text:str,k:int):

  text_cipher = ''

  for i in text:
    m =  alphabet_dict.get(i.upper())

    if m is None:
      text_cipher += i
      continue
    c = m + k%27
    text_cipher += alphabet_list[c][0]

  return text_cipher




def decipher(text:str,k:int):
  text_decipher = ''

  for i in text:
    m =  alphabet_dict.get(i.upper())

    if m is None:
      text_decipher+= i
      continue

    c = m - k%27
    text_decipher+= alphabet_list[c][0]

  return text_decipher




text_cipher = cipher("hola como estas ? mi querido amigo mio",5)
print(text_cipher)
print(decipher(text_cipher,5))