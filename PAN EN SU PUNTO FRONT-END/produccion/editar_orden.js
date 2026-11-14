// Lista global de órdenes disponibles
let listaOrdenes = [
    { id: 'PRD-001', producto: 'Pandebono', cantidad: 100, estado: 'Pendiente' },
    { id: 'PRD-002', producto: 'Pan Aliñado', cantidad: 150, estado: 'En Proceso' },
    { id: 'PRD-003', producto: 'Buñuelos', cantidad: 80, estado: 'En Proceso' },
    { id: 'PRD-004', producto: 'Roscón', cantidad: 60, estado: 'Pendiente' }
];

document.addEventListener("DOMContentLoaded", () => {
    // Cargar órdenes adicionales guardadas en localStorage si existen
    let guardadas = JSON.parse(localStorage.getItem('ordenesProduccion')) || [];
    if (guardadas.length > 0) {
        guardadas.forEach(g => {
            if (!listaOrdenes.some(o => o.id === g.id)) {
                listaOrdenes.unshift({
                    id: g.id || 'PRD-099',
                    producto: g.producto || 'Pandebono',
                    cantidad: g.cantidad || 100,
                    estado: g.estado || 'En Proceso'
                });
            }
        });
    }

    poblarSelectorOrdenes();

    // Cargar si venía alguna orden previa seleccionada
    const previa = JSON.parse(localStorage.getItem('ordenEditando'));
    if (previa && previa.id) {
        const select = document.getElementById('selectOrdenActiva');
        if (select) select.value = previa.id;
    }

    cambiarOrdenSeleccionada();
});

// Llenar el desplegable con las órdenes existentes
function poblarSelectorOrdenes() {
    const select = document.getElementById('selectOrdenActiva');
    if (!select) return;

    select.innerHTML = '';
    listaOrdenes.forEach(ord => {
        const opt = document.createElement('option');
        opt.value = ord.id;
        opt.textContent = `${ord.id} - ${ord.producto} (${ord.cantidad} unid)`;
        select.appendChild(opt);
    });
}

// Al cambiar la orden en el selector, se cargan sus datos en el formulario
function cambiarOrdenSeleccionada() {
    const idSel = document.getElementById('selectOrdenActiva').value;
    const orden = listaOrdenes.find(o => o.id === idSel);

    if (!orden) return;

    document.getElementById('tituloEdicion').innerText = `Editar orden: ${orden.id}`;
    
    // Asignar producto
    const selectProd = document.getElementById('selectProductoEditar');
    for (let i = 0; i < selectProd.options.length; i++) {
        if (selectProd.options[i].value.toLowerCase().includes(orden.producto.toLowerCase())) {
            selectProd.selectedIndex = i;
            break;
        }
    }

    document.getElementById('inputCantidadEditar').value = orden.cantidad;
    document.getElementById('txtEstadoEditar').innerText = `● ${orden.estado}`;

    recalcularInsumosEdicion();
}

// Recalcular materias primas en tiempo real
function recalcularInsumosEdicion() {
    let cant = parseFloat(document.getElementById('inputCantidadEditar').value) || 0;
    const reqInsumo1 = document.getElementById('reqInsumo1');
    const reqInsumo2 = document.getElementById('reqInsumo2');

    if (reqInsumo1) reqInsumo1.innerText = (cant * 0.25).toFixed(1) + " kg";
    if (reqInsumo2) reqInsumo2.innerText = (cant * 0.10).toFixed(0) + " unid";
}

// Guardar cambios y mostrar la confirmación sin alert
function guardarCambiosEditados() {
    const idSel = document.getElementById('selectOrdenActiva').value;
    const nuevoProducto = document.getElementById('selectProductoEditar').value;
    const nuevaCantidad = parseInt(document.getElementById('inputCantidadEditar').value) || 0;

    if (nuevaCantidad <= 0) {
        return;
    }

    // Actualizar datos en memoria y localStorage
    const ordenObj = listaOrdenes.find(o => o.id === idSel);
    if (ordenObj) {
        ordenObj.producto = nuevoProducto;
        ordenObj.cantidad = nuevaCantidad;
    }

    localStorage.setItem('ordenesProduccion', JSON.stringify(listaOrdenes));

    // Cambiar vista: Ocultar formulario y mostrar confirmación
    document.getElementById('seccionFormularioEdicion').style.display = 'none';
    document.getElementById('seccionConfirmacionEdicion').style.display = 'block';

    // Actualizar etiquetas de resumen de la confirmación
    document.getElementById('textoResumenConfirmacion').innerText = `La orden ${idSel} se ha actualizado correctamente con ${nuevaCantidad} unidades de ${nuevoProducto}.`;
    document.getElementById('lblOrdenEditada').innerHTML = `📦 <strong>Orden:</strong> ${idSel} - ${nuevoProducto}`;
}