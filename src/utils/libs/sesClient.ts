import { SESClient } from "@aws-sdk/client-ses";

const REGION_AWS = "us-east-1";
const ACCESS_KEY_ID_AWS = "AKIAZQ3DPPDDFCXN3AOE";
const SECRET_KEY_AWS = "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";

const sesClient = new SESClient({
  region: REGION_AWS, // o tu región
  credentials: {
    accessKeyId: ACCESS_KEY_ID_AWS,
    secretAccessKey: SECRET_KEY_AWS,
  },
});

export { sesClient };
