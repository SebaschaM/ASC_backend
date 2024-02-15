import { SESClient } from "@aws-sdk/client-ses";

const REGION = "us-east-1"; // e.g. "us-west-2"
const ACCESS_KEY_ID = "AKIAZQ3DPPDDFCXN3AOE";
const SECRET_KEY = "0vRQaoEPVH0CTt+4lqYFrZKc6GorTTQgMiWwGkIP";

const sesClient = new SESClient({
  region: REGION, // o tu región
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_KEY,
  },
});

export { sesClient };
