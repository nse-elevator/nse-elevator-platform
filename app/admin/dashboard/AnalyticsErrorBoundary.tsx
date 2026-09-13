'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AnalyticsErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[AnalyticsErrorBoundary] Caught client-side rendering exception:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-white border border-steel-300 rounded-sm p-6 text-xs text-steel-700 shadow-milled">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emergency-500 animate-pulse" />
                <span className="text-emergency-600 font-bold font-mono uppercase text-xs tracking-wider">
                  Telemetry Visualizer Notice
                </span>
              </div>
              <p className="text-steel-600 font-mono text-xs mt-1">
                The visual analytics module encountered an unexpected browser rendering state: {this.state.error?.message || 'Client exception'}
              </p>
            </div>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-steel-900 hover:bg-steel-800 text-white rounded-sm font-mono text-xs transition-colors shrink-0"
            >
              🔄 Reload Analytics
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AnalyticsErrorBoundary;
