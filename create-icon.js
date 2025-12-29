const { Jimp } = require('jimp');
const pngToIco = require('png-to-ico').default;
const fs = require('fs');
const path = require('path');

async function createIcon() {
    const size = 256;

    // Crear imagen con fondo azul
    const image = new Jimp({ width: size, height: size, color: 0x2563ebff });

    // Agregar un borde redondeado simulado con gradiente
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const distFromCenter = Math.sqrt(Math.pow(x - size/2, 2) + Math.pow(y - size/2, 2));
            const maxDist = size/2;

            // Crear efecto de esquinas redondeadas
            const cornerRadius = 40;
            const inCorner = (x < cornerRadius && y < cornerRadius) ||
                           (x > size - cornerRadius && y < cornerRadius) ||
                           (x < cornerRadius && y > size - cornerRadius) ||
                           (x > size - cornerRadius && y > size - cornerRadius);

            if (inCorner) {
                let cx, cy;
                if (x < cornerRadius && y < cornerRadius) { cx = cornerRadius; cy = cornerRadius; }
                else if (x > size - cornerRadius && y < cornerRadius) { cx = size - cornerRadius; cy = cornerRadius; }
                else if (x < cornerRadius && y > size - cornerRadius) { cx = cornerRadius; cy = size - cornerRadius; }
                else { cx = size - cornerRadius; cy = size - cornerRadius; }

                const distFromCorner = Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cy, 2));
                if (distFromCorner > cornerRadius) {
                    image.setPixelColor(0x00000000, x, y); // Transparente
                }
            }
        }
    }

    // Dibujar las letras "WP" de forma simple (usando rectángulos blancos)
    const white = 0xffffffff;

    // Letra W - simplificada
    const wStartX = 40;
    const letterTop = 70;
    const letterBottom = 186;
    const thickness = 20;

    // W: 5 líneas verticales conectadas
    for (let y = letterTop; y < letterBottom; y++) {
        // Primera línea diagonal izquierda
        for (let t = 0; t < thickness; t++) {
            const x = wStartX + t + Math.floor((y - letterTop) * 0.3);
            if (x < size) image.setPixelColor(white, x, y);
        }
        // Segunda línea diagonal
        for (let t = 0; t < thickness; t++) {
            const x = wStartX + 35 + t - Math.floor((y - letterTop) * 0.15);
            if (x < size && x > 0) image.setPixelColor(white, x, y);
        }
        // Tercera línea diagonal
        for (let t = 0; t < thickness; t++) {
            const x = wStartX + 50 + t + Math.floor((y - letterTop) * 0.15);
            if (x < size) image.setPixelColor(white, x, y);
        }
        // Cuarta línea diagonal derecha
        for (let t = 0; t < thickness; t++) {
            const x = wStartX + 85 + t - Math.floor((y - letterTop) * 0.3);
            if (x < size && x > 0) image.setPixelColor(white, x, y);
        }
    }

    // Letra P
    const pStartX = 150;

    // Línea vertical de la P
    for (let y = letterTop; y < letterBottom; y++) {
        for (let t = 0; t < thickness; t++) {
            image.setPixelColor(white, pStartX + t, y);
        }
    }

    // Parte superior horizontal de la P
    for (let x = pStartX; x < pStartX + 55; x++) {
        for (let t = 0; t < thickness; t++) {
            image.setPixelColor(white, x, letterTop + t);
        }
    }

    // Parte media horizontal de la P
    for (let x = pStartX; x < pStartX + 55; x++) {
        for (let t = 0; t < thickness; t++) {
            image.setPixelColor(white, x, letterTop + 55 + t);
        }
    }

    // Línea vertical derecha de la P (parte curva)
    for (let y = letterTop; y < letterTop + 55 + thickness; y++) {
        for (let t = 0; t < thickness; t++) {
            image.setPixelColor(white, pStartX + 55 - thickness + t, y);
        }
    }

    // Guardar PNG
    const pngPath = path.join(__dirname, 'assets', 'icon.png');
    await image.write(pngPath);
    console.log('PNG creado:', pngPath);

    // Convertir a ICO
    const icoPath = path.join(__dirname, 'assets', 'icon.ico');
    const icoBuffer = await pngToIco(pngPath);
    fs.writeFileSync(icoPath, icoBuffer);
    console.log('ICO creado:', icoPath);

    console.log('Iconos generados exitosamente!');
}

createIcon().catch(console.error);
