import { Client } from "pg";

async function dbConnect() {
  const client = new Client({
    user: 'postgres',
    host: '34.30.8.232',
    database: 'asc_db',
    password: 'pruebaxd123',
    port: 5432,
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
