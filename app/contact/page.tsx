"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Send, Trash2, Smartphone, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Navigation from "@/components/Navigation"
import BackToTop from "@/components/BackToTop"
import { usePortfolioData } from "@/hooks/usePortfolioData"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isMobile, setIsMobile] = useState(false)
  const { data, loading } = usePortfolioData()

  useEffect(() => {
    // Load saved form data from localStorage
    const savedData = localStorage.getItem("contactFormData")
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }

    // Detect if user is on mobile
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth <= 768 ||
          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
      )
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    localStorage.setItem("contactFormData", JSON.stringify(formData))
  }, [formData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = formData
    const subject = `Portfolio Contact from ${name}`
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`

    if (isMobile) {
      const mailtoLink = `mailto:${data?.contact.emails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailtoLink
    } else {
      const mailtoLink = `mailto:${data?.contact.emails[0]}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailtoLink

      // Also open Gmail in browser as backup
      setTimeout(() => {
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${data?.contact.emails[0]}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(gmailLink, "_blank")
      }, 1000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleErase = () => {
    setFormData({ name: "", email: "", message: "" })
    localStorage.removeItem("contactFormData")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading portfolio data</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackToTop />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-xl text-muted-foreground">Let's discuss your next project or just say hello</p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
              {isMobile ? <Smartphone className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
              <span>Detected: {isMobile ? "Mobile Device" : "Desktop"}</span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and I'll get back to you soon
                    <br />
                    <span className="text-xs text-green-600">✓ Auto-saved locally</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message {isMobile ? "(Mobile)" : "(Desktop)"}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleErase}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>You can also reach me through these channels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {data.contact.emails.map((email, index) => (
                    <div key={email} className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <a href={`mailto:${email}`} className="hover:text-primary transition-colors">
                        {email}
                      </a>
                    </div>
                  ))}
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-primary" />
                    <a
                      href={data.contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      GitHub Profile
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <a
                      href={data.contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      LinkedIn Profile
                    </a>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Let's Connect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    I'm always interested in new opportunities and collaborations. Whether you have a project in mind or
                    just want to chat about technology, feel free to reach out!
                  </p>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <a href={data.contact.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
