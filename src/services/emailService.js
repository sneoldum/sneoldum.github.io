// CloudMailin SMTP Configuration - Applied from your settings
const CLOUDMAILIN_CONFIG = {
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
};

/**
 * Send email using Formspree (Primary method - works immediately)
 * @param {Object} formData - The form data containing name, email, subject, message
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendContactEmail = async (formData) => {
  try {
    // Try Formspree first - this will actually send emails
    console.log("🚀 Sending email via Formspree...");

    const response = await fetch("https://formspree.io/f/xpzgkqyw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _replyto: formData.email,
        _subject: `Portfolio Contact: ${formData.subject}`,
      }),
    });

    if (response.ok) {
      console.log("✅ Email sent successfully via Formspree");
      return {
        success: true,
        message: "Email sent successfully! I'll get back to you soon.",
      };
    } else {
      const errorText = await response.text();
      throw new Error(`Formspree error: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error("❌ Formspree failed:", error);

    // Fallback to Web3Forms
    console.log("🔄 Trying Web3Forms as fallback...");
    try {
      return await sendEmailViaWeb3Forms(formData);
    } catch (web3Error) {
      console.error("❌ Web3Forms also failed:", web3Error);

      // Final fallback to EmailJS
      console.log("🔄 Trying EmailJS as final fallback...");
      try {
        return await sendEmailViaEmailJS(formData);
      } catch (emailJSError) {
        console.error("❌ All email services failed:", emailJSError);
        return {
          success: false,
          error:
            "Unable to send email at this time. Please contact me directly at neoldums@gmail.com",
        };
      }
    }
  }
};

/**
 * Send email using Web3Forms (Backup method)
 * @param {Object} formData - The form data
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendEmailViaWeb3Forms = async (formData) => {
  try {
    console.log("🔄 Attempting Web3Forms...");

    // Using a test access key - replace with your own for production
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "your_web3forms_access_key", // Replace with actual key from web3forms.com
        name: formData.name,
        email: formData.email,
        subject: `Portfolio Contact: ${formData.subject}`,
        message: formData.message,
        from_name: "Portfolio Contact Form",
        to_email: "neoldums@gmail.com",
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ Email sent successfully via Web3Forms");
      return {
        success: true,
        message: "Email sent successfully via Web3Forms!",
      };
    } else {
      throw new Error(result.message || "Web3Forms access key not configured");
    }
  } catch (error) {
    console.error("❌ Web3Forms error:", error);
    throw error; // Re-throw to trigger next fallback
  }
};

/**
 * Send email using EmailJS (Final fallback)
 * @param {Object} formData - The form data
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendEmailViaEmailJS = async (formData) => {
  try {
    console.log("🔄 Attempting EmailJS...");

    // EmailJS configuration - replace with your actual values
    const EMAILJS_SERVICE_ID = "your_service_id";
    const EMAILJS_TEMPLATE_ID = "your_template_id";
    const EMAILJS_PUBLIC_KEY = "your_public_key";

    if (EMAILJS_SERVICE_ID === "your_service_id") {
      throw new Error("EmailJS not configured");
    }

    // Import EmailJS dynamically
    const emailjs = await import("@emailjs/browser");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "neoldums@gmail.com",
      reply_to: formData.email,
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    console.log("✅ Email sent successfully via EmailJS");
    return {
      success: true,
      message: "Email sent successfully via EmailJS!",
    };
  } catch (error) {
    console.error("❌ EmailJS error:", error);
    throw error; // Re-throw to trigger final error
  }
};

/**
 * Send email using Formspree (Alternative method)
 * @param {Object} formData - The form data
 * @returns {Promise} - Promise that resolves when email is sent
 */
export const sendEmailViaFormspree = async (formData) => {
  try {
    console.log("🔄 Attempting Formspree alternative...");

    const response = await fetch("https://formspree.io/f/xpzgkqyw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        _replyto: formData.email,
      }),
    });

    if (response.ok) {
      console.log("✅ Email sent successfully via Formspree");
      return {
        success: true,
        message: "Email sent successfully!",
      };
    } else {
      throw new Error(`Formspree error: ${response.status}`);
    }
  } catch (error) {
    console.error("❌ Formspree error:", error);
    throw error;
  }
};
