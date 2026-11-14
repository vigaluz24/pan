document.addEventListener("DOMContentLoaded", () => {
    cargarUltimaOrdenActiva();
});

function cargarUltimaOrdenActiva() {
    const ordenes = JSON.parse(localStorage.getItem('ordenesProduccion')) || [];
    
    if (ordenes.length > 0) {
        const ultimaOrden = ordenes[ordenes.length - 1];
        
        const displayLote = document.getElementById('displayLoteNombre');
        const displayMeta = document.getElementById('displayMetaProduccion');
        const inputReal = document.getElementById('inputRealObtenida');

        if (displayLote) displayLote.innerText = `${ultimaOrden.id} - ${ultimaOrden.producto}`;
        if (displayMeta) displayMeta.innerText = `Meta de producción: ${ultimaOrden.cantidad} unidades`;
        if (inputReal) inputReal.value = ultimaOrden.cantidad;
    }
}

function confirmarCierreOrden() {
    const realObtenida = parseInt(document.getElementById('inputRealObtenida').value) || 0;
    const merma = parseInt(document.getElementById('inputMerma').value) || 0;
    const observaciones = document.getElementById('inputObservaciones').value.trim();

    if (realObtenida < 0) {
        alert("Por favor ingresa una cantidad real obtenida válida.");
        return;
    }

    if (!observaciones) {
        alert("Por favor ingresa las observaciones del lote antes de cerrar.");
        return;
    }

    // Guardar el registro del cierre en localStorage
    const datosCierre = {
        realObtenida: realObtenida,
        merma: merma,
        observaciones: observaciones,
        fechaCierre: new Date().toLocaleDateString('es-CO')
    };

    localStorage.setItem('cierreUltimaOrden', JSON.stringify(datosCierre));

    // Ocultar el formulario y mostrar la vista de confirmación
    document.getElementById('seccionFormulario').style.display = 'none';
    document.getElementById('seccionConfirmacion').style.display = 'block';

    // Actualizar textos dinámicos en la confirmación
    document.getElementById('textoResumenCierre').innerText = `Se han ingresado ${realObtenida} unidades exitosamente al inventario comercial.`;
    document.getElementById('detalleObservacionConfirmacion').innerText = `📝 Nota: "${observaciones}"`;
}