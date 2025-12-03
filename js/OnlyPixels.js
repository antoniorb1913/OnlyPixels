// Arrays con contenido para generar
const phrases = [
    "El gato existential en el limbo digital",
    "La luna pixelada llora bits de nostalgia",
    "El teclado susurra secretos en código binario",
    "Mi alma es un jpeg comprimido hasta el infinito",
    "Los zapatos voladores navegan por el hipervínculo roto",
    "El silencio tiene el color de un blue screen of death",
    "Las nubes son servidores que almacenan sueños",
    "El tiempo es un bucle recursivo sin condición de salida",
    "El router emite señales del más allá",
    "El cargador USB alimenta esperanzas perdidas"
];

const emojis = ["😀", "😂", "🤣", "😍", "🤔", "🙄", "😎", "🥳", "😱", "👻", "💀", "👾", "🤖", "🎃", "💩", "👁️", "🧠"];

// Variables de estado
let curseLevel = 5;
let currentMode = "normal";
let discoModeActive = false;
let uploadedImage = null;

// Elementos DOM
const curseLevelSelect = document.getElementById('curse-level');
const generateBtn = document.getElementById('generate-btn');
const worsenBtn = document.getElementById('worsen-btn');
const saveBtn = document.getElementById('save-btn');
const mode2003Btn = document.getElementById('mode-2003-btn');
const imageUpload = document.getElementById('image-upload');
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
imageUpload.addEventListener('change', handleImageUpload);
document.addEventListener('keydown', handleKonamiCode);

// Variables para el código Konami
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Funciones
function updateCurseLevel() {
    curseLevel = parseInt(curseLevelSelect.value);
    messengerSound.play();
    updateCurseEffects();
    applyEffects();
}

function updateCurseEffects() {
    // Remover clases anteriores
    contentArea.classList.remove('curse-level-8', 'curse-level-10');
    
    // Aplicar efectos especiales para niveles altos
    if (curseLevel >= 8) {
        contentArea.classList.add('curse-level-8');
    }
    if (curseLevel >= 10) {
        contentArea.classList.add('curse-level-10');
    }
}

function generateContent() {
    // Generar texto
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    generatedText.textContent = randomPhrase;
    
    // Si no hay imagen subida, generar una aleatoria
    if (!uploadedImage) {
        generateRandomImage();
    }
    
    // Generar emojis
    generateEmojis();
    
    // Aplicar efectos según el nivel de maldición
    applyEffects();
    
    messengerSound.play();
}

function generateRandomImage() {
    // Limpiar contenedor de imágenes
    imageContainer.innerHTML = '';
    
    // Crear imagen aleatoria
    const img = document.createElement('img');
    img.src = `https://picsum.photos/400/300?random=${Math.floor(Math.random() * 1000)}`;
    img.alt = "Imagen generada aleatoriamente";
    img.className = 'generated-image';
    img.id = 'current-image';
    imageContainer.appendChild(img);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Verificar que sea una imagen
    if (!file.type.match('image.*')) {
        showNotification('⚠️ Error: Por favor, sube solo archivos de imagen.');
        return;
    }
    
    // Verificar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('⚠️ Error: La imagen es muy grande (máximo 5MB)');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        // Guardar la imagen subida
        uploadedImage = e.target.result;
        
        // Actualizar texto
        const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
        generatedText.textContent = randomPhrase + " 🆕";
        
        // Mostrar la imagen subida
        displayUploadedImage();
        
        // Generar emojis
        generateEmojis();
        
        // Aplicar efectos
        applyEffects();
        
        // Mostrar notificación
        showNotification('✅ ¡Imagen subida con éxito!');
        
        // Reproducir sonido
        messengerSound.play();
    };
    
    reader.onerror = function() {
        showNotification('⚠️ Error al leer la imagen');
    };
    
    reader.readAsDataURL(file);
    
    // Resetear el input para permitir subir la misma imagen otra vez
    event.target.value = '';
}

function displayUploadedImage() {
    if (!uploadedImage) return;
    
    // Limpiar contenedor de imágenes
    imageContainer.innerHTML = '';
    
    // Crear imagen con la subida
    const img = document.createElement('img');
    img.src = uploadedImage;
    img.alt = "Imagen subida por el usuario";
    img.className = 'generated-image';
    img.id = 'current-image';
    img.onload = function() {
        console.log('Imagen cargada correctamente:', this.src);
        // Forzar la aplicación de efectos
        applyEffects();
    };
    img.onerror = function() {
        console.error('Error al cargar la imagen');
        showNotification('❌ Error al cargar la imagen');
    };
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
        
        // Tamaño aleatorio
        const size = 20 + Math.random() * 30;
        emoji.style.fontSize = `${size}px`;
        
        // Animación delay aleatorio
        emoji.style.animationDelay = `${Math.random() * 2}s`;
        
        emojisContainer.appendChild(emoji);
    }
}

