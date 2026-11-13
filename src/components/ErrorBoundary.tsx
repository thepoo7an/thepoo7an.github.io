import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    window.location.reload();
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen bg-background text-foreground flex items-center justify-center p-6"
          role="alert"
        >
          <div className="max-w-md w-full rounded-2xl bg-card border border-border p-8 text-center flex flex-col items-center gap-4 shadow-token-md">
            <div className="size-12 rounded-xl bg-secondary border border-border flex items-center justify-center text-muted-foreground" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="text-xl font-bold">خطایی رخ داده است</h2>
            <p className="text-sm text-muted-foreground">
              متأسفانه مشکلی در بارگذاری صفحه پیش آمده است.
            </p>
            <button
              onClick={this.handleRetry}
              className="mt-2 min-h-[44px] px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95"
              type="button"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
