# Datos de Produccion

Coloca aqui tu archivo `datos_produccion.xlsx` con el siguiente formato:

## Estructura del Excel

| Columna | Descripcion |
|---------|-------------|
| Tipo | "MFR" o "TE" |
| Linea | Nombre de la linea (ej: "B1(Dorito 1500)") |
| Valor | Porcentaje (ej: 79.7) |
| MFR | Valor general MFR% |
| TE | Valor general TE% |
| DifSemana | Diferencia vs semana anterior |
| DifMes | Diferencia vs mes anterior |
| DifSemanaTE | Diferencia TE vs semana anterior |
| DifMesTE | Diferencia TE vs mes anterior |

## Ejemplo

| Tipo | Linea | Valor | MFR | TE | DifSemana | DifMes |
|------|-------|-------|-----|----|-----------| -------|
| MFR | B1(Dorito 1500) | 79.7 | 90.0 | 85.0 | -3.2 | -13.7 |
| MFR | B2(Dorito 2000) | 80.0 | | | | |
| TE | C3(Frito 3000) | 9.99 | | | | |

Si no existe el archivo, el widget mostrara datos de ejemplo.
