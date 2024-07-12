const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(receiverEmail, emailContent) {
  try {
    const info = await transporter.sendMail(emailContent);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

app.post('/send-email', (req, res) => {
  const { fullName, receiverEmail, phoneNumber, subject, message } = req.body;

  const emailContent = {
    subject: subject,
    text: `
Dear [Recipient's Name],

Thank you for reaching out to us.

Your name: ${fullName}
Your phone number: ${phoneNumber}

We have received your request and our representative will be in touch with you shortly to assist you further. Your inquiry is important to us, and we are committed to providing you with the best possible service.

If you have any additional information or questions in the meantime, please feel free to reply to this email.

Thank you for your patience and understanding.

Best regards,

[Your Name]
[Your Position]
[Your Company]
[Contact Information]
`,
  };

  sendEmail(receiverEmail, emailContent)
    .then(() => {
      res.status(200).send({ message: 'Email sent successfully!' });
    })
    .catch(error => {
      console.error("Error sending email:", error);
      res.status(500).send({ message: 'Error sending email.' });
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
