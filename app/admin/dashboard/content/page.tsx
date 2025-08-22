"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, ArrowLeft, Plus, Trash2, BookOpen, Award, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import ProtectedRoute from "@/components/ProtectedRoute"
import Link from "next/link"

interface Education {
  level: string
  year?: number
  score: string
}

function ContentManagementContent() {
  const { data, updateData, loading } = usePortfolioData()
  const { toast } = useToast()
  const [aboutData, setAboutData] = useState({
    intro: "",
    education: [] as Education[],
  })
  const [skills, setSkills] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [contactData, setContactData] = useState({
    emails: [] as string[],
    github: "",
    linkedin: "",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setAboutData(data.about)
      setSkills(data.skills)
      setInterests(data.interests.hobbies)
      setContactData(data.contact)
    }
  }, [data])

  const handleAboutChange = (field: string, value: string) => {
    setAboutData((prev) => ({ ...prev, [field]: value }))
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string | number) => {
    setAboutData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: field === "year" ? Number(value) : value } : edu,
      ),
    }))
  }

  const addEducation = () => {
    setAboutData((prev) => ({
      ...prev,
      education: [...prev.education, { level: "", score: "" }],
    }))
  }

  const removeEducation = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }))
  }

  const handleSkillsChange = (skillsString: string) => {
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
    setSkills(skillsArray)
  }

  const handleInterestsChange = (interestsString: string) => {
    const interestsArray = interestsString
      .split(",")
      .map((interest) => interest.trim())
      .filter(Boolean)
    setInterests(interestsArray)
  }

  const handleEmailsChange = (emailsString: string) => {
    const emailsArray = emailsString
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
    setContactData((prev) => ({ ...prev, emails: emailsArray }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (data) {
        const updatedData = {
          ...data,
          about: aboutData,
          skills,
          interests: { hobbies: interests },
          contact: contactData,
        }
        const success = await updateData(updatedData)
        if (success) {
          toast({
            title: "Content updated",
            description: "Your content has been saved successfully.",
          })
        } else {
          throw new Error("Failed to update")
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update content. Please try again.",
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
              <h1 className="text-xl font-bold">Content Management</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="about" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="interests">Interests</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      About Section
                    </CardTitle>
                    <CardDescription>Edit your introduction and education details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="intro">Introduction</Label>
                      <Textarea
                        id="intro"
                        value={aboutData.intro}
                        onChange={(e) => handleAboutChange("intro", e.target.value)}
                        placeholder="Write your introduction"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <Label>Education</Label>
                        <Button type="button" onClick={addEducation} size="sm">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Education
                        </Button>
                      </div>
                      <div className="space-y-4">
                        {aboutData.education.map((edu, index) => (
                          <Card key={index}>
                            <CardContent className="pt-6">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium">Education {index + 1}</h4>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => removeEducation(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                  <Label htmlFor={`level-${index}`}>Level</Label>
                                  <Input
                                    id={`level-${index}`}
                                    value={edu.level}
                                    onChange={(e) => handleEducationChange(index, "level", e.target.value)}
                                    placeholder="e.g., BCA 1st Sem"
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`year-${index}`}>Year (optional)</Label>
                                  <Input
                                    id={`year-${index}`}
                                    type="number"
                                    value={edu.year || ""}
                                    onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                                    placeholder="2023"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`score-${index}`}>Score</Label>
                                  <Input
                                    id={`score-${index}`}
                                    value={edu.score}
                                    onChange={(e) => handleEducationChange(index, "score", e.target.value)}
                                    placeholder="85%"
                                    required
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="skills">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Skills Management
                    </CardTitle>
                    <CardDescription>Add or remove your technical skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Textarea
                        id="skills"
                        value={skills.join(", ")}
                        onChange={(e) => handleSkillsChange(e.target.value)}
                        placeholder="React.js, Node.js, MongoDB, Firebase"
                        rows={4}
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Separate each skill with a comma. Example: React.js, Node.js, MongoDB
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="interests">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Interests & Hobbies
                    </CardTitle>
                    <CardDescription>Edit your personal interests and hobbies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <Label htmlFor="interests">Interests (comma-separated)</Label>
                      <Textarea
                        id="interests"
                        value={interests.join(", ")}
                        onChange={(e) => handleInterestsChange(e.target.value)}
                        placeholder="Music, Gaming, Anime, 3D Design"
                        rows={4}
                        required
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        Separate each interest with a comma. Example: Music, Gaming, Anime
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="contact">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Update your contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="emails">Email Addresses (comma-separated)</Label>
                      <Input
                        id="emails"
                        value={contactData.emails.join(", ")}
                        onChange={(e) => handleEmailsChange(e.target.value)}
                        placeholder="email1@example.com, email2@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub URL</Label>
                      <Input
                        id="github"
                        value={contactData.github}
                        onChange={(e) => setContactData((prev) => ({ ...prev, github: e.target.value }))}
                        placeholder="https://github.com/username"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="linkedin">LinkedIn URL</Label>
                      <Input
                        id="linkedin"
                        value={contactData.linkedin}
                        onChange={(e) => setContactData((prev) => ({ ...prev, linkedin: e.target.value }))}
                        placeholder="https://linkedin.com/in/username"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-8">
            <Button type="submit" disabled={saving} size="lg">
              <Save className="mr-2 h-4 w-4" />
              {saving ? "Saving..." : "Save All Changes"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default function ContentManagementPage() {
  return (
    <ProtectedRoute>
      <ContentManagementContent />
    </ProtectedRoute>
  )
}
