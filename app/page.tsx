"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
// import emailjs from "@emailjs/browser"
// import { emailConfig, createTemplateParams } from "@/lib/emailjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code,
  Shield,
  Brain,
  Globe,
  Star,
  Trophy,
  Target,
  Rocket,
  Zap,
  Bot,
  Users,
  Mic,
  PenTool,
  Database,
  Award,
  BookOpen,
  TrendingUp,
  Heart,
  Download,
  Palette,
  Megaphone,
  GitBranch,
  MessageSquare,
  Settings,
  XCircle,
  Sparkles,
} from "lucide-react"

// Particle system component
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
    }> = []

    const mouse = { x: 0, y: 0 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      const numParticles = window.innerWidth < 768 ? 30 : 50
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          particle.vx += dx * 0.00001
          particle.vy += dy * 0.00001
        }

        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`
        ctx.fill()

        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 100) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - distance / 100)})`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        })
      })

      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    resize()
    init()
    animate()

    window.addEventListener("resize", () => {
      resize()
      particles.length = 0
      init()
    })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: "linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 50%, #0f1727 100%)" }}
    />
  )
}

// Starfield background
const Starfield = () => {
  useEffect(() => {
    const starfield = document.querySelector(".starfield")
    if (!starfield) return

    const numStars = window.innerWidth < 768 ? 100 : 200
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div")
      star.className = "star"
      star.style.cssText = `
      position: absolute;
      background: white;
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation: twinkle 3s infinite;
      animation-delay: ${Math.random() * 3}s;
    `
      starfield.appendChild(star)
    }
  }, [])

  return <div className="starfield fixed top-0 left-0 w-full h-full z-[-2]" />
}

// Navigation component
// Lines 200-300 - Replace the Navigation component:

