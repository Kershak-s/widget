<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge&logo=semantic-release" alt="Version"/>
  <img src="https://img.shields.io/badge/electron-39.2.6-47848F?style=for-the-badge&logo=electron&logoColor=white" alt="Electron"/>
  <img src="https://img.shields.io/badge/node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/platform-windows-0078D6?style=for-the-badge&logo=windows&logoColor=white" alt="Windows"/>
  <img src="https://img.shields.io/badge/license-ISC-purple?style=for-the-badge" alt="License"/>
</p>

<br/>

<h1 align="center">
  <br/>
  📊
  <br/><br/>
  <b>Widget Produccion</b>
  <br/>
  <sub>Desktop Widget para Monitoreo de KPIs en Tiempo Real</sub>
</h1>

<br/>

<p align="center">
  <b>🖥️ System Tray | 📈 MFR% & TE% | 🔄 Auto-Refresh | 📁 Excel Data</b>
</p>

<br/>

---

<br/>

## 🌟 **Vista General**

**Widget Produccion** es una aplicacion de escritorio ligera para Windows que muestra indicadores clave de produccion (KPIs) directamente en tu pantalla. Diseñado para mantenerse siempre visible, permite monitorear el rendimiento de las lineas de produccion sin interrumpir tu flujo de trabajo.

<br/>

<table>
<tr>
<td width="50%">

### 📈 **Indicadores Principales**

| KPI | Descripcion |
|-----|-------------|
| 📊 **MFR%** | Manufacturing Rate |
| ⚡ **TE%** | Time Efficiency |
| 📉 **Comparativas** | Semanal y Mensual |
| 🏭 **Por Linea** | Desglose detallado |

</td>
<td width="50%">

### 🎯 **Caracteristicas Clave**

| Feature | Estado |
|---------|--------|
| 🔝 Always On Top | ✅ Activo |
| 🖱️ Draggable | ✅ Activo |
| 📁 Excel Input | ✅ Activo |
| 🔄 Auto-Refresh | ✅ 60s |

</td>
</tr>
</table>

<br/>

---

<br/>

## 🚀 **Caracteristicas Principales**

<br/>

<table>
<tr>
<td align="center" width="25%">
<br/>
<h3>🔲</h3>
<b>Mini Widget</b>
<br/><br/>
<sub>Barra compacta flotante<br/>Siempre visible<br/>Arrastrable</sub>
<br/><br/>
</td>
<td align="center" width="25%">
<br/>
<h3>📊</h3>
<b>Panel Expandido</b>
<br/><br/>
<sub>Vista detallada<br/>Gauges animados<br/>Lista de lineas</sub>
<br/><br/>
</td>
<td align="center" width="25%">
<br/>
<h3>📁</h3>
<b>Datos Excel</b>
<br/><br/>
<sub>Lectura automatica<br/>Formato flexible<br/>Actualizacion en vivo</sub>
<br/><br/>
</td>
<td align="center" width="25%">
<br/>
<h3>🎨</h3>
<b>Indicadores LED</b>
<br/><br/>
<sub>Verde: Optimo<br/>Amarillo: Alerta<br/>Rojo: Critico</sub>
<br/><br/>
</td>
</tr>
</table>

<br/>

<table>
<tr>
<td align="center" width="25%">
<br/>
<h3>🖥️</h3>
<b>System Tray</b>
<br/><br/>
<sub>Icono en bandeja<br/>Menu contextual<br/>Control rapido</sub>
<br/><br/>
</td>
<td align="center" width="25%">
<br/>
<h3>💾</h3>
<b>Persistencia</b>
<br/><br/>
<sub>Guarda posicion<br/>Configuracion JSON<br/>Recuerda estado</sub>
<br/><br/>
</td>
<td align="center" width="25%">
<br/>
<h3>🔄</h3>
<b>Auto-Refresh</b>
<br/><br/>
<sub>Cada 60 segundos<br/>Recarga manual<br/>Timestamp visible</sub>
<br/><br/>
</td>
<td align="center" width="25%">
<br/>
<h3>📦</h3>
<b>Instalador</b>
<br/><br/>
<sub>NSIS Installer<br/>Portable option<br/>Auto-update ready</sub>
<br/><br/>
</td>
</tr>
</table>

<br/>

---

<br/>

## 🏗️ **Arquitectura del Sistema**

