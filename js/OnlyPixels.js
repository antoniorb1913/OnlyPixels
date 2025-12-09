// Arrays con contenido para generar
const frases = [
    "El gato existencial en el limbo digital",
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

const emojis = ["🫣", "☠️", "⚰️", "🧟", "🤔", "🙄", "👹", "😰", "😱", "👻", "💀", "👾", "🤖", "🎃", "🐦‍⬛", "👁️", "🧠"];

// Variables de estado
let nivelMaldicion = 5;
let modoActual = "normal";
let modoDiscoActivo = false;
let imagenSubida = null;

// Elementos DOM
const selectorNivelMaldicion = document.getElementById('curse-level');
const botonGenerar = document.getElementById('generate-btn');
const botonEmpeorar = document.getElementById('worsen-btn');
const botonModo2003 = document.getElementById('mode-2003-btn');
const subidaImagen = document.getElementById('image-upload');
const areaContenido = document.getElementById('content-area');
const textoGenerado = document.getElementById('generated-text');
const contenedorImagen = document.getElementById('image-container');
const contenedorEmojis = document.getElementById('emojis-container');
const notificacion = document.getElementById('notification');
const sonidoError = document.getElementById('error-sound');
const sonidoMessenger = document.getElementById('messenger-sound');
const sonidoNokia = document.getElementById('nokia-sound');
const sonidoTama = document.getElementById('tama-sound');
const sonidoEsp = document.getElementById('esp-sound');
const sonidoClic = document.getElementById('click-sound');
const sonidoImagen = document.getElementById('imagen-sound');
const sonidoDisco = document.getElementById('disco-sound');

// Escuchadores de eventos
selectorNivelMaldicion.addEventListener('change', actualizarNivelMaldicion);
botonGenerar.addEventListener('click', generarContenido);
botonEmpeorar.addEventListener('click', empeorarContenido);
botonModo2003.addEventListener('click', alternarModo2003);
subidaImagen.addEventListener('change', manejarSubidaImagen);
document.addEventListener('keydown', manejarCodigoKonami);

// Variables para el código Konami
let codigoKonami = [];
const secuenciaKonami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

// Funciones
function actualizarNivelMaldicion() {
    nivelMaldicion = parseInt(selectorNivelMaldicion.value);
    sonidoClic.play();
    actualizarEfectosMaldicion();
    aplicarEfectos();
}

function actualizarEfectosMaldicion() {
    // Remover clases anteriores
    areaContenido.classList.remove('curse-level-8', 'curse-level-10');
    
    // Aplicar efectos especiales para niveles altos
    if (nivelMaldicion >= 8) {
        areaContenido.classList.add('curse-level-8');
    }
    if (nivelMaldicion >= 10) {
        areaContenido.classList.add('curse-level-10');
    }
}

function generarContenido() {
    // Generar texto
    const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
    textoGenerado.textContent = fraseAleatoria;
    
    // Si no hay imagen subida, generar una aleatoria
    if (!imagenSubida) {
        generarImagenAleatoria();
    }
    
    // Generar emojis
    generarEmojis();
    
    // Aplicar efectos según el nivel de maldición
    aplicarEfectos();
    
    sonidoClic.play();
}

function generarImagenAleatoria() {
    // Limpiar contenedor de imágenes
    contenedorImagen.innerHTML = '';
    
    // Lista de imágenes locales en tu carpeta
    const imagenesLocales = [
        'maldito1.png',
        'maldito2.png',
        'maldito3.png',
        'maldito4.png',
        'maldito5.png',
        'maldito6.png',
        'maldito7.png'
    ];
    
    // Seleccionar una imagen aleatoria de la lista
    const indiceAleatorio = Math.floor(Math.random() * imagenesLocales.length);
    const nombreImagenAleatoria = imagenesLocales[indiceAleatorio];
    
    // Crear la ruta a tu carpeta de imágenes
    const rutaImagen = `imagenes/${nombreImagenAleatoria}`;
    
    // Crear elemento de imagen
    const img = document.createElement('img');
    img.src = rutaImagen;
    img.alt = "Imagen maldita generada aleatoriamente";
    img.className = 'generated-image';
    img.id = 'current-image';
    contenedorImagen.appendChild(img);
}

function manejarSubidaImagen(evento) {
    const archivo = evento.target.files[0];
    if (!archivo) return;
    
    // Verificar que sea una imagen
    if (!archivo.type.match('image.*')) {
        mostrarNotificacion('Error: Por favor, sube solo archivos de imagen.');
        sonidoImagen.play();
        return;
    }
    
    // Verificar tamaño (máximo 5MB)
    if (archivo.size > 5 * 1024 * 1024) {
        mostrarNotificacion('Error: La imagen es muy grande (máximo 5MB)');
        sonidoImagen.play();
        return;
    }
    
    const lector = new FileReader();
    lector.onload = function(e) {
        // Guardar la imagen subida
        imagenSubida = e.target.result;
        
        // Actualizar texto
        const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
        textoGenerado.textContent = fraseAleatoria + " 🆕";
        
        // Mostrar la imagen subida
        mostrarImagenSubida();
        
        // Generar emojis
        generarEmojis();
        
        // Aplicar efectos
        aplicarEfectos();
        
        // Mostrar notificación
        mostrarNotificacion('¡Imagen subida con éxito!');
        
        // Reproducir sonido
        sonidoClic.play();
    };
    
    lector.onerror = function() {
        mostrarNotificacion('⚠️ Error al leer la imagen');
    };
    
    lector.readAsDataURL(archivo);
    
    // Resetear el input para permitir subir la misma imagen otra vez
    evento.target.value = '';
}

function mostrarImagenSubida() {
    if (!imagenSubida) return;
    
    // Limpiar contenedor de imágenes
    contenedorImagen.innerHTML = '';
    
    // Crear imagen con la subida
    const img = document.createElement('img');
    img.src = imagenSubida;
    img.alt = "Imagen subida por el usuario";
    img.className = 'generated-image';
    img.id = 'current-image';
    img.onload = function() {
        console.log('Imagen cargada correctamente:', this.src);
        // Forzar la aplicación de efectos
        aplicarEfectos();
    };
    img.onerror = function() {
        console.error('Error al cargar la imagen');
        mostrarNotificacion('Error al cargar la imagen');
    };
    contenedorImagen.appendChild(img);
}

function generarEmojis() {
    // Limpiar contenedor de emojis
    contenedorEmojis.innerHTML = '';
    
    // Generar emojis aleatorios
    const numeroEmojis = 5 + nivelMaldicion;
    
    for (let i = 0; i < numeroEmojis; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Posición aleatoria
        emoji.style.left = `${Math.random() * 90}%`;
        emoji.style.top = `${Math.random() * 90}%`;
        
        // Rotación aleatoria
        emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Tamaño aleatorio
        const tamaño = 20 + Math.random() * 30;
        emoji.style.fontSize = `${tamaño}px`;
        
        // Retardo de animación aleatorio
        emoji.style.animationDelay = `${Math.random() * 2}s`;
        
        contenedorEmojis.appendChild(emoji);
    }
}

function aplicarEfectos() {
    const imagenes = document.querySelectorAll('.generated-image');
    
    // Aplicar efectos según el nivel de maldición
    imagenes.forEach(img => {
        // Resetear estilos
        img.style.filter = '';
        img.className = 'generated-image';
        
        img.classList.add('pixelated');
        
        // Efectos adicionales según el nivel
        if (nivelMaldicion >= 3) {
            img.style.filter += ' brightness(0.8) contrast(1.5)';
        }
        
        if (nivelMaldicion >= 6) {
            img.style.filter += ' hue-rotate(90deg)';
        }
        
        if (nivelMaldicion >= 8) {
            img.classList.add('cut-image');
        }
        
        if (nivelMaldicion >= 10) {
            img.style.filter += ' blur(2px)';
            img.classList.add('extreme-curse');
        }
    });
    
    // Aplicar efectos al texto
    textoGenerado.style.textShadow = '';
    if (nivelMaldicion >= 7) {
        textoGenerado.style.textShadow = '0 0 10px #ff00ff, 0 0 20px #ff00ff';
    }
    
    actualizarEfectosMaldicion();
}

function empeorarContenido() {
    // Incrementar nivel de maldición
    if (nivelMaldicion < 10) {
        nivelMaldicion++;
        selectorNivelMaldicion.value = nivelMaldicion;
    }
    
    // Aplicar efectos adicionales
    aplicarEfectos();
    
    // Añadir más emojis
    generarEmojis();
    
    sonidoTama.play();
}

function mostrarNotificacion(mensaje) {
    notificacion.textContent = mensaje;
    notificacion.style.display = 'block';
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000);
}

