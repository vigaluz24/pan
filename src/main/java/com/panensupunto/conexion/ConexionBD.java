package com.panensupunto.conexion;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

public class ConexionBD {

    public static Connection obtenerConexion() {
        Connection conexion = null;
        Properties props = new Properties();

        try (InputStream in = ConexionBD.class.getClassLoader()
                .getResourceAsStream("db.properties")) {

            if (in == null) {
                System.out.println("No se encontró db.properties en resources");
                return null;
            }

            props.load(in);
            Class.forName("com.mysql.cj.jdbc.Driver");

            conexion = DriverManager.getConnection(
                props.getProperty("db.url"),
                props.getProperty("db.usuario"),
                props.getProperty("db.contrasena"));

            System.out.println("¡Conexión exitosa a la base de datos!");

        } catch (Exception e) {
            System.out.println("Error en la conexión: " + e.getMessage());
        }
        return conexion;
    }

    public static void main(String[] args) {
        obtenerConexion();
    }
}