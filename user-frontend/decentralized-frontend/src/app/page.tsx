import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="border-b border-white/10 sticky top-0 z-50 bg-black/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            TaskChain
          </div>
          <div className="flex gap-4">
            <Link href="/user">
              <Button variant="ghost" className="text-white hover:text-blue-400 transition-colors">
                Create Tasks
              </Button>
            </Link>
            <Link href="/worker">
              <Button variant="ghost" className="text-white hover:text-purple-400 transition-colors">
                Complete Tasks
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Revolutionize Content Curation with Blockchain
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              TaskChain empowers creators and curators with a decentralized platform for content selection and fair
              rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/user">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                  Create a Task
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/worker">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-400 text-purple-400 hover:bg-purple-400/10 transition-colors"
                >
                  Start Working
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path d="M0 0 Q 50 50 100 0 L100 100 Q50 50 0 100 Z" fill="url(#grad1)">
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="M0 0 Q 50 50 100 0 L100 100 Q50 50 0 100 Z;
                        M0 0 Q 50 60 100 0 L100 100 Q50 40 0 100 Z;
                        M0 0 Q 50 40 100 0 L100 100 Q50 60 0 100 Z;
                        M0 0 Q 50 50 100 0 L100 100 Q50 50 0 100 Z"
              />
            </path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            Empowering Web3 Content Curation
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/5 border-white/10 hover:border-blue-500/50 transition-colors">
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
            <Card className="bg-white/5 border-white/10 hover:border-purple-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-purple-500/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Decentralized Voting</h3>
                <p className="text-gray-400">
                  Participate in a fair and transparent voting system to select the best content
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 hover:border-green-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="rounded-full w-12 h-12 bg-green-500/20 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure Rewards</h3>
                <p className="text-gray-400">
                  Earn Solana securely for your contributions, with blockchain-backed transactions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
            How TaskChain Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-500">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create or Choose a Task</h3>
              <p className="text-gray-400">Post a new task or browse available tasks to work on</p>
            </div>
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-500">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete the Work</h3>
              <p className="text-gray-400">Submit your work or vote on the best submissions</p>
            </div>
            <div className="text-center">
              <div className="rounded-full w-16 h-16 bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-500">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive Rewards</h3>
              <p className="text-gray-400">Get paid in Solana for your contributions to the platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                1.2k+
              </div>
              <div className="text-gray-400">Active Tasks</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                50k+
              </div>
              <div className="text-gray-400">Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                100k+
              </div>
              <div className="text-gray-400">Tasks Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                500+
              </div>
              <div className="text-gray-400">SOL Distributed</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

