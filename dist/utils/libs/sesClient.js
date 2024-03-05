"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sesClient = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const REGION_AWS = "us-east-1";
const ACCESS_KEY_ID_AWS = "AKIAZQ3DPPDDFCXN3AOE";
const SECRET_KEY_AWS = "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";
const sesClient = new client_ses_1.SESClient({
    region: REGION_AWS, // o tu región
    credentials: {
        accessKeyId: ACCESS_KEY_ID_AWS,
        secretAccessKey: SECRET_KEY_AWS,
    },
});
exports.sesClient = sesClient;
