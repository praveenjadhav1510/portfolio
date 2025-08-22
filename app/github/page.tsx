"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import BackToTop from "@/components/BackToTop";
import { usePortfolioData } from "@/hooks/usePortfolioData";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string;
  location: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

export default function GitHubPage() {
  const { data, loading } = usePortfolioData();
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [githubLoading, setGithubLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const username = "praveenjadhav1510";

        // Fetch user data
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData = await userResponse.json();
        setGithubUser(userData);

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
        );
        const reposData = await reposResponse.json();
        setGithubRepos(reposData);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      } finally {
        setGithubLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Error loading portfolio data</p>
      </div>
    );
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              GitHub Activity
            </h1>
            <p className="text-xl text-muted-foreground">
              My open source contributions and repositories
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>GitHub Contributions</CardTitle>
                <CardDescription>
                  My coding activity over the past year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full overflow-x-auto">
                  <img
                    src="https://ghchart.rshah.org/409ba5/praveenjadhav1510"
                    alt="GitHub Contributions Chart"
                    className="w-full max-w-4xl mx-auto p-[10px] rounded-[10px] bg-white"
                    style={{ minWidth: "700px" }}
                  />
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {githubLoading ? "..." : githubUser?.public_repos || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Repositories
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {githubLoading ? "..." : githubUser?.followers || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Followers
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {githubLoading ? "..." : githubUser?.following || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Following
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {githubLoading
                        ? "..."
                        : githubUser
                        ? new Date().getFullYear() -
                          new Date(githubUser.created_at).getFullYear()
                        : 0}
                      +
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Years Active
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>GitHub Profile</CardTitle>
                <CardDescription>
                  Visit my GitHub profile to see all my repositories and
                  contributions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button asChild size="lg">
                  <a
                    href="https://github.com/praveenjadhav1510"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View GitHub Profile
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
                <CardTitle>Recent Repositories</CardTitle>
                <CardDescription>
                  My latest projects and contributions on GitHub
                </CardDescription>
              </CardHeader>
              <CardContent>
                {githubLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-2 text-muted-foreground">
                      Loading repositories...
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {githubRepos.map((repo, index) => (
                      <motion.div
                        key={repo.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card className="h-full hover:shadow-md transition-all duration-300">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-lg">
                              {repo.name}
                            </CardTitle>
                            <CardDescription className="text-sm">
                              {repo.description || "No description available"}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3" />
                                  {repo.stargazers_count}
                                </span>
                                <span className="flex items-center gap-1">
                                  <GitFork className="h-3 w-3" />
                                  {repo.forks_count}
                                </span>
                              </div>
                              {repo.language && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  {repo.language}
                                </span>
                              )}
                            </div>
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="w-full bg-transparent"
                            >
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="mr-2 h-3 w-3" />
                                View Repository
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
