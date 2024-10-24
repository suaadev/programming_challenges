import math
def calc_days (date1,date2):
    date1_format = list(map(int,  date1.split('/')))
    date2_format =  list(map(int,  date2.split('/')))

    days = math.fabs((date1_format[2] - date2_format[2])*365) 
  
    def calc_days_week(week):      
        mes =  {
        1: 31,
        2: 28,  
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
        }
        d = 0
        for i in range(1,week+1):
            d+=mes[i]
        return d
            

    days-=  calc_days_week(date1_format[1]-1) + date1_format[0]
    days+=  calc_days_week(date2_format[1]-1) + date2_format[0]


    print(days+5,date1_format,date2_format)
#dd/MM/yyyy
calc_days('01/03/2002','05/06/2013')
    
    