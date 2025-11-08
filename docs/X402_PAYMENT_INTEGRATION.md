# x402 Payment Integration Guide

## Overview

This TradeChampion application implements x402 payment flow using USDC on Base. The integration enables pay-per-use API access and direct USDC payments through a connected wallet.

## Components

### 1. Payment Library (`/lib/x402-payment.ts`)

Core payment functionality including:
- **USDC Configuration**: Pre-configured for Base mainnet
  - Contract: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
  - Decimals: 6
  - Chain ID: 8453

- **Functions**:
  - `createX402Client()` - Creates axios instance with payment headers
  - `executePayment()` - Executes USDC transfer
  - `waitForTransaction()` - Waits for transaction confirmation
  - `checkUSDCBalance()` - Checks wallet USDC balance

### 2. React Hook (`/hooks/useX402Payment.ts`)

React hook providing:
- Payment state management
- Wallet connection handling
- Balance checking
- Error handling
- Transaction status tracking

**Usage Example**:
```typescript
const {
  isProcessing,
  error,
  txHash,
  balance,
  pay,
  createClient,
  checkBalance,
} = useX402Payment();

// Direct payment
await pay('1.50', '0x...');

// Create x402 API client
const client = createClient('https://api.example.com', '10');
const response = await client.get('/protected-endpoint');
```

### 3. Demo Component (`/app/components/PaymentDemo.tsx`)

Interactive demo showcasing:
- Wallet connection
- USDC balance display
- Direct payment interface
- x402 API client creation
- Error handling
- Transaction confirmation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install x402-axios axios
```

### 2. Configure Environment

Create `.env.local`:
```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_coinbase_api_key
```

Get your API key from: https://portal.cdp.coinbase.com

### 3. Wallet Configuration

The app is pre-configured with:
- **Chain**: Base (mainnet)
- **Wallet**: Coinbase Smart Wallet
- **Token**: USDC

## Payment Flow

### Direct Payment Flow

1. **Connect Wallet**: User connects via Coinbase Wallet
2. **Check Balance**: Automatically checks USDC balance
3. **Enter Details**: User enters amount and recipient
4. **Execute Payment**: Calls USDC transfer function
5. **Wait for Confirmation**: Monitors transaction status
6. **Update Balance**: Refreshes balance after success

### x402 API Payment Flow

1. **Create Client**: Initialize axios with payment headers
2. **Sign Request**: Wallet signs request message
3. **Make API Call**: Send request with payment signature
4. **Handle Response**: Check for payment status headers
5. **Error Handling**: Handle 402 (Payment Required) errors

## Error Handling

### Payment Errors

- **Wallet Not Connected**: Prompts user to connect wallet
- **Insufficient Balance**: Shows clear error message
- **Invalid Amount**: Validates before submission
- **Invalid Recipient**: Validates address format
- **Transaction Failed**: Shows reason and allows retry
- **Network Errors**: Handles RPC and network issues

### x402 API Errors

- **402 Payment Required**: Shows required payment amount
- **403 Payment Failed**: Shows payment error details
- **Network Errors**: Graceful fallback with retry option

## Testing

### Manual Testing Checklist

- [x] Wallet connection works
- [x] Balance display updates correctly
- [x] Payment form validates input
- [x] Transaction submits successfully
- [x] Transaction confirmation works
- [x] Error states display properly
- [x] Success states show transaction hash
- [x] Balance refreshes after payment

### Test Scenarios

1. **Successful Payment**
   - Connect wallet with USDC
   - Enter valid amount and recipient
   - Confirm transaction
   - Verify transaction on Basescan

2. **Insufficient Balance**
   - Attempt payment exceeding balance
   - Verify error message displayed

3. **Network Issues**
   - Disconnect network during transaction
   - Verify error handling and recovery

4. **x402 API Integration**
   - Create client with valid URL
   - Make authenticated request
   - Verify payment headers included
   - Handle 402 responses correctly

## Security Considerations

### Transaction Safety

- All transactions require user confirmation
- Amounts validated before submission
- Recipient addresses validated
- Maximum amounts enforced on x402 clients

### API Security

- Request signing with wallet
- Timestamp included to prevent replay attacks
- Payment limits configurable per client
- No private keys stored or transmitted

## Integration Examples

### Basic Payment

```typescript
import { useX402Payment } from '@/hooks/useX402Payment';

function PaymentButton() {
  const { pay, isProcessing, error } = useX402Payment();

  const handlePay = async () => {
    const success = await pay('5.00', '0x...');
    if (success) {
      console.log('Payment successful!');
    }
  };

  return (
    <button onClick={handlePay} disabled={isProcessing}>
      {isProcessing ? 'Processing...' : 'Pay $5 USDC'}
    </button>
  );
}
```

### x402 Protected API

```typescript
import { useX402Payment } from '@/hooks/useX402Payment';

function ProtectedDataFetcher() {
  const { createClient } = useX402Payment();

  const fetchData = async () => {
    const client = createClient('https://api.example.com', '1.00');
    
    if (!client) {
      console.error('Failed to create client');
      return;
    }

    try {
      const response = await client.get('/premium-data');
      console.log('Data:', response.data);
    } catch (error) {
      if (error.response?.status === 402) {
        console.error('Payment required');
      }
    }
  };

  return <button onClick={fetchData}>Fetch Premium Data</button>;
}
```

## Troubleshooting

### Common Issues

**Issue**: Wallet won't connect
- **Solution**: Ensure OnchainKit API key is set
- **Solution**: Check browser extension permissions

**Issue**: Balance not showing
- **Solution**: Verify wallet has USDC on Base
- **Solution**: Check RPC endpoint connectivity

**Issue**: Transaction fails
- **Solution**: Check gas fees and wallet balance
- **Solution**: Verify recipient address is valid
- **Solution**: Ensure sufficient USDC balance

**Issue**: x402 client errors
- **Solution**: Verify wallet is connected
- **Solution**: Check API URL is correct
- **Solution**: Verify signature generation

## Resources

- [Base Network Documentation](https://docs.base.org)
- [USDC on Base Contract](https://basescan.org/token/0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- [OnchainKit Documentation](https://onchainkit.xyz)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review component examples
3. Test with the PaymentDemo component
4. Verify network and wallet status
