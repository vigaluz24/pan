package com.panensupunto.conexion;
import com.panensupunto.dao.UsuarioDAO;
import com.panensupunto.modelo.Usuario;
import java.util.List;

public class MainPrueba {
    public static void main(String[] args) {
    try {
        System.out.println("=== INICIANDO PRUEBA DEL MÓDULO DE USUARIOS (DAO) ===");

        UsuarioDAO usuarioDAO = new UsuarioDAO();

        // 1. Probar la inserción de un nuevo usuario
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre("Ana Gómez");
        nuevoUsuario.setCorreo("ana.gomez@panensupunto.com");
        nuevoUsuario.setContrasena("Admin123*");
        nuevoUsuario.setRol("Administrador");

        boolean registrado = usuarioDAO.registrarUsuario(nuevoUsuario);

        if (registrado) {
            System.out.println("-> ¡Prueba de inserción exitosa!");
        } else {
            System.out.println("-> Error en la inserción del usuario.");
        }

        // 2. Probar la consulta y listado de todos los usuarios
        System.out.println("\n--- LISTADO DE USUARIOS REGISTRADOS EN MYSQL ---");
        List<Usuario> lista = usuarioDAO.listarUsuarios();

        if (lista.isEmpty()) {
            System.out.println("No se encontraron usuarios en la base de datos.");
        } else {
            for (Usuario u : lista) {
                System.out.println("ID: " + u.getIdUsuario() +
                        " | Nombre: " + u.getNombre() +
                        " | Correo: " + u.getCorreo() +
                        " | Rol: " + u.getRol());
            }
        }

    } catch (Exception e) {
        System.out.println("Ocurrió un error en la ejecución: " + e.getMessage());
        e.printStackTrace();
    }
 }
}

