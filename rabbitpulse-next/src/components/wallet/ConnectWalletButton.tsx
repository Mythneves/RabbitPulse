"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useWalletModal } from "./WalletModalContext";
import { shortAddress } from "@/lib/solana";

type ConnectWalletButtonProps = {
  label?: string;
};

/**
 * Smart wallet CTA:
 *   - Disconnected: opens the modal ("Connect Wallet").
 *   - Connecting:   shows "Connecting…" disabled.
 *   - Connected:    shows the truncated address; click disconnects.
 */
export function ConnectWalletButton({
  label = "Connect Wallet",
}: ConnectWalletButtonProps) {
  const { open } = useWalletModal();
  const { publicKey, connecting, disconnect, disconnecting, wallet } =
    useWallet();

  if (publicKey) {
    return (
      <button
        type="button"
        onClick={() => disconnect().catch(() => undefined)}
        className="rp-btn-primary"
        disabled={disconnecting}
        aria-label={`Disconnect ${wallet?.adapter.name ?? "wallet"}`}
      >
        {shortAddress(publicKey.toBase58())}
        <span className="rp-btn-disconnect-hint" aria-hidden>
          ×
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className="rp-btn-primary"
      disabled={connecting}
    >
      {connecting ? "Connecting…" : label}
      {connecting ? null : <ArrowIcon />}
    </button>
  );
}
