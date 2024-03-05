"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./database/db"));
const seedRoute_1 = __importDefault(require("./routes/seedRoute"));
const dataOffersRoute_1 = __importDefault(require("./routes/candidate/offers/dataOffersRoute"));
const authUserAuthRoute_1 = __importDefault(require("./routes/auth/authUserAuthRoute"));
const dataLocationsRoute_1 = __importDefault(require("./routes/locations/dataLocationsRoute"));
const accountActionsController_1 = __importDefault(require("./routes/candidate/account/accountActionsController"));
const fileActionsRoute_1 = __importDefault(require("./routes/candidate/files/fileActionsRoute"));
const dataPostulationsRoute_1 = __importDefault(require("./routes/candidate/postulations/dataPostulationsRoute"));
const alertsOfferRoute_1 = __importDefault(require("./routes/candidate/alerts/alertsOfferRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
dotenv_1.default.config();
// Middleware para habilitar CORS
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
dotenv_1.default.config();
//uploadFileToGCloud(path.join(__dirname, "secrets/gcloud-storage.json"));
(0, db_1.default)();
app.use((req, res, next) => {
    const now = new Date();
    const datetime = now.toISOString();
    let log = `[${datetime}] ${res.statusCode || "-"} ${req.method} ${req.path}`;
    console.log(log);
    next();
});
app.use("/api/seed", seedRoute_1.default);
app.use("/api/auth", authUserAuthRoute_1.default);
app.use("/api/offers", dataOffersRoute_1.default);
app.use("/api/get-locations", dataLocationsRoute_1.default);
app.use("/api/account", accountActionsController_1.default);
app.use("/api/postulations", dataPostulationsRoute_1.default);
app.use("/api/alerts", alertsOfferRoute_1.default);
app.use("/api/files", fileActionsRoute_1.default);
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
