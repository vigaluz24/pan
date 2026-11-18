console.log("Módulo de Gestión de Usuarios cargado correctamente.");

function abrirModalNuevoUsuario() {
    const modal = document.getElementById('modalNuevoUsuario');
    if (modal) {
        modal.classList.add('active');
    }
}

function cerrarModalNuevoUsuario() {
    const modal = document.getElementById('modalNuevoUsuario');
    if (modal) {
        modal.classList.remove('active');
    }
}

function guardarUsuario(event) {
    event.preventDefault(); // Evita que se recargue la página
    
    // 1. Cierra el modal del formulario
    cerrarModalNuevoUsuario();
    
    // 2. Muestra la notificación flotante personalizada con los colores de la panadería
    const toast = document.getElementById('toastNotificacion');
    if (toast) {
        toast.classList.add('show');
        
        // Ocultar la notificación automáticamente después de 3.5 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
    
    // 3. Limpia los campos del formulario
    document.getElementById('formNuevoUsuario').reset();
}
// Restablecer contraseña y Clave temporal
let usuarioSeleccionadoReset = null;

function abrirModalRestablecer(nombre, correo) {
    usuarioSeleccionadoReset = { nombre, correo };
    document.getElementById('resetNombreUsuario').textContent = nombre;
    document.getElementById('resetCorreoUsuario').textContent = correo;
    
    const modal = document.getElementById('modalConfirmarRestablecer');
    if (modal) modal.classList.add('active');
}

function cerrarModalRestablecer() {
    const modal = document.getElementById('modalConfirmarRestablecer');
    if (modal) modal.classList.remove('active');
}

function generarClaveTemporal() {
    cerrarModalRestablecer();
    
    // Generar una clave temporal única
    const claveTemp = "Pp#" + Math.floor(1000 + Math.random() * 9000) + "Temp!";
    document.getElementById('claveTemporalTexto').textContent = claveTemp;

    // Guardar flag en localStorage indicando que este usuario requiere cambio de contraseña
    localStorage.setItem('requiereCambioPassword', 'true');
    localStorage.setItem('claveTemporalActiva', claveTemp);

    const modalClave = document.getElementById('modalClaveGenerada');
    if (modalClave) modalClave.classList.add('active');
}

function cerrarModalClaveGenerada() {
    const modalClave = document.getElementById('modalClaveGenerada');
    if (modalClave) modalClave.classList.remove('active');
}

function copiarClaveTemporal() {
    const clave = document.getElementById('claveTemporalTexto').textContent;
    navigator.clipboard.writeText(clave).then(() => {
        alert("¡Contraseña temporal copiada al portapapeles!");
    });
}