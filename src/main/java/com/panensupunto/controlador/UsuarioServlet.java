package com.panensupunto.controlador;
import com.panensupunto.dao.UsuarioDAO;
import com.panensupunto.modelo.Usuario;
import java.io.IOException;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "UsuarioServlet", urlPatterns = {"/UsuarioServlet"})
public class UsuarioServlet extends HttpServlet {

    private final UsuarioDAO usuarioDAO = new UsuarioDAO();

    // MÉTODO GET: Se ejecuta al listar o al eliminar un registro por la URL
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String accion = request.getParameter("accion");

        if ("eliminar".equals(accion)) {
            int id = Integer.parseInt(request.getParameter("id"));
            usuarioDAO.eliminarUsuario(id);
            request.setAttribute("mensaje", "Usuario eliminado correctamente.");
        }

        // Consultar la lista actualizada de usuarios y enviarla a la vista JSP
        List<Usuario> listaUsuarios = usuarioDAO.listarUsuarios();
        request.setAttribute("usuarios", listaUsuarios);
        request.getRequestDispatcher("usuarios.jsp").forward(request, response);
    }

    // MÉTODO POST: Se ejecuta al enviar el formulario HTML de registro
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        request.setCharacterEncoding("UTF-8");

        String nombre = request.getParameter("txtNombre");
        String correo = request.getParameter("txtCorreo");
        String contrasena = request.getParameter("txtContrasena");
        String rol = request.getParameter("txtRol");

        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre(nombre);
        nuevoUsuario.setCorreo(correo);
        nuevoUsuario.setContrasena(contrasena);
        nuevoUsuario.setRol(rol);

        boolean registrado = usuarioDAO.registrarUsuario(nuevoUsuario);

        if (registrado) {
            request.setAttribute("mensaje", "Usuario registrado exitosamente en Pan en su Punto.");
        } else {
            request.setAttribute("error", "No se pudo registrar el usuario.");
        }

        // Refresca la vista ejecutando el método doGet
        doGet(request, response);
    }
}