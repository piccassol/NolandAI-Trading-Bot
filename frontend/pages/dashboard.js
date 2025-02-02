import { useEffect, useState } from "react";
import { getTradeLogs } from "../api/trading";

const DashboardPage = () => {
  const [tradeLogs, setTradeLogs] = useState([]);

  useEffect(() => {
    // Fetch trade logs
    // Example: setTradeLogs([{ symbol: "TOKEN", amount: 100, price: 1.23, timestamp: "2025-02-02T15:35:53" }]);
  }, []);

  return (
    <div>
      <h1>Trade Logs</h1>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {tradeLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.symbol}</td>
              <td>{log.amount}</td>
              <td>{log.price}</td>
              <td>{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
