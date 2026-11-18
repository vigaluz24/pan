// ==========================================
// ESTADO GLOBAL DEL CARRITO Y VENTA ACTUAL
// ==========================================
let carrito = [];
let ventaRealizada = null; // Almacena el snapshot de la venta completada

// MAPA DE IMÁGENES DE PRODUCTOS PARA EL DETALLE
const imagenesProductos = {
    'Pan Aliñado': 'pan-aliño.jpeg',
    'Pandebono': 'pandebono.jpeg',
    'Buñuelos': 'pan-aliño.jpeg',
    'Roscón': 'pan-aliño.jpeg',
    'Tinto': 'pandebono.jpeg',
    'Avena cubana': 'pan-aliño.jpeg'
};

// ==========================================
// 1. NAVEGACIÓN ENTRE VISTAS DEL MÓDULO
// ==========================================
function mostrarVista(idVista) {
    const vistas = [
        'vistaDashboardVentas', 
        'vistaCatalogoPOS', 
        'vistaProcesamientoPago',
        'vistaConfirmacionVenta', 
        'vistaDetalleVenta'
    ];

    vistas.forEach(v => {
        const el = document.getElementById(v);
        if (el) {
            el.style.display = 'none';
        }
    });

    // Si navegamos a la vista de detalle, renderizamos los datos del carrito actual
    if (idVista === 'vistaDetalleVenta') {
        renderizarDetalleVenta();
    }

    const vistaDestino = document.getElementById(idVista);
    if (vistaDestino) {
        vistaDestino.style.display = 'block';
    }
}

// ==========================================
// 2. LÓGICA DEL CARRITO DE COMPRAS
// ==========================================
function agregarAlCarrito(nombre, precio) {
    let encontrado = carrito.find(item => item.nombre === nombre);
    if (encontrado) {
        encontrado.cantidad += 1;
    } else {
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }
    actualizarVistaCarrito();
}

function actualizarVistaCarrito() {
    const contenedor = document.getElementById('listaCarrito');
    const totalTexto = document.getElementById('totalCarritoTexto');
    
    if (!contenedor || !totalTexto) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = '<em>No hay productos agregados aún.</em>';
        totalTexto.innerText = '$0';
        return;
    }

    let html = '';
    let total = 0;

    carrito.forEach(item => {
        let subtotalItem = item.precio * item.cantidad;
        total += subtotalItem;
        html += `<div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>${item.nombre} (x${item.cantidad})</span>
            <strong>$${subtotalItem.toLocaleString()}</strong>
        </div>`;
    });

    contenedor.innerHTML = html;
    totalTexto.innerText = `$${total.toLocaleString()}`;
}

function calcularTotal() {
    return carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
}

function prepararPago() {
    if (carrito.length === 0) {
        alert("Por favor agregue al menos un producto al carrito antes de pagar.");
        return;
    }
    let total = calcularTotal();
    
    const pagoSubtotal = document.getElementById('pagoSubtotal');
    const pagoTotal = document.getElementById('pagoTotal');
    const inputMonto = document.getElementById('inputMontoRecibido');

    if (pagoSubtotal) pagoSubtotal.innerText = `$${total.toLocaleString()}`;
    if (pagoTotal) pagoTotal.innerText = `$${total.toLocaleString()}`;
    if (inputMonto) inputMonto.value = total.toLocaleString();
    
    mostrarVista('vistaProcesamientoPago');
}

// ==========================================
// 3. TECLADO NUMÉRICO POS
// ==========================================
function tecladoPOS(valor) {
    let inputMonto = document.getElementById('inputMontoRecibido');
    if (!inputMonto) return;

    let valorActual = inputMonto.value.replace(/\./g, '');

    if (valor === 'C') {
        inputMonto.value = '0';
    } else if (valor === 'BORRAR') {
        if (valorActual.length <= 1) {
            inputMonto.value = '0';
        } else {
            let nuevoValor = valorActual.slice(0, -1);
            inputMonto.value = Number(nuevoValor).toLocaleString();
        }
    } else {
        if (valorActual === '0') {
            inputMonto.value = valor;
        } else {
            let nuevoValor = valorActual + valor;
            inputMonto.value = Number(nuevoValor).toLocaleString();
        }
    }
}

