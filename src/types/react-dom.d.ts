declare module 'react-dom/client' {
  import * as React from 'react';
  export function createRoot(
    container: Element | DocumentFragment,
    options?: {
      onRecoverableError?: (error: unknown) => void;
      identifierPrefix?: string;
    }
  ): {
    render(children: React.ReactNode): void;
    unmount(): void;
  };
} 