import { Button } from "@/components/ui/button"
import type React from "react" // Added import for React

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0D0D0D] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold">SolanaScreener</h1>
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


              <div className="text-sm">
                <div className="flex items-center space-x-2">
                  <span>ETH/USD</span>
                  <span className="text-red-500">$2,895.84</span>
                </div>
                <div className="text-red-500">-3.66%</div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              DEMO ACCOUNT <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>0/50</span>
              <span>0/10</span>
              <span>0/10</span>
              <span>1/50</span>
              <span>1/500</span>
            </div>
            <Button variant="ghost" size="sm">
              Trial Pro plan
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-center space-x-2 bg-[#1E2530] py-2 text-sm">
          <span>Now you're on Demo account</span>
          <Link href="#" className="text-blue-400 hover:underline">
            Switch to Real account
          </Link>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 border-r border-gray-800 bg-[#1A1D26] p-4">
          <nav className="space-y-6">
            <div>
              <Link href="#" className="flex items-center space-x-2 rounded-lg bg-[#1E2530] px-4 py-2 text-gray-100">
                <span className="text-sm">Dashboard</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-400">
                <span className="text-sm">My Portfolio</span>
              </Link>
            </div>
            <div>
              <div className="px-4 text-xs font-semibold text-gray-500">TRADING</div>
              <Link href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-400">
                <span className="text-sm">Control Panel</span>
                <span className="rounded bg-blue-500 px-1 py-0.5 text-[10px]">BETA</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-400">
                <span className="text-sm">Signal Bot</span>
                <span className="rounded bg-blue-500 px-1 py-0.5 text-[10px]">NEW</span>
              </Link>
              <Link href="#" className="flex items-center space-x-2 px-4 py-2 text-gray-400">
                <span className="text-sm">DCA Bot</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

