"use client";

import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useWalletModal } from "./WalletModalContext";

type ConnectWalletButtonProps = {
  label?: string;
};

/**
 * Small Client Component wrapper around the "Connect Wallet" CTA so
 * that pages composed mostly of static lore can stay Server Components
 * (and keep their `metadata` export) while still triggering the
 * wallet modal on click.
 */
export function ConnectWalletButton({
  label = "Connect Wallet",
}: ConnectWalletButtonProps) {
  const { open } = useWalletModal();
  return (
    <button type="button" onClick={open} className="rp-btn-primary">
      {label}
      <ArrowIcon />
    </button>
  );
}
