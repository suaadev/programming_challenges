def insertion_sort(array):
    i = 0
    while i<len(array)-1:
        next_element = array[i+1]
        k = i
        while k>=0 and next_element<array[k]:
            array[k+1] = array[k]
            k-=1          
        array[k+1]=next_element
        i+=1
    return array

print(insertion_sort([123,32,23,54,654,876987,543,23]))