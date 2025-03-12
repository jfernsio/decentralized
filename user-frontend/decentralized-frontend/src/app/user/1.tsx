import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { ConnectWallet } from "@/app/components/connect-wallet"
import { BarChart3, Clock, CheckCircle2, Coins } from "lucide-react"
import { ThumbnailUpload } from "@/app/components/thubmnail"

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-xl font-bold">TaskChain</div>
          <ConnectWallet />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Tasks</p>
                  <h3 className="text-2xl font-bold">42</h3>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Tasks</p>
                  <h3 className="text-2xl font-bold">18</h3>
                </div>
                <Clock className="h-8 w-8 text-purple-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Spent</p>
                  <h3 className="text-2xl font-bold">7.5 SOL</h3>
                </div>
                <Coins className="h-8 w-8 text-yellow-500 opacity-75" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="my-tasks" className="space-y-4">
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
            <TabsTrigger value="create">Create New Task</TabsTrigger>
          </TabsList>

          <TabsContent value="my-tasks" className="space-y-4">
            <div className="grid gap-4">
              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Best Gaming Thumbnail Selection</h3>
                      <p className="text-sm text-gray-400">Created 2 days ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-semibold">0.5 SOL</div>
                        <div className="text-sm text-gray-400">32/50 votes</div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="relative aspect-video bg-white/5 rounded-lg overflow-hidden">
                        <Image src="/placeholder.svg" alt={`Thumbnail ${num}`} fill className="object-cover" />
                        <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-sm">
                          {num * 8} votes
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Tech Review Thumbnail</h3>
                      <p className="text-sm text-gray-400">Created 5 days ago</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="font-semibold">0.3 SOL</div>
                        <div className="text-sm text-gray-400">50/50 votes</div>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="relative aspect-video bg-white/5 rounded-lg overflow-hidden">
                        <Image src="/placeholder.svg" alt={`Thumbnail ${num}`} fill className="object-cover" />
                        <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-1 rounded text-sm">
                          {num * 12} votes
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="create">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle>Create New Task</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input  type="text" id="title" placeholder="Enter task title..." className="bg-white/5 border-white/10" />
                </div>

                <div className="space-y-2">
                  <Label>Thumbnail Options (Minimum 2 required)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <ThumbnailUpload key={num} />
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold">
                  Create Task
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

