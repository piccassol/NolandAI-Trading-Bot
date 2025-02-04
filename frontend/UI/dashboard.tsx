"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, RefreshCwIcon as Refresh, Trash2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

const data = [
  { date: "25 Apr", value: 0 },
  { date: "26 Apr", value: 0 },
  { date: "27 Apr", value: 0 },
  { date: "28 Apr", value: 0 },
  { date: "29 Apr", value: 200000 },
  { date: "30 Apr", value: 400000 },
  { date: "1 May", value: 400000 },
  { date: "2 May", value: 400000 },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Bot Sections */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-[#1E2530] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">DCA Bots</h3>
            <Button variant="ghost" size="sm">
              Create
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Active Bots</span>
              <span>1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Today PnL</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">PnL</span>
              <span className="text-green-500">+$0.81 ↑</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1E2530] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">GRID Bots</h3>
            <Button variant="ghost" size="sm">
              Create
            </Button>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Active Bots</span>
              <span>1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Today PnL</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Profit</span>
              <span className="text-green-500">+$3.81 ↑</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1E2530] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Signal Bots</h3>
            <Button variant="ghost" size="sm">
              Create
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400">
              Manage your trading positions using webhooks, alerts, TradingView strategies, and custom filters that
              include manual signal confirmation.
            </p>
          </div>
        </Card>

        <Card className="bg-[#1E2530] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">SmartTrades</h3>
            <Button variant="ghost" size="sm">
              Create
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-400">
              Manage all your exchanges in one easy-to-use interface. Strategize your trades using advanced order
              conditions for entering and exiting deals.
            </p>
          </div>
        </Card>
      </div>

      {/* Account Balance Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">Aggregate account balance</h2>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Refresh className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-[#1E2530] p-6">
            <div className="relative flex aspect-square items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Number of assets</div>
                  <div className="text-2xl font-medium">6</div>
                </div>
              </div>
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2A2F3A" strokeWidth="10" strokeLinecap="round" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3DBAB6"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset="70"
                />
              </svg>
            </div>
          </Card>

          <Card className="bg-[#1E2530] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-2xl font-medium">$377,018.29</div>
                <div className="text-sm text-red-500">-3.33%</div>
              </div>
              <div className="text-sm text-gray-400">
                <div>≈6.5489026 BTC</div>
                <div className="text-green-500">+1.21%</div>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="date" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#4B5563"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Line type="monotone" dataKey="value" stroke="#3DBAB6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Solana Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-medium">Solana (SOL/USD)</h2>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Refresh className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-[#1E2530] p-6">
            <div className="relative flex aspect-square items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-sm text-gray-400">Number of assets</div>
                  <div className="text-2xl font-medium">10</div>
                </div>
              </div>
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#2A2F3A" strokeWidth="10" strokeLinecap="round" />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#3DBAB6"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset="70"
                />
              </svg>
            </div>
          </Card>

          <Card className="bg-[#1E2530] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-2xl font-medium">$500,000.00</div>
                <div className="text-sm text-green-500">+5.00%</div>
              </div>
              <div className="text-sm text-gray-400">
                <div>≈10,000 SOL</div>
                <div className="text-green-500">+2.50%</div>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis dataKey="date" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#4B5563"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Line type="monotone" dataKey="value" stroke="#3DBAB6" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

