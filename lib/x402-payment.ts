import axios, { AxiosInstance } from 'axios';
import { WalletClient, createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

// USDC on Base configuration
export const USDC_BASE = {
  address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as const,
  decimals: 6,
  symbol: 'USDC',
  name: 'USD Coin',
  chainId: 8453, // Base mainnet
};

interface PaymentOptions {
  amount: string; // Amount in USDC (e.g., "1.50" for $1.50)
  recipient?: string;
  memo?: string;
}

interface PaymentResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

/**
 * Creates an axios instance configured with x402 payment headers
 * This enables pay-per-use API access using USDC on Base
 */
export function createX402Client(
  baseURL: string,
  walletClient: WalletClient,
  paymentConfig?: {
    maxAmount?: string;
    recipient?: string;
  }
): AxiosInstance {
  const client = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      // x402 headers for payment-gated APIs
      'X-Payment-Token': USDC_BASE.address,
      'X-Payment-Chain': USDC_BASE.chainId.toString(),
      'X-Payment-Max-Amount': paymentConfig?.maxAmount || '10', // Max $10 USDC per request
    },
  });

  // Add request interceptor to sign payment requests
  client.interceptors.request.use(
    async (config) => {
      try {
        if (!walletClient.account) {
          throw new Error('Wallet not connected');
        }

        // Add wallet address to headers
        config.headers['X-Payment-Address'] = walletClient.account.address;

        // Sign the request for authentication
        const message = `TradeChampion API Request\nTimestamp: ${Date.now()}`;
        const signature = await walletClient.signMessage({
          account: walletClient.account,
          message,
        });

        config.headers['X-Payment-Signature'] = signature;
        config.headers['X-Payment-Timestamp'] = Date.now().toString();

        return config;
      } catch (error) {
        console.error('Error signing payment request:', error);
        throw error;
      }
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor for payment status handling
  client.interceptors.response.use(
    (response) => {
      // Check for payment status headers
      const paymentStatus = response.headers['x-payment-status'];
      const txHash = response.headers['x-payment-tx'];
      
      if (paymentStatus === 'completed' && txHash) {
        console.log('Payment completed:', txHash);
      }

      return response;
    },
    async (error) => {
      if (error.response) {
        const status = error.response.status;
        
        // Handle payment-specific errors
        if (status === 402) {
          const requiredAmount = error.response.headers['x-payment-required'];
          throw new Error(
            `Payment required: ${requiredAmount} USDC. Please ensure you have sufficient balance.`
          );
        }
        
        if (status === 403 && error.response.headers['x-payment-error']) {
          throw new Error(
            `Payment failed: ${error.response.headers['x-payment-error']}`
          );
        }
      }

      throw error;
    }
  );

  return client;
}

/**
 * Execute a payment transaction using USDC on Base
 */
export async function executePayment(
  walletClient: WalletClient,
  options: PaymentOptions
): Promise<PaymentResult> {
  try {
    if (!walletClient.account) {
      return {
        success: false,
        error: 'Wallet not connected',
      };
    }

    // Convert USDC amount to smallest unit (6 decimals)
    const amountInSmallestUnit = BigInt(
      Math.floor(parseFloat(options.amount) * 10 ** USDC_BASE.decimals)
    );

    // Build transaction to transfer USDC
    const txHash = await walletClient.writeContract({
      address: USDC_BASE.address,
      abi: [
        {
          name: 'transfer',
          type: 'function',
          stateMutability: 'nonpayable',
          inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' },
          ],
          outputs: [{ name: '', type: 'bool' }],
        },
      ],
      functionName: 'transfer',
      args: [
        options.recipient as `0x${string}`,
        amountInSmallestUnit,
      ],
      account: walletClient.account,
      chain: walletClient.chain,
    });

    return {
      success: true,
      txHash,
    };
  } catch (error) {
    console.error('Payment execution error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment failed',
    };
  }
}

/**
 * Wait for a transaction to be confirmed
 */
export async function waitForTransaction(
  walletClient: WalletClient,
  txHash: `0x${string}`,
  confirmations: number = 1
): Promise<{ success: boolean; error?: string }> {
  try {
    // Create a public client for reading transaction receipts
    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });

    // Wait for the transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({
      hash: txHash,
      confirmations,
    });

    if (receipt.status === 'success') {
      return { success: true };
    } else {
      return {
        success: false,
        error: 'Transaction failed',
      };
    }
  } catch (error) {
    console.error('Error waiting for transaction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Transaction confirmation failed',
    };
  }
}

/**
 * Check USDC balance for connected wallet
 */
export async function checkUSDCBalance(
  walletClient: WalletClient
): Promise<{ balance: string; formattedBalance: string } | null> {
  try {
    if (!walletClient.account) {
      return null;
    }

    // Create a public client for reading contract data
    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });

    const balance = await publicClient.readContract({
      address: USDC_BASE.address,
      abi: [
        {
          name: 'balanceOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'account', type: 'address' }],
          outputs: [{ name: '', type: 'uint256' }],
        },
      ],
      functionName: 'balanceOf',
      args: [walletClient.account.address],
    });

    const formattedBalance = (
      Number(balance) /
      10 ** USDC_BASE.decimals
    ).toFixed(2);

    return {
      balance: balance.toString(),
      formattedBalance: `${formattedBalance} USDC`,
    };
  } catch (error) {
    console.error('Error checking USDC balance:', error);
    return null;
  }
}
