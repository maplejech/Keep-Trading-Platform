import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-black text-red-500 p-10 font-mono">
                    <h1 className="text-4xl mb-4">Something went wrong.</h1>
                    <div className="bg-gray-900 p-6 rounded border border-red-900 overflow-auto max-w-full">
                        <p className="font-bold mb-2">{this.state.error && this.state.error.toString()}</p>
                        <pre className="text-xs text-gray-400 whitespace-pre-wrap">
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>
                    <button
                        className="mt-8 px-6 py-2 bg-white text-black rounded hover:bg-gray-200"
                        onClick={() => window.location.reload()}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
