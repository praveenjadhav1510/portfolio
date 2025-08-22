import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { PortfolioDataProvider } from "@/contexts/PortfolioDataContext"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Praveen Jadhav - Full Stack Developer",
  description: "Portfolio of Praveen Jadhav (Jarvis) - Full Stack Developer specializing in React & Node.js",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PortfolioDataProvider>{children}</PortfolioDataProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
