/* ===================================================
   Módulo de Recetas
   =================================================== */

// Listado inicial de recetas predeterminadas del sistema
const recetasIniciales = [
    {
        codigo: 'R-001',
        nombre: 'Masa Madre Clásica',
        productoAsociado: 'Pan de masa madre',
        categoria: 'Masas',
        rendimiento: '5.0 Kg',
        costoTotal: 12500,
        estado: 'Activo',
        descripcion: 'Fórmula de fermentación lenta de 18 horas con harina de fuerza seleccionada.',
        insumos: [
            { nombre: 'Harina de Trigo W300', cantidad: '2.500 g', costoUnit: 1400, subtotal: 3500 },
            { nombre: 'Agua Purificada Filtrada', cantidad: '1.750 ml', costoUnit: 200, subtotal: 350 },
            { nombre: 'Cultivo Activo Masa Madre', cantidad: '700 g', costoUnit: 11500, subtotal: 8050 },
            { nombre: 'Sal Marina Fina', cantidad: '50 g', costoUnit: 1200, subtotal: 600 }
        ]
    },
    {
        codigo: 'R-002',
        nombre: 'Pandebono Tradicional',
        productoAsociado: 'Pandebono',
        categoria: 'Masas',
        rendimiento: '30 Unds',
        costoTotal: 9800,
        estado: 'Activo',
        descripcion: 'Mezcla balanceada de almidón de yuca fermentado, queso costeño fresco y masa de maíz.',
        insumos: [
            { nombre: 'Almidón de Yuca Agrio', cantidad: '1.200 g', costoUnit: 3000, subtotal: 3600 },
            { nombre: 'Queso Costeño Rayado', cantidad: '1.500 g', costoUnit: 3800, subtotal: 5700 },
            { nombre: 'Mantequilla / Huevos', cantidad: '200 g', costoUnit: 2500, subtotal: 500 }
        ]
    },
    {
        codigo: 'R-003',
        nombre: 'Buñuelos Especiales',
        productoAsociado: 'Buñuelos',
        categoria: 'Bollería',
        rendimiento: '50 Unds',
        costoTotal: 14200,
        estado: 'Activo',
        descripcion: 'Formulación tradicional colombiana frita a temperatura controlada para esponjosidad.',
        insumos: [
            { nombre: 'Queso Costeño Fino', cantidad: '2.000 g', costoUnit: 4000, subtotal: 8000 },
            { nombre: 'Fécula de Maíz / Almidón', cantidad: '1.500 g', costoUnit: 3000, subtotal: 4500 },
            { nombre: 'Huevos Frescos', cantidad: '10 Unds', costoUnit: 170, subtotal: 1700 }
        ]
    },
    {
        codigo: 'R-004',
        nombre: 'Roscón de Arequipe',
        productoAsociado: 'Roscón',
        categoria: 'Bollería',
        rendimiento: '20 Unds',
        costoTotal: 11500,
        estado: 'Inactivo',
        descripcion: 'Masa dulce horneada rellenada con arequipe artesanal y azúcar espolvoreada.',
        insumos: [
            { nombre: 'Harina de Trigo Comercial', cantidad: '1.800 g', costoUnit: 2000, subtotal: 3600 },
            { nombre: 'Arequipe Repostero', cantidad: '1.000 g', costoUnit: 6500, subtotal: 6500 },
            { nombre: 'Azúcar / Mantequilla', cantidad: '300 g', costoUnit: 4600, subtotal: 1400 }
        ]
    }
];

// Inicialización del DOM al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar estructura básica de datos en localStorage
    if (!localStorage.getItem('recetasPaneria')) {
        localStorage.setItem('recetasPaneria', JSON.stringify(recetasIniciales));
    }

    // 1. Lógica para la vista de Listado (recetas.html)
    const tablaRecetas = document.getElementById('tablaRecetas');
    if (tablaRecetas) {
        renderizarTablaRecetas();

        // Configurar buscador en tiempo real
        const inputBuscar = document.getElementById('inputBuscarReceta');
        if (inputBuscar) {
            inputBuscar.addEventListener('input', (e) => {
                filtrarRecetasPorTexto(e.target.value);
            });
        }
    }

    // 2. Lógica para la vista de Detalle (detalle_receta.html)
    const tituloDetalle = document.getElementById('tituloDetalleReceta');
    if (tituloDetalle) {
        cargarDetalleRecetaActiva();
    }
});

/* ===================================================
   1. FUNCIONES PARA LISTADO DE RECETAS (recetas.html)
   =================================================== */

function obtenerRecetasGuardadas() {
    return JSON.parse(localStorage.getItem('recetasPaneria')) || recetasIniciales;
}

