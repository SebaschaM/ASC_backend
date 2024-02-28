import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./database/db";

import seedRoute from "./routes/seedRoute";
import dataOffersRoute from "./routes/offers/dataOffersRoute";
import authUserRoute from "./routes/auth/authUserAuthRoute";
import dataLocationsRoute from "./routes/locations/dataLocationsRoute";
import actionsCandidateRoute from "./routes/candidate/actionsCandidateRoute";

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
app.use("/api/auth", authUserRoute);
app.use("/api/offers", dataOffersRoute);
app.use("/api/get-locations", dataLocationsRoute);
app.use("/api/candidate/action", actionsCandidateRoute);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
