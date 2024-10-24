""" /*
 * Crea un programa capaz de interactuar con un fichero TXT.
 * IMPORTANTE: El fichero TXT NO debe subirse como parte de la corrección.
 * Únicamente el código.
 *
 * - Si no existe, debe crear un fichero llamado "text.txt".
 * - Desde el programa debes ser capaz de introducir texto por consola y guardarlo
 *   en una nueva línea cada vez que se pulse el botón "Enter".
 * - Si el fichero existe, el programa tiene que dar la opción de seguir escribiendo
 *   a continuación o borrar su contenido y comenzar desde el principio.
 * - Si se selecciona continuar escribiendo, se tiene que mostrar por consola
 *   el texto que ya posee el fichero. 
 */ """
from os import system,remove

def menu(file):
    while True:
        print('Ya existe un archivo con contenido...\n1.Seguir escribiendo acontinuacion.\n2.Borrar contenido del archivo.\n3.Salir..')
        option = input('ingrese una opcion correcta:')
        if(option=='1'):
            break
        if(option=='3'):
            print('Saliendo....')
            return False
        if(option=='2'):
            file.truncate(0)
            break       
        system('cls')
        print('Opcion incorrecta...')
        system('pause')
    system('cls')
    return True
  
  
def init():
    with open('./text.txt','a+') as file:
        file.seek(0)
        if(len(file.read())!=0 and not menu(file) ):
            return     
        write_in_file(file)
      
def write_in_file(file):
    file.seek(0)
    print(file.read())
    while (x:= input()) != '/exit': 
        file.write('\n'+x) 
     
           
if(__name__ == '__main__'):
    init()