function alternarModo2003() {
    if (modoActual === "normal") {
        areaContenido.classList.add('mode-2003');
        modoActual = "2003";
        botonModo2003.textContent = "🕹️ Volver a Normal";
    } else {
        areaContenido.classList.remove('mode-2003');
        modoActual = "normal";
        botonModo2003.textContent = "🕹️ Modo Año 2003";
    }
    
    sonidoNokia.play();
}

function manejarCodigoKonami(e) {
    codigoKonami.push(e.code);
    
    // Mantener solo los últimos 10 códigos de tecla
    if (codigoKonami.length > secuenciaKonami.length) {
        codigoKonami.shift();
    }
    
    // Verificar si coincide con la secuencia de Konami
    if (codigoKonami.join(',') === secuenciaKonami.join(',')) {
        activarModoDisco();
    }
}

function activarModoDisco() {
    if (!modoDiscoActivo) {
        document.body.classList.add('disco-mode');
        textoGenerado.classList.add('disco-text');
        modoDiscoActivo = true;
        
        // Hacer que los emojis bailen
        const todosEmojis = document.querySelectorAll('.emoji');
        todosEmojis.forEach(emoji => {
            emoji.style.animation = 'discoText 0.3s infinite, float 1s infinite ease-in-out';
        });
        
        // Reproducir sonido disco
        sonidoDisco.play();
        
        // Desactivar después de 10 segundos
        setTimeout(() => {
            document.body.classList.remove('disco-mode');
            textoGenerado.classList.remove('disco-text');
            const todosEmojis = document.querySelectorAll('.emoji');
            todosEmojis.forEach(emoji => {
                emoji.style.animation = 'float 5s infinite ease-in-out';
            });
            modoDiscoActivo = false;
        }, 9000);
    }
}

