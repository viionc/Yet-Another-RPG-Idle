import {Component, ErrorInfo, ReactNode} from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(): State {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="w-full h-[100vh] flex justify-center items-center flex-col gap-2">
                    <h1 className="text-yellow-500">Sorry.. there was an error</h1>
                    <p className="text-white">
                        There is a lot of changes happening pretty often, so if the app crashes you might need to clear your local storage data.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
