"use client"

import { motion } from "framer-motion"
import { LogOut, User, FileText, FolderOpen, Settings, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/ProtectedRoute"
import Link from "next/link"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import { useState } from "react"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

function AdminDashboardContent() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { data, loading } = usePortfolioData()
  const [initializing, setInitializing] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  const initializePortfolioData = async () => {
    setInitializing(true)
    try {
      const initialData = {
        profile: {
          name: "Praveen Jadhav",
          nickname: "Jarvis",
          tagline: "Full Stack Developer & AI Enthusiast",
          githubUsername: "praveenjadhav1510",
          profileImage: "/professional-developer-headshot.png",
        },
        about: {
          intro:
            "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions and exploring the latest trends in AI and machine learning.",
          education: [
            { level: "Bachelor's in Computer Science", year: 2023, score: "8.5 CGPA" },
            { level: "Higher Secondary (12th)", year: 2019, score: "85%" },
            { level: "Secondary (10th)", year: 2017, score: "90%" },
          ],
        },
        skills: [
          "JavaScript",
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Python",
          "Firebase",
          "MongoDB",
          "PostgreSQL",
          "Docker",
          "AWS",
          "Git",
          "Tailwind CSS",
          "Express.js",
          "GraphQL",
        ],
        projects: [
          {
            title: "E-Commerce Platform",
            description:
              "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
            techStack: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
            github: "https://github.com/praveenjadhav1510/ecommerce-platform",
            demo: "https://ecommerce-demo.vercel.app",
          },
          {
            title: "Task Management App",
            description:
              "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            techStack: ["Next.js", "Firebase", "Tailwind CSS", "Framer Motion"],
            github: "https://github.com/praveenjadhav1510/task-manager",
            demo: "https://task-manager-demo.vercel.app",
          },
          {
            title: "AI Chat Assistant",
            description:
              "An intelligent chat assistant powered by OpenAI API with context awareness and conversation memory.",
            techStack: ["Python", "FastAPI", "OpenAI API", "React", "WebSocket"],
            github: "https://github.com/praveenjadhav1510/ai-chat-assistant",
            demo: "https://ai-chat-demo.vercel.app",
          },
        ],
        resume: { pdf: "/resume.pdf" },
        contact: {
          emails: ["praveen.jadhav@example.com", "jarvis.dev@example.com"],
          github: "https://github.com/praveenjadhav1510",
          linkedin: "https://linkedin.com/in/praveenjadhav1510",
        },
        interests: {
          hobbies: [
            "Machine Learning & AI Research",
            "Open Source Contributing",
            "Tech Blogging",
            "Photography",
            "Gaming",
            "Traveling",
          ],
        },
      }

      const docRef = doc(db, "portfolio", "data")
      await setDoc(docRef, initialData)

      // Refresh the page to load the new data
      window.location.reload()
    } catch (error) {
      console.error("Error initializing portfolio data:", error)
      alert("Failed to initialize portfolio data. Please try again.")
    } finally {
      setInitializing(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold">Portfolio Admin</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/">View Portfolio</Link>
              </Button>
              <span className="text-sm text-muted-foreground">Welcome, {user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
          <p className="text-muted-foreground">Manage your portfolio content and settings</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {!loading && !data && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="md:col-span-2 lg:col-span-4"
            >
              <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                    <Database className="h-5 w-5" />
                    Initialize Portfolio Data
                  </CardTitle>
                  <CardDescription className="text-orange-700 dark:text-orange-300">
                    No portfolio data found in Firebase. Click below to initialize with default content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={initializePortfolioData}
                    disabled={initializing}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    {initializing ? "Initializing..." : "Initialize Portfolio Data"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>Update your personal information and profile details</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin/dashboard/profile">Edit Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  Projects Management
                </CardTitle>
                <CardDescription>Add, edit, or remove your portfolio projects</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin/dashboard/projects">Manage Projects</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Content Management
                </CardTitle>
                <CardDescription>Edit about, skills, interests, and contact information</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin/dashboard/content">Manage Content</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Settings
                </CardTitle>
                <CardDescription>Export/import data and manage system settings</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/admin/dashboard/settings">Site Settings</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/">View Live Portfolio</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/dashboard/profile">Edit Profile</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/dashboard/projects">Add New Project</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin/dashboard/settings">Export Data</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <AdminDashboardContent />
    </ProtectedRoute>
  )
}
