# 📧 Email Setup Guide for Contact Form

Your contact form is now ready to send **real emails**! However, you need to configure one of the email services. Here are your options:

## 🚀 Option 1: EmailJS (Recommended - Free & Easy)

EmailJS allows you to send emails directly from your frontend without a backend server.

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. You get **200 emails/month** for free

### Step 2: Set Up Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy your Service ID**

### Step 3: Create Email Template

1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```html
Subject: New Contact Form Message: {{subject}} From: {{from_name}}
({{from_email}}) Subject: {{subject}} Message: {{message}} --- This message was
sent from your portfolio contact form. Reply to: {{reply_to}}
```

4. **Copy your Template ID**

### Step 4: Get Public Key

1. Go to **Account** → **General**
2. **Copy your Public Key**

### Step 5: Update Your Code

Open `src/services/emailService.js` and replace:

```javascript
const EMAILJS_SERVICE_ID = "your_service_id"; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = "your_template_id"; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = "your_public_key"; // Replace with your Public Key
```

### ✅ Test Your Setup

1. Save the file
2. Restart your development server: `npm start`
3. Fill out your contact form
4. Check your email inbox!

---

## 🔄 Option 2: Formspree (Alternative)

Formspree is another easy option that works well.

### Step 1: Create Formspree Account

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for a free account
3. You get **50 submissions/month** for free

### Step 2: Create New Form

1. Click **New Form**
2. Enter your email address
3. **Copy your Form ID** (looks like `xpzgkqyw`)

### Step 3: Update Your Code

In `src/services/emailService.js`, replace:

```javascript
const response = await fetch('https://formspree.io/f/your_form_id', {
```

With your actual form ID:

```javascript
const response = await fetch('https://formspree.io/f/xpzgkqyw', {
```

### Step 4: Update Contact Component

In `src/components/pages/Contact/Contact.jsx`, change the handleSubmit function to use Formspree:

```javascript
// Replace the EmailJS call with:
const result = await sendEmailViaFormspree(formData);
```

---

## 🌐 Option 3: Netlify Forms (If hosting on Netlify)

If you're deploying to Netlify, you can use their built-in forms.

### Step 1: Add Form Attributes

In your Contact component, add these attributes to the `<form>` tag:

```jsx
<form onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  {/* rest of your form */}
</form>
```

### Step 2: Update handleSubmit

Use the `sendEmailViaNetlify` function instead.

---

## 🔧 Current Setup Status

Your contact form currently has:

- ✅ **EmailJS integration** (needs configuration)
- ✅ **Formspree fallback** (needs configuration)
- ✅ **Netlify Forms support** (if hosting on Netlify)
- ✅ **Form validation**
- ✅ **Loading states**
- ✅ **Error handling**
- ✅ **Success notifications**

## 🚨 Important Notes

1. **Environment Variables**: For production, store your API keys in environment variables:

   ```javascript
   const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
   const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
   const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
   ```

2. **Rate Limiting**: Both EmailJS and Formspree have rate limits on free plans
3. **Spam Protection**: Consider adding reCAPTCHA for production use
4. **Email Validation**: The form already validates email format

## 🎯 Quick Start (EmailJS)

1. **Sign up**: [EmailJS.com](https://www.emailjs.com/)
2. **Get IDs**: Service ID, Template ID, Public Key
3. **Update**: `src/services/emailService.js` with your IDs
4. **Test**: Fill out your contact form
5. **Done**: You'll receive real emails! 📧

## 💡 Pro Tips

- **Test thoroughly** before going live
- **Set up email filters** to organize contact form emails
- **Create an auto-reply** template to acknowledge receipt
- **Monitor your usage** to avoid hitting limits

---

**Need help?** Check the console for error messages or contact me directly at neoldums@gmail.com
