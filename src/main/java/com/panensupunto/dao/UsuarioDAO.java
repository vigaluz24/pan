package com.panensupunto.dao;
import com.panensupunto.conexion.ConexionBD;
import com.panensupunto.modelo.Usuario;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class UsuarioDAO {

    // Método para registrar un nuevo usuario en la base de datos
    public boolean registrarUsuario(Usuario usuario) {
        // Cambiamos 'contraseña' por 'contrasena' sin tilde
        String sql = "INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)";
        
        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = con.prepareStatement(sql)) {
            
            pstmt.setString(1, usuario.getNombre());
            pstmt.setString(2, usuario.getCorreo());
            pstmt.setString(3, usuario.getContrasena());
            pstmt.setString(4, usuario.getRol());
            
            pstmt.executeUpdate();
            System.out.println("¡Usuario registrado exitosamente en la BD!");
            return true;
            
        } catch (SQLException e) {
            System.out.println("Error al registrar usuario: " + e.getMessage());
            return false;
        }
    }

    // Método para listar todos los usuarios registrados
    public List<Usuario> listarUsuarios() {
        List<Usuario> listaUsuarios = new ArrayList<>();
        String sql = "SELECT * FROM usuarios";
        
        try (Connection con = ConexionBD.obtenerConexion();
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            
            while (rs.next()) {
                Usuario u = new Usuario();
                u.setIdUsuario(rs.getInt("id_usuario"));
                u.setNombre(rs.getString("nombre"));
                u.setCorreo(rs.getString("correo"));
                // Aseguramos que lea 'contrasena' sin tilde
                u.setContrasena(rs.getString("contrasena"));
                u.setRol(rs.getString("rol"));
                
                listaUsuarios.add(u);
            }
            
        } catch (SQLException e) {
            System.out.println("Error al listar usuarios: " + e.getMessage());
        }
        
        return listaUsuarios;
    }
    // Método para eliminar un usuario por su ID
    public boolean eliminarUsuario(int id) {
        String sql = "DELETE FROM usuarios WHERE id_usuario = ?";

        try (Connection con = ConexionBD.obtenerConexion();
             PreparedStatement pstmt = con.prepareStatement(sql)) {

            pstmt.setInt(1, id);
            int filasAfectadas = pstmt.executeUpdate();
            return filasAfectadas > 0;

        } catch (SQLException e) {
            System.out.println("Error al eliminar usuario: " + e.getMessage());
            return false;
        }
    }
}