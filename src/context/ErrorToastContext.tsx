import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from "react";

interface ErrorToastContextValue {
  showError: (message: string) => void;
  dismiss: () => void;
}

const ErrorToastContext = createContext<ErrorToastContextValue | null>(null);

const AUTO_DISMISS_MS = 6000;

export function ErrorToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setMessage(null);
  }, []);

  const showError = useCallback((msg: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setMessage(msg);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setMessage(null);
    }, AUTO_DISMISS_MS);
  }, []);

  return (
    <ErrorToastContext.Provider value={{ showError, dismiss }}>
      {children}
      {message !== null && (
        <div className="errorToast" role="alert">
          <span className="errorToastMessage">{message}</span>
          <button type="button" className="errorToastDismiss" onClick={dismiss} aria-label="Dismiss">
            Dismiss
          </button>
        </div>
      )}
    </ErrorToastContext.Provider>
  );
}

export function useErrorToast(): ErrorToastContextValue {
  const ctx = useContext(ErrorToastContext);
  if (!ctx) throw new Error("useErrorToast must be used within ErrorToastProvider");
  return ctx;
}
