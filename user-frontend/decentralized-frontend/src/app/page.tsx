
import Link from "next/link"
import { ArrowRight, CheckCircle, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Hero } from "./components/Hero"
import { Upload } from "./components/Upload"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="border-b border-white/10">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">TaskChain</div>
          <div className="flex gap-4">
            <Link href="/user">
              <Button variant="ghost" className="text-white hover:text-white/80">
                Create Tasks
              </Button>
            </Link>
            <Link href="/worker">
              <Button variant="ghost" className="text-white hover:text-white/80">
                Complete Tasks
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl" />
        <h1 className="text-4xl md:text-6xl font-bold mb-6 relative">Decentralized Task Platform</h1>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto relative">
          Create tasks, earn Solana, and participate in decentralized content curation
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
          <Link href="/user">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90">
              Create a Task
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/worker">
            <Button size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
              Start Working
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 bg-blue-500/20 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Tasks</h3>
              <p className="text-gray-400">
                Post tasks with Solana rewards for thumbnail selection, content review, and more
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 bg-purple-500/20 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Vote & Earn</h3>
              <p className="text-gray-400">
                Vote on the best options and earn Solana for contributing to task completion
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="pt-6">
              <div className="rounded-full w-12 h-12 bg-green-500/20 flex items-center justify-center mb-4">
                <svg
                  className="h-6 w-6 text-green-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Results</h3>
              <p className="text-gray-400">View real-time voting results and statistics for your tasks</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-24 border-t border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">1.2k+</div>
            <div className="text-gray-400">Active Tasks</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">50k+</div>
            <div className="text-gray-400">Votes Cast</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">10k+</div>
            <div className="text-gray-400">Workers</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-gray-400">SOL Distributed</div>
          </div>
        </div>
      </section>
    </div>
  )

}


