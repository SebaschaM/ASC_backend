import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./database/db";

import seedRoute from "./routes/seedRoute";
import dataOffersRoute from "./routes/candidate/offers/dataOffersRoute";
import authUserRoute from "./routes/auth/authUserAuthRoute";
import dataLocationsRoute from "./routes/locations/dataLocationsRoute";
import accountActionsRoute from "./routes/candidate/account/accountActionsRoute";
import fileActionsRoute from "./routes/candidate/files/fileActionsRoute";
import dataPostulationsRoute from "./routes/candidate/postulations/dataPostulationsRoute";
import alertsOfferRoute from "./routes/candidate/alerts/alertsOfferRoute";
// import { main } from "../src/utils/libs/secretsClient";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

// Middleware para habilitar CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

//uploadFileToGCloud(path.join(__dirname, "secrets/gcloud-storage.json"));

dbConnect();
// main("projects/ascprueba/secrets/storage-services-gcp/versions/latest");

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
app.use("/api/account", accountActionsRoute);
app.use("/api/postulations", dataPostulationsRoute);
app.use("/api/alerts", alertsOfferRoute);
app.use("/api/files", fileActionsRoute);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
