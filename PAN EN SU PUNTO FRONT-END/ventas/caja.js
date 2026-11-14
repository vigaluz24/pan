// ==========================================
// LÓGICA DE CIERRE Y ARQUEO DE CAJA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Buscar el botón de cerrar caja por su texto en la interfaz
    const botones = document.querySelectorAll("button");
    botones.forEach(btn => {
        if (btn.innerText.includes("Cerrar caja y finalizar arqueo")) {
            btn.onclick = (e) => {
                e.preventDefault();
                mostrarModalCajaCerrada();
            };
        }
    });
});

function mostrarModalCajaCerrada() {
    const modal = document.getElementById('modalCajaCerrada');
    if (modal) {
        modal.style.display = 'flex'; // Muestra el modal de confirmación
    }
}

function irAlDashboard() {
    // Redirige al usuario al dashboard principal de ventas
    window.location.href = 'ventas.html'; 
}