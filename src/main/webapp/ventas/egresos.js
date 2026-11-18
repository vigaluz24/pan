function registrarEgresoYVolver() {
    let monto = document.getElementById('inputMontoEgreso')?.value || 0;
    
    if (monto <= 0) {
        alert("Por favor ingresa un monto válido para la salida de efectivo.");
        return;
    }

    // Opcional: Puedes guardar el registro en localStorage si lo necesitas para reportes de caja
    let egresoData = {
        monto: parseFloat(monto),
        categoria: document.querySelector('select')?.value || 'General',
        fecha: new Date().toISOString()
    };
    localStorage.setItem('ultimoEgreso', JSON.stringify(egresoData));

    alert("¡Salida de efectivo registrada con éxito!");

    // Redirigir a la página principal de ventas
    window.location.href = 'ventas.html';
}