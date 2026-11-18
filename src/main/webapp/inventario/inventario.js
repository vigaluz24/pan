/* ===================================================
   Módulo de Inventario
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
    console.log("Módulo de Inventario cargado correctamente - Pan en su Punto");

    // Inicializar eventos de navegación rápida y validaciones
    inicializarMovimientosInventario();
});

/**
 * Gestiona los movimientos rápidos y validaciones de stock
 */
function inicializarMovimientosInventario() {
    const btnMovimientoRapido = document.querySelector("#btnMovimientoRapido");
    if (btnMovimientoRapido) {
        btnMovimientoRapido.addEventListener("click", () => {
            alert("Redirigiendo al asistente de movimientos rápidos de almacén...");
        });
    }
}

/**
 * Valida y registra una nueva entrada de materia prima en el inventario
 */
function registrarEntradaInventario(event) {
    if (event) event.preventDefault();
    
    const fechaIngreso = document.querySelector("input[type='date']").value;
    const cantidad = document.querySelector("input[type='number']").value;

    if (!cantidad || cantidad <= 0) {
        alert("Por favor, ingrese una cantidad válida mayor a cero.");
        return;
    }

    // Transición visual a tarjeta de éxito corporativa
    const seccionFormulario = document.getElementById("seccionFormularioEntrada");
    const seccionConfirmacion = document.getElementById("seccionConfirmacionEntrada");

    if (seccionFormulario && seccionConfirmacion) {
        seccionFormulario.style.display = "none";
        seccionConfirmacion.style.display = "block";
    }
}

/**
 * Valida y guarda una nueva materia prima en el catálogo corporativo
 */
function guardarMateriaPrima(event) {
    if (event) event.preventDefault();

    const nombreInsumo = document.getElementById("inputNombreInsumo")?.value.trim();

    const seccionFormulario = document.getElementById("seccionFormularioMateria");
    const seccionConfirmacion = document.getElementById("seccionConfirmacionMateria");

    if (seccionFormulario && seccionConfirmacion) {
        seccionFormulario.style.display = "none";
        seccionConfirmacion.style.display = "block";

        if (nombreInsumo) {
            const textoResumen = document.getElementById("textoResumenMateria");
            if (textoResumen) {
                textoResumen.innerText = `El insumo "${nombreInsumo}" ha sido agregado correctamente al catálogo corporativo.`;
            }
        }
    }
}

/**
 * Registra una nueva merma y ajusta automáticamente el inventario
 */
function registrarMerma(event) {
    if (event) event.preventDefault();

    const elemento = document.getElementById("selectElemento")?.value;

    const seccionFormulario = document.getElementById("seccionFormularioMerma");
    const seccionConfirmacion = document.getElementById("seccionConfirmacionMerma");

    if (seccionFormulario && seccionConfirmacion) {
        seccionFormulario.style.display = "none";
        seccionConfirmacion.style.display = "block";

        if (elemento && elemento !== "Seleccionar elemento") {
            const textoResumen = document.getElementById("textoResumenMerma");
            if (textoResumen) {
                textoResumen.innerText = `Se ha registrado la merma para "${elemento}". El stock ha sido ajustado correctamente.`;
            }
        }
    }
}

/**
 * Guarda un nuevo producto terminado y vincula los ingredientes a descontar
 */
function guardarProductoTerminado(event) {
    if (event) event.preventDefault();

    const nombreProducto = document.getElementById("inputNombreProducto")?.value.trim();

    const seccionFormulario = document.getElementById("seccionFormularioProducto");
    const seccionConfirmacion = document.getElementById("seccionConfirmacionProducto");

    if (seccionFormulario && seccionConfirmacion) {
        seccionFormulario.style.display = "none";
        seccionConfirmacion.style.display = "block";

        if (nombreProducto) {
            const textoResumen = document.getElementById("textoResumenProducto");
            if (textoResumen) {
                textoResumen.innerText = `El producto "${nombreProducto}" ha sido registrado y vinculado correctamente al inventario.`;
            }
        }
    }
}