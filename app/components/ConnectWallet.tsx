'use client';

import {
  ConnectWallet as OnchainConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';

export function ConnectWallet() {
  return (
    <div className="flex items-center gap-2">
      <Wallet>
        <OnchainConnectWallet
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-accent text-white rounded-lg transition-all duration-200 shadow-button"
          text="Connect Wallet"
        >
          <Avatar className="h-6 w-6" />
          <Name className="text-sm font-medium" />
        </OnchainConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 py-2" hasCopyAddressOnClick>
            <Avatar />
            <Name />
            <Address />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
