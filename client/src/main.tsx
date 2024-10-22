import { createRoot } from "react-dom/client";
import "./App.css";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

// import { store } from "./redux/app/store.ts";
// import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
    // <Provider store={store}>
    //     <App />
    // </Provider>
    <>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </>
);
