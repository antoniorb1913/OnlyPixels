
// Arrays con contenido para generar
const phrases = [
    "El gato existential en el limbo digital",
    "La luna pixelada llora bits de nostalgia",
    "El teclado susurra secretos en código binario",
    "Mi alma es un jpeg comprimido hasta el infinito",
    "Los zapatos voladores navegan por el hipervínculo roto",
    "El silencio tiene el color de un blue screen of death",
    "Las nubes son servidores que almacenan sueños",
    "El tiempo es un bucle recursivo sin condición de salida"
];

const emojis = ["😀", "😂", "🤣", "😍", "🤔", "🙄", "😎", "🥳", "😱", "👻", "💀", "👾", "🤖", "🎃", "💩", "👁️", "🧠", "👁️‍🗨️"];

// Variables de estado
let curseLevel = 5;
let currentMode = "normal";
let discoModeActive = false;

// Elementos DOM
const curseLevelSelect = document.getElementById('curse-level');
const generateBtn = document.getElementById('generate-btn');
const worsenBtn = document.getElementById('worsen-btn');
const saveBtn = document.getElementById('save-btn');
const mode2003Btn = document.getElementById('mode-2003-btn');
const contentArea = document.getElementById('content-area');
const generatedText = document.getElementById('generated-text');
const imageContainer = document.getElementById('image-container');
const emojisContainer = document.getElementById('emojis-container');
const notification = document.getElementById('notification');
const errorSound = document.getElementById('error-sound');
const messengerSound = document.getElementById('messenger-sound');
const discoSound = document.getElementById('disco-sound');

// Event listeners
curseLevelSelect.addEventListener('change', updateCurseLevel);
generateBtn.addEventListener('click', generateContent);
worsenBtn.addEventListener('click', worsenContent);
saveBtn.addEventListener('click', saveContent);
mode2003Btn.addEventListener('click', toggle2003Mode);
document.addEventListener('keydown', handleKonamiCode);

// Variables para el código Konami
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Funciones
function updateCurseLevel() {
    curseLevel = parseInt(curseLevelSelect.value);
    messengerSound.play();
}

function generateContent() {
    // Generar texto
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    generatedText.textContent = randomPhrase;
    
    // Generar imagen
    generateImage();
    
    // Generar emojis
    generateEmojis();
    
    // Aplicar efectos según el nivel de maldición
    applyEffects();
    
    messengerSound.play();
}

function generateImage() {
    // Limpiar contenedor de imágenes
    imageContainer.innerHTML = '';
    
    // Crear imagen
    const img = document.createElement('img');
    img.src = `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`;
    img.alt = "Imagen generada aleatoriamente";
    img.className = 'generated-image';
    
    imageContainer.appendChild(img);
}

function generateEmojis() {
    // Limpiar contenedor de emojis
    emojisContainer.innerHTML = '';
    
    // Generar emojis aleatorios
    const numEmojis = 5 + curseLevel;
    
    for (let i = 0; i < numEmojis; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Posición aleatoria
        emoji.style.left = `${Math.random() * 90}%`;
        emoji.style.top = `${Math.random() * 90}%`;
        
        // Rotación aleatoria
        emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        emojisContainer.appendChild(emoji);
    }
}

function applyEffects() {
    const images = document.querySelectorAll('.generated-image');
    
    // Aplicar efectos según el nivel de maldición
    images.forEach(img => {
        // Siempre aplicar sepia y compresión JPEG
        img.classList.add('sepia', 'pixelated');
        
        // Efectos adicionales según el nivel
        if (curseLevel >= 3) {
            img.style.filter += ' brightness(0.8) contrast(1.5)';
        }
        
        if (curseLevel >= 6) {
            img.style.filter += ' hue-rotate(90deg)';
        }
        
        if (curseLevel >= 8) {
            img.classList.add('cut-image');
        }
        
        if (curseLevel >= 10) {
            img.style.filter += ' blur(2px)';
        }
    });
    
    // Aplicar efectos al texto
    if (curseLevel >= 7) {
        generatedText.style.textShadow = '0 0 10px #ff00ff, 0 0 20px #ff00ff';
    }
}

function worsenContent() {
    // Incrementar nivel de maldición
    if (curseLevel < 10) {
        curseLevel++;
        curseLevelSelect.value = curseLevel;
    }
    
    // Aplicar efectos adicionales
    applyEffects();
    
    // Añadir más emojis
    generateEmojis();
    
    errorSound.play();
}

function saveContent() {
    // Mostrar notificación
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
    
    // Reproducir sonido de error de Windows 95
    errorSound.play();
}

function toggle2003Mode() {
    if (currentMode === "normal") {
        contentArea.classList.add('mode-2003');
        currentMode = "2003";
        mode2003Btn.textContent = "Modo Normal";
    } else {
        contentArea.classList.remove('mode-2003');
        currentMode = "normal";
        mode2003Btn.textContent = "Modo Año 2003";
    }
    
    messengerSound.play();
}

function handleKonamiCode(e) {
    konamiCode.push(e.code);
    
    // Mantener solo los últimos 10 códigos de tecla
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    // Verificar si coincide con la secuencia de Konami
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateDiscoMode();
    }
}

function activateDiscoMode() {
    if (!discoModeActive) {
        document.body.classList.add('disco-mode');
        generatedText.classList.add('disco-text');
        discoModeActive = true;
        
        // Reproducir sonido disco
        discoSound.play();
        
        // Desactivar después de 10 segundos
        setTimeout(() => {
            document.body.classList.remove('disco-mode');
            generatedText.classList.remove('disco-text');
            discoModeActive = false;
        }, 10000);
    }
}