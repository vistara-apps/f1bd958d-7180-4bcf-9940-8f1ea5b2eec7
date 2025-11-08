# TradeChampion - Base Mini App

Prove your trading skills. Challenge friends, win crypto.

## Features

- **Head-to-Head Trade Duels**: Challenge traders to direct duels with crypto wagers
- **Group Trading Tournaments**: Compete in organized tournaments with prize pools
- **NFT Holder Gating**: Exclusive access for NFT collection holders
- **Trader Reputation & Leaderboards**: Track performance and build social capital
- **Gasless Transactions**: Smooth UX with sponsored transactions via Paymaster

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (L2 on Ethereum)
- **Wallet Integration**: OnchainKit, Coinbase Wallet
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
│   ├── ConnectWallet.tsx
│   ├── DuelCard.tsx
│   ├── TournamentCard.tsx
│   └── LeaderboardItem.tsx
├── page.tsx            # Home page
├── layout.tsx          # Root layout
└── globals.css         # Global styles

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

## Design System

- **Theme**: Coinbase (dark navy background, Coinbase blue accents)
- **Colors**: CSS variables for easy theming
- **Typography**: System fonts with responsive sizing
- **Components**: Mobile-first, accessible, production-ready

## License

MIT
