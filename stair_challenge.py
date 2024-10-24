""" /*
 * Crea una función que dibuje una escalera según su número de escalones.
 * - Si el número es positivo, será ascendente de izquiera a derecha.
 * - Si el número es negativo, será descendente de izquiera a derecha.
 * - Si el número es cero, se dibujarán dos guiones bajos (__).
 *
 * Ejemplo: 4
 *         _
 *       _|
 *     _|
 *   _|
 * _|
 *
 * """
 
def stair_challenge(n):
    if(n==0):
        print('__')
        return
    for i in range(0,abs(n)+1):
        if n>0:
            space = ' '*((n-i)*2)
            row = space + ( '_' if i==0 else '_|')
            print(row)       
        if n<0:
            space = ' '*((i*2)-1)
            row = space + ( '_' if i==0 else '|_')
            print(row)    
                          
stair_challenge(4)