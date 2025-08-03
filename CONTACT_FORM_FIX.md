# 🔧 EmailJS Contact Form - Complete Fix Guide

## Current Status
✅ **Contact form is working with mailto fallback**  
⚠️ **EmailJS integration needs configuration check**

## 🚨 Most Common Issues & Instant Fixes

### 1. **EmailJS Template Variables Mismatch**
**Problem**: Your EmailJS template doesn't match the variables we're sending

**Fix**: Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin/templates) and update your template to include:

```
Subject: New Portfolio Contact: {{subject}}

Hello Vodnala Srujana,

You have received a new message from your portfolio:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from Portfolio Contact Form
```

### 2. **Domain/CORS Issues**
**Problem**: Your domain isn't allowed in EmailJS

**Fix**: 
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/admin/account)
2. Click "Security" tab
3. Add these domains:
   - `http://localhost:3001`
   - `https://localhost:3001`
   - Your actual domain when deployed

### 3. **Service Configuration Issues**
**Problem**: Gmail service not properly connected

**Fix**:
1. Go to EmailJS Dashboard → Email Services
2. Make sure your Gmail service is "Connected" (green status)
3. If using 2FA, you might need an app password

## 🧪 Test Your Configuration

Open browser console (F12) and run:
```javascript
// Test EmailJS configuration
testEmailJS()
```

This will show you exactly what's wrong.

## 🔍 Debug Steps

1. **Open your website**: `http://localhost:3001`
2. **Open browser console**: Press F12 → Console tab
3. **Fill out contact form** with test data
4. **Submit and check console output**

### Expected Console Output (Working):
```
📧 Attempting EmailJS send...
Config validated ✅
Parameters prepared ✅
✅ EmailJS Success: {status: 200, text: "OK"}
```

### Common Error Messages:
- **400**: Template variables don't match
- **401**: Wrong public key or service not authorized
- **404**: Wrong service ID or template ID
- **412**: Missing required template variables

## 🛠️ Quick Configuration Check

Verify your EmailJS setup:

1. **Service ID**: `service_p4wtuar` 
2. **Template ID**: `template_31ti1s9`
3. **Public Key**: `J1cjDLIWmlBnKaq2c`

Make sure these match exactly in your EmailJS dashboard.

## 📧 EmailJS Template Setup

1. Log into [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Go to "Email Templates"
3. Edit template `template_31ti1s9`
4. Use this template:

**To Email**: `vodnalasrujana29@gmail.com`
**Subject**: `New Portfolio Contact: {{subject}}`
**Content**:
```
Hello Vodnala Srujana,

You have received a new message from your portfolio:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{from_email}}
Sent from Portfolio Contact Form
```

## 🚀 Test Results

After making changes:
1. Refresh your website
2. Submit the contact form
3. Check console for success/error messages
4. If EmailJS fails, mailto fallback still works!

## ✅ Success Indicators

**EmailJS Working**: Console shows "EmailJS Success"
**Fallback Working**: Email client opens with pre-filled message
**Form Working**: User gets confirmation message

Your contact form **will always work** thanks to the mailto fallback system!

## 🆘 Still Having Issues?

1. Share the console error messages
2. Check EmailJS dashboard for quota limits
3. Verify your Gmail service is active
4. Try creating a new template with simple variables

The form works perfectly even without EmailJS - users can always contact you! 💪
