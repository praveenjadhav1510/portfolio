"use client"

import { motion } from "framer-motion"
import { Code, Database, GitBranch } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import BackToTop from "@/components/BackToTop"
import { usePortfolioData } from "@/hooks/usePortfolioData"

const skillCategories = {
  Frontend: ["React.js", "HTML5", "CSS3", "JavaScript"],
  Backend: ["Node.js", "Java", "Python"],
  Database: ["MongoDB", "MySQL", "Firebase"],
  Tools: ["Git", "GitHub", "Figma", "Blender"],
}

const categoryIcons = {
  Frontend: Code,
  Backend: Database,
  Database: Database,
  Tools: GitBranch,
}

export default function SkillsPage() {
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
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills & Technologies</h1>
            <p className="text-xl text-muted-foreground">Technologies I work with to bring ideas to life</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Object.entries(skillCategories).map(([category, skills], categoryIndex) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons]
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">{category}</h3>
                      </div>
                      <div className="space-y-2">
                        {skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                            className="px-3 py-1 bg-muted rounded-full text-sm font-medium"
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* All Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">All Technologies</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {(data.skills || []).map((skill, index) => (
                <motion.div
                  key={typeof skill === "string" ? skill : skill.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 transition-colors cursor-default"
                >
                  {typeof skill === "string" ? skill : skill.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
