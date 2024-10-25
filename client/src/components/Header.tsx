import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/app/store";

function Header() {
    const { session } = useSelector((state: RootState) => state.auth);
    return (
        <div className="bg-gradient-to-t from-slate-800 to-slate-600 p-3 text-xl px-10">
            {session ? (
                <div className="flex flex-1 justify-between gap-10 items-center">
                    <div className="flex gap-10 items-center">
                        <Link to="/admin/" className="text-2xl pb-1">
                            xManager
                        </Link>
                        <Link to="/admin/">Home</Link>
                    </div>
                    <div>
                        <Link to="/logout" className="hover:text-red-500">
                            Logout
                        </Link>
                    </div>
                </div>
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
