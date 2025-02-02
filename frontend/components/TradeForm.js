import React, { useState } from 'react';
import { getTokenPrice, executeTrade } from '../api/trading';

const TradeForm = () => {
    const [inputToken, setInputToken] = useState('');
    const [outputToken, setOutputToken] = useState('');
    const [amount, setAmount] = useState('');
    const [fromAddress, setFromAddress] = useState('');
    const [slippage, setSlippage] = useState(0.5);
    const [price, setPrice] = useState(null);
    const [signedTransaction, setSignedTransaction] = useState('');

    const handlePriceCheck = async () => {
        const fetchedPrice = await getTokenPrice(inputToken, outputToken, amount, fromAddress, slippage);
        setPrice(fetchedPrice);
    };

    const handleTrade = async () => {
        const result = await executeTrade(signedTransaction);
        if (result) {
            alert('Trade executed successfully!');
        } else {
            alert('Trade execution failed.');
        }
    };

    return (
        <div>
            <h2>Trade Form</h2>
            <input
                type="text"
                placeholder="Input Token Address"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
            />
            <input
                type="text"
                placeholder="Output Token Address"
                value={outputToken}
                onChange={(e) => setOutputToken(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="From Address"
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
            />
            <input
                type="number"
                placeholder="Slippage"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
            />
            <button onClick={handlePriceCheck}>Check Price</button>
            {price && <p>Price: {price}</p>}
            <textarea
                placeholder="Signed Transaction"
                value={signedTransaction}
                onChange={(e) => setSignedTransaction(e.target.value)}
            />
            <button onClick={handleTrade}>Execute Trade</button>
        </div>
    );
};

export default TradeForm;
