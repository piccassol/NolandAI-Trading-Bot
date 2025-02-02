import React, { useEffect, useState } from 'react';
import { getTokenPrice } from '../api/trading';

const TokenList = ({ tokens }) => {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      const pricePromises = tokens.map(async (token) => {
        const price = await getTokenPrice(token.address);
        return { address: token.address, price };
      });

      const priceData = await Promise.all(pricePromises);
      const priceMap = priceData.reduce((acc, { address, price }) => {
        acc[address] = price;
        return acc;
      }, {});

      setPrices(priceMap);
    };

    fetchPrices();
  }, [tokens]);

  return (
    <div>
      <h2>Token List</h2>
      <ul>
        {tokens.map((token) => (
          <li key={token.address}>
            <strong>{token.symbol}</strong>: {prices[token.address] || 'Loading...'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TokenList;
