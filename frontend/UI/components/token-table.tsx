"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  { time: "00:00", price: 0.000012 },
  { time: "04:00", price: 0.000014 },
  { time: "08:00", price: 0.000013 },
  { time: "12:00", price: 0.000015 },
  { time: "16:00", price: 0.000016 },
  { time: "20:00", price: 0.000014 },
  { time: "24:00", price: 0.000015 },
]

export function TokenChart() {
  return (
    <Card className="bg-[#111111] p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">BONK/USD</h2>
          <p className="text-lg text-green-500">$0.00001234 (+15.5%)</p>
        </div>
        <Tabs defaultValue="1d">
          <TabsList className="bg-[#1A1A1A]">
            <TabsTrigger value="1h">1H</TabsTrigger>
            <TabsTrigger value="4h">4H</TabsTrigger>
            <TabsTrigger value="1d">1D</TabsTrigger>
            <TabsTrigger value="1w">1W</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="#4B5563" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#4B5563"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value.toFixed(6)}`}
            />
            <Tooltip contentStyle={{ background: "#1A1A1A", border: "none" }} labelStyle={{ color: "#9CA3AF" }} />
            <Line type="monotone" dataKey="price" stroke="#22C55E" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

