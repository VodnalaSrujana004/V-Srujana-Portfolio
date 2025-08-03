// Simple EmailJS Test Configuration
// Use this to test your EmailJS setup

import emailjs from "@emailjs/browser"

// Test function to check EmailJS configuration
export const testEmailJS = async () => {
  try {
    console.log("🧪 Testing EmailJS Configuration...")
    
    // Your current config
    const serviceId = "service_p4wtuar"
    const templateId = "template_31ti1s9"
    const publicKey = "J1cjDLIWmlBnKaq2c"
    
    console.log("Service ID:", serviceId)
    console.log("Template ID:", templateId)
    console.log("Public Key:", publicKey.substring(0, 8) + "...")
    
    // Simple test parameters
    const testParams = {
      from_name: "Test User",
      from_email: "test@example.com",
      subject: "Test Email",
      message: "This is a test message from your portfolio contact form."
    }
    
    console.log("Sending test email...")
    const response = await emailjs.send(serviceId, templateId, testParams, publicKey)
    
    console.log("✅ EmailJS Test Successful:", response)
    return { success: true, response }
    
  } catch (error: any) {
    console.error("❌ EmailJS Test Failed:", error)
    console.error("Error details:", {
      status: error.status,
      text: error.text,
      message: error.message
    })
    return { success: false, error }
  }
}

// Call this function in browser console to test: testEmailJS()
if (typeof window !== 'undefined') {
  (window as any).testEmailJS = testEmailJS
}
