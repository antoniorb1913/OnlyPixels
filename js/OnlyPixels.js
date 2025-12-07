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

const mode2003Btn = document.getElementById('mode-2003-btn');
const imageUpload = document.getElementById('image-upload');
const contentArea = document.getElementById('content-area');
const generatedText = document.getElementById('generated-text');
const imageContainer = document.getElementById('image-container');
const emojisContainer = document.getElementById('emojis-container');
const notification = document.getElementById('notification');
const errorSound = document.getElementById('error-sound');
const messengerSound = document.getElementById('messenger-sound');
const nokiaSound = document.getElementById('nokia-sound');
const tamaSound = document.getElementById('tama-sound');
const espsound = document.getElementById('esp-sound');
const clickSound = document.getElementById('click-sound')

const imagenSound = document.getElementById('imagen-sound');
const discoSound = document.getElementById('disco-sound');

// Event listeners
curseLevelSelect.addEventListener('change', updateCurseLevel);
generateBtn.addEventListener('click', generateContent);
worsenBtn.addEventListener('click', worsenContent);

mode2003Btn.addEventListener('click', toggle2003Mode);
imageUpload.addEventListener('change', handleImageUpload);
document.addEventListener('keydown', handleKonamiCode);

// Variables para el código Konami
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Funciones
function updateCurseLevel() {
    curseLevel = parseInt(curseLevelSelect.value);
    clickSound.play();
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
    
    clickSound.play();
}

function generateRandomImage() {
    // Limpiar contenedor de imágenes
    imageContainer.innerHTML = '';
    
    // Lista de imágenes locales en tu carpeta
    const localImages = [
        'maldito1.png',
        'maldito2.png',
        'maldito3.png',
        'maldito4.png',
        'maldito5.png'
    ];
    
    // Seleccionar una imagen aleatoria de la lista
    const randomIndex = Math.floor(Math.random() * localImages.length);
    const randomImageName = localImages[randomIndex];
    
    // Crear la ruta a tu carpeta de imágenes
    // IMPORTANTE: La carpeta 'images' debe estar en la misma ubicación que tu HTML
    const imagePath = `imagenes/${randomImageName}`;
    
    // Crear elemento de imagen
    const img = document.createElement('img');
    img.src = imagePath;
    img.alt = "Imagen maldita generada aleatoriamente";
    img.className = 'generated-image';
    img.id = 'current-image';
    imageContainer.appendChild(img);
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Verificar que sea una imagen
    if (!file.type.match('image.*')) {
        showNotification('Error: Por favor, sube solo archivos de imagen.');
        imagenSound.play();
        return;
    }
    
    // Verificar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
        showNotification('Error: La imagen es muy grande (máximo 5MB)');
        imagenSound.play();
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
        showNotification('¡Imagen subida con éxito!');
        
        // Reproducir sonido
        clickSound.play();
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
        showNotification('Error al cargar la imagen');
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
    
    tamaSound.play();
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
        contentArea.classList.add('mode-2003');  // <- Esto activa el CSS
        currentMode = "2003";
        mode2003Btn.textContent = "🕹️ Volver a Normal";
    } else {
        contentArea.classList.remove('mode-2003'); // <- Esto desactiva el CSS
        currentMode = "normal";
        mode2003Btn.textContent = "🕹️ Modo Año 2003";
    }
    
    nokiaSound.play();
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
        }, 9000);
    }
}

