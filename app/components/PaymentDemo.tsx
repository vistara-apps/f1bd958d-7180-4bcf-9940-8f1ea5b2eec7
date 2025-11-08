'use client';

import { useState } from 'react';
import { useX402Payment } from '../../hooks/useX402Payment';
import { DollarSign, CheckCircle, XCircle, Loader2 } from 'lucide-react';

/**
 * Demo component showcasing x402 payment flow
 * This demonstrates how to use the useX402Payment hook for USDC payments on Base
 */
export function PaymentDemo() {
  const {
    isProcessing,
    error,
    txHash,
    balance,
    pay,
    createClient,
    clearError,
  } = useX402Payment();

  const [amount, setAmount] = useState('1.00');
  const [recipient, setRecipient] = useState('');
  const [apiUrl, setApiUrl] = useState('https://api.example.com');

  const handlePayment = async () => {
    const success = await pay(amount, recipient);
    if (success) {
      console.log('Payment successful!', txHash);
    }
  };

  const handleCreateClient = () => {
    const client = createClient(apiUrl, '10');
    if (client) {
      console.log('x402 client created successfully');
      // Example API call with payment
      // client.get('/protected-endpoint')
      //   .then(response => console.log(response.data))
      //   .catch(err => console.error(err));
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6 shadow-card space-y-6">
      <div className="flex items-center gap-3 border-b border-primary/10 pb-4">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">x402 Payment Demo</h3>
          <p className="text-sm text-neutral">Test USDC payments on Base</p>
        </div>
      </div>

      {/* Balance Display */}
      {balance && (
        <div className="bg-bg rounded-lg p-4">
          <div className="text-xs text-neutral mb-1">Your Balance</div>
          <div className="text-lg font-bold text-primary">{balance}</div>
        </div>
      )}

      {/* Direct Payment */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Direct Payment</h4>
        
        <div>
          <label className="block text-xs text-neutral mb-1">Amount (USDC)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 bg-bg border border-primary/20 rounded-lg focus:border-primary outline-none"
            placeholder="1.00"
            step="0.01"
            min="0.01"
            disabled={isProcessing}
          />
        </div>

        <div>
          <label className="block text-xs text-neutral mb-1">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-3 py-2 bg-bg border border-primary/20 rounded-lg focus:border-primary outline-none text-sm font-mono"
            placeholder="0x..."
            disabled={isProcessing}
          />
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing || !amount || !recipient}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-accent disabled:bg-neutral/20 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 shadow-button"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <DollarSign className="w-4 h-4" />
              <span>Send Payment</span>
            </>
          )}
        </button>
      </div>

      {/* x402 Client Setup */}
      <div className="space-y-3 pt-4 border-t border-primary/10">
        <h4 className="font-medium text-sm">x402 API Client</h4>
        
        <div>
          <label className="block text-xs text-neutral mb-1">API Base URL</label>
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="w-full px-3 py-2 bg-bg border border-primary/20 rounded-lg focus:border-primary outline-none text-sm"
            placeholder="https://api.example.com"
            disabled={isProcessing}
          />
        </div>

        <button
          onClick={handleCreateClient}
          disabled={isProcessing || !apiUrl}
          className="w-full px-4 py-3 bg-accent hover:bg-primary disabled:bg-neutral/20 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
        >
          Create x402 Client
        </button>
      </div>

      {/* Status Messages */}
      {error && (
        <div className="flex items-start gap-2 p-3 bg-danger/10 border border-danger/20 rounded-lg">
          <XCircle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm font-medium text-danger">Payment Error</div>
            <div className="text-xs text-danger/80 mt-1">{error}</div>
          </div>
          <button
            onClick={clearError}
            className="text-danger hover:text-danger/80 text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {txHash && !error && (
        <div className="flex items-start gap-2 p-3 bg-success/10 border border-success/20 rounded-lg">
          <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm font-medium text-success">
              Payment Successful!
            </div>
            <a
              href={`https://basescan.org/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-success/80 hover:text-success mt-1 break-all underline"
            >
              View on Basescan: {txHash.slice(0, 10)}...{txHash.slice(-8)}
            </a>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
        <p className="text-xs text-neutral">
          <strong>Note:</strong> This demo shows how to integrate x402 payments
          using USDC on Base. The payment flow includes wallet connection,
          transaction signing, confirmation, and error handling.
        </p>
      </div>
    </div>
  );
}
