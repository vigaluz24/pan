// ==========================================
// LÓGICA DE DESCUENTOS Y CONEXIÓN CON CARRITO
// ==========================================
let carritoActual = JSON.parse(localStorage.getItem('carritoVentas')) || [];
let metodoSeleccionado = 'porcentaje'; // 'porcentaje', 'monto_fijo', 'cupon', 'fidelidad'

document.addEventListener("DOMContentLoaded", () => {
    calcularYMostrarResumen();
});

// Cambiar entre métodos visuales de descuento
function seleccionarMetodo(metodo) {
    metodoSeleccionado = metodo;
    const simbolo = document.getElementById('simboloMonedaOid');
    
    // Resetear estilos visuales de las 4 tarjetas
    ['Porcentaje', 'Monto', 'Cupon', 'Fidelidad'].forEach(m => {
        let el = document.getElementById('btnMetodo' + m);
        if(el) {
            el.style.border = '1px solid #EAE3D9';
            el.style.background = '#FAF8F5';
            let textDiv = el.querySelector('div');
            let spanText = el.querySelector('span');
            if(textDiv) textDiv.style.color = '#555';
            if(spanText) spanText.style.color = '#555';
        }
    });

    // Activar estilos de la tarjeta seleccionada
    let idActivo = 'btnMetodo' + (metodo === 'porcentaje' ? 'Porcentaje' : metodo === 'monto_fijo' ? 'Monto' : metodo === 'cupon' ? 'Cupon' : 'Fidelidad');
    let activo = document.getElementById(idActivo);
    if(activo) {
        activo.style.border = '2px solid #D97706';
        activo.style.background = '#FFF';
        let textDiv = activo.querySelector('div');
        let spanText = activo.querySelector('span');
        if(textDiv) textDiv.style.color = '#D97706';
        if(spanText) spanText.style.color = '#D97706';
    }

    // Cambiar el prefijo en el input ($ o %)
    if (metodo === 'porcentaje' || metodo === 'fidelidad') {
        simbolo.innerText = '%';
    } else {
        simbolo.innerText = '$';
    }
    
    calcularYMostrarResumen();
}

// Fijar valor rápido desde los botones sugeridos (5%, 10%, etc.)
function fijarValorSugerido(valor) {
    const input = document.getElementById('inputValorDescuento');
    if (input) {
        input.value = valor;
        calcularYMostrarResumen();
    }
}

// Calcular subtotal real del carrito, aplicar descuento y actualizar la vista
function calcularYMostrarResumen() {
    let subtotal = carritoActual.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    let impuestos = 0; // Ajusta aquí si manejas algún impuesto fijo (ej: subtotal * 0.08)
    let totalOriginal = subtotal + impuestos;

    let inputVal = parseFloat(document.getElementById('inputValorDescuento')?.value) || 0;
    let montoDescuento = 0;

    if (metodoSeleccionado === 'porcentaje' || metodoSeleccionado === 'fidelidad') {
        montoDescuento = subtotal * (inputVal / 100);
    } else {
        montoDescuento = inputVal; // Monto fijo en pesos
    }

    // Evitar que el descuento sea mayor al total
    if (montoDescuento > totalOriginal) {
        montoDescuento = totalOriginal;
    }

    let nuevoTotal = totalOriginal - montoDescuento;
    if (nuevoTotal < 0) nuevoTotal = 0;

    // Inyectar datos dinámicos al HTML
    if (document.getElementById('lblSubtotal')) document.getElementById('lblSubtotal').innerText = `$${subtotal.toLocaleString()}`;
    if (document.getElementById('lblImpuestos')) document.getElementById('lblImpuestos').innerText = `$${ impuestos.toLocaleString()}`;
    if (document.getElementById('lblTotalOriginal')) document.getElementById('lblTotalOriginal').innerText = `$${totalOriginal.toLocaleString()}`;
    if (document.getElementById('lblMontoDescuento')) document.getElementById('lblMontoDescuento').innerText = `-$${montoDescuento.toLocaleString()}`;
    if (document.getElementById('lblNuevoTotal')) document.getElementById('lblNuevoTotal').innerText = `$${nuevoTotal.toLocaleString()} COP`;
}

// Guardar el descuento en localStorage y regresar al procesamiento de pago en ventas.html
function aplicarYVolver() {
    let inputVal = parseFloat(document.getElementById('inputValorDescuento')?.value) || 0;
    let subtotal = carritoActual.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    let montoDescuento = (metodoSeleccionado === 'porcentaje' || metodoSeleccionado === 'fidelidad') ? subtotal * (inputVal / 100) : inputVal;

    const datosDescuento = {
        tipo: metodoSeleccionado,
        valor: inputVal,
        montoDescuento: montoDescuento
    };

    localStorage.setItem('descuentoVenta', JSON.stringify(datosDescuento));
    
    // Redirige a ventas.html agregando #pago para que se abra directamente en el procesamiento de pago
    window.location.href = 'ventas.html#pago';
}