// Función para resetear a imagen aleatoria
function resetearAImagenAleatoria() {
    imagenSubida = null;
    generarImagenAleatoria();
    generarEmojis();
    aplicarEfectos();
    mostrarNotificacion('Cambiado a imagen aleatoria');
    sonidoClic.play();
}

// Inicialización
actualizarEfectosMaldicion();

// Inicializar con una imagen aleatoria
setTimeout(() => {
    generarImagenAleatoria();
    generarEmojis();
    aplicarEfectos();
}, 100);

// Añadir botón para resetear a imagen aleatoria
const botonResetear = document.createElement('button');
botonResetear.textContent = 'Volver a Imagen Aleatoria';
botonResetear.id = 'reset-btn';
botonResetear.style.backgroundColor = '#9966ff';
botonResetear.style.marginTop = '10px';

botonResetear.addEventListener('click', resetearAImagenAleatoria);

// Insertar botón de reset después del grupo de botones
const grupoBotones = document.querySelector('.button-group');
if (grupoBotones && grupoBotones.parentNode) {
    grupoBotones.parentNode.insertBefore(botonResetear, grupoBotones.nextSibling);
}

// Asegurar que el contenedor de imágenes tenga contenido inicial
if (!contenedorImagen.innerHTML.trim()) {
    generarImagenAleatoria();
}

