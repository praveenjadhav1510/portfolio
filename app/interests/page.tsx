"use client"

import { motion } from "framer-motion"
import { Heart, Gamepad2, Music, Palette } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import BackToTop from "@/components/BackToTop"
import { usePortfolioData } from "@/hooks/usePortfolioData"

const interestIcons = {
  Music: Music,
  Gaming: Gamepad2,
  Anime: Heart,
  Design: Palette,
}

export default function InterestsPage() {
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

  const getIconForHobby = (hobby: string) => {
    if (hobby.toLowerCase().includes("music")) return Music
    if (hobby.toLowerCase().includes("gaming")) return Gamepad2
    if (hobby.toLowerCase().includes("anime")) return Heart
    if (hobby.toLowerCase().includes("blender") || hobby.toLowerCase().includes("design")) return Palette
    return Heart
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Interests & Hobbies</h1>
            <p className="text-xl text-muted-foreground">What I love to do in my free time</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {data.interests.hobbies.map((hobby, index) => {
              const Icon = getIconForHobby(hobby)
              return (
                <motion.div
                  key={hobby}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        {hobby}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {hobby.toLowerCase().includes("music") &&
                          "I enjoy listening to various genres of music and exploring new artists."}
                        {hobby.toLowerCase().includes("gaming") &&
                          "Gaming is one of my favorite pastimes, from strategy games to action-packed adventures."}
                        {hobby.toLowerCase().includes("anime") &&
                          "Anime enthusiast with a special appreciation for characters like Itachi Uchiha."}
                        {hobby.toLowerCase().includes("blender") &&
                          "Creating 3D models and designs using Blender, exploring the world of digital art."}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