```
┌─────────────────────────────────────────────────────────────────┐
│                     🖥️ WIDGET PRODUCCION                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐         ┌─────────────────────────────┐  │
│   │  📊 Mini Widget │ ──────▶ │    📈 Panel Expandido       │  │
│   │   (Always Top)  │  hover  │   - Gauges SVG              │  │
│   │   MFR% | TE%    │  click  │   - Lista de Lineas         │  │
│   └─────────────────┘         │   - Comparativas            │  │
│           │                   └─────────────────────────────┘  │
│           │                                                     │
├───────────┼─────────────────────────────────────────────────────┤
│           │           ⚙️ ELECTRON MAIN PROCESS                  │
│           │                                                     │
│   ┌───────┴───────┐   ┌─────────────┐   ┌─────────────────┐   │
│   │   IPC Bridge  │   │  Tray Icon  │   │  Config Manager │   │
│   │   (Renderer)  │   │   (Menu)    │   │    (JSON)       │   │
│   └───────────────┘   └─────────────┘   └─────────────────┘   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                      📁 DATA LAYER                              │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                    Excel Reader (XLSX)                   │  │
│   │           datos_produccion.xlsx ──▶ JSON Data           │  │
│   └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

<br/>

---

<br/>

## 🚦 **Sistema de Semaforos**

<br/>

<table>
<tr>
<td align="center" width="33%">
<br/>
<h3>🟢</h3>
<b>OPTIMO</b>
<br/><br/>
<sub>MFR ≥ 90%<br/>TE ≥ 85%</sub>
<br/><br/>
</td>
<td align="center" width="33%">
<br/>
<h3>🟡</h3>
<b>ALERTA</b>
<br/><br/>
<sub>MFR ≥ 85%<br/>TE ≥ 70%</sub>
<br/><br/>
</td>
<td align="center" width="33%">
<br/>
<h3>🔴</h3>
<b>CRITICO</b>
<br/><br/>
<sub>MFR < 85%<br/>TE < 70%</sub>
<br/><br/>
</td>
</tr>
</table>

<br/>

---

<br/>

## 📦 **Estructura del Proyecto**

```
widget-produccion/
│
├── 📄 package.json              # Configuracion del proyecto
├── 📄 create-icon.js            # Generador de iconos
│
├── 📂 src/
│   ├── 📂 main/
│   │   └── 📄 main.js           # Proceso principal Electron
│   │
│   └── 📂 renderer/
│       ├── 📄 index.html        # Panel expandido (detalle)
│       └── 📄 mini.html         # Widget mini (barra flotante)
│
├── 📂 data/
│   ├── 📄 datos_produccion.xlsx # Datos de entrada
│   └── 📄 config.json           # Configuracion persistente
│
├── 📂 assets/
│   ├── 🖼️ icon.png              # Icono PNG
│   └── 🖼️ icon.ico              # Icono Windows
│
└── 📂 dist/                     # Build de produccion
    └── 📦 Widget Produccion Setup.exe
