import React from 'react';

interface ErrorBoundaryProps {
    children: React.ReactNode;
};

interface ErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;

};


class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false, errorMessage: "" };
    }
  
    static getDerivedStateFromError(error: Error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, errorMessage: error.message };
    }
  
    // componentDidCatch(error: Error, info: React.ErrorInfo) {
    //   // Example "componentStack":
    //   //   in ComponentThatThrows (created by App)
    //   //   in ErrorBoundary (created by App)
    //   //   in div (created by App)
    //   //   in App
    //   // logErrorToMyService(error, info.componentStack);
    // }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return (<div>{this.state.errorMessage}</div>)
      }
  
      return this.props.children;
    }
  }

  export default ErrorBoundary;