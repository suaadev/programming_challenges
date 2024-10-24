from datetime import datetime


def calculate_years(date_born: datetime) -> str:
    current_date = datetime.now()
    years = current_date.year - date_born.year
    current_day = current_date.day
    current_month = current_date.month
    born_day = date_born.day
    born_month = date_born.month

    if (born_month > current_month):
        years -= 1
        months = current_month+born_month
    else:
        months = current_month-born_month

    if (born_day > current_day):
        days = current_day+born_day
    else:
        days = current_day-born_day

    print(f'han pasado {years} años y {months} meses y {days} dias ')


calculate_years(datetime(1993, 5, 22))
