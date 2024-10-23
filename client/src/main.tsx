import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/app/store.tsx";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <SnackbarProvider maxSnack={3}>
                <App />
            </SnackbarProvider>
        </BrowserRouter>
    </Provider>
);
