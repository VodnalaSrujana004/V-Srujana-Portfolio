# EmailJS Setup Guide for Portfolio Contact Form

This guide will help you set up EmailJS to enable email functionality in your portfolio contact form.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
4. Follow the setup instructions for your chosen provider
5. Note down your **Service ID** (something like `service_xxxxxxx`)

### For Gmail:
- You'll need to enable 2-factor authentication
- Generate an App Password for EmailJS
- Use your Gmail address and the App Password

## Step 3: Create Email Template

1. Go to **Email Templates** in your EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: Portfolio Contact: {{subject}}

Hello Vodnala Srujana,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Save the template and note down your **Template ID** (something like `template_xxxxxxx`)

## Step 4: Get Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (something like `xxxxxxxxxxxxxxx`)

## Step 5: Install EmailJS (Choose ONE method)

### Method A: NPM Installation (Recommended)

```bash
npm install @emailjs/browser
```

Then uncomment these lines in `app/page.tsx`:
```typescript
// import emailjs from "@emailjs/browser" // Uncomment this line after installing EmailJS
// import { emailConfig, createTemplateParams } from "@/lib/emailjs" // Uncomment this line after installing EmailJS
```

### Method B: CDN Installation (Alternative)

The CDN is already set up in `app/layout.tsx`. Just replace `YOUR_PUBLIC_KEY` with your actual public key.

## Step 6: Update Configuration

### If using NPM:
1. Open `lib/emailjs.ts` in your project
2. Replace the placeholder values:

```typescript
export const emailConfig = {
  serviceId: "service_xxxxxxx", // Your Service ID
  templateId: "template_xxxxxxx", // Your Template ID  
  publicKey: "xxxxxxxxxxxxxxx", // Your Public Key
}
```

### If using CDN:
1. Open `app/layout.tsx`
2. Replace `YOUR_PUBLIC_KEY` with your actual public key
3. Open `app/page.tsx` and update the handleSubmit function:

```typescript
// Replace these values in the handleSubmit function:
const serviceId = "service_xxxxxxx" // Your Service ID
const templateId = "template_xxxxxxx" // Your Template ID
const publicKey = "xxxxxxxxxxxxxxx" // Your Public Key
```

## Step 7: Test the Contact Form

1. Start your development server: `npm run dev`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your email to see if you received the message

## Current Implementation Features

✅ **Form Validation**: Checks for required fields and valid email format  
✅ **EmailJS Integration**: Sends emails directly through EmailJS service  
✅ **Fallback Support**: Uses mailto links if EmailJS fails  
✅ **Loading States**: Shows loading indicator while sending  
✅ **Success/Error Messages**: Clear feedback to users  
✅ **Form Reset**: Automatically clears form after successful submission  
✅ **Responsive Design**: Works on all device sizes  

## Troubleshooting

### Common Issues:

1. **"Service ID not found"**: Check that your Service ID is correct
2. **"Template not found"**: Verify your Template ID
3. **"Invalid public key"**: Ensure your Public Key is correct
4. **Email not received**: 
   - Check spam folder
   - Verify email service configuration
   - Make sure the service is active in EmailJS dashboard
5. **NPM installation fails**: Use the CDN method instead

### Free Plan Limits:
- 200 emails per month
- EmailJS branding in emails
- Basic template features

### For Production:
Consider upgrading to a paid plan for:
- Higher email limits
- Remove EmailJS branding
- Advanced features
- Better support

## Security Notes

- Never commit your actual EmailJS credentials to public repositories
- Consider using environment variables for production
- The public key is safe to expose in client-side code
- Keep your private keys secure

## Testing Without EmailJS

The contact form will work immediately with the mailto fallback even before you set up EmailJS. This ensures users can always contact you.

## Next Steps

1. Set up your EmailJS account and get your credentials
2. Choose either NPM or CDN installation method
3. Update the configuration with your actual values
4. Test the form thoroughly
5. Consider upgrading to a paid plan for production use