// Cuando el DOM está completamente cargado, ejecutar este código
document.addEventListener('DOMContentLoaded', () => {
    // Configuración del tiempo de inactividad para activar salvapantallas (5 segundos)
    const RETRASO_SALVAPANTALLAS = 5000;
    // Variable para almacenar el ID del temporizador
    let idTemporizador;
    
    // Obtener referencias a elementos DOM del salvapantallas
    const salvapantallasDiv = document.getElementById('video-screensaver');
    const reproductorVideo = document.getElementById('screensaver-video-player');
    const notificacion = document.getElementById('notification');
    const sonidoGuardar = document.getElementById('messenger-sound');
    
    // Verificar que los elementos necesarios existen
    if (!salvapantallasDiv || !reproductorVideo) {
        console.error("Error: Elementos de video/salvapantallas no encontrados.");
        return; // Salir si no se encuentran elementos críticos
    }

    // Función para mostrar el salvapantallas con video
    function mostrarSalvapantallas() {
        console.log('--- Activando Salvapantallas ---');
        // Activar el contenedor del salvapantallas
        salvapantallasDiv.classList.add('active');
        // Reproducir sonido característico
        sonidoEsp.play();
        // Intentar reproducir el video del salvapantallas
        reproductorVideo.play().catch(error => {
            console.error('Error al intentar reproducir el video:', error);
        });
    }

    // Función para ocultar el salvapantallas
    function ocultarSalvapantallas() {
        // Verificar si el salvapantallas está activo
        if (salvapantallasDiv.classList.contains('active')) {
            console.log('--- Desactivando Salvapantallas por movimiento ---');
            // Desactivar el contenedor
            salvapantallasDiv.classList.remove('active');
            // Pausar el video
            reproductorVideo.pause();
            // Pausar y resetear el sonido
            sonidoEsp.pause();
            sonidoEsp.currentTime = 0;
            // Resetear el video al inicio
            reproductorVideo.currentTime = 0;
        }
    }

    // Función para reiniciar el temporizador de inactividad
    function reiniciarTemporizador() {
        // Ocultar salvapantallas si está visible
        ocultarSalvapantallas();
        // Limpiar temporizador anterior
        clearTimeout(idTemporizador);
        // Establecer nuevo temporizador
        idTemporizador = setTimeout(mostrarSalvapantallas, RETRASO_SALVAPANTALLAS);
    }

    // Función para mostrar notificación de guardado (para botón "save")
    function mostrarNotificacionSalvapantallas() {
        // Reproducir sonido de guardado
        sonidoGuardar.play().catch(e => console.log("Error reproduciendo sonido: ", e));
        // Mostrar notificación visual
        notificacion.classList.add('show');
        // Ocultar notificación después de 3 segundos
        setTimeout(() => {
            notificacion.classList.remove('show');
        }, 3000);
    }

    // ================= ASIGNAR EVENT LISTENERS A BOTONES =================
    
    // Botón Generar: Mostrar contenido con nivel de maldición actual
    document.getElementById('generate-btn')?.addEventListener('click', () => {
        document.getElementById('generated-text').textContent = 
            "¡Contenido absurdo generado con nivel de maldición " + 
            document.getElementById('curse-level').value + "!";
    });
    
    // Botón Empeorar: Mostrar mensaje de empeoramiento
    document.getElementById('worsen-btn')?.addEventListener('click', () => {
        document.getElementById('generated-text').textContent = "¡Todo empeora! 📉";
    });

    // Botón Guardar: Mostrar notificación de guardado
    document.getElementById('save-btn')?.addEventListener('click', mostrarNotificacionSalvapantallas);

    // Botón Modo 2003: Simular activación del modo retro
    document.getElementById('mode-2003-btn')?.addEventListener('click', () => {
        alert('¡Modo 2003 activado! (Simulado)');
    });

    // Botón Subir: Activar el input de subida de archivo
    document.getElementById('upload-btn')?.addEventListener('click', () => {
        document.getElementById('image-upload').click();
    });

    // ================= INICIALIZACIÓN DEL SALVAPANTALLAS =================
    
    // Iniciar el conteo de inactividad al cargar la página
    reiniciarTemporizador();

    // Escuchar movimiento del mouse para reiniciar temporizador
    document.addEventListener('mousemove', reiniciarTemporizador);
    
    // Escuchar pulsaciones de teclas para reiniciar temporizador
    document.addEventListener('keypress', reiniciarTemporizador);
    
    // Cargar el video del salvapantallas
    reproductorVideo.load();

    // Mensaje de confirmación en consola
    console.log(`Salvapantallas inicializado. Retraso: ${RETRASO_SALVAPANTALLAS / 1000} segundos.`);
});

// ================= SISTEMA DE POPUPS TIPO MSN MESSENGER =================

