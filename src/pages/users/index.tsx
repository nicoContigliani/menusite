// pages/users/index.tsx
import { useState, useEffect } from "react";
import styles from "./users.module.css";  // Importa el archivo de estilos CSS Module

interface User {
  _id: string;
  email: string;
  rol: string;
  visit: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("");
  const [visit, setVisit] = useState(0);

  // Obtener usuarios al cargar la página
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { email, rol, visit };
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        const createdUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, createdUser]); // Agregar el nuevo usuario al estado
        setEmail("");
        setRol("");
        setVisit(0);
      } else {
        console.error("Error creating user");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Usuarios</h1>
      
      {/* Mostrar lista de usuarios */}
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user._id} className={styles.userItem}>
            <p>Email: {user.email}</p>
            <p>Rol: {user.rol}</p>
            <p>Visitas: {user.visit}</p>
          </li>
        ))}
      </ul>

      {/* Formulario para crear un nuevo usuario */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Crear Nuevo Usuario</h2>
        <label className={styles.inputField}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className={styles.inputField}>
          Rol:
          <input
            type="text"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            required
          />
        </label>
        <label className={styles.inputField}>
          Visitas:
          <input
            type="number"
            value={visit}
            onChange={(e) => setVisit(Number(e.target.value))}
            required
          />
        </label>
        <button type="submit" className={styles.button}>Crear Usuario</button>
      </form>
    </div>
  );
}
