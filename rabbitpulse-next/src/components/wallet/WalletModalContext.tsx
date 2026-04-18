"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type WalletModalContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const WalletModalContext = createContext<WalletModalContextValue | null>(null);

/**
 * Provider that holds the open/closed state of the wallet modal.
 * In Phase 6 this gets composed alongside the real Solana wallet
 * adapter provider, but the open/close API stays the same so
 * existing call sites (Hero "Connect Wallet" button etc.) don't
 * need to change.
 */
export function WalletModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  const value = useMemo(
    () => ({ isOpen, open, close, toggle }),
    [isOpen, open, close, toggle],
  );

  return (
    <WalletModalContext.Provider value={value}>
      {children}
    </WalletModalContext.Provider>
  );
}

export function useWalletModal(): WalletModalContextValue {
  const ctx = useContext(WalletModalContext);
  if (!ctx) {
    throw new Error(
      "useWalletModal must be used inside <WalletModalProvider>.",
    );
  }
  return ctx;
}
