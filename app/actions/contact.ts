"use server"

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "All fields are required.",
    }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    }
  }

  try {
    // Create mailto link for email client
    const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject}`)
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Portfolio Contact Form`,
    )
    const mailtoLink = `mailto:vodnalasrujana29@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      message: "Opening your email client...",
      mailtoLink: mailtoLink,
    }
  } catch (error) {
    console.error("Error processing form:", error)
    return {
      success: false,
      message: "Failed to process form. Please try again.",
    }
  }
}
