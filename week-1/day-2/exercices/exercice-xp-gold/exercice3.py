#Exercice 3:
def sum_series(x):
    x_str = str(x)
    
    term1 = int(x_str * 1) 
    term2 = int(x_str * 2) 
    term3 = int(x_str * 3)  
    term4 = int(x_str * 4) 

    return term1 + term2 + term3 + term4

x = 3
result = sum_series(x)
print(f"Result for X={x}: {result}") 