import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./libs/sesClient";

//CREDENCIALES

const createSendEmail = (toAddress: string, fromAddress: string) => {
  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
    },
    Source: fromAddress,
    Message: {
      Subject: {
        Data: "Test email",
      },
      Body: {
        Text: {
          Data: "This is the message body.",
        },
      },
    },
  });
};

export const run = async () => {
  const SendEmailCommand = createSendEmail(
    "sebascha.sistemas2003@gmail.com",
    "sebascha.sistemas2003@gmail.com"
  );

  try {
    const data = await sesClient.send(SendEmailCommand);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
