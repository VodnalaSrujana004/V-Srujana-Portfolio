# EmailJS Troubleshooting Guide

## Current Status
✅ EmailJS package installed  
✅ Configuration files created  
✅ Form integration completed  
⚠️ Debugging errors  

## Common Issues & Solutions

### 1. **Template Configuration Issues**
**Problem**: EmailJS template variables don't match
**Solution**: 
- Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin)
- Edit your template (template_31ti1s9)
- Make sure it contains these variables:
  ```
  From: {{from_name}} ({{from_email}})
  Subject: {{subject}}
  
  Message:
  {{message}}
  ```

### 2. **Domain/CORS Issues**
**Problem**: Domain not allowed
**Solution**:
- Go to EmailJS Dashboard → Account → Security
- Add these to allowed origins:
  - `http://localhost:3000`
  - `https://yourdomain.com` (your deployed domain)

### 3. **Service Configuration**
**Problem**: Gmail/Email service not properly set up
**Solution**:
- Verify your email service is active
- Check if 2FA is enabled (may need app password)

### 4. **API Key Issues**
**Problem**: Invalid public key
**Solution**:
- Go to EmailJS Dashboard → Account → General
- Copy the correct Public Key
- Update `lib/emailjs.ts`

## Testing Steps

1. **Open Browser Console** (F12)
2. **Fill out contact form**
3. **Submit form**
4. **Check console for detailed error messages**

### Expected Console Output (Success):
```
EmailJS Config: { serviceId: "service_p4wtuar", templateId: "template_31ti1s9", publicKey: "J1cjD..." }
Template Parameters: { from_name: "Test", from_email: "test@email.com", ... }
EmailJS Success: { status: 200, text: "OK" }
```

### Common Error Messages:
- **400 Bad Request**: Template variables mismatch
- **401 Unauthorized**: Wrong public key
- **404 Not Found**: Wrong service/template ID
- **412 Precondition Failed**: Missing template variables

## EmailJS Template Example

Create a template in EmailJS with this content:

**Subject**: New Portfolio Contact: {{subject}}

**Body**:
```
Hello Vodnala Srujana,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from Portfolio Contact Form
```

## Testing the Configuration

1. Open your portfolio website
2. Open browser console (F12)
3. Fill out the contact form with test data
4. Submit the form
5. Check console for detailed error messages
6. If EmailJS fails, the mailto fallback will activate

## Quick Fix Commands

If you need to reinstall or update EmailJS:

```bash
pnpm remove @emailjs/browser
pnpm add @emailjs/browser
```

## Support

If issues persist:
1. Check EmailJS dashboard for quota limits
2. Verify all IDs are correct
3. Test with a simple HTML page first
4. Contact EmailJS support if needed

The form will always work with the mailto fallback, so users can contact you regardless!
