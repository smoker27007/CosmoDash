const starfield = document.getElementById("starfield");
if (!starfield) {
    throw new Error("Missing #starfield canvas");
}

const context = starfield.getContext("2d");

const stars = Array.from({ length: 220 }, () => ({
    x: Math.random(),
    y: Math.random(),
    size: Math.random() * 1.8 + 0.4,
    alpha: Math.random() * 0.7 + 0.2,
    speed: Math.random() * 0.08 + 0.02
}));

const meteors = [
    { x: 0.15, y: 0.25, len: 70, speed: 0.0012 },
    { x: 0.68, y: 0.12, len: 90, speed: 0.0016 }
];

function resize() {
    starfield.width = window.innerWidth;
    starfield.height = window.innerHeight;
}

function drawStars() {
    for (const star of stars) {
        const px = star.x * starfield.width;
        const py = star.y * starfield.height;

        context.fillStyle = `rgba(190, 231, 255, ${star.alpha})`;
        context.fillRect(px, py, star.size, star.size);

        star.y += star.speed / 1000;
        if (star.y > 1) {
            star.y = 0;
            star.x = Math.random();
        }
    }
}

function drawMeteors() {
    for (const meteor of meteors) {
        const x = meteor.x * starfield.width;
        const y = meteor.y * starfield.height;

        const gradient = context.createLinearGradient(x, y, x + meteor.len, y + meteor.len * 0.45);
        gradient.addColorStop(0, "rgba(170, 245, 255, 0.9)");
        gradient.addColorStop(1, "rgba(170, 245, 255, 0)");

        context.strokeStyle = gradient;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + meteor.len, y + meteor.len * 0.45);
        context.stroke();

        meteor.x += meteor.speed;
        meteor.y += meteor.speed * 0.48;

        if (meteor.x > 1.15 || meteor.y > 1.15) {
            meteor.x = -0.2;
            meteor.y = Math.random() * 0.4;
        }
    }
}

function animate() {
    context.clearRect(0, 0, starfield.width, starfield.height);
    drawStars();
    drawMeteors();
    requestAnimationFrame(animate);
}

resize();
animate();
window.addEventListener("resize", resize);
