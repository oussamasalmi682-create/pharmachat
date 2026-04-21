import type { Server } from 'socket.io';

declare global {
  // eslint-disable-next-line no-var
  var io: Server | undefined;
}

export function getIO(): Server | null {
  return globalThis.io ?? null;
}
