import React from "react";
import CreateAdmin from "../components/CreateAdmin";
import CreateUser from "../components/CreateUser";
import EditAdmin from "../components/EditAdmin";
import EditUser from "../components/EditUser";

function Home() {
    return (
        <div className="flex mx-3 gap-3 min-h-screen">
            <div className="w-1/4 bg-slate-500">
                <CreateAdmin />
            </div>
            <div className="w-1/4 bg-slate-500">
                <EditAdmin />
            </div>
            <div className="w-1/4 bg-slate-500">
                <CreateUser />
            </div>
            <div className="w-1/4 bg-slate-500">
                <EditUser />
            </div>
        </div>
    );
}

export default Home;
