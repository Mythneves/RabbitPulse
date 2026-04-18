"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWalletButton } from "@/components/wallet/ConnectWalletButton";
import { useSolBalance } from "@/lib/useSolBalance";
import { SOLANA_NETWORK_LABEL, SOLANA_RPC_ENDPOINT } from "@/lib/solana";

function maskRpc(url: string): string {
  // Hide the API key in URLs like:  https://x.helius-rpc.com/?api-key=ABC123
  return url.replace(/(api-key|apikey|key)=([^&]+)/gi, "$1=…");
}

export function WalletTestPanel() {
  const { publicKey, wallet, connected } = useWallet();
  const { sol, loading, error } = useSolBalance(publicKey);
  const [copied, setCopied] = useState(false);

  const fullAddress = publicKey?.toBase58() ?? null;

  const onCopy = async () => {
    if (!fullAddress) return;
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="rp-wallet-test">
      <dl className="rp-wallet-test-grid">
        <dt>Network</dt>
        <dd>{SOLANA_NETWORK_LABEL}</dd>

        <dt>RPC endpoint</dt>
        <dd>
          <code>{maskRpc(SOLANA_RPC_ENDPOINT)}</code>
        </dd>

        <dt>Wallet</dt>
        <dd>{wallet?.adapter.name ?? "—"}</dd>

        <dt>Status</dt>
        <dd>
          {connected ? (
            <span className="rp-status-ok">Connected</span>
          ) : (
            <span className="rp-status-idle">Not connected</span>
          )}
        </dd>

        <dt>Address</dt>
        <dd>
          {fullAddress ? (
            <span className="rp-wallet-test-address">
              <code>{fullAddress}</code>
              <button
                type="button"
                className="rp-wallet-test-copy"
                onClick={onCopy}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </span>
          ) : (
            "—"
          )}
        </dd>

        <dt>SOL balance</dt>
        <dd>
          {!fullAddress
            ? "—"
            : loading
              ? "Loading…"
              : error
                ? <span className="rp-status-err">{error}</span>
                : sol === null
                  ? "—"
                  : `${sol.toFixed(4)} SOL`}
        </dd>
      </dl>

      <div className="rp-cta-row">
        <ConnectWalletButton />
      </div>
    </div>
  );
}
