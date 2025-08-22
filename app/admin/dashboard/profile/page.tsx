"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, ArrowLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import ProtectedRoute from "@/components/ProtectedRoute"
import Link from "next/link"

function ProfileManagementContent() {
  const { data, updateData, loading } = usePortfolioData()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    tagline: "",
    githubUsername: "",
    profileImage: "",
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.profile.name,
        nickname: data.profile.nickname,
        tagline: data.profile.tagline,
        githubUsername: data.profile.githubUsername,
        profileImage: data.profile.profileImage,
      })
    }
  }, [data])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (data) {
        const updatedData = {
          ...data,
          profile: {
            ...data.profile,
            ...formData,
          },
        }
        const success = await updateData(updatedData)
        if (success) {
          toast({
            title: "Profile updated",
            description: "Your profile information has been saved successfully.",
          })
        } else {
          throw new Error("Failed to update")
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
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
              <h1 className="text-xl font-bold">Profile Management</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Edit Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input
                      id="nickname"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                      placeholder="Your nickname"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Textarea
                    id="tagline"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="Your professional tagline"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="githubUsername">GitHub Username</Label>
                  <Input
                    id="githubUsername"
                    name="githubUsername"
                    value={formData.githubUsername}
                    onChange={handleChange}
                    placeholder="Your GitHub username"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="profileImage">Profile Image URL</Label>
                  <Input
                    id="profileImage"
                    name="profileImage"
                    value={formData.profileImage}
                    onChange={handleChange}
                    placeholder="URL to your profile image"
                    required
                  />
                </div>

                <Button type="submit" disabled={saving} className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default function ProfileManagementPage() {
  return (
    <ProtectedRoute>
      <ProfileManagementContent />
    </ProtectedRoute>
  )
}