function renderizarTablaRecetas(recetasFiltradas = null) {
    const tablaBody = document.getElementById('tablaRecetas');
    if (!tablaBody) return;

    const recetas = recetasFiltradas || obtenerRecetasGuardadas();
    tablaBody.innerHTML = '';

    if (recetas.length === 0) {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 30px; color: #777;">
                    No se encontraron recetas registradas con ese criterio.
                </td>
            </tr>`;
        return;
    }

    recetas.forEach((receta) => {
        const esActivo = receta.estado === 'Activo';
        const badgeEstado = esActivo
            ? `<span style="background: #E8F8F5; color: #16A085; font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: 12px; display: inline-block;">● Activo</span>`
            : `<span style="background: #FADBD8; color: #C0392B; font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: 12px; display: inline-block;">● Inactivo</span>`;

        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #EAE3D9';
        tr.style.cursor = 'pointer';
        tr.onclick = () => verDetalleReceta(receta.codigo);

        tr.innerHTML = `
            <td style="padding: 15px; font-size: 13px; font-weight: bold; color: #333;">${receta.codigo}</td>
            <td style="padding: 15px; font-size: 13px; color: #555; font-weight: bold;">🍞 ${receta.nombre}</td>
            <td style="padding: 15px; font-size: 13px; color: #555;"><span style="background: #F2F3F4; padding: 3px 8px; border-radius: 6px; font-size: 11px; font-weight: bold;">${receta.rendimiento}</span></td>
            <td style="padding: 15px; font-size: 13px; color: #333; font-weight: bold;">$${receta.costoTotal.toLocaleString('es-CO')}</td>
            <td style="padding: 15px;">${badgeEstado}</td>
            <td style="padding: 15px; text-align: right; color: #D97706; font-weight: bold; font-size: 13px;">Ver &gt;</td>
        `;

        tablaBody.appendChild(tr);
    });
}

function filtrarPorCategoria(categoria, botonPresionado) {
    // Cambiar estilos visuales de los botones de filtro
    const botones = document.querySelectorAll('.btn-filtro-categoria');
    botones.forEach(btn => {
        btn.style.background = '#FAF8F5';
        btn.style.color = '#555';
        btn.style.borderColor = '#EAE3D9';
    });

    if (botonPresionado) {
        botonPresionado.style.background = '#FFF3E0';
        botonPresionado.style.color = '#D97706';
        botonPresionado.style.borderColor = '#D97706';
    }

    const recetas = obtenerRecetasGuardadas();
    if (categoria === 'Todas') {
        renderizarTablaRecetas(recetas);
    } else {
        const filtradas = recetas.filter(r => r.categoria === categoria);
        renderizarTablaRecetas(filtradas);
    }
}

function filtrarRecetasPorTexto(texto) {
    const recetas = obtenerRecetasGuardadas();
    const query = texto.toLowerCase().trim();
    const filtradas = recetas.filter(r => 
        r.nombre.toLowerCase().includes(query) || 
        r.codigo.toLowerCase().includes(query) ||
        r.productoAsociado.toLowerCase().includes(query)
    );
    renderizarTablaRecetas(filtradas);
}

function verDetalleReceta(codigo) {
    const recetas = obtenerRecetasGuardadas();
    const seleccionada = recetas.find(r => r.codigo === codigo);
    if (seleccionada) {
        localStorage.setItem('recetaSeleccionada', JSON.stringify(seleccionada));
        window.location.href = 'detalle_receta.html';
    }
}

/* ===================================================
   2. FUNCIONES PARA DETALLE Y VALIDACIÓN (detalle_receta.html)
   =================================================== */

function cargarDetalleRecetaActiva() {
    const receta = JSON.parse(localStorage.getItem('recetaSeleccionada')) || recetasIniciales[0];

    const elemCodigo = document.getElementById('lblCodigoReceta');
    const elemNombre = document.getElementById('tituloDetalleReceta');
    const elemRendimiento = document.getElementById('lblRendimientoReceta');
    const elemCosto = document.getElementById('lblCostoReceta');

    if (elemCodigo) elemCodigo.innerText = receta.codigo;
    if (elemNombre) elemNombre.innerText = receta.nombre;
    if (elemRendimiento) elemRendimiento.innerText = receta.rendimiento;
    if (elemCosto) elemCosto.innerText = `$${receta.costoTotal.toLocaleString('es-CO')}`;
}

// Control de flujo: Verifica si se puede editar o si hay un lote activo de horneado en curso
function verificarYEditarReceta() {
    const ordenes = JSON.parse(localStorage.getItem('ordenesProduccion')) || [];
    
    // Si hay una orden en estado "En Proceso" o "Activa", bloquea la modificación
    const hayOrdenEnCurso = ordenes.some(o => o.estado === 'En Proceso' || o.estado === 'Activa');

    if (hayOrdenEnCurso) {
        window.location.href = 'receta_bloqueada.html';
    } else {
        window.location.href = 'nueva_receta.html';
    }
}

/* ===================================================
   3. FUNCIONES PARA CREACIÓN Y ERRORES (nueva_receta.html)
   =================================================== */

function guardarReceta() {
    const inputNombre = document.getElementById('txtNombreReceta');
    const inputRendimiento = document.getElementById('txtRendimiento');
    const selectProducto = document.getElementById('selectProducto');

    const nombre = inputNombre ? inputNombre.value.trim() : '';
    const rendimiento = inputRendimiento ? inputRendimiento.value.trim() : '';
    const producto = selectProducto ? selectProducto.value : '';

    // Si faltan campos obligatorios, redirigir a la vista de validaciones y error
    if (!nombre || !rendimiento || !producto) {
        window.location.href = 'error_receta.html';
        return;
    }

    // Crear la nueva receta y persistirla
    const recetas = obtenerRecetasGuardadas();
    const nuevoCodigo = `R-00${recetas.length + 1}`;

    const nueva = {
        codigo: nuevoCodigo,
        nombre: nombre,
        productoAsociado: producto,
        categoria: 'Masas',
        rendimiento: rendimiento,
        costoTotal: 10500,
        estado: 'Activo',
        descripcion: 'Nueva formulación estandarizada.',
        insumos: [
            { nombre: 'Materia Prima Base', cantidad: '1.000 g', costoUnit: 2000, subtotal: 2000 }
        ]
    };

    recetas.push(nueva);
    localStorage.setItem('recetasPaneria', JSON.stringify(recetas));

    alert(`¡La receta ${nuevoCodigo} (${nombre}) ha sido guardada y sincronizada exitosamente!`);
    window.location.href = 'recetas.html';
}