import Layout from "./layout"
import { TokenTable } from "./components/token-table"
import { TokenChart } from "./components/token-chart"
import { Rocket } from "lucide-react" // Changed to use lucide-react

export default function Page() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Fast Trade, Fast Copy Trade</h1>
        <h2 className="flex items-center text-xl text-gray-400">
          Fast AFK Automation <Rocket className="ml-2 h-5 w-5" />
        </h2>
      </div>
      <div className="mb-8">
        <TokenChart />
      </div>
      <TokenTable />
    </Layout>
  )
}

