""" /*
 * Escribe un programa que imprima los 50 primeros números de la sucesión
 * de Fibonacci empezando en 0.
 * - La serie Fibonacci se compone por una sucesión de números en
 *   la que el siguiente siempre es la suma de los dos anteriores.
 *   0, 1, 1, 2, 3, 5, 8, 13...
 */
 """
x =  int(input('ingrese un numero: '))


def serie_fibo1(n):
    serie = [0,1]
    for i in range(0,n-2):        
        next = serie[-1] + serie[-2] 
        serie.append(next)
    return list(map(str,serie))
print(' , '.join(serie_fibo1(x)))


def serie_fibo2(n):
    ant0 = 0 
    ant1 = 1
    for i in range(0,n-2):        
        r = ant0+ant1
        ant0 = ant1
        ant1 = r
        print(str(r)+ " , ",end="")

serie_fibo2(x)
print()

##fibonacci recursivo
##fibonnaci memoriazacion 
memo =  [-1]*1000

def fibonacci_recursivo(n):
    if(n==0 or n==1):
        return n
    if (memo[n]!=-1):
        return memo[n]
    else:
        x = fibonacci_recursivo(n-1) + fibonacci_recursivo(n-2)
        memo[n] = x
        return x
    
def fibonacci_serie(n):
    for i in range(n):
        print(str(fibonacci_recursivo(i)) +" , ",end="")
        
fibonacci_serie(x)


