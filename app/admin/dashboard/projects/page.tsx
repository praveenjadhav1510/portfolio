"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, ArrowLeft, Plus, Trash2, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import ProtectedRoute from "@/components/ProtectedRoute"
import Link from "next/link"

interface Project {
  title: string
  description: string
  techStack: string[]
  github: string
  demo: string
}

function ProjectsManagementContent() {
  const { data, updateData, loading } = usePortfolioData()
  const { toast } = useToast()
  const [projects, setProjects] = useState<Project[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setProjects(data.projects)
    }
  }, [data])

  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    setProjects((prev) => prev.map((project, i) => (i === index ? { ...project, [field]: value } : project)))
  }

  const handleTechStackChange = (index: number, techStack: string) => {
    const techArray = techStack
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean)
    handleProjectChange(index, "techStack", techArray)
  }

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        title: "",
        description: "",
        techStack: [],
        github: "",
        demo: "#",
      },
    ])
  }

  const removeProject = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (data) {
        const updatedData = {
          ...data,
          projects,
        }
        const success = await updateData(updatedData)
        if (success) {
          toast({
            title: "Projects updated",
            description: "Your projects have been saved successfully.",
          })
        } else {
          throw new Error("Failed to update")
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update projects. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-xl font-bold">Projects Management</h1>
            </div>
            <Button onClick={addProject} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5" />
                      Project {index + 1}
                    </CardTitle>
                    <Button type="button" variant="destructive" size="sm" onClick={() => removeProject(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`title-${index}`}>Project Title</Label>
                      <Input
                        id={`title-${index}`}
                        value={project.title}
                        onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                        placeholder="Project title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`techStack-${index}`}>Tech Stack (comma-separated)</Label>
                      <Input
                        id={`techStack-${index}`}
                        value={project.techStack.join(", ")}
                        onChange={(e) => handleTechStackChange(index, e.target.value)}
                        placeholder="React.js, Node.js, MongoDB"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Textarea
                      id={`description-${index}`}
                      value={project.description}
                      onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                      placeholder="Project description"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`github-${index}`}>GitHub URL</Label>
                      <Input
                        id={`github-${index}`}
                        value={project.github}
                        onChange={(e) => handleProjectChange(index, "github", e.target.value)}
                        placeholder="https://github.com/username/repo"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor={`demo-${index}`}>Demo URL</Label>
                      <Input
                        id={`demo-${index}`}
                        value={project.demo}
                        onChange={(e) => handleProjectChange(index, "demo", e.target.value)}
                        placeholder="https://demo-url.com or # for no demo"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          <div className="flex justify-center">
            <Button type="submit" disabled={saving} size="lg">
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save All Projects"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default function ProjectsManagementPage() {
  return (
    <ProtectedRoute>
      <ProjectsManagementContent />
    </ProtectedRoute>
  )
}
