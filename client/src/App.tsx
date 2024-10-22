import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="*" element={<Error />} />
            </Routes>
        </div>
    );
}

export default App;
