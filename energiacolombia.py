import pandas as pd
import matplotlib.pyplot as plt

# Datos de consumo de energía renovable en Colombia (ejemplo adaptado)
data = {
    'Año': [1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020, 2021],
    'Hidroeléctrica': [3.54, 6.05, 9.73, 14.45, 18.44, 27.50, 31.99, 30.82, 39.22, 40.56, 44.68, 49.84, 59.86],
    'Biomasa': [0, 0, 0.19, 0.23, 0.27, 0.27, 0.48, 0.50, 0.50, 1.11, 1.82, 2.82, 2.82],
    'Solar': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.19, 0.32],
    'Eólica': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.05, 0.01, 0.06]
}

df = pd.DataFrame(data)

# Configurar la gráfica
plt.figure(figsize=(12, 7))
plt.stackplot(df['Año'], 
              df['Hidroeléctrica'], 
              df['Biomasa'], 
              df['Solar'], 
              df['Eólica'],
              labels=['Hidroeléctrica', 'Biomasa', 'Solar', 'Eólica'],
              colors=['#1f77b4', '#2ca02c', '#ff7f0e', '#d62728'])

# Personalizar la gráfica
plt.title('Evolución del Consumo de Energías Renovables en Colombia (1965-2021)', fontsize=16)
plt.xlabel('Año', fontsize=14)
plt.ylabel('Consumo (TWh)', fontsize=14)
plt.legend(loc='upper left')
plt.grid(True, linestyle='--', alpha=0.7)
plt.xlim(1965, 2021)

# Mostrar la gráfica
plt.tight_layout()
plt.savefig('energia_colombia.png', dpi=300)  # Guardar como imagen
plt.show()