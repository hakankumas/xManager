import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/app/store";

function Header() {
    const { session } = useSelector((state: RootState) => state.auth);
    return (
        <div className="bg-gradient-to-t from-slate-800 to-slate-600 p-3 text-xl flex justify-center gap-20">
            {session ? (
                <>
                    <Link to="/admin/">xManager</Link>
                    <Link to="/admin/">Home</Link>
                    {/* <Link to="/admin/create-admin">Create Admin</Link> */}
                    <Link to="/logout" className="hover:text-red-500">
                        Logout
                    </Link>
                </>
            ) : (
                <>
                    <Link to="/">xManager</Link>
                    <Link to="/">Home</Link>
                    <Link to="/login" className="hover:text-green-500">
                        Login
                    </Link>
                </>
            )}
        </div>
    );
}

export default React.memo(Header);