// Función para resetear a imagen aleatoria
function resetToRandomImage() {
    uploadedImage = null;
    generateRandomImage();
    generateEmojis();
    applyEffects();
    showNotification('Cambiado a imagen aleatoria');
    clickSound.play();
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
resetBtn.textContent = 'Volver a Imagen Aleatoria';
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
document.addEventListener('DOMContentLoaded', () => {
            const SCREENSAVER_DELAY = 5000; // 5000 milisegundos = 5 segundos
            let timeoutId;
            
            // CRÍTICO: Las referencias al DOM se obtienen AHORA, después de que los elementos se han cargado.
            const screensaverDiv = document.getElementById('video-screensaver');
            const videoPlayer = document.getElementById('screensaver-video-player');
            const notification = document.getElementById('notification');
            const saveSound = document.getElementById('messenger-sound');
            
            // Comprobación de existencia para evitar errores si algo falla
            if (!screensaverDiv || !videoPlayer) {
                console.error("Error: Elementos de video/salvapantallas no encontrados.");
                return; 
            }

            /**
             * Muestra el salvapantallas (video) y lo reproduce.
             */
            function showScreensaver() {
                console.log('--- Activando Salvapantallas ---');
                screensaverDiv.classList.add('active');
                espsound.play();
                // Intentar reproducir el video.
                videoPlayer.play().catch(error => {
                    console.error('Error al intentar reproducir el video:', error);
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
                    espsound.pause();
                    espsound.currentTime = 0;
                    videoPlayer.currentTime = 0; 
                }
            }

            /**
             * Restablece el temporizador de inactividad. 
             */
            function resetTimer() {
                // 1. Ocultar el salvapantallas si está activo
                hideScreensaver();
                
                // 2. Limpiar el temporizador anterior
                clearTimeout(timeoutId);
                
                // 3. Establecer un nuevo temporizador
                timeoutId = setTimeout(showScreensaver, SCREENSAVER_DELAY);
            }

            // --- Lógica de la Aplicación (Funciones Dummy para los botones) ---

            // Función para mostrar la notificación de guardado
            function showNotification() {
                saveSound.play().catch(e => console.log("Error playing sound: ", e));
                notification.classList.add('show');
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);
            }

            // Asignar Event Listeners a los botones (para que tu app no de errores)
            document.getElementById('generate-btn')?.addEventListener('click', () => {
                document.getElementById('generated-text').textContent = "¡Contenido absurdo generado con nivel de maldición " + document.getElementById('curse-level').value + "!";
            });
            
            document.getElementById('worsen-btn')?.addEventListener('click', () => {
                document.getElementById('generated-text').textContent = "¡Todo empeora! 📉";
            });

            document.getElementById('save-btn')?.addEventListener('click', showNotification);

            document.getElementById('mode-2003-btn')?.addEventListener('click', () => {
                alert('¡Modo 2003 activado! (Simulado)');
            });

            // Lógica para el botón de subir imagen
            document.getElementById('upload-btn')?.addEventListener('click', () => {
                document.getElementById('image-upload').click();
            });

            // --- Event Listeners del Salvapantallas ---

            // Iniciar el conteo al cargar la página
            resetTimer();

            // Escuchar el movimiento del ratón para reiniciar/ocultar
            document.addEventListener('mousemove', resetTimer);

            // Escuchar eventos de teclado para reiniciar/ocultar
            document.addEventListener('keypress', resetTimer);

            // Cargar el video
            videoPlayer.load();

            console.log(`Salvapaantallas inicializado. Retraso: ${SCREENSAVER_DELAY / 1000} segundos.`);
        });
// === SISTEMA SIMPLE DE POPUP MESSENGER ===

// Tus mensajes exactos
const mensajesMessenger = [
    { sender: "final_2003", message: "¡Achooo! estos no saben hacer un puto examen bien", time: "16:42" },
    { sender: "~Carlos~", message: "me cago en los de marketing, k no les voy a pintar el puto boton de mierda", time: "17:30" },
    { sender: "[Klar@~", message: "a mi k mierda me importa, yo aprendi en foros", time: "19:20" },
    { sender: "Martuki", message: "FUCK...", time: "20:05" },
    { sender: "[Dani10]", message: "oye, nos comemos la puta pipsaaaaa o k?", time: "20:15" },
    { sender: "IkeRi0s", message: "¿quieres pelis en dvd? 30 euros cada una, si no te gusta te jodes", time: "22:00" },
    { sender: "modo_emo", message: "¿ya te bajaste la pelicula del emule? yo tengo ya 3 xxx", time: "23:45" },
    { sender: "Juan-ky", message: "k no te voy a devolver la playstation 2 chipeadas", time: "23:45" },
    { sender: "onlypixels_bot", message: "¡tu contenido maldito está listo! nivel: " + curseLevel, time: "ahora" },
    { sender: "sistema_msn", message: "Usuario_ha_cambiado_su_estado_a: Conectado y listo para el caos", time: new Date().getHours() + ":" + new Date().getMinutes() }
];

// Variables de control
let intervaloPopup;
let popupVisible = false;

// Inicializar sistema de popups
function inicializarPopups() {
    const popup = document.getElementById('popup-messenger');
    
    if (!popup) {
        console.error("Popup no encontrado");
        return;
    }
    
    // Mostrar primer mensaje después de 10 segundos
    setTimeout(() => {
        mostrarPopupAleatorio();
    }, 10000);
    

    programarSiguientePopup();
    
    // Cerrar popup al hacer clic en él
    popup.addEventListener('click', function() {
        this.classList.remove('mostrar');
        popupVisible = false;
        programarSiguientePopup();
    });
}

// Mostrar un popup aleatorio
function mostrarPopupAleatorio() {
    const popup = document.getElementById('popup-messenger');
    const remitente = document.getElementById('remitente-popup');
    const mensaje = document.getElementById('mensaje-popup');
    const hora = document.getElementById('hora-popup');
    
    if (!popup || !remitente || popupVisible) return;
    
    // Seleccionar mensaje aleatorio
    const mensajeAleatorio = mensajesMessenger[Math.floor(Math.random() * mensajesMessenger.length)];
    
    // Personalizar mensaje si es necesario
    let mensajeFinal = mensajeAleatorio.message;
    if (mensajeAleatorio.sender === "onlypixels_bot") {
        mensajeFinal = "¡tu contenido maldito está listo! nivel: " + curseLevel;
    }
    
    // Actualizar contenido del popup
    remitente.textContent = mensajeAleatorio.sender + ":";
    mensaje.textContent = mensajeFinal;
    
    // Actualizar hora
    if (mensajeAleatorio.time === "ahora") {
        const ahora = new Date();
        hora.textContent = ahora.getHours() + ":" + (ahora.getMinutes() < 10 ? '0' : '') + ahora.getMinutes();
    } else {
        hora.textContent = mensajeAleatorio.time;
    }
    
    // Mostrar popup
    popup.classList.add('mostrar');
    popupVisible = true;
    
    // Reproducir sonido de messenger
    if (messengerSound) {
        messengerSound.currentTime = 0;
        messengerSound.play().catch(e => console.log("Error con sonido"));
    }
    
    // Ocultar automáticamente después de 8 segundos
    setTimeout(() => {
        if (popup.classList.contains('mostrar')) {
            popup.classList.remove('mostrar');
            popupVisible = false;
            programarSiguientePopup();
        }
    }, 8000);
}


// Programar siguiente popup
function programarSiguientePopup() {
    // Limpiar intervalo anterior
    if (intervaloPopup) {
        clearTimeout(intervaloPopup);
    }
    
    // Tiempo FIJO de 15 segundos
    const tiempoEspera = 15000; // 15 segundos exactos
    
    // Programar siguiente popup
    intervaloPopup = setTimeout(() => {
        mostrarPopupAleatorio();
    }, tiempoEspera);
    
    console.log(`Próximo popup en ${tiempoEspera/1000} segundos`);
}

// Mostrar popup especial cuando se genera contenido
function mostrarPopupContenido() {
    if (popupVisible) return; // Si ya hay un popup, no mostrar otro
    
    const popup = document.getElementById('popup-messenger');
    const remitente = document.getElementById('remitente-popup');
    const mensaje = document.getElementById('mensaje-popup');
    const hora = document.getElementById('hora-popup');
    
    if (!popup || !remitente) return;
    
    // Mensaje especial para contenido generado
    remitente.textContent = "onlypixels_bot:";
    mensaje.textContent = "¡tu contenido maldito está listo! nivel: " + curseLevel;
    
    const ahora = new Date();
    hora.textContent = ahora.getHours() + ":" + (ahora.getMinutes() < 10 ? '0' : '') + ahora.getMinutes();
    
    // Mostrar popup
    popup.classList.add('mostrar');
    popupVisible = true;
    
    // Sonido
    if (messengerSound) {
        messengerSound.currentTime = 0;
        messengerSound.play();
    }
    
    // Ocultar después de 6 segundos
    setTimeout(() => {
        if (popup.classList.contains('mostrar')) {
            popup.classList.remove('mostrar');
            popupVisible = false;
            programarSiguientePopup();
        }
    }, 6000);
}

// Modificar generateContent para mostrar popup
const originalGenerateContent = generateContent;
generateContent = function() {
    originalGenerateContent();
    setTimeout(() => {
        mostrarPopupContenido();
    }, 500);
};

// Modificar worsenContent para mostrar popup
const originalWorsenContent = worsenContent;
worsenContent = function() {
    originalWorsenContent();
    setTimeout(() => {
        if (!popupVisible) {
            const popup = document.getElementById('popup-messenger');
            const remitente = document.getElementById('remitente-popup');
            const mensaje = document.getElementById('mensaje-popup');
            const hora = document.getElementById('hora-popup');
            
            if (popup && remitente) {
                remitente.textContent = "sistema_msn:";
                mensaje.textContent = "¡ALERTA! Nivel de maldición: " + curseLevel;
                
                const ahora = new Date();
                hora.textContent = ahora.getHours() + ":" + (ahora.getMinutes() < 10 ? '0' : '') + ahora.getMinutes();
                
                popup.classList.add('mostrar');
                popupVisible = true;
                
                setTimeout(() => {
                    if (popup.classList.contains('mostrar')) {
                        popup.classList.remove('mostrar');
                        popupVisible = false;
                        programarSiguientePopup();
                    }
                }, 6000);
            }
        }
    }, 500);
};

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        inicializarPopups();
        console.log("Sistema de popups Messenger iniciado");
    }, 2000);
});

// Función para forzar un popup (útil para probar)
window.mostrarPopupPrueba = function() {
    mostrarPopupAleatorio();
};