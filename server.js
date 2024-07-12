const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Configure Nodemailer transporter 
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email sending function (same as before)
async function sendEmail(receiverEmail, subject, messageBody) {
  // ... (Your email sending logic using transporter.sendMail)
}

// Route to handle email sending requests
app.post('/send-email', (req, res) => {
  const { receiverEmail, subject, messageBody } = req.body;

  sendEmail(receiverEmail, subject, messageBody)
    .then(() => {
      res.status(200).send({ message: 'Email sent successfully!' }); 
    })
    .catch(error => {
      console.error("Error sending email:", error);
      res.status(500).send({ message: 'Error sending email.' }); 
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});