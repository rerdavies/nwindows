/*
 *   Copyright (c) 2024-2025 Robin E. R. Davies
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

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