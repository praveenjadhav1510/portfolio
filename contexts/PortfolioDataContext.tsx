"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface PortfolioData {
  profile: {
    name: string
    nickname: string
    tagline: string
    githubUsername: string
    profileImage: string
  }
  about: {
    intro: string
    education: Array<{
      level: string
      year?: number
      score: string
    }>
  }
  skills: string[]
  projects: Array<{
    title: string
    description: string
    techStack: string[]
    github: string
    demo: string
  }>
  resume: {
    pdf: string
  }
  contact: {
    emails: string[]
    github: string
    linkedin: string
  }
  interests: {
    hobbies: string[]
  }
}

interface PortfolioDataContextType {
  data: PortfolioData | null
  loading: boolean
}

const PortfolioDataContext = createContext<PortfolioDataContextType | undefined>(undefined)

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/portfolio-data")
        const portfolioData = await response.json()
        setData(portfolioData)
      } catch (error) {
        console.error("Error fetching portfolio data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return <PortfolioDataContext.Provider value={{ data, loading }}>{children}</PortfolioDataContext.Provider>
}

export const usePortfolioData = () => {
  const context = useContext(PortfolioDataContext)
  if (context === undefined) {
    throw new Error("usePortfolioData must be used within a PortfolioDataProvider")
  }
  return context
}