// ==========================================
// 4. RENDERIZADO DINÁMICO DE DETALLE Y ANULACIÓN
// ==========================================
function renderizarDetalleVenta() {
    const contenedorArticulos = document.getElementById('detalleListaArticulos');
    const txtSubtotal = document.getElementById('detalleSubtotal');
    const txtTotal = document.getElementById('detalleTotal');
    const txtFechaHora = document.getElementById('detalleFechaHora');
    const txtMontoRecibido = document.getElementById('detalleMontoRecibido');

    if (!contenedorArticulos) return;

    if (carrito.length === 0) {
        contenedorArticulos.innerHTML = '<p style="color: #888; font-style: italic;">No hay información de productos en la orden actual.</p>';
        if (txtSubtotal) txtSubtotal.innerText = '$0';
        if (txtTotal) txtTotal.innerText = '$0 COP';
        return;
    }

    // Fecha actual formateada
    const ahora = new Date();
    if (txtFechaHora) {
        txtFechaHora.innerText = `${ahora.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })} - ${ahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} hrs`;
    }

    let html = '';
    let total = calcularTotal();

    carrito.forEach(item => {
        let subtotalItem = item.precio * item.cantidad;
        let img = imagenesProductos[item.nombre] || 'pan-aliño.jpeg';

        html += `
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #F3EEEC; padding-bottom: 12px; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${img}" alt="${item.nombre}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 6px;">
                <div>
                    <h4 style="font-size: 14px; color: #67412E; margin: 0 0 2px 0;">${item.nombre}</h4>
                    <span style="font-size: 12px; color: #777;">x${item.cantidad} a $${item.precio.toLocaleString()} c/u</span>
                </div>
            </div>
            <strong style="font-size: 14px; color: #333;">$${subtotalItem.toLocaleString()}</strong>
        </div>`;
    });

    contenedorArticulos.innerHTML = html;
    if (txtSubtotal) txtSubtotal.innerText = `$${total.toLocaleString()}`;
    if (txtTotal) txtTotal.innerText = `$${total.toLocaleString()} COP`;

    let inputMonto = document.getElementById('inputMontoRecibido');
    if (txtMontoRecibido && inputMonto) {
        txtMontoRecibido.innerText = `$${inputMonto.value}`;
    }
}

// Lógica de confirmación de anulación
function ejecutarAnulacionVenta() {
    const motivo = document.getElementById('selectMotivoAnulacion').value;
    if (!motivo) {
        alert("Por favor seleccione un motivo de anulación antes de continuar.");
        return;
    }

    if (confirm("¿Está seguro de que desea anular esta venta? Los productos retornarán al inventario.")) {
        alert(`Venta anulada con éxito.\nMotivo: ${motivo}`);
        carrito = []; // Limpiar el carrito tras anular
        actualizarVistaCarrito();
        mostrarVista('vistaDashboardVentas');
    }
}

// ==========================================
// 5. INICIALIZACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // 1. Recuperar el carrito si existe en localStorage
    const carritoGuardado = localStorage.getItem('carritoVentas');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        if (typeof actualizarVistaCarrito === 'function') {
            actualizarVistaCarrito();
        }
    }
    // 2. Comprobar si regresamos desde descuentos.html con un descuento aplicado
    const descuentoGuardado = localStorage.getItem('descuentoVenta');
    
    if (descuentoGuardado || window.location.hash === '#pago') {
        // Si tenemos función para preparar el pago y aplicar el descuento al total:
        if (typeof prepararPago === 'function') {
            prepararPago();
        } else {
            // Si tu función de abrir la vista de pago se llama diferente, ajústala aquí (ej. mostrarVista('vistaProcesamientoPago'))
            mostrarVista('vistaProcesamientoPago');
        }
    } else {
        // Vista por defecto al iniciar normalmente
        mostrarVista('vistaDashboardVentas');
    }
});
// Función para empaquetar el carrito actual y saltar a descuentos.html desde el pago
function irADescuentosDesdePago() {
    if (carrito.length === 0) {
        alert("No hay productos en la orden actual.");
        return;
    }
    // Guardamos el carrito en el almacenamiento local del navegador
    localStorage.setItem('carritoVentas', JSON.stringify(carrito));
    // Redirigimos a la pantalla de descuentos
    window.location.href = 'descuentos.html';
}