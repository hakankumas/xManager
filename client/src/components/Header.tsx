import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/app/store";

function Header() {
    const { session } = useSelector((state: RootState) => state.auth);
    return (
        <div className="bg-gradient-to-t from-slate-800 to-slate-600 p-3 text-xl flex justify-center gap-20">
            <Link to="/">xManager</Link>
            <Link to="/">Home</Link>
            {session ? (
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/logout">Logout</Link>
                </>
            ) : (
                <Link to="/login">Login</Link>
            )}
        </div>
    );
}

export default React.memo(Header);
