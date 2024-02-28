import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "34.30.8.232",
  database: "asc_db",
  password: "postsebas123",
  port: 5432,
});

pool.on("connect", () => {
  console.log("Connected to database via pool");
});

// Realiza una verificación inicial de la conexión al arrancar la aplicación.
const verifyConnection = async () => {
  try {
    const client = await pool.connect(); // Intenta obtener una conexión del pool
    await client.query('SELECT 1'); // Realiza una consulta simple
    client.release(); // Libera la conexión
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    pool.end(); // Considera si realmente necesitas terminar el pool aquí.
  }
};

// Llama a la función de verificación inmediatamente.
verifyConnection();

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

async function dbConnect() {
  return pool;
}

export default dbConnect;