```

<br/>

---

<br/>

## 🛠️ **Instalacion**

<br/>

### **Requisitos Previos**

```bash
Node.js 18+
npm (gestor de paquetes)
Windows 10/11
```

<br/>

### **Paso 1: Clonar el Repositorio**

```bash
git clone https://github.com/Kershak-s/widget.git
cd widget
```

<br/>

### **Paso 2: Instalar Dependencias**

```bash
npm install
```

<br/>

### **Paso 3: Ejecutar en Desarrollo**

```bash
npm start
```

<br/>

### **Paso 4: Compilar para Produccion**

```bash
# Crear instalador Windows
npm run build:win
```

El instalador se generara en `dist/Widget Produccion Setup.exe`

<br/>

---

<br/>

## 📊 **Formato de Datos Excel**

El widget lee datos desde `data/datos_produccion.xlsx`:

<br/>

| Columna | Tipo | Descripcion |
|---------|------|-------------|
| Tipo | String | "MFR" o "TE" |
| Linea | String | Nombre de la linea (ej: "B1(Dorito 1500)") |
| Valor | Number | Porcentaje del KPI |
| MFR | Number | Valor general MFR% |
| TE | Number | Valor general TE% |
| DifSemana | Number | Diferencia vs semana anterior |
| DifMes | Number | Diferencia vs mes anterior |

<br/>

### **Ejemplo de Estructura:**

| Tipo | Linea           | Valor | MFR  | TE   | DifSemana | DifMes |
|------|-----------------|-------|------|------|-----------|--------|
| MFR  | B1(Dorito 1500) | 79.7  | 90.0 | 85.0 | -3.2      | -13.7  |
| MFR  | B2(Dorito 2000) | 80.0  |      |      |           |        |
| TE   | C3(Frito 3000)  | 9.99  |      |      |           |        |

<br/>

---

<br/>

## 📊 **Stack Tecnologico**

<br/>

<table>
<tr>
<td align="center" width="20%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" width="50"/>
<br/><b>Electron</b>
<br/><sub>39.2.6</sub>
</td>
<td align="center" width="20%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="50"/>
<br/><b>Node.js</b>
<br/><sub>18+</sub>
</td>
<td align="center" width="20%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="50"/>
<br/><b>JavaScript</b>
<br/><sub>ES6+</sub>
</td>
<td align="center" width="20%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="50"/>
<br/><b>HTML5</b>
<br/><sub>Renderer</sub>
</td>
<td align="center" width="20%">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="50"/>
<br/><b>CSS3</b>
<br/><sub>Styles</sub>
</td>
</tr>
</table>

<br/>

### **Dependencias Principales**

| Paquete | Version | Proposito |
|---------|---------|-----------|
| electron | 39.2.6 | Framework desktop |
| electron-builder | 26.0.12 | Empaquetador/Instalador |
| xlsx | 0.18.5 | Lectura de archivos Excel |
| react | 19.2.3 | UI Components (futuro) |
| jimp | 1.6.0 | Procesamiento de imagenes |
| icon-gen | 5.0.0 | Generacion de iconos |

<br/>

---

<br/>

## 🎨 **Interfaz de Usuario**

<br/>

### **Mini Widget (Barra Flotante)**

```
┌──────────────────────────────────┐
│ ⋮  🟢 MFR 90.0 │ 🟡 TE 85.0    │
└──────────────────────────────────┘
```

- **Siempre visible** sobre otras ventanas
- **Arrastrable** a cualquier posicion
- **Indicadores LED** de estado por colores
- **Hover/Click** expande el panel detallado

<br/>

### **Panel Expandido**

```
┌─────────────────────────────────────┐
│  Indicadores de Produccion      ✕  │
├─────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐      │
│  │  MFR%     │  │   TE%     │      │
│  │   ◠◡◠     │  │   ◠◡◠     │      │
│  │  90.0%    │  │  85.0%    │      │
│  ├───────────┤  ├───────────┤      │
│  │ B1 79.7%  │  │ C3 9.99%  │      │
│  │ B2 80.0%  │  │ D2 40.86% │      │
│  │ A3 80.5%  │  │ D1 47.96% │      │
│  └───────────┘  └───────────┘      │
├─────────────────────────────────────┤
│  MFR% Comparativas                  │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ Sem: ↓3.2% │ │ Mes: ↓13.7%│   │
│  └─────────────┘ └─────────────┘   │
├─────────────────────────────────────┤
│  TE% Comparativas                   │
│  ┌─────────────┐ ┌─────────────┐   │
│  │ Sem: ↓3.2% │ │ Mes: ↓13.7%│   │
│  └─────────────┘ └─────────────┘   │
├─────────────────────────────────────┤
│      Ultima actualizacion: 12:30   │
└─────────────────────────────────────┘
```

<br/>

---

<br/>

## ⚙️ **Configuracion**

El widget guarda su configuracion en `data/config.json`:

```json
{
  "x": 1680,
  "y": 1018
}
```

| Propiedad | Descripcion |
|-----------|-------------|
| x | Posicion horizontal del widget |
| y | Posicion vertical del widget |

<br/>

---

<br/>

## 🖱️ **Uso**

<br/>

| Accion | Resultado |
|--------|-----------|
| **Click** en mini widget | Abre panel expandido |
| **Hover** 500ms | Abre panel expandido |
| **Arrastrar** con ⋮ | Mueve el widget |
| **Click derecho** en tray | Menu contextual |
| **Click ✕** en panel | Cierra panel expandido |

<br/>

### **Menu del System Tray**

- 👁️ **Mostrar Widget** - Hace visible el mini widget
- 🙈 **Ocultar Widget** - Oculta el mini widget
- 🔄 **Recargar Datos** - Actualiza desde Excel
- ❌ **Salir** - Cierra la aplicacion

<br/>

---

<br/>

## 🤝 **Contribuir**

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m 'Add: nueva caracteristica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

<br/>

---

<br/>

## 📞 **Soporte**

<br/>

<table>
<tr>
<td align="center">
<h3>📧</h3>
<b>Email</b>
<br/>
<sub>soporte@widget.mx</sub>
</td>
<td align="center">
<h3>🐛</h3>
<b>Issues</b>
<br/>
<sub>GitHub Issues</sub>
</td>
<td align="center">
<h3>📖</h3>
<b>Docs</b>
<br/>
<sub>Wiki del proyecto</sub>
</td>
</tr>
</table>

<br/>

---

<br/>

<p align="center">
  <b>Desarrollado con ❤️ para Monitoreo de Produccion Industrial</b>
  <br/><br/>
  <img src="https://img.shields.io/badge/Made%20with-Electron-47848F.svg?style=flat-square&logo=electron" alt="Made with Electron"/>
  <img src="https://img.shields.io/badge/Powered%20by-Node.js-339933.svg?style=flat-square&logo=node.js" alt="Powered by Node.js"/>
  <br/><br/>
  <sub>© 2024 Widget Produccion - Todos los derechos reservados</sub>
</p>
