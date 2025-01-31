const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const cors = require("cors");
app.use(cors());


// Order route
router.post("/", async (req, res) => {
  const { name, email, address, paymentOption, productId } = req.body;

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "bethaven.vanity@gmail.com", // Your email
      pass: "adiaundreka0131", // App-specific password
    },
  });

  try {
    // Email to admin
    await transporter.sendMail({
      from: '"Bethaven Orders" <bethaven.vanity@gmail.com>',
      to: "bethaven.vanity@gmail.com",
      subject: "New Order Received",
      text: `
        New order details:
        - Name: ${name}
        - Email: ${email}
        - Address: ${address}
        - Payment Option: ${paymentOption}
        - Product ID: ${productId}
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: '"Bethaven Orders" <bethaven.vanity@gmail.com>',
      to: email,
      subject: "Order Confirmation",
      text: `
        Thank you for your order, ${name}!
        
        Here are your order details:
        - Address: ${address}
        - Payment Option: ${paymentOption}
        - Product ID: ${productId}

        We’ll be in touch soon to finalize the order.
      `,
    });

    res.status(200).send("Order placed and emails sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to place order or send email.");
  }
});

module.exports = router;
