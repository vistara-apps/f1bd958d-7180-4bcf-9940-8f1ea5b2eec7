'use client';

import { useState, useCallback, useEffect } from 'react';
import { useWalletClient } from 'wagmi';
import {
  createX402Client,
  executePayment,
  waitForTransaction,
  checkUSDCBalance,
  USDC_BASE,
} from '../lib/x402-payment';
import type { AxiosInstance } from 'axios';

interface PaymentState {
  isProcessing: boolean;
  error: string | null;
  txHash: string | null;
  balance: string | null;
}

interface UseX402PaymentReturn {
  // State
  isProcessing: boolean;
  error: string | null;
  txHash: string | null;
  balance: string | null;
  
  // Actions
  createClient: (baseURL: string, maxAmount?: string) => AxiosInstance | null;
  pay: (amount: string, recipient: string) => Promise<boolean>;
  checkBalance: () => Promise<void>;
  clearError: () => void;
}

/**
 * React hook for x402 payment integration
 * Provides easy access to payment functionality with USDC on Base
 */
export function useX402Payment(): UseX402PaymentReturn {
  const { data: walletClient } = useWalletClient();
  
  const [state, setState] = useState<PaymentState>({
    isProcessing: false,
    error: null,
    txHash: null,
    balance: null,
  });

  // Check USDC balance on mount and when wallet changes
  useEffect(() => {
    if (walletClient) {
      checkBalance();
    }
  }, [walletClient]);

  const checkBalance = useCallback(async () => {
    if (!walletClient) {
      setState(prev => ({ ...prev, balance: null }));
      return;
    }

    try {
      const result = await checkUSDCBalance(walletClient);
      if (result) {
        setState(prev => ({ ...prev, balance: result.formattedBalance }));
      }
    } catch (error) {
      console.error('Error checking balance:', error);
    }
  }, [walletClient]);

  const createClient = useCallback(
    (baseURL: string, maxAmount?: string): AxiosInstance | null => {
      if (!walletClient) {
        setState(prev => ({
          ...prev,
          error: 'Wallet not connected. Please connect your wallet first.',
        }));
        return null;
      }

      try {
        const client = createX402Client(baseURL, walletClient, {
          maxAmount: maxAmount || '10',
        });

        setState(prev => ({ ...prev, error: null }));
        return client;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to create payment client';
        setState(prev => ({ ...prev, error: errorMessage }));
        return null;
      }
    },
    [walletClient]
  );

  const pay = useCallback(
    async (amount: string, recipient: string): Promise<boolean> => {
      if (!walletClient) {
        setState(prev => ({
          ...prev,
          error: 'Wallet not connected. Please connect your wallet first.',
        }));
        return false;
      }

      setState(prev => ({
        ...prev,
        isProcessing: true,
        error: null,
        txHash: null,
      }));

      try {
        // Validate amount
        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
          throw new Error('Invalid payment amount');
        }

        // Validate recipient address
        if (!recipient || !recipient.startsWith('0x') || recipient.length !== 42) {
          throw new Error('Invalid recipient address');
        }

        // Execute payment
        const result = await executePayment(walletClient, {
          amount,
          recipient,
        });

        if (!result.success) {
          throw new Error(result.error || 'Payment failed');
        }

        if (!result.txHash) {
          throw new Error('Transaction hash not received');
        }

        setState(prev => ({
          ...prev,
          txHash: result.txHash || null,
        }));

        // Wait for transaction confirmation
        const confirmation = await waitForTransaction(
          walletClient,
          result.txHash as `0x${string}`,
          1 // Wait for 1 confirmation
        );

        if (!confirmation.success) {
          throw new Error(
            confirmation.error || 'Transaction confirmation failed'
          );
        }

        setState(prev => ({
          ...prev,
          isProcessing: false,
          error: null,
        }));

        // Refresh balance after successful payment
        await checkBalance();

        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Payment failed';
        
        setState(prev => ({
          ...prev,
          isProcessing: false,
          error: errorMessage,
        }));

        return false;
      }
    },
    [walletClient, checkBalance]
  );

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    isProcessing: state.isProcessing,
    error: state.error,
    txHash: state.txHash,
    balance: state.balance,
    createClient,
    pay,
    checkBalance,
    clearError,
  };
}
