// Base de Datos de Recetas Base por unidad de producto
const recetasBase = {
    pan_masa_madre: [
        { nombre: "Harina de trigo", cantPorUnidad: 0.50, unidad: "kg", stock: 125.50 },
        { nombre: "Huevos", cantPorUnidad: 0.10, unidad: "unid", stock: 280 },
        { nombre: "Sal", cantPorUnidad: 0.01, unidad: "kg", stock: 14.00 }
    ],
    pan_alinado: [
        { nombre: "Harina de trigo", cantPorUnidad: 0.25, unidad: "kg", stock: 125.50 },
        { nombre: "Mantequilla", cantPorUnidad: 0.05, unidad: "kg", stock: 22.00 },
        { nombre: "Queso/Cuajada", cantPorUnidad: 0.08, unidad: "kg", stock: 18.50 },
        { nombre: "Azúcar", cantPorUnidad: 0.02, unidad: "kg", stock: 35.00 }
    ],
    pandebono: [
        { nombre: "Almidón de Yuca", cantPorUnidad: 0.15, unidad: "kg", stock: 45.00 },
        { nombre: "Queso Costeño", cantPorUnidad: 0.20, unidad: "kg", stock: 30.00 },
        { nombre: "Huevos", cantPorUnidad: 0.05, unidad: "unid", stock: 280 },
        { nombre: "Mantequilla", cantPorUnidad: 0.02, unidad: "kg", stock: 22.00 }
    ],
    bunuelos: [
        { nombre: "Queso Costeño", cantPorUnidad: 0.18, unidad: "kg", stock: 30.00 },
        { nombre: "Fécula de Maíz", cantPorUnidad: 0.12, unidad: "kg", stock: 25.00 },
        { nombre: "Huevos", cantPorUnidad: 0.04, unidad: "unid", stock: 280 },
        { nombre: "Aceite de Freír", cantPorUnidad: 0.03, unidad: "Lt", stock: 50.00 }
    ],
    roscon: [
        { nombre: "Harina de trigo", cantPorUnidad: 0.30, unidad: "kg", stock: 125.50 },
        { nombre: "Arequipe / Bocadillo", cantPorUnidad: 0.10, unidad: "kg", stock: 15.00 },
        { nombre: "Huevos", cantPorUnidad: 0.08, unidad: "unid", stock: 280 },
        { nombre: "Azúcar", cantPorUnidad: 0.03, unidad: "kg", stock: 35.00 }
    ]
};

document.addEventListener("DOMContentLoaded", () => {
    recalcularInsumos();
});

// Función para recalcular dinámicamente las materias primas
function recalcularInsumos() {
    const productoClave = document.getElementById('selectProductoTerminado').value;
    const cantidad = parseFloat(document.getElementById('inputCantidadProducir').value) || 0;
    const tbody = document.getElementById('tablaInsumosBody');

    tbody.innerHTML = '';

    const insumos = recetasBase[productoClave] || [];

    insumos.forEach(item => {
        const reqTotal = (item.cantPorUnidad * cantidad).toFixed(2);
        const suficiente = item.stock >= reqTotal;

        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #EAE3D9';

        tr.innerHTML = `
            <td style="padding: 12px; font-size: 13px; font-weight: bold; color: #333;">${item.nombre}</td>
            <td style="padding: 12px; font-size: 13px; color: #555;">${reqTotal} ${item.unidad}</td>
            <td style="padding: 12px; font-size: 13px; color: #555;">${item.stock} ${item.unidad}</td>
            <td style="padding: 12px; text-align: center;">
                <span style="font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 6px; ${suficiente ? 'background: #E8F5E9; color: #2E7D32;' : 'background: #FFEBEE; color: #C62828;'}">
                    ${suficiente ? 'Stock suficiente ✓' : 'Stock insuficiente ⚠️'}
                </span>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// Guardar la orden en localStorage y redirigir
function crearOrdenProduccion() {
    const select = document.getElementById('selectProductoTerminado');
    const nombreProducto = select.options[select.selectedIndex].text;
    const cantidad = document.getElementById('inputCantidadProducir').value || 100;

    if (cantidad <= 0) {
        alert("Por favor ingresa una cantidad válida.");
        return;
    }

    const nuevaOrden = {
        id: 'Lote #' + Math.floor(1000 + Math.random() * 9000),
        producto: nombreProducto,
        cantidad: parseInt(cantidad),
        estado: 'En Proceso',
        fecha: new Date().toLocaleDateString('es-CO')
    };

    let ordenes = JSON.parse(localStorage.getItem('ordenesProduccion')) || [];
    ordenes.push(nuevaOrden);
    localStorage.setItem('ordenesProduccion', JSON.stringify(ordenes));

    alert(`¡Orden de producción para ${cantidad} unidades de ${nombreProducto} creada con éxito!`);
    window.location.href = 'produccion.html';
}