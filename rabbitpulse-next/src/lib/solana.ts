import { clusterApiUrl, type Cluster } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

/**
 * Solana network + RPC configuration, sourced from env vars.
 *
 * NEXT_PUBLIC_SOLANA_NETWORK   "devnet" | "mainnet-beta" | "testnet"
 *                              defaults to "devnet" so unconfigured
 *                              previews never accidentally talk to mainnet.
 *
 * NEXT_PUBLIC_SOLANA_RPC_URL   Optional custom RPC endpoint (Helius,
 *                              QuickNode, etc.). When unset we fall
 *                              back to the public clusterApiUrl,
 *                              which is rate-limited and unreliable
 *                              but fine for first-touch dev.
 */

function parseNetwork(raw: string | undefined): WalletAdapterNetwork {
  switch (raw) {
    case "mainnet-beta":
    case "mainnet":
      return WalletAdapterNetwork.Mainnet;
    case "testnet":
      return WalletAdapterNetwork.Testnet;
    case "devnet":
    default:
      return WalletAdapterNetwork.Devnet;
  }
}

export const SOLANA_NETWORK: WalletAdapterNetwork = parseNetwork(
  process.env.NEXT_PUBLIC_SOLANA_NETWORK,
);

/** Maps adapter network names to web3.js cluster names. */
function toCluster(network: WalletAdapterNetwork): Cluster {
  switch (network) {
    case WalletAdapterNetwork.Mainnet:
      return "mainnet-beta";
    case WalletAdapterNetwork.Testnet:
      return "testnet";
    case WalletAdapterNetwork.Devnet:
    default:
      return "devnet";
  }
}

export const SOLANA_RPC_ENDPOINT: string =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL ?? clusterApiUrl(toCluster(SOLANA_NETWORK));

/** Friendly label, e.g. for the wallet-test page. */
export const SOLANA_NETWORK_LABEL: string =
  SOLANA_NETWORK === WalletAdapterNetwork.Mainnet
    ? "Mainnet"
    : SOLANA_NETWORK === WalletAdapterNetwork.Testnet
      ? "Testnet"
      : "Devnet";

/** Truncate a base58 public key for display ("AbCd…XyZ1"). */
export function shortAddress(addr: string, head = 4, tail = 4): string {
  if (addr.length <= head + tail + 1) return addr;
  return `${addr.slice(0, head)}…${addr.slice(-tail)}`;
}
