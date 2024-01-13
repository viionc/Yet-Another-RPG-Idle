import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {Provider} from "react-redux";
import {gameState, persistor} from "./gameState/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import Spinner from "./components/ui/Spinner.tsx";
import ErrorBoundary from "./ErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    // <React.StrictMode>
    <ErrorBoundary>
        <Provider store={gameState}>
            <PersistGate loading={<Spinner variant="lg" />} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </ErrorBoundary>
    // </React.StrictMode>,
);
