import React, { useEffect, useState } from "react";
import { AuthType } from "../types/AuthTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/app/store";
import { login } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
    const { session } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [statusText, setStatusText] = useState<string>("");

    const handleSubmit = async () => {
        if (!username || !password)
            return alert("Please enter username and password");
        const payload: AuthType = {
            username,
            password,
        };
        const response = await dispatch(login(payload));
        const errorMessage = response.payload.message;
        if (errorMessage) setStatusText(errorMessage);
    };

    useEffect(() => {
        if (session) navigate("/admin/");
    }, [session]);

    return (
        <div className="flex flex-col w-1/4 gap-2 p-5 text-black">
            <input
                type="text"
                placeholder="Username"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
            />
            <input
                type="text"
                placeholder="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
            />
            {statusText && (
                <h6 className="text-red-600 flex justify-center">
                    {statusText}
                </h6>
            )}
            <button onClick={handleSubmit} className="bg-green-600">
                Login
            </button>
        </div>
    );
}

export default Login;
