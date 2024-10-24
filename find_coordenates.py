""" /*
 * Calcula dónde estará un robot (sus coordenadas finales) que se
 * encuentra en una cuadrícula representada por los ejes "x" e "y".
 * - El robot comienza en la coordenada (0, 0).
 * - Para idicarle que se mueva, le enviamos un array formado por enteros
 *   (positivos o negativos) que indican la secuencia de pasos a dar.
 * - Por ejemplo: [10, 5, -2] indica que primero se mueve 10 pasos, se detiene,
 *   luego 5, se detiene, y finalmente 2.
 *   El resultado en este caso sería (x: -5, y: 12)
 * - Si el número de pasos es negativo, se desplazaría en sentido contrario al
 *   que está mirando.
 * - Los primeros pasos los hace en el eje "y". Interpretamos que está mirando
 *   hacia la parte positiva del eje "y".
 * - El robot tiene un fallo en su programación: cada vez que finaliza una
 *   secuencia de pasos gira 90 grados en el sentido contrario a las agujas
 *   del reloj.
 */ """
 
 
 
def calc_coordinates(steps:list):
    coordinates = [0,0]
    orientation = [1,-1,-1, 1]# N+ O-  S-  E+ *la secuencia de los giros de 90
    current_eje = 1
    k=0
    for i in steps:
        if(k>len(orientation)-1):
            k=0
        coordinates[current_eje]+= i* orientation[k]   
        
        if i>=0:
            k+= 1
        else:
            k-= 1
            
        if(k<=-1) : k=len(steps)-1    
            
        if(current_eje==1):
            current_eje=0
        else:
            current_eje=1
         
    return {"x":coordinates[0],"y":coordinates[1]}

print(calc_coordinates([3,5,-2,-2,-10,1]))#{x: -2, y: -5}
print(calc_coordinates([2,2,-3,4]))#{x: -6, y: 5}
print(calc_coordinates([10, 5, -2]))#(x: -5, y: 12)