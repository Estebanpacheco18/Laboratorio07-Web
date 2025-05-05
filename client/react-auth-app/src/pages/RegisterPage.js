import { useState } from "react";
import { register } from "../services/auth.service";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores
  const [success, setSuccess] = useState(""); // Estado para manejar éxito

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpia errores previos
    setSuccess(""); // Limpia mensajes de éxito previos

    // Validaciones del formulario
    if (!username || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      await register(username, email, password);
      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
    } catch (error) {
      console.error("Error al registrar el usuario:", error.response || error);
      setError(
        error.response?.data?.message || "Error al registrar el usuario."
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra errores */}
      {success && <p style={{ color: "green" }}>{success}</p>} {/* Muestra éxito */}
    </div>
  );
};

export default RegisterPage;