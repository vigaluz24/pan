document.addEventListener("DOMContentLoaded", () => {
    cargarOrdenesProduccion();
    
    // Escuchar el input de búsqueda para filtrar en tiempo real
    const inputBuscar = document.getElementById('inputBuscarOrden');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', filtrarOrdenes);
    }
});

// Cargar órdenes adaptadas a la línea oficial de productos
function cargarOrdenesProduccion() {
    const tbody = document.getElementById('tablaOrdenesProduccion');
    if (!tbody) return;

    // Órdenes base con los productos reales del sistema
    let ordenesBase = [
        { id: 'PRD-001', producto: '🧀 Pandebono', cantidad: 100, responsable: 'Carlos Pérez', estado: 'PENDIENTE' },
        { id: 'PRD-002', producto: '🟡 Buñuelos', cantidad: 150, responsable: 'Carlos Pérez', estado: 'EN PROCESO' },
        { id: 'PRD-003', producto: '🥐 Pan Aliñado', cantidad: 80, responsable: 'Carlos Pérez', estado: 'FINALIZADA' },
        { id: 'PRD-004', producto: '🥮 Roscón', cantidad: 60, responsable: 'Carlos Pérez', estado: 'FINALIZADA' }
    ];

    // Recuperar órdenes creadas dinámicamente desde nueva_orden.html
    let ordenesGuardadas = JSON.parse(localStorage.getItem('ordenesProduccion')) || [];
    
    // Mapear las órdenes guardadas asignando ícono según el producto
    let nuevasFormateadas = ordenesGuardadas.map((ord, index) => {
        let icono = '🍞';
        const prodLower = (ord.producto || '').toLowerCase();
        
        if (prodLower.includes('pandebono')) icono = '🧀';
        else if (prodLower.includes('buñuelo')) icono = '🟡';
        else if (prodLower.includes('roscón') || prodLower.includes('roscon')) icono = '🥮';
        else if (prodLower.includes('aliñado') || prodLower.includes('alinado')) icono = '🥐';

        return {
            id: ord.id || `PRD-10${index + 1}`,
            producto: `${icono} ${ord.producto}`,
            cantidad: ord.cantidad,
            responsable: 'Carlos Pérez',
            estado: ord.estado ? ord.estado.toUpperCase() : 'EN PROCESO'
        };
    });

    // Unir ambas listas (las más recientes creadas primero)
    let todasLasOrdenes = [...nuevasFormateadas.reverse(), ...ordenesBase];

    renderizarTabla(todasLasOrdenes);
}

// Renderizar filas en la tabla manteniendo el diseño
function renderizarTabla(ordenes) {
    const tbody = document.getElementById('tablaOrdenesProduccion');
    tbody.innerHTML = '';

    ordenes.forEach(ord => {
        let estiloEstado = '';
        if (ord.estado === 'PENDIENTE') {
            estiloEstado = 'background: #F2F3F4; color: #555;';
        } else if (ord.estado === 'EN PROCESO') {
            estiloEstado = 'background: #FDEBD0; color: #D35400;';
        } else {
            estiloEstado = 'background: #E8F8F5; color: #16A085;';
        }

        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #EAE3D9';

        tr.innerHTML = `
            <td style="padding: 15px; font-size: 13px; font-weight: bold; color: #333;">${ord.id}</td>
            <td style="padding: 15px; font-size: 13px; color: #555;">${ord.producto}</td>
            <td style="padding: 15px; font-size: 13px; color: #555; font-weight: bold;">${ord.cantidad} <span style="font-weight: normal; color: #777; font-size: 11px;">unidades</span></td>
            <td style="padding: 15px; font-size: 13px; color: #555;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 24px; height: 24px; background: #E67E22; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">CP</span>
                    ${ord.responsable}
                </div>
            </td>
            <td style="padding: 15px;">
                <span style="${estiloEstado} font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: 12px; display: inline-block;">● ${ord.estado}</span>
            </td>
            <td style="padding: 15px; text-align: right;">
                <button onclick="gestionarOrden('${ord.id}')" style="background: none; border: none; color: #D97706; font-weight: bold; font-size: 13px; cursor: pointer;">
                    ${ord.estado === 'FINALIZADA' ? 'Ver detalle >' : 'Gestionar >'}
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Filtro en tiempo real por búsqueda
function filtrarOrdenes() {
    const texto = document.getElementById('inputBuscarOrden').value.toLowerCase();
    const filas = document.querySelectorAll('#tablaOrdenesProduccion tr');

    filas.forEach(fila => {
        const contenido = fila.innerText.toLowerCase();
        fila.style.display = contenido.includes(texto) ? '' : 'none';
    });
}

// Redirección a la vista de cierre/gestión
function gestionarOrden(idOrden) {
    window.location.href = 'finalizar_orden.html';
}