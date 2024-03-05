"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_ses_1 = require("@aws-sdk/client-ses");
//CREDENCIALES
const createSendEmail = (destAdress, email_code) => {
    return new client_ses_1.SendEmailCommand({
        Destination: {
            ToAddresses: [destAdress],
        },
        Source: "sebascha.sistemas2003@gmail.com",
        Message: {
            Subject: {
                Data: "Test email",
            },
            Body: {
                Html: {
                    Data: `
          <html>
            <head>
            </head>
            <body>
              <h1>HOLA INGRESA EL SIGUIENTE CÓDIGO DE VERIFICACIÓN :D</h1>
              <p>Código</p>
              <p>Código: ${email_code}</p>
              <button>Verificar</button>
            </body>
          </html>
          `
                },
            },
        },
    });
};
exports.default = createSendEmail;
