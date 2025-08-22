"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowLeft, Settings, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { usePortfolioData } from "@/hooks/usePortfolioData"
import ProtectedRoute from "@/components/ProtectedRoute"
import Link from "next/link"

function SettingsContent() {
  const { data, updateData } = usePortfolioData()
  const { toast } = useToast()

  const exportData = () => {
    if (data) {
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: "application/json" })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "portfolio-data.json"
      link.click()
      URL.revokeObjectURL(url)

      toast({
        title: "Data exported",
        description: "Portfolio data has been downloaded as JSON file.",
      })
    }
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string)
          const success = await updateData(importedData)
          if (success) {
            toast({
              title: "Data imported",
              description: "Portfolio data has been imported successfully.",
            })
          } else {
            throw new Error("Failed to import")
          }
        } catch (error) {
          toast({
            title: "Import failed",
            description: "Failed to import data. Please check the file format.",
            variant: "destructive",
          })
        }
      }
      reader.readAsText(file)
    }
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
              <h1 className="text-xl font-bold">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Data Management
              </CardTitle>
              <CardDescription>Export or import your portfolio data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={exportData} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
                <div className="flex-1">
                  <input type="file" accept=".json" onChange={importData} className="hidden" id="import-file" />
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <label htmlFor="import-file" className="cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Import Data
                    </label>
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Export your current portfolio data as a JSON file for backup, or import data from a previously exported
                file.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Firebase Integration</CardTitle>
              <CardDescription>Your portfolio data is automatically synced with Firebase</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Authentication</span>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firestore Database</span>
                  <span className="text-sm text-green-600">Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Real-time Updates</span>
                  <span className="text-sm text-green-600">Enabled</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  )
}