const Navigation = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.body.offsetHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
    }

    const updateActiveSection = () => {
      const sections = [
        "hero",
        "about",
        "services",
        "experience",
        "projects",
        "skills",
        "coding",
        "activities",
        "contact",
      ]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    const handleScroll = () => {
      updateScrollProgress()
      updateActiveSection()
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const navItems = [
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "coding", label: "Coding" },
    { id: "activities", label: "Activities" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <>
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-green-600 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
      <nav className="fixed top-0 w-full p-3 lg:px-8 bg-slate-900/90 backdrop-blur-md border-b border-green-400/30 z-40" suppressHydrationWarning>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-xl lg:text-2xl font-bold text-green-400 hover:text-green-300 transition-colors"
            suppressHydrationWarning
          >
            Vodnala Srujana
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-4 xl:space-x-6" suppressHydrationWarning>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`transition-colors relative text-base group ${
                  activeSection === item.id ? "text-green-400" : "text-slate-300 hover:text-green-400"
                }`}
                suppressHydrationWarning
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden text-green-400 p-2"
            suppressHydrationWarning
          >
            <div className="w-5 h-5 flex flex-col justify-center space-y-1">
              <span
                className={`block h-0.5 w-5 bg-current transition-all ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              />
              <span className={`block h-0.5 w-5 bg-current transition-all ${isMenuOpen ? "opacity-0" : ""}`} />
              <span
                className={`block h-0.5 w-5 bg-current transition-all ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-green-400/30" suppressHydrationWarning>
            <div className="flex flex-col space-y-3 p-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition-colors text-left py-2 text-base ${
                    activeSection === item.id ? "text-green-400" : "text-slate-300 hover:text-green-400"
                  }`}
                  suppressHydrationWarning
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default function Portfolio() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "success" | "error"
    message: string
    mailtoLink?: string
  }>({ type: "idle", message: "" })

// Lines 320-450 - Replace the entire handleSubmit function with this corrected version:

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  setSubmitStatus({ type: "idle", message: "" })

  const formData = new FormData(e.target as HTMLFormElement)
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validate required fields
  if (!name || !email || !subject || !message) {
    setSubmitStatus({ type: "error", message: "All fields are required." })
    setIsSubmitting(false)
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    setSubmitStatus({ type: "error", message: "Please enter a valid email address." })
    setIsSubmitting(false)
    return
  }

  try {
    // Create a hidden iframe method (more reliable)
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.name = 'hidden_iframe'
    document.body.appendChild(iframe)

    // Create form element
    const hiddenForm = document.createElement('form')
    hiddenForm.action = 'https://docs.google.com/forms/d/e/1FAIpQLScsIvZ97dcA0bPm4Vzyg2XqNJvvLmaXN07IuhTeQsBFuWqAGg/formResponse'
    hiddenForm.method = 'POST'
    hiddenForm.target = 'hidden_iframe'
    hiddenForm.style.display = 'none'

    // Add form fields
    const fields = [
      { name: 'entry.1213772854', value: name },
      { name: 'entry.1143307033', value: email },
      { name: 'entry.711893794', value: subject },
      { name: 'entry.967445832', value: message }
    ]

    fields.forEach(field => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = field.name
      input.value = field.value
      hiddenForm.appendChild(input)
    })

    document.body.appendChild(hiddenForm)
    
    console.log("📊 Submitting to Google Forms via hidden iframe...")
    hiddenForm.submit()

    // Clean up after 2 seconds
    setTimeout(() => {
      document.body.removeChild(hiddenForm)
      document.body.removeChild(iframe)
    }, 2000)

    setSubmitStatus({
      type: "success",
      message: "🎉 Thank you! Your message has been submitted successfully. I'll get back to you soon!"
    })

    // Reset form
    const formElement = e.target as HTMLFormElement
    formElement.reset()

  } catch (error) {
    console.error("❌ Error submitting form:", error)
    
    // Fallback: Create mailto link
    const mailtoSubject = encodeURIComponent(`Portfolio Contact: ${subject}`)
    const mailtoBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Portfolio Contact Form`
    )
    const mailtoLink = `mailto:vodnalasrujana29@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`

    setSubmitStatus({
      type: "success",
      message: "🚀 Opening your email client to send your message. Thank you for reaching out!",
      mailtoLink: mailtoLink,
    })

    // Reset form
    const formElement = e.target as HTMLFormElement
    formElement.reset()

    // Open email client
    setTimeout(() => {
      window.open(mailtoLink, "_self")
    }, 1500)
  } finally {
    setIsSubmitting(false)
    setTimeout(() => setSubmitStatus({ type: "idle", message: "" }), 8000)
  }
} 

  const handleResumeDownload = () => {
    // First try to download the actual resume file
    const resumePath = "/Vodnala_Srujana_Resume.pdf"
    
    // Check if file exists
    fetch(resumePath, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // File exists, download it
          const link = document.createElement("a")
          link.href = resumePath
          link.download = "Vodnala_Srujana_Resume.pdf"
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        } else {
          throw new Error("File not found")
        }
      })
      .catch(() => {
        // File doesn't exist, show options to user
        const userChoice = confirm(
          "Resume PDF is being updated. Would you like to:\n\n" +
          "✅ OK - View my LinkedIn profile\n" +
          "❌ Cancel - View resume template in browser"
        )
        
        if (userChoice) {
          // Open LinkedIn profile
          window.open("https://linkedin.com/in/vodnala-srujana", "_blank")
        } else {
          // Open resume template
          window.open("/resume-template.html", "_blank")
        }
      })
  }

  const skills = {
    "Programming Languages": [
      { name: "Python", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "Java", level: 85 },
      { name: "SQL", level: 88 },
      { name: "HTML/CSS", level: 95 },
    ],
    "AI & Machine Learning": [
      { name: "NLP", level: 92 },
      { name: "Machine Learning", level: 90 },
      { name: "Deep Learning", level: 85 },
      { name: "Data Analysis", level: 88 },
      { name: "Computer Vision", level: 83 },
    ],
    "Web Development": [
      { name: "React.js", level: 88 },
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 82 },
      { name: "MongoDB", level: 82 },
      { name: "REST APIs", level: 87 },
    ],
    Cybersecurity: [
      { name: "Digital Forensics", level: 85 },
      { name: "SOC Analysis", level: 80 },
      { name: "Threat Detection", level: 83 },
      { name: "Incident Response", level: 78 },
      { name: "Malware Analysis", level: 75 },
    ],
  }

  const services = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Full-Stack Web Development",
      description:
        "Custom web applications built with modern frameworks like React, Node.js, and MongoDB with responsive design and optimal performance.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI & Machine Learning Solutions",
      description:
        "Intelligent systems using NLP, computer vision, and deep learning to solve complex business problems and automate processes.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Cybersecurity Services",
      description:
        "Comprehensive security solutions including threat detection, digital forensics, SOC analysis, and incident response.",
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Content Writing & Design Creation",
      description:
        "Creating engaging technical content, blog articles, documentation, and visual designs for digital marketing and brand presence across various platforms.",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Analysis & Visualization",
      description:
        "Transform raw data into actionable insights using advanced analytics, machine learning, and interactive visualizations.",
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "AI Agents & Automation Building",
      description:
        "Developing intelligent AI agents, chatbots, and automation systems using modern frameworks to streamline business processes and enhance user experiences.",
    },
  ]

  const projects = [
    {
  title: "HealthBridge – AI Chatbot for Mothers & Children",
  description:
    "AI-powered Streamlit chatbot that provides maternal and child health guidance, symptom checking, mental health support, vaccination education, and multilingual assistance with Google Gemini integration.",
  tech: ["Python", "Streamlit", "HuggingFace Transformers", "Google Gemini API", "Firebase", "SQLite"],
  icon: <Heart className="w-6 h-6" />,
  link: "https://healthbridge-ai.streamlit.app/",
  category: "AI & Healthcare"
  },
  {
  title: "Blockchain-Based Decentralized Social Network",
  description:
    "A blockchain-powered online social platform with tamper-proof tweets and comments, off-chain IPFS storage, DAO-based governance, and hash-linked content structures to ensure transparency, decentralization, and data integrity.",
  tech: ["Blockchain", "IPFS", "Python", "Smart Contracts", "DAO", "Decentralized Architecture"],
  icon: <Shield className="w-6 h-6" />,
  link: "https://github.com/VodnalaSrujana004/Blockchain-Based-Autonomous-Online-Social-Network",
  category: "Blockchain & Web3"
},
{
  title: "Shoe World E-commerce Platform",
  description:
    "Full-stack e-commerce website built during 20-day bootcamp using MERN stack with complete shopping functionality, user authentication, payment integration, and admin dashboard.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Stripe"],
      icon: <Globe className="w-6 h-6" />,
      link: "https://github.com/VodnalaSrujana004/Shoe-World",
      category: "Web Development",
    },
    {
      title: "Spam Mail Detection System",
      description:
        "Advanced NLP-powered spam detection system using machine learning techniques with 95% accuracy across diverse email datasets and real-time classification capabilities.",
      tech: ["Python", "NLP", "Scikit-learn", "Pandas", "NLTK", "TensorFlow"],
      icon: <Shield className="w-6 h-6" />,
      link: "https://github.com/VodnalaSrujana004/Spam_detect_nlp",
      category: "AI/ML",
    },
    {
      title: "Text Summarization Model",
      description:
        "Advanced NLP model for abstractive and extractive text summarization using T5 and Hugging Face Transformers with high coherence and readability scores.",
      tech: ["Python", "NLP", "T5 Model", "Transformers", "SpaCy", "BERT"],
      icon: <Brain className="w-6 h-6" />,
      link: "https://github.com/VodnalaSrujana004/Text_summarization_project-Group3",
      category: "AI/ML",
    },
    {
      title: "Phishing Domain Detection",
      description:
        "Cybersecurity solution using ML techniques to identify and prevent phishing attacks with real-time threat analysis and 89% detection accuracy using ensemble methods.",
      tech: ["Python", "Machine Learning", "Cybersecurity", "Data Analysis", "Scikit-learn"],
      icon: <Shield className="w-6 h-6" />,
      link: "https://github.com/VodnalaSrujana004/phishing-website-detection-content-based",
      category: "Cybersecurity",
    },
    
  ]

  const experiences = [
    {
  title: "AI Agent Intern",
  company: "IBM SkillsBuild – CSRBOX",
  duration: "Jun 2025 – Jul 2025",
  description:
    "Developed an AI-powered healthcare chatbot called HealthBridge to support maternal and child health using Streamlit, NLP models, and Google Gemini API. Focused on real-time guidance, multilingual support, and emotion-aware responses.",
  icon: <Bot className="w-5 h-5" />,
  achievements: [
    "Designed HealthBridge – an AI chatbot aligned with SDG 3: Good Health and Well-being",
    "Integrated Google Gemini Pro API for natural language understanding",
    "Built modules for symptom checking, vaccination reminders, and mental health detection",
    "Implemented multilingual support and SQLite for offline compatibility using Streamlit"
  ]
},

    {
      title: "Artificial Intelligence Intern",
      company: "TechSaksham (Microsoft, SAP, Edunet Foundation)",
      duration: "Oct 2024 - Dec 2024",
      description:
        "Developed spam mail detection system using advanced NLP and ML techniques. Applied sophisticated text preprocessing, tokenization, and vectorization to enhance model accuracy in detecting malicious emails.",
      icon: <Brain className="w-5 h-5" />,
      achievements: [
        "Built spam detection model with 95% accuracy using ensemble methods",
        "Implemented advanced NLP preprocessing with NLTK and SpaCy",
        "Trained multiple classifiers (SVM, Random Forest, Naive Bayes) for optimal performance",
        "Deployed model with Flask API for real-time email classification",
      ],
    },
    {
      title: "Artificial Intelligence Intern",
      company: "Infosys Springboard",
      duration: "May 2024 - Jul 2024",
      description:
        "Built comprehensive text summarization model using cutting-edge NLP techniques. Implemented both abstractive and extractive summarization approaches using T5 model and Hugging Face Transformers.",
      icon: <Bot className="w-5 h-5" />,
      achievements: [
        "Developed high-quality text summarization model with T5 architecture",
        "Achieved excellent ROUGE scores and readability metrics",
        "Processed Daily Mail dataset with 300K+ articles efficiently",
        "Implemented both extractive and abstractive summarization techniques",
      ],
    },
    {
      title: "Machine Learning Intern",
      company: "iNeuron Intelligence Pvt Ltd",
      duration: "Aug 2024 - Oct 2024",
      description:
        "Developed sophisticated phishing domain detection system using machine learning. Gained expertise in cybersecurity domain with end-to-end data analysis, feature engineering, and model evaluation.",
      icon: <Shield className="w-5 h-5" />,
      achievements: [
        "Built ML-based phishing detection system with 89% accuracy",
        "Implemented feature engineering for URL analysis and domain characteristics",
        "Used ensemble methods combining multiple algorithms for robust detection",
        "Delivered comprehensive project documentation and presentation",
      ],
    },
    {
      title: "Security Operations Center Analyst Intern",
      company: "CFSS Cyber & Forensics Security Solutions",
      duration: "2 Months",
      description:
        "Top 50 intern recognition. Participated in advanced CTF challenges, analyzed malware and ransomware samples, performed threat detection simulations, and gained hands-on SOC operations experience.",
      icon: <Shield className="w-5 h-5" />,
      achievements: [
        "Ranked in Top 50 interns among 500+ participants",
        "Completed 15+ CTF challenges in various cybersecurity domains",
        "Analyzed real-world malware samples and security incidents",
        "Mastered SIEM tools and threat hunting techniques",
      ],
    },
    {
      title: "Cybersecurity & Digital Forensics Intern",
      company: "Cyber Secured India",
      duration: "3 Months",
      description:
        "Gained comprehensive hands-on experience in cybersecurity and digital forensics through practical labs, interactive assessments, and real-world scenario analysis with industry-standard tools.",
      icon: <Shield className="w-5 h-5" />,
      achievements: [
        "Completed comprehensive forensics training with Autopsy and FTK",
        "Mastered incident response procedures and digital evidence handling",
        "Enhanced threat detection skills using advanced security tools",
        "Conducted vulnerability assessments and penetration testing exercises",
      ],
    },
  ]

  const achievements = [
    {
      title: "NASA Space Apps Hackathon",
      description: "International Hackathon Participant - Space Technology Solutions",
      
      icon: <Rocket className="w-4 h-4" />,
    },
    {
      title: "Smart India Hackathon",
      description: "Shortlisted Twice at College Level - Innovation in Technology",
      
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      title: "Mercer | Mettl National Hackathon",
      description: "27th Position among Top 50 Teams - Technical Excellence",
      
      icon: <Award className="w-4 h-4" />,
    },
    {
      title: "Let's Upgrade Campus Ambassador",
      description: "Silver Place Achievement - Community Leadership",
      
      icon: <Star className="w-4 h-4" />,
    },

    {
      title: "Campus Ambassador - BISWAL Infotech Solutions",
      description: "Best Campus Ambassador Recognition - Outstanding Outreach & Engagement",
     
      icon: <Shield className="w-4 h-4" />,
    },
  ]

  const certificates = [
    { name: "Google AI Essentials", provider: "Google", category: "AI/ML" },
    { name: "Google Cybersecurity Professional Certificate", provider: "Google", category: "Security" },
    { name: "IBM Cybersecurity Fundamentals", provider: "IBM", category: "Security" },
    { name: "Accenture Data Analysis and Visualization", provider: "Accenture", category: "Data Science" },
    { name: "HackerRank Software Engineer Certificate", provider: "HackerRank", category: "Programming" },
    { name: "Machine Learning", provider: "Deeplearning.ai", category: "AI/ML" },
    { name: "Red Team Fundamentals and CTFs", provider: "NPTEL", category: "Cybersecurity" },
    { name: "Dark Web, Anonymity, and Cryptocurrency ", provider: "EC-council", category: "Security" },
    { name: "Azure Fundamentals", provider: "Microsoft", category: "Cloud" },
    { name: "Kshitij’24 - Web Development", provider: "IIT Kharagpur", category: "Web Development" },
    { name: "AI Agent Creation using Agentforce", provider: "GeeksforGeeks & Salesforce", category: "Artificial Intelligence" },
    { name: "Sustainability Hackathon’24", provider: "Indian Oil Corporation Ltd.", category: "Sustainability" },
    { name: "TATA Imagination Challenge’24", provider: "TATA", category: "Innovation" },
    { name: "Fueling the Nation’s Dreams - APOGEE’24", provider: "HPCL & BITS Pilani", category: "Energy & Innovation" },
    { name: "Turing Cup’24", provider: "VNR VJIET", category: "Hackathon" },
    { name: "Imagine Hackathon", provider: "PanIIT Alumni India", category: "Innovation" },
    { name: "UI/UX Hackathon", provider: "NIT Patna", category: "UI/UX Design" },
    { name: "SAWIT AI Learnathon", provider: "GUVI, HCL, AICTE, NASSCOM, FutureSkills Prime", category: "AI & Upskilling" },
  ]

  const codingStats = [
    { label: "GitHub Repositories", value: "53", icon: <Github className="w-5 h-5" /> },
    { label: "LeetCode Problems", value: "200+", icon: <Code className="w-5 h-5" /> },
    { label: "HackerRank Stars", value: "5★", icon: <Star className="w-5 h-5" /> },
    { label: "Projects Completed", value: "20+", icon: <Trophy className="w-5 h-5" /> },
  ]

  const codingProfiles = [
    {
      name: "GitHub",
      url: "https://github.com/VodnalaSrujana004",
      icon: <Github className="w-4 h-4" />,
      description: "53 repositories, 500+ commits",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/u/vodnalasrujana29/",
      icon: <Code className="w-4 h-4" />,
      description: "200+ problems solved",
    },
    {
      name: "HackerRank",
      url: "https://www.hackerrank.com/profile/vodnalasrujana29",
      icon: <Trophy className="w-4 h-4" />,
      description: "5-star rating in multiple domains",
    },
    {
      name: "GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/user/vodnalasrk61m/",
      icon: <BookOpen className="w-4 h-4" />,
      description: "Active problem solver and contributor",
    },
    {
      name: "CodeChef",
      url: "https://www.codechef.com/users/vsrujana74",
      icon: <Code className="w-4 h-4" />,
      description: "Competitive programming enthusiast",
    },
    {
      name: "SoloLearn",
      url: "https://www.sololearn.com/en/profile/27785402",
      icon: <BookOpen className="w-4 h-4" />,
      description: "Interactive coding courses and challenges",
    },
    {
      name: "TryHackMe",
      url: "https://tryhackme.com/p/VSxBluehat004",
      icon: <Shield className="w-4 h-4" />,
      description: "Cybersecurity challenges and learning",
    },
  ]

  const activities = [
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Digital Art & Creative Design",
      description:
        "Creating digital artwork, UI/UX designs, and visual content for technical presentations. Proficient in Adobe Creative Suite and modern design tools.",
    },
    {
      icon: <Megaphone className="w-6 h-6" />,
      title: "Digital Marketing & Content Creation",
      description:
        "Developing marketing strategies, creating engaging content for social media, and building brand presence for tech communities and personal projects.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Management",
      description:
        "Managing tech communities, organizing events, facilitating discussions, and building networks among developers and cybersecurity professionals.",
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Technical Writing",
      description:
        "Contributing technical articles, tutorials, and documentation on Medium, personal blog, and open-source projects covering AI, web development, and cybersecurity.",
    },
    {
      icon: <GitBranch className="w-6 h-6" />,
      title: "Open Source Contribution",
      description:
        "Active contributor to open-source projects, particularly in AI/ML libraries, web development frameworks, and cybersecurity tools with meaningful contributions.",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Prompt Engineering & AI Agents",
      description:
        "Developing sophisticated prompts for AI models, building intelligent agents, and exploring the intersection of natural language processing and automation.",
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Public & Technical Speaking",
      description:
        "Regular speaker at tech conferences, workshops, and webinars, sharing insights on AI trends, cybersecurity best practices, and emerging technologies.",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Technology Innovation & Research",
      description:
        "Exploring cutting-edge technologies, conducting research in AI applications, and developing innovative solutions for real-world challenges in various domains.",
    },
  ]

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      {/* Background Elements */}
      <Starfield />
      <ParticleCanvas />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative z-10 px-4 pt-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6 relative">
            <img
  src="/profile-photo.jpg"
  alt="Vodnala Srujana"
  className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 mx-auto rounded-full border-4 border-green-400 shadow-2xl shadow-green-400/20 hover:shadow-green-400/40 transition-all duration-300 hover:scale-105"
/>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-white via-green-400 to-green-600 bg-clip-text text-transparent animate-fade-in-up">
            Vodnala Srujana
          </h1>

          <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-slate-300 mb-3 lg:mb-4 animate-fade-in-up animation-delay-200">
            AI Engineer • Full-Stack Developer • Cybersecurity Explorer
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-4xl mx-auto mb-4 lg:mb-6 leading-relaxed animate-fade-in-up animation-delay-400 px-4">
            Computer Science Engineering student at JNTUH University College of Engineering Jagtial, specializing in
            building intelligent, adaptive systems that bridge artificial intelligence, web technologies, and
            cybersecurity. Passionate about transforming complex challenges into innovative solutions with proven
            expertise across multiple internships and 20+ projects.
          </p>

    

<div className="flex flex-col sm:flex-row gap-3 justify-center animate-fade-in-up animation-delay-600 px-4">
  <Button
    size="sm"
    className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-slate-900 font-semibold px-4 lg:px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-400/25 text-sm sm:text-base lg:text-lg"
    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
    suppressHydrationWarning
  >
    <Rocket className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
    Explore My Work
  </Button>
  <Button
    variant="outline"
    size="sm"
    className="border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 px-4 lg:px-6 py-2 rounded-full transform hover:scale-105 transition-all duration-300 bg-transparent text-sm sm:text-base lg:text-lg"
    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
    suppressHydrationWarning
  >
    <Mail className="w-3 h-3 lg:w-4 lg:h-4 mr-2" />
    Get In Touch
  </Button>
</div>

          <div className="flex justify-center space-x-3 lg:space-x-4 mt-6 lg:mt-8 animate-fade-in-up animation-delay-800">
            <a
              href="https://github.com/VodnalaSrujana004"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-800/50 rounded-full border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
            </a>
            <a
              href="https://linkedin.com/in/vodnala-srujana"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-slate-800/50 rounded-full border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
            </a>
            <a
              href="mailto:vodnalasrujana29@gmail.com"
              className="p-2 bg-slate-800/50 rounded-full border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
            </a>
            <a
              href="tel:+919390201618"
              className="p-2 bg-slate-800/50 rounded-full border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300 hover:scale-110"
            >
              <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-green-400" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-10 lg:py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-slate-400 text-center mb-6 lg:mb-12 max-w-2xl mx-auto text-sm">
            Passionate about creating intelligent solutions that make a difference
          </p>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-6">
            <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10 hover:transform hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center text-base">
                  <GraduationCap className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  Education & Background
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300 space-y-3 text-base">
                <div>
                  <h4 className="font-semibold text-white text-base">B.Tech Computer Science Engineering</h4>
                  <p className="text-green-400 text-sm">JNTUH University College of Engineering Jagtial</p>
                  <p className="text-sm">2022 - 2026 • CGPA: 8.1</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-base">Intermediate</h4>
                  <p className="text-green-400 text-sm">ALPHORES Jr College</p>
                  <p className="text-sm">2022 • 97%</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-base">SSC</h4>
                  <p className="text-green-400 text-sm">State Board</p>
                  <p className="text-sm">2020 • CGPA: 10.0</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10 hover:transform hover:scale-105">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center text-base">
                  <Star className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  Key Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-300">
                <div className="grid gap-2">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-2 p-2 bg-slate-700/30 rounded-lg">
                      <div className="text-green-400 mt-0.5">{achievement.icon}</div>
                      <div>
                        <h5 className="font-semibold text-white text-sm">{achievement.title}</h5>
                        <p className="text-sm text-slate-400">{achievement.description}</p>
                  
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center text-base">
                <Target className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Professional Focus & Technical Expertise
              </CardTitle>
            </CardHeader>
            <CardContent className="text-slate-300">
              <p className="leading-relaxed text-base mb-4">
  <span className="text-green-400 font-semibold">Final Year CSE Student</span> with{" "}
  <span className="text-green-400 font-semibold">8.1 CGPA</span> and{" "}
  <span className="text-green-400 font-semibold">4+ prestigious internships</span>, including with{" "}
  <span className="text-green-400 font-semibold">IBM SkillsBuild</span> and{" "}
  <span className="text-green-400 font-semibold">Infosys Springboard</span> and{" "}
  <span className="text-green-400 font-semibold">Microsoft-partnered TechSaksham</span>.
</p>
<p className="leading-relaxed text-base mb-4">
  Skilled in{" "}
  <span className="text-green-400 font-semibold">AI/ML (95% accuracy models)</span>,{" "}
  <span className="text-green-400 font-semibold">Full-Stack Development</span>, and{" "}
  <span className="text-green-400 font-semibold">Cybersecurity</span>, with practical experience using{" "}
  <span className="text-green-400 font-semibold">React.js</span>,{" "}
  <span className="text-green-400 font-semibold">Node.js</span>,{" "}
  <span className="text-green-400 font-semibold">TensorFlow</span>, and{" "}
  <span className="text-green-400 font-semibold">TryHackMe</span>.
</p>
<p className="leading-relaxed text-base mb-4">
  <span className="text-green-400 font-semibold">🚀 Track Record:</span><br />
  • Built 20+ production-ready projects<br />
  • Smart India Hackathon finalist (college level), NASA Space Apps participant<br />
  • Participated in coding events, workshops, and hackathons conducted by{" "}
  <span className="text-green-400 font-semibold">IITs</span> and top institutions
</p>
<p className="leading-relaxed text-base mb-4">
  <span className="text-green-400 font-semibold">Open to:</span>{" "}
  AI Engineer · Full-Stack Developer · Cybersecurity Analyst · ML Intern
</p>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-sm">🚀 MNC-Ready</Badge>
                <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-sm">
                  🏆 5 Elite Internships
                </Badge>
                <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-sm">⚡ 95% ML Accuracy</Badge>
                <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-sm">🌟 NASA Hackathon</Badge>
                <Badge className="bg-green-400/20 text-green-400 border-green-400/30 text-sm">
                  💼 Immediate Impact
                </Badge>
              </div>
              <div className="mt-4">
             

<Button
  variant="outline"
  size="sm"
  className="border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 bg-transparent text-sm"
  onClick={handleResumeDownload}
  suppressHydrationWarning
>
  <Download className="w-3 h-3 mr-2" />
  Download Resume
</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-10 lg:py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Services Offered
          </h2>
          <p className="text-slate-400 text-center mb-6 lg:mb-12 max-w-2xl mx-auto text-sm">
            Comprehensive solutions for your digital transformation needs
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10 hover:transform hover:scale-105 group"
              >
                <CardHeader className="pb-3">
                  <div className="p-2 bg-green-400/20 rounded-lg group-hover:bg-green-400/30 transition-colors w-fit">
                    <div className="text-green-400">{service.icon}</div>
                  </div>
                  <CardTitle className="text-white group-hover:text-green-400 transition-colors text-base">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-sm">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-10 lg:py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Professional Experience
          </h2>
          <p className="text-slate-400 text-center mb-6 lg:mb-12 max-w-2xl mx-auto text-sm">
            Building expertise through hands-on internships and real-world projects
          </p>

          <div className="space-y-4 lg:space-y-6">
            {experiences.map((exp, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10 hover:transform hover:scale-[1.02]"
              >
                <CardHeader className="pb-3">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-400/20 rounded-lg">{exp.icon}</div>
                      <div>
                        <CardTitle className="text-white text-base">{exp.title}</CardTitle>
                        <CardDescription className="text-green-400 font-medium text-sm">{exp.company}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-400/50 text-green-400 w-fit text-sm">
                      {exp.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-3 text-sm">{exp.description}</p>
                  <div className="space-y-2">
                    <h5 className="text-green-400 font-semibold text-sm">Key Achievements:</h5>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="text-slate-300 text-sm flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-10 lg:py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-slate-400 text-center mb-6 lg:mb-12 max-w-2xl mx-auto text-sm">
            Innovative solutions showcasing technical expertise and problem-solving abilities
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10 hover:transform hover:scale-105 group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-green-400/20 rounded-lg group-hover:bg-green-400/30 transition-colors">
                      <div className="text-green-400">{project.icon}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-400/20 text-green-400 border-green-400/30 text-sm">
                        {project.category}
                      </Badge>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 p-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <CardTitle className="text-white group-hover:text-green-400 transition-colors text-base">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 mb-3 text-sm leading-relaxed">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-green-400/10 text-green-400 border-green-400/20 text-sm"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Explore More Projects Section */}
          <div className="mt-8 lg:mt-12 text-center">
            <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-3 bg-green-400/20 rounded-full">
                    <Github className="w-8 h-8 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Explore More Projects</h3>
                    <p className="text-slate-300 text-sm mb-4 max-w-md">
                      Discover 20+ additional projects including AI models, web applications, cybersecurity tools, and
                      open-source contributions on my GitHub profile.
                    </p>
                  </div>
                  <a
                    href="https://github.com/VodnalaSrujana004"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-slate-900 font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-green-400/25"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View All Projects on GitHub
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                  <div className="flex items-center space-x-6 text-sm text-slate-400">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-green-400 mr-1" />
                      <span>53 Repositories</span>
                    </div>
                    <div className="flex items-center">
                      <Code className="w-4 h-4 text-green-400 mr-1" />
                      <span>500+ Commits</span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 text-green-400 mr-1" />
                      <span>70 Stars Earned</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-10 lg:py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <p className="text-slate-400 text-center mb-6 lg:mb-12 max-w-2xl mx-auto text-sm">
            Comprehensive skill set spanning AI, web development, and cybersecurity
          </p>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6 mb-6">
            {Object.entries(skills).map(([category, skillList], index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-400 flex items-center text-base">
                    {category === "Programming Languages" && <Code className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />}
                    {category === "AI & Machine Learning" && <Brain className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />}
                    {category === "Web Development" && <Globe className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />}
                    {category === "Cybersecurity" && <Shield className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {skillList.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="text-white font-medium text-sm">{skill.name}</span>
                        <span className="text-green-400 text-sm">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-1.5 bg-slate-700" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tools & Technologies */}
          <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center text-base">
                <Zap className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Tools & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
  "Git/GitHub",
  "VS Code",
  "Jupyter Notebook",
  "Google Colab",
  "Power BI",
  "Tableau",
  "NumPy",
  "Pandas",
  "Matplotlib",
  "Seaborn",
  "Scikit-learn",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "NLTK",
  "SpaCy",
  "Postman",
  "MongoDB Compass",
  "Figma",
  "Canva",
  "Firebase",
  "Streamlit",
  "HuggingFace Transformers",
  "Google Gemini API"
].map((tool, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-green-400/50 text-green-400 justify-center py-1 text-sm"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* certificates */}
          <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-green-400 flex items-center text-base">
                <Award className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {certificates.map((cert, index) => (
                  <div key={index} className="p-2 bg-slate-700/30 rounded-lg">
                    <h5 className="font-semibold text-white text-sm">{cert.name}</h5>
                    <p className="text-green-400 text-sm">{cert.provider}</p>
                    <Badge variant="outline" className="border-green-400/30 text-green-400 text-sm mt-1">
                      {cert.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Coding Profiles Dashboard */}
      <section id="coding" className="py-10 lg:py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Coding & Development Dashboard
          </h2>
          <p className="text-slate-400 text-center mb-6 lg:mb-12 max-w-2xl mx-auto text-sm">
            My coding journey across different platforms and achievements
          </p>

          {/* Coding Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6">
            {codingStats.map((stat, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm text-center hover:border-green-400 transition-all duration-300"
              >
                <CardContent className="p-3 lg:p-4">
                  <div className="text-green-400 mb-2 flex justify-center">{stat.icon}</div>
                  <div className="text-lg lg:text-2xl font-bold text-green-400 mb-1">{stat.value}</div>
                  <div className="text-slate-300 text-sm">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center text-base">
                  <Code className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  Coding Profiles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {codingProfiles.map((profile, index) => (
                  <a
                    key={index}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-green-400">{profile.icon}</div>
                      <div>
                        <span className="text-white text-sm font-medium">{profile.name}</span>
                        <p className="text-slate-400 text-sm">{profile.description}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-green-400" />
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center text-base">
                  <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  Development Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Languages Used</span>
                  <span className="text-green-400 font-semibold text-sm">8+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Total Commits</span>
                  <span className="text-green-400 font-semibold text-sm">500+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Repositories</span>
                  <span className="text-green-400 font-semibold text-sm">53</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Followers</span>
                  <span className="text-green-400 font-semibold text-sm">13</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Stars Earned</span>
                  <span className="text-green-400 font-semibold text-sm">13</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">CTF Challenges</span>
                  <span className="text-green-400 font-semibold text-sm">35+</span>
                </div>
                <div className="flex justify-between items-center">
  <span className="text-slate-300 text-sm">TryHackMe Global Rank</span>
  <span className="text-green-400 font-semibold text-sm">Top 2% (17,899)</span>
</div>

<div className="flex justify-between items-center">
  <span className="text-slate-300 text-sm">LinkedIn India Presence</span>
  <span className="text-green-400 font-semibold text-sm">Top 22% · 3,080+ Followers</span>
</div>

<div className="flex justify-between items-center">
  <span className="text-slate-300 text-sm">GeeksforGeeks Institute Rank</span>
  <span className="text-green-400 font-semibold text-sm">Rank #8</span>
</div>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Other Activities */}
      <section id="activities" className="py-10 lg:py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Other Activities
          </h2>
          <p className="text-slate-400 text-center mb-6 lg:mb-12 max-w-2xl mx-auto text-sm">
            Beyond coding - contributions, interests, and community involvement
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {activities.map((activity, index) => (
              <Card
                key={index}
                className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/10 hover:transform hover:scale-105 group"
              >
                <CardHeader className="pb-3">
                  <div className="p-2 bg-green-400/20 rounded-lg group-hover:bg-green-400/30 transition-colors w-fit">
                    <div className="text-green-400">{activity.icon}</div>
                  </div>
                  <CardTitle className="text-white group-hover:text-green-400 transition-colors text-base">
                    {activity.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300 text-sm">{activity.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-10 lg:py-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-center mb-3 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-slate-400 text-center mb-6 lg:mb-12 max-w-2xl mx-auto text-sm">
            Ready to collaborate on innovative projects? Let's build something extraordinary together!
          </p>

          <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
            <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 text-base">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent>

                <form id="contact-form" onSubmit={handleSubmit} className="space-y-3" suppressHydrationWarning>
                  <div suppressHydrationWarning>
                    <Label htmlFor="name" className="text-slate-300 text-sm">
                      Your Name
                    </Label>
    <Input
      id="name"
      name="name"
      className="bg-slate-700/50 border-green-400/30 text-white focus:border-green-400 text-sm"
      required
      suppressHydrationWarning
    />
  </div>
  <div suppressHydrationWarning>
    <Label htmlFor="email" className="text-slate-300 text-sm">
      Email Address
    </Label>
    <Input
      id="email"
      name="email"
      type="email"
      className="bg-slate-700/50 border-green-400/30 text-white focus:border-green-400 text-sm"
      required
      suppressHydrationWarning
    />
  </div>
  <div suppressHydrationWarning>
    <Label htmlFor="subject" className="text-slate-300 text-sm">
      Subject
    </Label>
    <Input
      id="subject"
      name="subject"
      className="bg-slate-700/50 border-green-400/30 text-white focus:border-green-400 text-sm"
      required
      suppressHydrationWarning
    />
  </div>
  <div suppressHydrationWarning>
    <Label htmlFor="message" className="text-slate-300 text-sm">
      Message
    </Label>
    <Textarea
      id="message"
      name="message"
      className="bg-slate-700/50 border-green-400/30 text-white focus:border-green-400 min-h-[100px] text-sm"
      required
      suppressHydrationWarning
    />
  </div>
  <Button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-slate-900 font-semibold text-sm"
    suppressHydrationWarning
  >
    {isSubmitting ? (
      <>
        <div className="w-3 h-3 mr-2 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
        Sending...
      </>
    ) : (
      <>
        <Mail className="w-3 h-3 mr-2" />
        Send Message
      </>
    )}
  </Button>
  {submitStatus.type === "success" && (
    <div className="flex flex-col items-center text-center justify-center space-y-3 p-4 bg-green-400/10 border border-green-400/30 rounded-lg">
      <div className="flex items-center text-green-400 text-sm">
        <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
        <span className="font-medium">{submitStatus.message}</span>
      </div>
      {submitStatus.mailtoLink && (
        <a
          href={submitStatus.mailtoLink}
          className="inline-flex items-center px-4 py-2 bg-green-400/20 hover:bg-green-400/30 text-green-400 hover:text-green-300 border border-green-400/50 rounded-lg transition-all duration-300 text-sm font-medium"
        >
          <Mail className="w-4 h-4 mr-2" />
          Open Email Client
        </a>
      )}
    </div>
  )}
  {submitStatus.type === "error" && (
    <div className="flex items-center text-red-400 text-sm text-center justify-center p-3 bg-red-400/10 border border-red-400/30 rounded-lg">
      <XCircle className="w-4 h-4 mr-2" />
      {submitStatus.message}
    </div>
  )}
</form>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-400/30 backdrop-blur-sm hover:border-green-400 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-white font-medium text-sm">Email</p>
                    <p className="text-slate-300 text-sm">vodnalasrujana29@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-white font-medium text-sm">Phone</p>
                    <p className="text-slate-300 text-sm">+91-9390201618</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-white font-medium text-sm">Location</p>
                    <p className="text-slate-300 text-sm">Karimnagar, Telangana, India</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-white font-medium text-sm">Availability</p>
                    <p className="text-slate-300 text-sm">Open for internships and full-time opportunities</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-green-400/30">
                  <p className="text-white font-medium mb-2 text-sm">Connect with me</p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="https://github.com/VodnalaSrujana004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700/50 rounded-lg border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300"
                    >
                      <Github className="w-4 h-4 text-green-400" />
                    </a>
                    <a
                      href="https://linkedin.com/in/vodnala-srujana"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700/50 rounded-lg border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4 text-green-400" />
                    </a>
                    <a
                      href="https://leetcode.com/u/vodnalasrujana29/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700/50 rounded-lg border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300"
                    >
                      <Code className="w-4 h-4 text-green-400" />
                    </a>
                    <a
                      href="https://www.hackerrank.com/profile/vodnalasrujana29"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700/50 rounded-lg border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300"
                    >
                      <Trophy className="w-4 h-4 text-green-400" />
                    </a>
                    <a
                      href="https://tryhackme.com/p/VSxBluehat004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-700/50 rounded-lg border border-green-400/30 hover:border-green-400 hover:bg-green-400/10 transition-all duration-300"
                    >
                      <Shield className="w-4 h-4 text-green-400" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 lg:py-6 px-4 border-t border-green-400/30 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 text-sm">
            © 2025 Vodnala Srujana. Crafted with <Heart className="w-3 h-3 inline text-green-400" /> for innovation and
            excellence.
          </p>
          <p className="text-slate-500 text-sm mt-1">Building intelligent, adaptive systems • AI + Web + Security</p>
        </div>
      </footer>

      <style jsx>{`
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fade-in-up {
        animation: fadeInUp 0.8s ease forwards;
      }
      
      .animation-delay-200 {
        animation-delay: 0.2s;
      }
      
      .animation-delay-400 {
        animation-delay: 0.4s;
      }
      
      .animation-delay-600 {
        animation-delay: 0.6s;
      }
      
      .animation-delay-800 {
        animation-delay: 0.8s;
      }

      /* Mobile responsive adjustments */
      @media (max-width: 640px) {
        .hero-title {
          font-size: 2rem;
        }
        
        .hero-subtitle {
          font-size: 1.125rem;
        }
        
        .section-title {
          font-size: 1.75rem;
        }
      }

      /* Tablet responsive adjustments */
      @media (max-width: 1024px) {
        .nav-links {
          gap: 0.75rem;
        }
        
        .grid-responsive {
          grid-template-columns: 1fr;
        }
      }

      /* Smooth scrolling for all browsers */
      html {
        scroll-behavior: smooth;
      }

      /* Custom scrollbar for webkit browsers */
      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-track {
        background: #1a1f3a;
      }

      ::-webkit-scrollbar-thumb {
        background: #00ff88;
        border-radius: 3px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #00cc70;
      }

      /* Focus styles for accessibility - removed box outline */
      button:focus,
      a:focus,
      input:focus,
      textarea:focus {
        outline: none;
      }

      /* Reduced motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}</style>
    </div>
  )
}
