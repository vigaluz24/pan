console.log("Módulo de Login cargado correctamente.");

// 1. Mostrar / Ocultar contraseña en el login
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('contrasena');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });
}

// 2. Función de Inicio de Sesión con validación de clave temporal
function realizarLogin() {
    const inputUsuario = document.getElementById('usuario');
    const inputContrasena = document.getElementById('contrasena');

    if (!inputUsuario || !inputContrasena) {
        alert("No se encontraron los campos de usuario o contraseña.");
        return;
    }

    const usuario = inputUsuario.value.trim();
    const contrasena = inputContrasena.value.trim();

    if (usuario === "" || contrasena === "") {
        alert("Por favor, ingrese su usuario y contraseña.");
        return;
    }

    // Verificar si el usuario requiere cambio obligatorio de contraseña
    const requiereCambio = localStorage.getItem('requiereCambioPassword');
    const claveTempGuardada = localStorage.getItem('claveTemporalActiva');

    if (requiereCambio === 'true' && contrasena === claveTempGuardada) {
        // Ocultar la sección completa del login y mostrar la de actualización
        const loginSec = document.getElementById('loginSection');
        const updateSec = document.getElementById('sectionActualizarPassword');
        
        if (loginSec) {
            loginSec.style.display = 'none';
            loginSec.classList.add('hidden');
        }
        if (updateSec) {
            updateSec.style.display = 'block';
            updateSec.classList.remove('hidden');
        }
        
        // Rellenar automáticamente el campo de contraseña temporal
        const inputClaveTemp = document.getElementById('inputClaveTemp');
        if (inputClaveTemp) inputClaveTemp.value = contrasena;
        return;
    }

    // Acceso normal al dashboard
    console.log("Ingreso exitoso de: " + usuario);
    window.location.href = "dashboard.html";
}

// 3. Validación en tiempo real de los requisitos de seguridad de la contraseña
function validarRequisitosPassword() {
    const val = document.getElementById('inputNuevaClave').value;

    const reqMin = document.getElementById('reqMinChar');
    const reqMay = document.getElementById('reqMayus');
    const reqMinu = document.getElementById('reqMinus');
    const reqNum = document.getElementById('reqNum');
    const reqEsp = document.getElementById('reqEspecial');

    if (reqMin) reqMin.textContent = val.length >= 8 ? "🟠 Mínimo 8 caracteres" : "⚪ Mínimo 8 caracteres";
    if (reqMay) reqMay.textContent = /[A-Z]/.test(val) ? "🟠 Una letra mayúscula" : "⚪ Una letra mayúscula";
    if (reqMinu) reqMinu.textContent = /[a-z]/.test(val) ? "🟠 Una letra minúscula" : "⚪ Una letra minúscula";
    if (reqNum) reqNum.textContent = /[0-9]/.test(val) ? "🟠 Un número" : "⚪ Un número";
    if (reqEsp) reqEsp.textContent = /[!@#$%^&*]/.test(val) ? "🟠 Un carácter especial (!@#$%^&*)" : "⚪ Un carácter especial (!@#$%^&*)";
}

// 4. Finalizar el cambio de contraseña obligatoria
function finalizarCambioPassword(event) {
    event.preventDefault();
    
    const nueva = document.getElementById('inputNuevaClave').value;
    const confirmacion = document.getElementById('inputConfirmarClave').value;

    if (nueva !== confirmacion) {
        alert("Las contraseñas no coinciden. Por favor, verifíquelas.");
        return;
    }

    if (nueva.length < 8) {
        alert("La contraseña debe tener al menos 8 caracteres por seguridad.");
        return;
    }

    // Limpiar las banderas temporales del localStorage
    localStorage.removeItem('requiereCambioPassword');
    localStorage.removeItem('claveTemporalActiva');

    alert("¡Contraseña actualizada con éxito!");
    window.location.href = "dashboard.html";
}

// 5. Función para Cerrar Sesión
function logout() {
    const inputUsuario = document.getElementById('usuario');
    const inputContrasena = document.getElementById('contrasena');
    if (inputUsuario) inputUsuario.value = '';
    if (inputContrasena) inputContrasena.value = '';
    
    window.location.href = "index.html";
}