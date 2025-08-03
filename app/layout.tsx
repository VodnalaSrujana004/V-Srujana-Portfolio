// Replace the entire file with this:

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vodnala Srujana",
  description: "AI Engineer & Full-Stack Developer - Passionate about Machine Learning, Web Development, and Cybersecurity",
  keywords: "AI Engineer, Full Stack Developer, Machine Learning, Web Development, Cybersecurity, React, Next.js, Python",
  authors: [{ name: "Vodnala Srujana" }],
  creator: "Vodnala Srujana",
  openGraph: {
    title: "Vodnala Srujana - AI Engineer & Developer",
    description: "Professional portfolio showcasing AI engineering, full-stack development, and cybersecurity projects",
    type: "website",
  },

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}