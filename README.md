# Widget Produccion

<div align="center">

![Widget Produccion Logo](assets/icon.png)

### Widget de Indicadores de Produccion para Windows

[![Electron](https://img.shields.io/badge/Electron-39.2.6-47848F?style=for-the-badge&logo=electron&logoColor=white)](https://www.electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)](https://www.microsoft.com/windows)

*Monitorea tus KPIs de produccion en tiempo real desde el escritorio*

---

</div>

## Descripcion

**Widget Produccion** es una aplicacion de escritorio para Windows que muestra indicadores clave de rendimiento (KPIs) de produccion directamente en tu pantalla. El widget permanece siempre visible y te permite monitorear en tiempo real los valores de **MFR%** (Manufacturing First Run) y **TE%** (Technical Efficiency) de tus lineas de produccion.

### Caracteristicas Principales

- **Widget flotante** - Siempre visible en pantalla, no interfiere con tu trabajo
- **Panel expandible** - Click para ver detalles completos de todas las lineas
- **Lectura de Excel** - Importa datos desde archivos `.xlsx` automaticamente
- **Indicadores visuales** - Semaforos de colores para estado rapido (verde/amarillo/rojo)
- **Arrastrable** - Posiciona el widget donde prefieras
- **Comparativas** - Visualiza diferencias vs semana y mes anterior
- **System Tray** - Acceso rapido desde la bandeja del sistema
- **Actualizacion automatica** - Los datos se refrescan cada 60 segundos

## Capturas de Pantalla

### Widget Mini (Siempre Visible)
```
+---------------------------+
| :: | MFR 90.0 | TE 85.0  |
+---------------------------+
```
El widget compacto muestra los valores actuales con indicadores de estado por colores.

### Panel Expandido
Al hacer click en el widget mini, se despliega el panel completo con:
- Graficos tipo gauge para MFR% y TE%
- Lista de las 5 lineas con menor rendimiento
- Comparativas semanales y mensuales

## Instalacion

### Pre-requisitos
- Node.js 18 o superior
- npm o yarn
- Windows 10/11

### Pasos

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/TU_USUARIO/widget-produccion.git
   cd widget-produccion
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   ```

4. **Compilar para produccion**
   ```bash
   npm run build:win
   ```
   El instalador se generara en la carpeta `dist/`

## Configuracion de Datos

El widget lee los datos desde un archivo Excel ubicado en:
```
data/datos_produccion.xlsx
```

### Formato del Excel

| Tipo | Linea | Valor | MFR | TE | DifSemana | DifMes |
|------|-------|-------|-----|----|-----------| -------|
| MFR | B1(Dorito 1500) | 79.7 | 90.0 | 85.0 | -3.2 | -13.7 |
| MFR | B2(Dorito 2000) | 80.0 | | | | |
| TE | C3(Frito 3000) | 9.99 | | | | |

## Estructura del Proyecto

```
widget-produccion/
├── assets/
│   ├── icon.ico          # Icono de la aplicacion
│   └── icon.png          # Icono PNG
├── data/
│   ├── config.json       # Configuracion de posicion
│   └── datos_produccion.xlsx  # Datos de produccion
├── src/
│   ├── main/
│   │   └── main.js       # Proceso principal de Electron
│   └── renderer/
│       ├── index.html    # Panel expandido
│       └── mini.html     # Widget flotante
├── package.json
└── README.md
```

## Tecnologias Utilizadas

| Tecnologia | Proposito |
|------------|-----------|
| **Electron** | Framework para aplicaciones de escritorio |
| **Node.js** | Runtime de JavaScript |
| **xlsx** | Lectura de archivos Excel |
| **electron-builder** | Empaquetado y distribucion |

## Uso

1. **Iniciar el widget** - Ejecuta la aplicacion, aparecera un widget compacto en la esquina inferior derecha
2. **Mover el widget** - Arrastra desde el icono `::`  para reposicionar
3. **Ver detalles** - Haz click o mantén el cursor sobre el widget para expandir
4. **Menu de opciones** - Click derecho en el icono de la bandeja del sistema para:
   - Mostrar/Ocultar widget
   - Recargar datos manualmente
   - Cerrar aplicacion

## Indicadores de Estado

| Color | MFR% | TE% |
|-------|------|-----|
| Verde | >= 90% | >= 85% |
| Amarillo | >= 85% | >= 70% |
| Rojo | < 85% | < 70% |

## Desarrollo

```bash
# Instalar dependencias de desarrollo
npm install

# Ejecutar en modo desarrollo
npm start

# Generar iconos
node create-icon.js

# Compilar para Windows
npm run build:win
```

## Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto esta bajo la Licencia ISC. Ver el archivo [LICENSE](LICENSE) para mas detalles.

---

<div align="center">

**Desarrollado con Electron**

*Widget de monitoreo de KPIs de produccion industrial*

</div>
