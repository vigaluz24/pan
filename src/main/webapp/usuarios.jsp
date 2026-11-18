<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="com.panensupunto.modelo.Usuario"%>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pan en su Punto - Gestión de Usuarios</title>
    <link rel="stylesheet" href="Style.css">
    <link rel="stylesheet" href="usuarios.css">
</head>
<body>

    <div class="app-layout">
        <!-- BARRA LATERAL (SIDEBAR) -->
        <aside class="sidebar">
            <div class="sidebar-logo-container">
                <img src="logo.jpeg.jpeg" alt="Logo" class="sidebar-logo">
            </div>
            <ul class="sidebar-menu">
                <li><a href="dashboard.html">🏠 Inicio</a></li>
                <li><a href="UsuarioServlet" class="menu-item active">👥 Usuarios</a></li>
                <li><a href="index.html">⚙️ Configuración / Salir</a></li>
            </ul>
        </aside>

        <!-- CONTENIDO PRINCIPAL -->
        <div class="main-content">
            <header class="top-bar">
                <div class="search-box">
                    <span class="search-icon">🔍</span>
                    <input type="text" placeholder="Buscar usuario...">
                </div>
                <div class="top-actions-user">
                    <span class="user-profile-text">Administrador</span>
                    <div class="user-avatar-top">A</div>
                </div>
            </header>

            <div class="dashboard-content">
                <div class="dashboard-header-row">
                    <div>
                        <h1 class="dashboard-title">Gestión de Usuarios</h1>
                        <p class="dashboard-subtitle">Administra el personal, roles y accesos desde Servlets y JSP.</p>
                    </div>
                </div>

                <%-- MENSAJE DE ALERTA DINÁMICO DESDE EL SERVLET --%>
                <% 
                    String mensaje = (String) request.getAttribute("mensaje");
                    if (mensaje != null) { 
                %>
                    <div style="background: #D1FAE5; color: #065F46; padding: 12px; border-radius: 6px; margin-bottom: 20px;">
                        <%= mensaje %>
                    </div>
                <% } %>

                <!-- FORMULARIO HTML CON MÉTODO POST PARA REGISTRAR -->
                <div class="card" style="padding: 20px; margin-bottom: 25px; background: white; border-radius: 8px;">
                    <h3 style="color: #67412E; margin-bottom: 15px;">Registrar Nuevo Usuario (POST)</h3>
                    <form action="UsuarioServlet" method="POST">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                            <input type="text" name="txtNombre" placeholder="Nombre completo" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <input type="email" name="txtCorreo" placeholder="Correo electrónico" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <input type="password" name="txtContrasena" placeholder="Contraseña" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                            <select name="txtRol" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="Administrador">Administrador</option>
                                <option value="Cajero">Cajero</option>
                                <option value="Panadero">Panadero</option>
                            </select>
                        </div>
                        <button type="submit" style="background: #D97706; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; cursor: pointer;">Guardar Usuario</button>
                    </form>
                </div>

                <!-- BOTÓN GET PARA ACTUALIZAR LISTA -->
                <form action="UsuarioServlet" method="GET" style="margin-bottom: 15px;">
                    <button type="submit" style="background: #67412E; color: white; border: none; padding: 8px 14px; border-radius: 4px; cursor: pointer;">Actualizar Lista (GET)</button>
                </form>

                <!-- TABLA DINÁMICA RENDERIZADA CON JSP -->
                <div class="card table-card">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Acciones (GET)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <%
                                List<Usuario> listaUsuarios = (List<Usuario>) request.getAttribute("usuarios");
                                if (listaUsuarios != null && !listaUsuarios.isEmpty()) {
                                    for (Usuario u : listaUsuarios) {
                            %>
                            <tr>
                                <td><%= u.getIdUsuario() %></td>
                                <td><%= u.getNombre() %></td>
                                <td><%= u.getCorreo() %></td>
                                <td><span class="badge-role"><%= u.getRol() %></span></td>
                                <td>
                                    <a href="UsuarioServlet?accion=eliminar&id=<%= u.getIdUsuario() %>" 
                                       onclick="return confirm('¿Deseas eliminar este usuario?');" 
                                       style="background: #DC2626; color: white; padding: 5px 10px; text-decoration: none; border-radius: 4px; font-size: 13px;">
                                       Eliminar
                                    </a>
                                </td>
                            </tr>
                            <% 
                                    }
                                } else { 
                            %>
                            <tr>
                                <td colspan="5" style="text-align: center; padding: 20px;">Haz clic en "Actualizar Lista (GET)" para cargar los registros de la base de datos.</td>
                            </tr>
                            <% } %>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>