function applyEffects() {
    const images = document.querySelectorAll('.generated-image');
    
    // Aplicar efectos según el nivel de maldición
    images.forEach(img => {
        // Resetear estilos
        img.style.filter = '';
        img.className = 'generated-image';
        
        // Siempre aplicar efectos base
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
            img.classList.add('extreme-curse');
        }
    });
    
    // Aplicar efectos al texto
    generatedText.style.textShadow = '';
    if (curseLevel >= 7) {
        generatedText.style.textShadow = '0 0 10px #ff00ff, 0 0 20px #ff00ff';
    }
    
    updateCurseEffects();
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
    showNotification('💾 ¡Contenido guardado en la memoria cósmica!');
    
    // Reproducir sonido de error
    errorSound.play();
    
    // Efecto visual adicional
    contentArea.style.transform = 'scale(0.95)';
    setTimeout(() => {
        contentArea.style.transform = 'scale(1)';
    }, 200);
}

function showNotification(message) {
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}

function toggle2003Mode() {
    if (currentMode === "normal") {
        contentArea.classList.add('mode-2003');
        currentMode = "2003";
        mode2003Btn.textContent = "🕹️ Volver a Normal";
    } else {
        contentArea.classList.remove('mode-2003');
        currentMode = "normal";
        mode2003Btn.textContent = "🕹️ Modo Año 2003";
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
        
        // Hacer que los emojis bailen
        const allEmojis = document.querySelectorAll('.emoji');
        allEmojis.forEach(emoji => {
            emoji.style.animation = 'discoText 0.3s infinite, float 1s infinite ease-in-out';
        });
        
        // Reproducir sonido disco
        discoSound.play();
        
        // Desactivar después de 10 segundos
        setTimeout(() => {
            document.body.classList.remove('disco-mode');
            generatedText.classList.remove('disco-text');
            const allEmojis = document.querySelectorAll('.emoji');
            allEmojis.forEach(emoji => {
                emoji.style.animation = 'float 5s infinite ease-in-out';
            });
            discoModeActive = false;
        }, 10000);
    }
}

// Función para resetear a imagen aleatoria
function resetToRandomImage() {
    uploadedImage = null;
    generateRandomImage();
    generateEmojis();
    applyEffects();
    showNotification('🔄 Cambiado a imagen aleatoria');
    messengerSound.play();
}

// Inicialización
updateCurseEffects();

// Inicializar con una imagen aleatoria
setTimeout(() => {
    generateRandomImage();
    generateEmojis();
    applyEffects();
}, 100);

// Añadir botón para resetear a imagen aleatoria
const resetBtn = document.createElement('button');
resetBtn.textContent = '🔄 Volver a Imagen Aleatoria';
resetBtn.id = 'reset-btn';
resetBtn.style.backgroundColor = '#9966ff';
resetBtn.style.marginTop = '10px';

resetBtn.addEventListener('click', resetToRandomImage);

// Insertar botón de reset después del grupo de botones
const buttonGroup = document.querySelector('.button-group');
if (buttonGroup && buttonGroup.parentNode) {
    buttonGroup.parentNode.insertBefore(resetBtn, buttonGroup.nextSibling);
}

// Asegurar que el contenedor de imágenes tenga contenido inicial
if (!imageContainer.innerHTML.trim()) {
    generateRandomImage();
}
// Retraso para activar el salvapantallas (5000 milisegundos = 5 segundos)
const SCREENSAVER_DELAY = 5000; 
let timeoutId;

// Referencias a los elementos del DOM
const screensaverDiv = document.getElementById('video-screensaver');
const videoPlayer = document.getElementById('screensaver-video-player');

/**
 * Muestra el salvapantallas (video) y lo reproduce.
 */
function showScreensaver() {
    console.log('--- Activando Salvapantallas ---');
    screensaverDiv.classList.add('active');
    // Intentar reproducir el video. 
    // Debe estar "muted" para evitar problemas de permisos de auto-reproducción en navegadores.
    videoPlayer.play().catch(error => {
        console.error('Error al intentar reproducir el video:', error);
        // Si falla la reproducción, asegura que al menos el div esté visible.
    });
}

/**
 * Oculta el salvapantallas (video) y pausa la reproducción.
 */
function hideScreensaver() {
    if (screensaverDiv.classList.contains('active')) {
        console.log('--- Desactivando Salvapantallas por movimiento ---');
        screensaverDiv.classList.remove('active');
        videoPlayer.pause();
        // Opcional: rebobinar el video al inicio
        videoPlayer.currentTime = 0; 
    }
}

/**
 * Restablece el temporizador de inactividad. 
 * Se llama cada vez que hay movimiento del ratón o se presiona una tecla.
 */
function resetTimer() {
    // 1. Ocultar el salvapantallas si está activo
    hideScreensaver();
    
    // 2. Limpiar el temporizador anterior
    clearTimeout(timeoutId);
    
    // 3. Establecer un nuevo temporizador
    timeoutId = setTimeout(showScreensaver, SCREENSAVER_DELAY);
}

// --- Inicialización y Event Listeners ---

// Es fundamental esperar a que el documento se haya cargado completamente 
// antes de intentar acceder a los elementos del DOM.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada inicial para empezar el conteo al cargar la página
    resetTimer();

    // Escuchar el movimiento del ratón en todo el documento para reiniciar el temporizador
    document.addEventListener('mousemove', resetTimer);

    // Escuchar eventos de teclado si quieres que cualquier tecla lo desactive también:
    document.addEventListener('keypress', resetTimer);

    // Opcional: Pre-cargar el video
    videoPlayer.load();

    console.log(`Salvapaantallas inicializado. Retraso: ${SCREENSAVER_DELAY / 1000} segundos.`);
});