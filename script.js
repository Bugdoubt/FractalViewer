const canvas = document.getElementById('fractalCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generate');
let width, height;

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function getColor(value, scheme) {
    const v = Math.floor(255 * value);
    switch (scheme) {
        case 'rainbow':
            return `hsl(${v}, 100%, 50%)`;
        case 'sunset':
            return `rgb(${v}, ${Math.floor(v/2)}, ${Math.floor(v/3)})`;
        case 'ice':
            return `rgb(${Math.floor(v/3)}, ${Math.floor(v/2)}, ${v})`;
        default:
            return `rgb(${v}, ${v}, ${v})`;
    }
}

function drawMandelbrot(colorScheme, zoom, offsetX, offsetY) {
    const maxIter = 500;
    const blockSize = 4; // <-- Faster drawing

    for (let x = 0; x < width; x += blockSize) {
        for (let y = 0; y < height; y += blockSize) {
            let zx = 0, zy = 0;
            const cx = (x - width/2) / zoom + offsetX;
            const cy = (y - height/2) / zoom + offsetY;
            let iter = 0;

            while (zx*zx + zy*zy < 4 && iter < maxIter) {
                const tmp = zx*zx - zy*zy + cx;
                zy = 2*zx*zy + cy;
                zx = tmp;
                iter++;
            }

            const color = iter === maxIter ? 'black' : getColor(iter / maxIter, colorScheme);
            ctx.fillStyle = color;
            ctx.fillRect(x, y, blockSize, blockSize);
        }
    }
}

function generateFractal() {
    const type = document.getElementById('fractalType').value;
    const colorScheme = document.getElementById('colorScheme').value;
    const speed = parseFloat(document.getElementById('speed').value);

    let zoom = 200;
    let offsetX = -0.5;
    let offsetY = 0;

    function animate() {
        ctx.clearRect(0, 0, width, height);
        drawMandelbrot(colorScheme, zoom, offsetX, offsetY);
        zoom *= 1 + (speed * 0.01);
        requestAnimationFrame(animate);
    }

    animate();
}

generateBtn.addEventListener('click', generateFractal);
