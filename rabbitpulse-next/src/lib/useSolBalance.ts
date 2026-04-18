"use client";

import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL, type PublicKey } from "@solana/web3.js";
import { useConnection } from "@solana/wallet-adapter-react";

type State = {
  /** Balance in SOL (not lamports). null until first load or while disconnected. */
  sol: number | null;
  loading: boolean;
  error: string | null;
};

const IDLE: State = { sol: null, loading: false, error: null };

/**
 * Subscribes to a wallet's SOL balance. Refetches whenever the
 * account changes on-chain. Returns null while the publicKey is
 * absent or the first fetch is in flight.
 */
export function useSolBalance(publicKey: PublicKey | null): State {
  const { connection } = useConnection();
  const [state, setState] = useState<State>(IDLE);

  useEffect(() => {
    if (!publicKey) {
      // We deliberately don't reset state here — the next branch
      // overrides it. Doing both would cascade-render.
      return;
    }

    let cancelled = false;
    const onErr = (err: unknown) => {
      if (cancelled) return;
      setState({
        sol: null,
        loading: false,
        error: err instanceof Error ? err.message : String(err),
      });
    };

    // Kick off the loading state for the initial fetch. This is a
    // legitimate "start async work" case; React's setState-in-effect
    // rule is overzealous here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ sol: null, loading: true, error: null });

    connection
      .getBalance(publicKey, "confirmed")
      .then((lamports) => {
        if (cancelled) return;
        setState({
          sol: lamports / LAMPORTS_PER_SOL,
          loading: false,
          error: null,
        });
      })
      .catch(onErr);

    let subscription: number | null = null;
    try {
      subscription = connection.onAccountChange(
        publicKey,
        (account) => {
          if (cancelled) return;
          setState({
            sol: account.lamports / LAMPORTS_PER_SOL,
            loading: false,
            error: null,
          });
        },
        { commitment: "confirmed" },
      );
    } catch (err) {
      onErr(err);
    }

    return () => {
      cancelled = true;
      if (subscription !== null) {
        connection.removeAccountChangeListener(subscription).catch(() => {
          /* silent — connection may already be torn down */
        });
      }
    };
  }, [connection, publicKey]);

  // Without a publicKey, we don't have anything to report.
  if (!publicKey) return IDLE;
  return state;
}
