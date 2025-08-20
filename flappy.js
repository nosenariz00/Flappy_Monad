// Ajusta el tamaño del canvas para pantallas pequeñas
function resizeCanvas() {
    const canvas = document.getElementById('gameCanvas');
    if (window.innerWidth < 600) {
        canvas.width = window.innerWidth * 0.95;
        canvas.height = window.innerHeight * 0.7;
    } else {
        canvas.width = 480;
        canvas.height = 640;
    }
    // Si tienes variables para el suelo, tubos y pájaro, ajusta sus posiciones/tamaños aquí
    // Por ejemplo:
    // bird.y = canvas.height / 2;
    // ground.y = canvas.height - ground.height;
    // Ajusta la posición inicial de los tubos
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('DOMContentLoaded', resizeCanvas);

// Cuando dibujes el suelo, asegúrate de que esté visible:
function drawGround(ctx, ground) {
    ctx.fillStyle = "#8B4513";
    ctx.fillRect(0, ground.y, ctx.canvas.width, ground.height);
}

// ...existing code...