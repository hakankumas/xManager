import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { AppDispatch } from "../redux/app/store";

const Logout = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logout());
        navigate("/login");
    }, [dispatch, navigate]);

    return null;
};

export default Logout;
