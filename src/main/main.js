const { app, BrowserWindow, Tray, Menu, ipcMain, screen, nativeImage } = require('electron');
const path = require('path');
const XLSX = require('xlsx');
const fs = require('fs');

let miniWindow = null;  // Ventana flotante pequeña
let mainWindow = null;  // Ventana expandida
let tray = null;

// Rutas de archivos
const DATA_FILE_PATH = path.join(__dirname, '../../data/datos_produccion.xlsx');
const CONFIG_FILE_PATH = path.join(__dirname, '../../data/config.json');

console.log('Widget iniciando...');

// Guardar configuración (posición de la ventana)
function saveConfig(config) {
  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2));
  } catch (error) {
    console.error('Error guardando config:', error);
  }
}

// Cargar configuración
function loadConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error cargando config:', error);
  }
  return null;
}

// Crear la mini-ventana flotante (siempre visible)
function createMiniWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  // Cargar posición guardada o usar posición por defecto
  const config = loadConfig();
  const defaultX = screenWidth - 240;
  const defaultY = screenHeight - 42;

  miniWindow = new BrowserWindow({
    width: 150,
    height: 34,
    x: config?.x ?? defaultX,
    y: config?.y ?? defaultY,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    transparent: true,
    hasShadow: false,
    focusable: false,  // No toma el foco, siempre adelante
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Mantener siempre al frente
  miniWindow.setAlwaysOnTop(true, 'screen-saver');

  miniWindow.loadFile(path.join(__dirname, '../renderer/mini.html'));
  miniWindow.setVisibleOnAllWorkspaces(true);

  // Mantener siempre al frente cada 500ms
  setInterval(() => {
    if (miniWindow && !miniWindow.isDestroyed()) {
      miniWindow.setAlwaysOnTop(true, 'screen-saver');
    }
  }, 500);

  // Guardar posición cuando se mueve la ventana
  miniWindow.on('moved', () => {
    if (miniWindow && !miniWindow.isDestroyed()) {
      const bounds = miniWindow.getBounds();
      saveConfig({ x: bounds.x, y: bounds.y });
    }
  });

  // Permitir arrastrar la ventana
  miniWindow.on('closed', () => {
    miniWindow = null;
  });
}

// Crear la ventana expandida (se muestra al hover)
function createMainWindow() {
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: 420,
    height: 520,
    show: false,
    frame: false,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

  mainWindow.on('blur', () => {
    // Ocultar solo si el mouse no está sobre la mini ventana
    setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.hide();
      }
    }, 200);
  });
}

// Crear tray icon (respaldo)
function createTray() {
  const iconPathPng = path.join(__dirname, '../../assets/icon.png');
  const iconPathIco = path.join(__dirname, '../../assets/icon.ico');
  const iconPath = fs.existsSync(iconPathPng) ? iconPathPng : iconPathIco;

  try {
    let icon;
    if (fs.existsSync(iconPath)) {
      icon = nativeImage.createFromPath(iconPath);
    } else {
      icon = nativeImage.createEmpty();
    }

    if (icon.isEmpty()) {
      const size = 16;
      const buffer = Buffer.alloc(size * size * 4);
      for (let i = 0; i < size * size; i++) {
        buffer[i * 4] = 245;
        buffer[i * 4 + 1] = 166;
        buffer[i * 4 + 2] = 35;
        buffer[i * 4 + 3] = 255;
      }
      icon = nativeImage.createFromBuffer(buffer, { width: size, height: size });
    }

    tray = new Tray(icon);
    tray.setToolTip('Widget Producción - MFR% / TE%');

    tray.on('right-click', () => {
      const contextMenu = Menu.buildFromTemplate([
        { label: 'Mostrar Widget', click: () => { if (miniWindow) miniWindow.show(); } },
        { label: 'Ocultar Widget', click: () => { if (miniWindow) miniWindow.hide(); } },
        { type: 'separator' },
        { label: 'Recargar Datos', click: () => {
          if (miniWindow) miniWindow.webContents.send('reload-data');
          if (mainWindow) mainWindow.webContents.send('reload-data');
        }},
        { type: 'separator' },
        { label: 'Salir', click: () => app.quit() },
      ]);
      tray.popUpContextMenu(contextMenu);
    });
  } catch (error) {
    console.error('Error creando tray:', error);
  }
}

