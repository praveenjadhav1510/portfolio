"use client"

import { motion } from "framer-motion"
import { Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import BackToTop from "@/components/BackToTop"
import { usePortfolioData } from "@/hooks/usePortfolioData"

export default function ResumePage() {
  const { data, loading } = usePortfolioData()

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Resume</h1>
            <p className="text-xl text-muted-foreground">Download or view my complete resume</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resume Document
                </CardTitle>
                <CardDescription>View or download my complete professional resume</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild size="lg" className="mb-4">
                  <a href="/Praveen_Jadhav_Resume.pdf" download="Praveen_Jadhav_Resume.pdf">
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Resume Preview</CardTitle>
                <CardDescription>View the resume directly in your browser</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[800px] border rounded-lg overflow-hidden">
                  <iframe
                    src="/Praveen_Jadhav_Resume.pdf"
                    className="w-full h-full"
                    title="Resume Preview"
                    style={{ border: "none" }}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
