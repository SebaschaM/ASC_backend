import cors from "cors";
import express from "express";
import "dotenv/config";
import router from "./routes/item";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para habilitar CORS
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware para loggear las peticiones
// Middleware para loggear las peticiones
app.use((req, res, next) => {
  // Obtener la fecha y hora actual
  const now = new Date();
  // Formatear la fecha y hora como deseas, aquí está en ISO para simplicidad
  const datetime = now.toISOString();
  // Construir el log con la información deseada, incluyendo el status code
  let log = `[${datetime}] ${res.statusCode || "-"} ${req.method} ${req.path}`;

  // Imprimir el log en consola
  console.log(log);

  // No olvides llamar a next() para que la petición continúe su flujo
  next();
});

// Usar el router definido
app.use(router);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
