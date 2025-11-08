# TradeChampion - Base Mini App

Prove your trading skills. Challenge friends, win crypto.

## Features

- **Head-to-Head Trade Duels**: Challenge traders to direct duels with crypto wagers
- **Group Trading Tournaments**: Compete in organized tournaments with prize pools
- **NFT Holder Gating**: Exclusive access for NFT collection holders
- **Trader Reputation & Leaderboards**: Track performance and build social capital
- **x402 Payments**: USDC payments on Base with pay-per-use API access
- **Gasless Transactions**: Smooth UX with sponsored transactions via Paymaster

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet Integration**: OnchainKit, Coinbase Wallet, wagmi
- **Payments**: x402-axios for payment-gated APIs, USDC on Base
- **Social Integration**: Farcaster Mini App SDK
- **Styling**: Tailwind CSS with Coinbase theme
- **Type Safety**: TypeScript

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.local.example .env.local
```

3. Add your OnchainKit API key to `.env.local`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── AppShell.tsx    # Main layout with navigation
│   ├── ConnectWallet.tsx # OnchainKit wallet integration
│   ├── PaymentDemo.tsx # x402 payment demonstration
│   ├── DuelCard.tsx
│   ├── TournamentCard.tsx
│   ├── Providers.tsx   # Wagmi & OnchainKit setup
│   └── LeaderboardItem.tsx
├── page.tsx            # Home page
├── layout.tsx          # Root layout
└── globals.css         # Global styles

lib/
└── x402-payment.ts     # Payment utilities and USDC integration

hooks/
└── useX402Payment.ts   # React hook for payment flow

docs/
├── X402_PAYMENT_INTEGRATION.md  # Payment integration guide
└── TESTING_GUIDE.md    # Comprehensive testing guide

public/
└── .well-known/
    └── farcaster.json  # Mini App manifest
```

## Base Mini App Integration

This app is built as a Farcaster Mini App with:
- OnchainKit for wallet and transaction components
- Farcaster SDK for social features and notifications
- Base network integration (Chain ID: 8453)
- Gasless transactions via Paymaster

## x402 Payment Integration

The app implements x402 payment flow for USDC transactions on Base:

### Features
- ✅ Wagmi + useWalletClient integration
- ✅ USDC on Base (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)
- ✅ Transaction confirmation with 1+ block confirmations
- ✅ Comprehensive error handling
- ✅ Balance checking
- ✅ Payment-gated API support via x402-axios

### Quick Start

```typescript
import { useX402Payment } from '@/hooks/useX402Payment';

function MyComponent() {
  const { pay, balance, isProcessing, error } = useX402Payment();

  const handlePayment = async () => {
    const success = await pay('1.50', '0xRecipientAddress');
    if (success) {
      console.log('Payment successful!');
    }
  };

  return (
    <div>
      <p>Balance: {balance}</p>
      <button onClick={handlePayment} disabled={isProcessing}>
        Pay $1.50 USDC
      </button>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
```

### Documentation
- [Payment Integration Guide](./docs/X402_PAYMENT_INTEGRATION.md) - Complete integration documentation
- [Testing Guide](./docs/TESTING_GUIDE.md) - Step-by-step testing instructions

### Testing
See the interactive payment demo on the homepage after connecting your wallet. The demo includes:
- Direct USDC payments
- Balance checking
- x402 API client creation
- Error handling examples

## Design System

- **Theme**: Coinbase (dark navy background, Coinbase blue accents)
- **Colors**: CSS variables for easy theming
- **Typography**: System fonts with responsive sizing
- **Components**: Mobile-first, accessible, production-ready

## License

MIT
