const nodemailer = require("nodemailer");

// CloudMailin SMTP Configuration - Applied from your settings
const transporter = nodemailer.createTransporter({
  host: "smtp.cloudmta.net",
  port: 587, // Using port 587 as specified (alternative: 2525)
  secure: false, // false for STARTTLS
  auth: {
    user: "4d5f948c506dea73", // Your CloudMailin username
    pass: "7WWih6b8yEZsDuVN4THwMGfk", // Your CloudMailin API key/password
  },
  requireTLS: true, // Ensure TLS is required
  tls: {
    starttls: true,
    rejectUnauthorized: false, // Allow self-signed certificates if needed
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP configuration error:", error);
  } else {
    console.log("SMTP server is ready to take our messages");
  }
});

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const { to, from, subject, html, text } = req.body;

    // Validate required fields
    if (!to || !from || !subject || (!html && !text)) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact Form" <4d5f948c506dea73@smtp.cloudmta.net>`, // Use your CloudMailin address
      to: to,
      replyTo: from,
      subject: subject,
      html: html,
      text: text,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    res.status(200).json({
      success: true,
      messageId: info.messageId,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);

    res.status(500).json({
      success: false,
      error: "Failed to send email",
      details: error.message,
    });
  }
};
