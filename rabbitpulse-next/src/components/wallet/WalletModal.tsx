"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";
import {
  useWallet,
  type Wallet,
} from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWalletModal } from "./WalletModalContext";

/**
 * On-brand wallet picker. Reads the live list of detected wallets
 * from the Solana wallet adapter and triggers the proper select() +
 * connect() flow when a button is clicked.
 *
 * Wallets the browser doesn't currently have (no extension installed,
 * no mobile deep-link) are still listed but render with an "Install"
 * link to the wallet's website instead of a connect action.
 */
export function WalletModal() {
  const { isOpen, close } = useWalletModal();
  const { wallets, select, connect, connecting, connected } = useWallet();

  // Sort: installed/loadable wallets first, then everything else.
  const sortedWallets = useMemo(() => {
    const order: Record<WalletReadyState, number> = {
      [WalletReadyState.Installed]: 0,
      [WalletReadyState.Loadable]: 1,
      [WalletReadyState.NotDetected]: 2,
      [WalletReadyState.Unsupported]: 3,
    };
    return [...wallets].sort(
      (a, b) => order[a.readyState] - order[b.readyState],
    );
  }, [wallets]);

  // Auto-close once a wallet successfully connects.
  useEffect(() => {
    if (connected) close();
  }, [connected, close]);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  const handleSelect = async (wallet: Wallet) => {
    if (
      wallet.readyState !== WalletReadyState.Installed &&
      wallet.readyState !== WalletReadyState.Loadable
    ) {
      // Send the user to the wallet's homepage to install it.
      window.open(wallet.adapter.url, "_blank", "noopener,noreferrer");
      return;
    }
    try {
      select(wallet.adapter.name);
      await connect();
      // Closing happens in the `connected` effect above.
    } catch (err) {
      // The user usually gets a friendlier in-wallet message; we
      // log here for diagnostics without being noisy in the UI.
      console.error("Wallet connect failed:", err);
    }
  };

  return (
    <div
      className={`rp-wallet-modal${isOpen ? " is-open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal={isOpen}
      aria-label="Connect a wallet"
    >
      <div className="rp-wallet-modal-content">
        <button
          type="button"
          className="rp-wallet-modal-close"
          onClick={close}
          aria-label="Close"
        >
          ×
        </button>
        <h2>Connect to the Pulse</h2>
        <p>Choose your wallet to enter the RabbitPulse ecosystem.</p>

        <div className="rp-wallet-options">
          {sortedWallets.length === 0 ? (
            <p className="rp-wallet-empty">
              No Solana wallet detected in this browser. Install one to
              continue.
            </p>
          ) : (
            sortedWallets.map((wallet) => {
              const ready =
                wallet.readyState === WalletReadyState.Installed ||
                wallet.readyState === WalletReadyState.Loadable;
              return (
                <button
                  key={wallet.adapter.name}
                  type="button"
                  className="rp-wallet-btn"
                  onClick={() => handleSelect(wallet)}
                  disabled={connecting}
                >
                  <span>{wallet.adapter.name}</span>
                  <span className="rp-wallet-btn-right">
                    {ready ? (
                      <span className="rp-wallet-status rp-wallet-status-ready">
                        Detected
                      </span>
                    ) : (
                      <span className="rp-wallet-status rp-wallet-status-install">
                        Install
                      </span>
                    )}
                    {wallet.adapter.icon ? (
                      <Image
                        src={wallet.adapter.icon}
                        alt=""
                        width={28}
                        height={28}
                        className="rp-wallet-logo"
                        unoptimized
                      />
                    ) : (
                      <span className="rp-wallet-logo-placeholder" aria-hidden>
                        {wallet.adapter.name.slice(0, 1)}
                      </span>
                    )}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <p className="rp-no-wallet">
          No wallet?
          <a
            href="https://phantom.app/download"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Phantom
          </a>
        </p>
      </div>
    </div>
  );
}
