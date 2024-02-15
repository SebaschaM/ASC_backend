import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./database/db";

import seedRoute from "./routes/seedRoute";
import dataOffersRoute from "./routes/dataOffersRoute";

 
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// Middleware para habilitar CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

dbConnect();


app.use((req, res, next) => {
  const now = new Date();
  const datetime = now.toISOString();
  let log = `[${datetime}] ${res.statusCode || "-"} ${req.method} ${req.path}`;

  console.log(log);

  next();
});

app.use("/api/seed", seedRoute);
app.use("/api/get-offers", dataOffersRoute);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
