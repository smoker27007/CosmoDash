const starfield = document.getElementById("starfield");

if (!(starfield instanceof HTMLCanvasElement)) {
    throw new Error("Missing #starfield canvas");
}

const context = starfield.getContext("2d");

if (!context) {
    throw new Error("Unable to create canvas 2D context");
}

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
    const scale = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    const width = window.innerWidth;
    const height = window.innerHeight;

    starfield.width = Math.floor(width * scale);
    starfield.height = Math.floor(height * scale);
    starfield.style.width = `${width}px`;
    starfield.style.height = `${height}px`;

    context.setTransform(scale, 0, 0, scale, 0, 0);
}

function drawStars() {
    for (const star of stars) {
        const px = star.x * window.innerWidth;
        const py = star.y * window.innerHeight;
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
        const x = meteor.x * window.innerWidth;
        const y = meteor.y * window.innerHeight;

        const gradient = context.createLinearGradient(
            x,
            y,
            x + meteor.len,
            y + meteor.len * 0.45
        );
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
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawStars();
    drawMeteors();
    requestAnimationFrame(animate);
}

function bindClick(id, message) {
    const button = document.getElementById(id);
    if (!button) {
        return;
    }

    button.addEventListener("click", () => {
        console.log(message);
    });
}

bindClick("btn-start", "start game");
bindClick("btn-scores", "high scores");
bindClick("btn-settings", "settings");
bindClick("btn-howto", "how to play");
bindClick("btn-credits", "credits");
bindClick("btn-exit", "exit");

resize();
animate();

window.addEventListener("resize", resize);