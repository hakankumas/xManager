import { useEffect } from "react";
import CreateAdmin from "../components/AdminCreate";
import EditAdmin from "../components/AdminList";
import { isSession, login } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
// import CreateUser from "../components/CreateUser";
// import EditUser from "../components/EditUser";

function Home() {
    const dispatch = useDispatch<AppDispatch>();
    const ls_username = localStorage.getItem("username");
    const ls_token = localStorage.getItem("token");

    useEffect(() => {
        if (ls_username && ls_token) {
            dispatch(isSession());
        }
    }, []);
    return (
        <div className="flex mx-3 gap-3 min-h-screen">
            <div className="w-1/4 bg-slate-500">
                <CreateAdmin />
            </div>
            <div className="w-1/4 bg-slate-500">
                <EditAdmin />
            </div>
            {/* <div className="w-1/4 bg-slate-500">
                <CreateUser />
            </div>
            <div className="w-1/4 bg-slate-500">
                <EditUser />
            </div> */}
        </div>
    );
}

export default Home;
