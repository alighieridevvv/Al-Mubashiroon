import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#ffffff',
          color: '#000000',
          padding: '20px',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflow: 'auto',
          zIndex: 999999
        }}>
          <div style={{
            border: '4px solid red',
            padding: '20px',
            backgroundColor: '#fff5f5'
          }}>
            <h1 style={{ color: 'red', fontSize: '24px', marginBottom: '10px' }}>
              ⚠️ DEBUG MODE - REACT ERROR BOUNDARY ⚠️
            </h1>
            <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              React render error caught by ErrorBoundary
            </p>
            <div style={{ marginBottom: '20px' }}>
              <strong>Error:</strong>
              <pre style={{ 
                backgroundColor: '#f0f0f0', 
                padding: '10px', 
                overflow: 'auto',
                border: '1px solid #ccc',
                marginTop: '5px'
              }}>
                {this.state.error?.toString()}
              </pre>
            </div>
            {this.state.errorInfo && (
              <div>
                <strong>Component Stack:</strong>
                <pre style={{ 
                  backgroundColor: '#f0f0f0', 
                  padding: '10px', 
                  overflow: 'auto',
                  border: '1px solid #ccc',
                  marginTop: '5px'
                }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
