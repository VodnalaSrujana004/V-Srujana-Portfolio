import emailjs from "@emailjs/browser"

// EmailJS Configuration
// Make sure your EmailJS template includes these variables:
// {{from_name}}, {{from_email}}, {{subject}}, {{message}}, {{to_email}}

export const emailConfig = {
  serviceId: "service_0wbeleg",
  templateId: "template_31ti1s9", 
  publicKey: "J1cjDLIWmlBnKaq2c",
}

// Create template parameters for EmailJS
export const createTemplateParams = (name: string, email: string, subject: string, message: string) => {
  return {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_name: "Vodnala Srujana",
    to_email: "vodnalasrujana29@gmail.com", // Your email address
    reply_to: email, // This helps with replies
  }
}

// Validate EmailJS configuration
export const validateEmailJSConfig = () => {
  const { serviceId, templateId, publicKey } = emailConfig
  
  console.log("🔍 Validating EmailJS configuration...")
  console.log("Service ID:", serviceId ? "✅ Present" : "❌ Missing")
  console.log("Template ID:", templateId ? "✅ Present" : "❌ Missing") 
  console.log("Public Key:", publicKey ? "✅ Present" : "❌ Missing")
  
  if (!serviceId || !templateId || !publicKey) {
    console.error("❌ EmailJS configuration is incomplete")
    return false
  }
  
  if (serviceId.includes("your_") || templateId.includes("your_") || publicKey.includes("your_")) {
    console.error("❌ EmailJS configuration still contains placeholder values")
    return false
  }
  
  // Check if values look correct
  if (!serviceId.startsWith("service_")) {
    console.error("❌ Service ID should start with 'service_'")
    return false
  }
  
  if (!templateId.startsWith("template_")) {
    console.error("❌ Template ID should start with 'template_'")
    return false
  }
  
  console.log("✅ EmailJS configuration looks valid")
  return true
}

// Test EmailJS connectivity
export const testEmailJSConnection = async () => {
  try {
    const testParams = {
      from_name: "Test",
      from_email: "test@example.com", 
      subject: "Test",
      message: "Test message"
    }
    
    const { serviceId, templateId, publicKey } = emailConfig
    
    // This will help us see if the configuration is working
    console.log("🧪 Testing EmailJS connection...")
    console.log("Using service:", serviceId)
    console.log("Using template:", templateId)
    
    const response = await emailjs.send(serviceId, templateId, testParams, publicKey)
    console.log("✅ EmailJS test successful:", response)
    return response
    
  } catch (error) {
    console.error("❌ EmailJS test failed:", error)
    throw error
  }
}
