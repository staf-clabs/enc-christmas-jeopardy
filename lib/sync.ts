import type { GameState } from './types';
import { STORAGE_KEY } from './state';

const CHANNEL_NAME = 'enc-jeopardy-sync';

export function broadcastState(state: GameState) {
  try {
    const ch = new BroadcastChannel(CHANNEL_NAME);
    ch.postMessage({ type: 'STATE', payload: state });
    ch.close();
  } catch {
    // ignore
  }
}

export function listen(onState: (s: GameState) => void) {
  const bc = (() => {
    try {
      return new BroadcastChannel(CHANNEL_NAME);
    } catch {
      return null;
    }
  })();

  function onStorage(e: StorageEvent) {
    if (e.key !== STORAGE_KEY) return;
    if (!e.newValue) return;
    try {
      onState(JSON.parse(e.newValue));
    } catch {
      // ignore
    }
  }

  function onBC(e: MessageEvent) {
    if (e?.data?.type === 'STATE') onState(e.data.payload);
  }

  window.addEventListener('storage', onStorage);
  bc?.addEventListener('message', onBC);

  return () => {
    window.removeEventListener('storage', onStorage);
    bc?.removeEventListener('message', onBC);
    bc?.close();
  };
}