// Mostrar ventana expandida
function showExpandedWindow() {
  if (!mainWindow || !miniWindow) return;

  const miniBounds = miniWindow.getBounds();
  const mainBounds = mainWindow.getBounds();
  const { width: screenWidth, height: screenHeight } = screen.getPrimaryDisplay().workAreaSize;

  // Posicionar encima de la mini ventana
  let x = miniBounds.x - (mainBounds.width / 2) + (miniBounds.width / 2);
  let y = miniBounds.y - mainBounds.height - 10;

  // Asegurar que no se salga de la pantalla
  if (x < 0) x = 10;
  if (x + mainBounds.width > screenWidth) x = screenWidth - mainBounds.width - 10;
  if (y < 0) y = miniBounds.y + miniBounds.height + 10;

  mainWindow.setPosition(Math.round(x), Math.round(y));
  mainWindow.show();
}

// Leer datos del archivo Excel
function readExcelData() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return getDefaultData();
    }

    const workbook = XLSX.readFile(DATA_FILE_PATH);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return processExcelData(jsonData);
  } catch (error) {
    console.error('Error leyendo Excel:', error);
    return getDefaultData();
  }
}

function processExcelData(data) {
  return {
    mfr: {
      value: data[0]?.MFR || 90.0,
      target: 90.0,
      lines: data.filter(d => d.Tipo === 'MFR').map(d => ({
        name: d.Linea,
        value: d.Valor
      })),
      weekDiff: data[0]?.DifSemana || -3.2,
      monthDiff: data[0]?.DifMes || -13.7
    },
    te: {
      value: data[0]?.TE || 85.0,
      target: 85.0,
      lines: data.filter(d => d.Tipo === 'TE').map(d => ({
        name: d.Linea,
        value: d.Valor
      })),
      weekDiff: data[0]?.DifSemanTE || -3.2,
      monthDiff: data[0]?.DifMesTE || -13.7
    }
  };
}

function getDefaultData() {
  return {
    mfr: {
      value: 90.0,
      target: 90.0,
      lines: [
        { name: 'B1(Dorito 1500)', value: 79.7 },
        { name: 'B2(Dorito 2000)', value: 80.0 },
        { name: 'A3(PC 65)', value: 80.5 },
        { name: 'D1(Cheetos 1)', value: 84.1 },
        { name: 'E1(Clextral)', value: 85.9 },
      ],
      weekDiff: -3.2,
      monthDiff: -13.7
    },
    te: {
      value: 0.0,
      target: 85.0,
      lines: [
        { name: 'C3(Frito 3000)', value: 9.99 },
        { name: 'D2(Cheetos 3)', value: 40.86 },
        { name: 'D1(Cheetos 1)', value: 47.96 },
        { name: 'B2(Dorito 2000)', value: 53.66 },
        { name: 'E1(Clextral)', value: 55.81 },
      ],
      weekDiff: -3.2,
      monthDiff: -13.7
    }
  };
}

// IPC handlers
ipcMain.handle('get-data', () => {
  return readExcelData();
});

ipcMain.handle('show-expanded', () => {
  showExpandedWindow();
});

ipcMain.handle('hide-expanded', () => {
  if (mainWindow) mainWindow.hide();
});

ipcMain.handle('close-window', () => {
  if (mainWindow) mainWindow.hide();
});

// App events
app.whenReady().then(() => {
  console.log('App lista, creando ventanas...');
  createMainWindow();
  createMiniWindow();
  createTray();
  console.log('Widget listo! Ventana flotante visible. Arrastrala donde quieras.');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
