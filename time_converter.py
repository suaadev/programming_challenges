""" 
/*
 * Crea una función que reciba días, horas, minutos y segundos (como enteros)
 * y retorne su resultado en milisegundos.
 */ """
 
def time_converter(days,hours,minuts,seconds):
    return days*86400000 + hours*3600000 +  minuts*60000 + seconds*1000

print(time_converter(10,1,20,1))