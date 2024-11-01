import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Logout from "./components/Logout";
import Home from "./pages/Home";
import Footer from "./components/Footer";
function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Index />} />

                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                <Route path="/admin/" element={<Home />} />

                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
