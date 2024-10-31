import { useEffect } from "react";
import AdminList from "../components/AdminList";
import { isSession } from "../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
import UserList from "../components/UserList";
import UserPostList from "../components/UserPostList";

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
            <div className="w-1/4 bg-slate-700">
                <AdminList />
            </div>
            <div className="w-1/4 bg-slate-700">
                <UserList />
            </div>
            <div className="w-2/4 bg-slate-700">
                <UserPostList />
            </div>
        </div>
    );
}

export default Home;
