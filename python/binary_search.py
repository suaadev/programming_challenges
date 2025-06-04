#algoritmo recursivo de busqueda binaria
def binary_search(n,array):
    size = len(array)
    mid =  int(size/2)
    print(mid,array)
    
    if(array[mid]==n):
        return True
    
    if(size==1 ):
        return False
    
    if(n<array[mid]):
        return binary_search(n,array[:mid])   
    else:
        return binary_search(n,array[mid:])  
    
    
    
#algoritmo de busqueda binaria normal
def binary_search_n(n,array):
    size = len(array)
    mid = int(size/2)
    
    i=0#limite interno 
    j=size #limite superior
    
    while array[mid]!=n :        
        print(i,j,mid)  
        
        if((j-i)==1):
            return False
        
        if(n<array[mid]):
            j=mid
        else:
            i=mid
            
        mid = i + int((j-i)/2) 
        
    return True             
        
        
    

print(binary_search_n(42,[1,2,3,4,5,6,22,34,42,44,66,100,102]))