function filtrarHistorial() {
    const fechaFiltro = document.getElementById('filtroFecha').value;
    const estadoFiltro = document.getElementById('filtroEstado').value.toLowerCase();
    const metodoFiltro = document.getElementById('filtroMetodo').value.toLowerCase();
    const cajeroFiltro = document.getElementById('filtroCajero').value.toLowerCase();

    const filas = document.querySelectorAll('#tablaHistorialTrx tr'); // Asegúrate de que el tbody tenga este ID

    filas.forEach(fila => {
        const textoFila = fila.innerText.toLowerCase();
        
        let cumple = true;

        // Validar filtros si contienen datos
        if (estadoFiltro && !textoFila.includes(estadoFiltro)) cumple = false;
        if (metodoFiltro && !textoFila.includes(metodoFiltro)) cumple = false;
        if (cajeroFiltro && !textoFila.includes(cajeroFiltro)) cumple = false;
        
        if (cumple) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
}