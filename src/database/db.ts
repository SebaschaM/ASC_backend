import { Client } from "pg";

async function dbConnect() {
  const client = new Client({
    user: process.env.DB_USER as string,
    host: process.env.DB_HOST as string,
    database: process.env.DB_DATABASE as string,
    password: process.env.DB_PASSWORD as string,
    port: parseInt(process.env.DB_PORT as string),
  });

  try {
    await client.connect();
    console.log("Connected to database");
    return client;
  } catch (e) {
    console.log("Error connecting to database");
    console.log(e);
  }
}

export default dbConnect;
