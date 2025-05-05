import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../services/auth.service";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar errores
  const { login: loginContext } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpia errores previos

    // Validaciones del formulario
    if (!username || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await login(username, password);
      loginContext(response.data); // Guarda el usuario en el contexto
      navigate("/"); // Redirige al home
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Error al iniciar sesión.");
      } else {
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      }
      console.error("Login failed", error);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Muestra errores */}
    </div>
  );
};

export default LoginPage;