import nodemailer from 'nodemailer';
import debug from 'debug';
import { serverResponse } from "./serverResponse";
import 'dotenv/config';

const logger = debug(`pro-lite-password-message`);

const transporter = nodemailer.createTransport({
  service: process.env.service,
  auth: {
    user: process.env.user,
    pass: process.env.password
  }
});

const emailMessage = (firstName, newPassword) => `
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>New Password</title>
    <style type="text/css">
    body {
      padding: 0;
      margin: 0
    }

    .container {
      margin-top: 0;
      padding: 32px;
      color: #021C1E;
      border: 3em solid #e0e0e0
    }

    .message {
      padding: 32px
    }
    </style>
  </head>

  <body>
    <div class="container">
      <div>
        <p>Good day ${firstName},</p><br>
        <div class="message">
          <p>Your new password is <strong><em>${newPassword}</em></strong></p>
          <p>
            Kindly sign in with this advised password and change the password to a preferred password of your choice.
          </p>
          <br>
        </div>
        Thank you.
      </div>
  </div>
</body>
</html>
`;
const sendMail = async (res, firstName, newPassword, email) => {
  const mailOptions = {
    from: 'propertyprolite@gmail.com',
    to: email,
    subject: 'Password Reset - Property Pro Lite',
    html: emailMessage(firstName, newPassword)
  };
  await transporter.sendMail(mailOptions, (error, body) => {
    if (error) return logger(`Error is, ${error}`);
    if (body && !body.rejected.length) return serverResponse(res, 201, ...['status', 204, 'message', 'A new password has been sent to your email. Check your email and update your password']);
  });
};

export default sendMail;