// Array de mensajes predefinidos para los popups
const mensajesMessenger = [
    { remitente: "final_2003", mensaje: "¡Achooo! estos no saben hacer un puto examen bien 🦆", hora: "16:42" },
    { remitente: "@ntonio_J0se", mensaje: "⚽ Hoy sale a jugar pedri, lamine, raphinha ....", hora: "17:10" },
    { remitente: "~Carlos~", mensaje: "me cago en los de marketing, k no les voy a pintar el puto boton de mierda 💩", hora: "17:30" },
    { remitente: "[Klar@~", mensaje: "a mi k mierda me importa, yo aprendi en foros 📄😡​", hora: "19:20" },
    { remitente: "Martuki", mensaje: "📢 FUCK...", hora: "20:05" },
    { remitente: "[Dani10]", mensaje: "oye, nos comemos la puta pipsaaaaa🍕 o k?", hora: "20:15" },
    { remitente: "~R@keL~", mensaje: "y recuerda, cafe y cigarro muñeco de barro", hora: "21:45" },
    { remitente: "IkeRi0s", mensaje: "¿quieres pelis en dvd 💿​? 30 euros cada una, si no te gusta te jodes", hora: "22:00" },
    { remitente: "cIpri_aPi", mensaje: "vale? 🌐", hora: "22:35" },
    { remitente: "modo_emo", mensaje: "¿ya te bajaste la pelicula del emule? yo tengo ya 3 xxx 🙄​", hora: "23:45" },
    { remitente: "Juan-ky", mensaje: "🫵​ k no te voy a devolver la playstation 2 chipeadas", hora: "23:45" },
    { remitente: "onlypixels_bot", mensaje: "¡tu contenido maldito está listo! nivel: " + nivelMaldicion, hora: "ahora" },
    { remitente: "sistema_msn", mensaje: "Usuario_ha_cambiado_su_estado_a: Conectado y listo para el caos", hora: new Date().getHours() + ":" + new Date().getMinutes() }
];

// Variables de control para el sistema de popups
let intervaloPopup;     // Almacena el ID del intervalo para el siguiente popup
let popupVisible = false; // Bandera para saber si hay un popup visible

// Función para inicializar el sistema de popups
function inicializarPopups() {
    const popup = document.getElementById('popup-messenger');
    
    // Verificar que el elemento popup existe
    if (!popup) {
        console.error("Popup no encontrado");
        return;
    }
    
    // Mostrar primer popup después de 10 segundos
    setTimeout(() => {
        mostrarPopupAleatorio();
    }, 10000);
    
    // Programar el siguiente popup
    programarSiguientePopup();
    
    // Event listener para cerrar popup al hacer clic
    popup.addEventListener('click', function() {
        this.classList.remove('mostrar');
        popupVisible = false;
        programarSiguientePopup(); // Programar siguiente cuando se cierra manualmente
    });
}

// Función para mostrar un popup con mensaje aleatorio
function mostrarPopupAleatorio() {
    const popup = document.getElementById('popup-messenger');
    const remitente = document.getElementById('remitente-popup');
    const mensaje = document.getElementById('mensaje-popup');
    const hora = document.getElementById('hora-popup');
    
    // Verificar que elementos existen y no hay popup visible
    if (!popup || !remitente || popupVisible) return;
    
    // Seleccionar mensaje aleatorio del array
    const mensajeAleatorio = mensajesMessenger[Math.floor(Math.random() * mensajesMessenger.length)];
    
    // Procesar mensaje (personalizar si es del bot)
    let mensajeFinal = mensajeAleatorio.mensaje;
    if (mensajeAleatorio.remitente === "onlypixels_bot") {
        mensajeFinal = "¡tu contenido maldito está listo! nivel: " + nivelMaldicion;
    }
    
    // Actualizar contenido del popup
    remitente.textContent = mensajeAleatorio.remitente + ":";
    mensaje.textContent = mensajeFinal;
    
    // Actualizar hora (si es "ahora", usar hora actual)
    if (mensajeAleatorio.hora === "ahora") {
        const ahora = new Date();
        hora.textContent = ahora.getHours() + ":" + (ahora.getMinutes() < 10 ? '0' : '') + ahora.getMinutes();
    } else {
        hora.textContent = mensajeAleatorio.hora;
    }
    
    // Mostrar popup visualmente
    popup.classList.add('mostrar');
    popupVisible = true;
    
    // Reproducir sonido de notificación MSN
    if (sonidoMessenger) {
        sonidoMessenger.currentTime = 0; // Resetear sonido
        sonidoMessenger.play().catch(e => console.log("Error con sonido"));
    }
    
    // Ocultar automáticamente después de 8 segundos
    setTimeout(() => {
        if (popup.classList.contains('mostrar')) {
            popup.classList.remove('mostrar');
            popupVisible = false;
            programarSiguientePopup(); // Programar siguiente popup
        }
    }, 8000);
}

