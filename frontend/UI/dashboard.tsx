"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, RefreshCwIcon as Refresh, Trash2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import axios from "axios";

// Fallback static data (in case API fails)
const fallbackData = [
  { date: "25 Apr", value: 0 },
  { date: "26 Apr", value: 0 },
  { date: "27 Apr", value: 0 },
  { date: "28 Apr", value: 0 },
  { date: "29 Apr", value: 200000 },
  { date: "30 Apr", value: 400000 },
  { date: "1 May", value: 400000 },
  { date: "2 May", value: 400000 },
];

export default function Dashboard() {
  const [accountBalance, setAccountBalance] = useState({
    total: 377018.29,
    change: -3.33,
    btcEquivalent: 6.5489026,
    btcChange: 1.21,
  });
  const [solanaBalance, setSolanaBalance] = useState({
    total: 500000,
    change: 5.0,
    solEquivalent: 10000,
    solChange: 2.5,
  });
  const [chartData, setChartData] = useState(fallbackData);
  const [activeBots, setActiveBots] = useState({
    dca: 1,
    grid: 1,
    dcaPnL: 0.81,
    gridPnL: 3.81,
  });

  // Fetch data from backend
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://nolandai.onrender.com";

    // Fetch user balance (example: assumes /users endpoint returns balance)
    const fetchUserBalance = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        const users = response.data.users;
        if (users.length > 0) {
          setAccountBalance({
            total: users[0].balance || 377018.29,
            change: -3.33, // Update with real data if available
            btcEquivalent: 6.5489026, // Update with real conversion
            btcChange: 1.21,
          });
        }
      } catch (error) {
        console.error("Error fetching user balance:", error);
      }
    };

    // Fetch Solana balance or token data (example: assumes /prices/SOL)
    const fetchSolanaBalance = async () => {
      try {
        const response = await axios.get(`${apiUrl}/prices/SOL`);
        const priceData = response.data;
        setSolanaBalance({
          total: priceData.price * 10000 || 500000, // Example: 10,000 SOL
          change: priceData.change || 5.0,
          solEquivalent: 10000,
          solChange: 2.5,
        });
      } catch (error) {
        console.error("Error fetching Solana data:", error);
      }
    };

    // Fetch chart data (example: assumes trade history from /trade)
    const fetchTradeData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/trade/history`); // Add this endpoint in backend if needed
        const trades = response.data.trades;
        const chartData = trades.map((trade) => ({
          date: new Date(trade.timestamp).toLocaleDateString(),
          value: trade.price * trade.amount,
        }));
        setChartData(chartData.length > 0 ? chartData : fallbackData);
      } catch (error) {
        console.error("Error fetching trade data:", error);
        setChartData(fallbackData);
      }
    };

    fetchUserBalance();
    fetchSolanaBalance();
    fetchTradeData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Bot Sections */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-[#1E2530] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">DCA Bots</h3>
            <Button variant="ghost" size="sm">Create</Button>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Active Bots</span>
              <span>{activeBots.dca}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Today PnL</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">PnL</span>
              <span className="text-green-500">+${activeBots.dcaPnL} ↑</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1E2530] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">GRID Bots</h3>
            <Button variant="ghost" size="sm">Create</Button>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Active Bots</span>
              <span>{activeBots.grid}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Today PnL</span>
              <span>$0</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Profit</span>
              <span className="text-green-500">+${activeBots.gridPnL} ↑</span>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1E2530] p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Signal Bots</h3>
            <Button variant="ghost" size="sm">Create</Button>
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
            <Button variant="ghost" size="sm">Create</Button>
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
                <div className="text-2xl font-medium">${accountBalance.total.toLocaleString()}</div>
                <div className={`text-sm ${accountBalance.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {accountBalance.change >= 0 ? "+" : ""}{accountBalance.change}%
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <div>≈{accountBalance.btcEquivalent} BTC</div>
                <div className="text-green-500">+{accountBalance.btcChange}%</div>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
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
                <div className="text-2xl font-medium">${solanaBalance.total.toLocaleString()}</div>
                <div className={`text-sm ${solanaBalance.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {solanaBalance.change >= 0 ? "+" : ""}{solanaBalance.change}%
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <div>≈{solanaBalance.solEquivalent} SOL</div>
                <div className="text-green-500">+{solanaBalance.solChange}%</div>
              </div>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
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
  );
}
