from time import sleep

""" /*
 * Crea una función que reciba dos parámetros para crear una cuenta atrás.
 * - El primero, representa el número en el que comienza la cuenta.
 * - El segundo, los segundos que tienen que transcurrir entre cada cuenta.
 * - Sólo se aceptan números enteros positivos.
 * - El programa finaliza al llegar a cero.
 * - Debes imprimir cada número de la cuenta atrás.
 */ """

def cuenta_atras(n:int,t:int):
    for i in range(n,-1,-1):
        print(i)
        sleep(t)
        
cuenta_atras(12,2)