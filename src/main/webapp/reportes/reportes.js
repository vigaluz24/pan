
        // Datos de Materias Primas
        const datosMP = [
            { codigo: "#MP-001", nombre: "Harina de Trigo W300", unidad: "kg", stock: 500, min: 100, estado: "Disponible", claseEstado: "background: #E8F8F5; color: #16A085;" },
            { codigo: "#MP-002", nombre: "Azúcar Blanca", unidad: "kg", stock: 15, min: 20, estado: "Stock bajo", claseEstado: "background: #FEF9E7; color: #D35400;" },
            { codigo: "#MP-003", nombre: "Levadura Fresca", unidad: "g", stock: 2500, min: 500, estado: "Disponible", claseEstado: "background: #E8F8F5; color: #16A085;" },
            { codigo: "#MP-004", nombre: "Mantequilla sin sal", unidad: "kg", stock: 8, min: 10, estado: "Stock bajo", claseEstado: "background: #FEF9E7; color: #D35400;" },
            { codigo: "#MP-005", nombre: "Sal Marina Fina", unidad: "kg", stock: 120, min: 30, estado: "Disponible", claseEstado: "background: #E8F8F5; color: #16A085;" }
        ];

        // Datos de Productos Terminados (con los ítems del sistema)
        const datosPT = [
            { codigo: "#PT-001", nombre: "Pan Aliñado", unidad: "und", stock: 50, min: 20, estado: "Disponible", claseEstado: "background: #E8F8F5; color: #16A085;" },
            { codigo: "#PT-002", nombre: "Pandebono Tradicional", unidad: "und", stock: 0, min: 30, estado: "Sin existencias", claseEstado: "background: #FDEDEC; color: #C0392B;" },
            { codigo: "#PT-003", nombre: "Buñuelos Especiales", unidad: "und", stock: 80, min: 40, estado: "Disponible", claseEstado: "background: #E8F8F5; color: #16A085;" },
            { codigo: "#PT-004", nombre: "Roscón de Arequipe", unidad: "und", stock: 25, min: 15, estado: "Disponible", claseEstado: "background: #E8F8F5; color: #16A085;" },
            { codigo: "#PT-005", nombre: "Masa Madre Clásica (Hogaza)", unidad: "und", stock: 12, min: 10, estado: "Stock bajo", claseEstado: "background: #FEF9E7; color: #D35400;" }
        ];

        function cambiarPestana(tipo) {
            const btnMP = document.getElementById('btnTabMP');
            const btnPT = document.getElementById('btnTabPT');
            const tbody = document.getElementById('contenidoTablaInventario');
            const paginacion = document.getElementById('textoPaginacion');

            tbody.innerHTML = '';

            if (tipo === 'mp') {
                // Estilos pestaña activa Materias Primas
                btnMP.style.background = 'white';
                btnMP.style.color = '#D97706';
                btnMP.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                
                btnPT.style.background = 'transparent';
                btnPT.style.color = '#67412E';
                btnPT.style.boxShadow = 'none';

                paginacion.innerText = "Mostrando 1 a 5 de 24 materias primas";

                datosMP.forEach(item => {
                    tbody.innerHTML += `
                        <tr style="border-bottom: 1px solid #EAE3D9;">
                            <td style="padding: 15px; font-size: 13px; font-weight: bold; color: #D97706;">${item.codigo}</td>
                            <td style="padding: 15px; font-size: 13px; color: #333; font-weight: bold;">${item.nombre}</td>
                            <td style="padding: 15px; font-size: 13px; color: #555;">${item.unidad}</td>
                            <td style="padding: 15px; font-size: 13px; color: #333; font-weight: bold;">${item.stock}</td>
                            <td style="padding: 15px; font-size: 13px; color: #777;">${item.min}</td>
                            <td style="padding: 15px;"><span style="${item.claseEstado} font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: 12px;">● ${item.estado}</span></td>
                            <td style="padding: 15px; text-align: right; color: #777; cursor: pointer; font-weight: bold;">⋮</td>
                        </tr>
                    `;
                });

            } else {
                // Estilos pestaña activa Productos Terminados
                btnPT.style.background = 'white';
                btnPT.style.color = '#D97706';
                btnPT.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                
                btnMP.style.background = 'transparent';
                btnMP.style.color = '#67412E';
                btnMP.style.boxShadow = 'none';

                paginacion.innerText = "Mostrando 1 a 5 de 18 productos terminados";

                datosPT.forEach(item => {
                    tbody.innerHTML += `
                        <tr style="border-bottom: 1px solid #EAE3D9;">
                            <td style="padding: 15px; font-size: 13px; font-weight: bold; color: #D97706;">${item.codigo}</td>
                            <td style="padding: 15px; font-size: 13px; color: #333; font-weight: bold;">${item.nombre}</td>
                            <td style="padding: 15px; font-size: 13px; color: #555;">${item.unidad}</td>
                            <td style="padding: 15px; font-size: 13px; color: #333; font-weight: bold;">${item.stock}</td>
                            <td style="padding: 15px; font-size: 13px; color: #777;">${item.min}</td>
                            <td style="padding: 15px;"><span style="${item.claseEstado} font-size: 10px; font-weight: bold; padding: 4px 10px; border-radius: 12px;">● ${item.estado}</span></td>
                            <td style="padding: 15px; text-align: right; color: #777; cursor: pointer; font-weight: bold;">⋮</td>
                        </tr>
                    `;
                });
            }
        }

        // Cargar por defecto la pestaña de Materias Primas al abrir la vista
        window.onload = function() {
            cambiarPestana('mp');
        };