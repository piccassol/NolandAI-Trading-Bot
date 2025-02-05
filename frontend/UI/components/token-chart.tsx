"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts"
import { ArrowUpRight, Clock, DollarSign, Percent, TrendingUp, Volume2 } from "lucide-react"

const data = [
  { time: "00:00", price: 0.000012, volume: 25000 },
  { time: "04:00", price: 0.000014, volume: 35000 },
  { time: "08:00", price: 0.000013, volume: 28000 },
  { time: "12:00", price: 0.000015, volume: 42000 },
  { time: "16:00", price: 0.000016, volume: 38000 },
  { time: "20:00", price: 0.000014, volume: 31000 },
  { time: "24:00", price: 0.000015, volume: 36000 },
]

const tokenStats = {
  price: 0.00001234,
  priceChange: 15.5,
  volume24h: 2500000,
  mcap: 150000000,
  fdv: 180000000,
  liquidity: 8500000,
  holders: 52000,
}

export function TokenChart() {
  return (
    <Card className="bg-[#111111] p-6">
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">BONK/USD</h2>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="text-2xl font-semibold">${tokenStats.price.toFixed(8)}</span>
                  <span
                    className={`flex items-center ${tokenStats.priceChange >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {tokenStats.priceChange >= 0 ? "+" : ""}
                    {tokenStats.priceChange}%
                    <TrendingUp className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/20">
                Trade Now <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-[#1A1A1A] p-4">
              <div className="flex items-center text-gray-400">
                <Volume2 className="mr-2 h-4 w-4" />
                24h Volume
              </div>
              <div className="mt-1 text-lg font-semibold">${tokenStats.volume24h.toLocaleString()}</div>
            </div>
            <div className="rounded-lg bg-[#1A1A1A] p-4">
              <div className="flex items-center text-gray-400">
                <DollarSign className="mr-2 h-4 w-4" />
                Market Cap
              </div>
              <div className="mt-1 text-lg font-semibold">${tokenStats.mcap.toLocaleString()}</div>
            </div>
            <div className="rounded-lg bg-[#1A1A1A] p-4">
              <div className="flex items-center text-gray-400">
                <Percent className="mr-2 h-4 w-4" />
                FDV
              </div>
              <div className="mt-1 text-lg font-semibold">${tokenStats.fdv.toLocaleString()}</div>
            </div>
            <div className="rounded-lg bg-[#1A1A1A] p-4">
              <div className="flex items-center text-gray-400">
                <Clock className="mr-2 h-4 w-4" />
                Holders
              </div>
              <div className="mt-1 text-lg font-semibold">{tokenStats.holders.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Tabs defaultValue="1d" className="w-full">
              <TabsList className="grid w-full grid-cols-6 bg-[#1A1A1A]">
                <TabsTrigger value="5m">5m</TabsTrigger>
                <TabsTrigger value="15m">15m</TabsTrigger>
                <TabsTrigger value="1h">1H</TabsTrigger>
                <TabsTrigger value="4h">4H</TabsTrigger>
                <TabsTrigger value="1d">1D</TabsTrigger>
                <TabsTrigger value="1w">1W</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="rounded-lg bg-[#1A1A1A] p-4">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Price</span>
              <span>Volume</span>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2A2F3A" />
                  <XAxis dataKey="time" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    yAxisId="price"
                    stroke="#4B5563"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value.toFixed(6)}`}
                  />
                  <YAxis
                    yAxisId="volume"
                    orientation="right"
                    stroke="#4B5563"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  />
                  <Tooltip
                    contentStyle={{ background: "#1A1A1A", border: "1px solid #2A2F3A" }}
                    labelStyle={{ color: "#9CA3AF" }}
                  />
                  <Line yAxisId="price" type="monotone" dataKey="price" stroke="#22C55E" strokeWidth={2} dot={false} />
                  <Line
                    yAxisId="volume"
                    type="monotone"
                    dataKey="volume"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={false}
                    opacity={0.5}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}



