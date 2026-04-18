"use client";

import { useMemo, type ReactNode } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger";
import type { Adapter } from "@solana/wallet-adapter-base";
import { SOLANA_RPC_ENDPOINT } from "@/lib/solana";

/**
 * Real Solana wallet wiring.
 *
 * Modern Solana wallets (Phantom, Solflare, Backpack, etc.) implement
 * the Wallet Standard and auto-register with the adapter — we don't
 * have to list them. Ledger uses a separate transport, so it's added
 * explicitly.
 *
 * autoConnect lets a returning visitor reconnect their last-used
 * wallet without a fresh approval prompt.
 */
export function WalletAdapterProviders({ children }: { children: ReactNode }) {
  const wallets = useMemo<Adapter[]>(() => [new LedgerWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={SOLANA_RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