// Función para programar el siguiente popup
function programarSiguientePopup() {
    // Limpiar intervalo anterior si existe
    if (intervaloPopup) {
        clearTimeout(intervaloPopup);
    }
    
    // Tiempo fijo de 15 segundos entre popups
    const tiempoEspera = 15000;
    
    // Programar siguiente popup
    intervaloPopup = setTimeout(() => {
        mostrarPopupAleatorio();
    }, tiempoEspera);
    
    // Mensaje de depuración
    console.log(`Próximo popup en ${tiempoEspera/1000} segundos`);
}

// Función especial para mostrar popup cuando se genera contenido
function mostrarPopupContenido() {
    if (popupVisible) return; // No mostrar si ya hay popup visible
    
    const popup = document.getElementById('popup-messenger');
    const remitente = document.getElementById('remitente-popup');
    const mensaje = document.getElementById('mensaje-popup');
    const hora = document.getElementById('hora-popup');
    
    if (!popup || !remitente) return;
    
    // Configurar popup específico para contenido generado
    remitente.textContent = "onlypixels_bot:";
    mensaje.textContent = "¡tu contenido maldito está listo! nivel: " + nivelMaldicion;
    
    // Usar hora actual
    const ahora = new Date();
    hora.textContent = ahora.getHours() + ":" + (ahora.getMinutes() < 10 ? '0' : '') + ahora.getMinutes();
    
    // Mostrar popup
    popup.classList.add('mostrar');
    popupVisible = true;
    
    // Reproducir sonido
    if (sonidoMessenger) {
        sonidoMessenger.currentTime = 0;
        sonidoMessenger.play();
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

// ================= SOBREESCRIBIR FUNCIONES ORIGINALES =================

// Guardar referencia a la función original de generar contenido
const generarContenidoOriginal = generarContenido;

// Extender la función generarContenido para incluir popup
generarContenido = function() {
    generarContenidoOriginal(); // Ejecutar función original
    setTimeout(() => {
        mostrarPopupContenido(); // Mostrar popup después de 500ms
    }, 500);
};

// Guardar referencia a la función original de empeorar contenido
const empeorarContenidoOriginal = empeorarContenido;

// Extender la función empeorarContenido para incluir popup de alerta
empeorarContenido = function() {
    empeorarContenidoOriginal(); // Ejecutar función original
    setTimeout(() => {
        if (!popupVisible) {
            const popup = document.getElementById('popup-messenger');
            const remitente = document.getElementById('remitente-popup');
            const mensaje = document.getElementById('mensaje-popup');
            const hora = document.getElementById('hora-popup');
            
            if (popup && remitente) {
                // Configurar popup de alerta para empeoramiento
                remitente.textContent = "sistema_msn:";
                mensaje.textContent = "¡ALERTA! Nivel de maldición: " + nivelMaldicion;
                
                const ahora = new Date();
                hora.textContent = ahora.getHours() + ":" + (ahora.getMinutes() < 10 ? '0' : '') + ahora.getMinutes();
                
                popup.classList.add('mostrar');
                popupVisible = true;
                
                // Ocultar después de 6 segundos
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

// ================= INICIALIZACIÓN FINAL =================

// Inicializar popups cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar sistema de popups después de 2 segundos
    setTimeout(() => {
        inicializarPopups();
        console.log("Sistema de popups Messenger iniciado");
    }, 2000);
});

// Función de prueba para mostrar popups (útil para desarrollo)
window.mostrarPopupPrueba = function() {
    mostrarPopupAleatorio();
};