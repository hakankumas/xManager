import React from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="bg-gradient-to-t from-slate-800 to-slate-600 p-3 text-xl flex justify-center gap-20">
            <Link to="/">xManager</Link>
            <Link to="/">Home</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </div>
    );
}

export default React.memo(Header);
