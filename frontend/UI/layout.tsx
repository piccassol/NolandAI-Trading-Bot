import { Button } from "@/components/ui/button"
import type React from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0D0D0D] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold">NolandXT</h1>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Trending
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                New Pairs
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                Gainers
              </Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/20">
              Connect Wallet
            </Button>
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/20">
              Connect Telegram
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">{children}</main>
    </div>
  )
}
