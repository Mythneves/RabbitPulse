"use client";

import { useEffect } from "react";
import { useWalletModal } from "./WalletModalContext";

const WALLETS = [
  { name: "Phantom", initial: "P" },
  { name: "Solflare", initial: "S" },
  { name: "Ledger", initial: "L" },
] as const;

/**
 * Visual placeholder for the wallet picker. The buttons are inert
 * until Phase 6, where this modal is replaced with the official
 * @solana/wallet-adapter-react-ui modal (or a custom-styled
 * version of it).
 */
export function WalletModal() {
  const { isOpen, close } = useWalletModal();

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
          {WALLETS.map((w) => (
            <button
              key={w.name}
              type="button"
              className="rp-wallet-btn"
              onClick={() => {
                alert(
                  `${w.name} integration is coming in Phase 6 (Solana wallet adapter on devnet).`,
                );
              }}
            >
              <span>{w.name}</span>
              <span className="rp-wallet-logo-placeholder" aria-hidden>
                {w.initial}
              </span>
            </button>
          ))}
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
