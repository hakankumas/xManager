import React, { useState } from "react";
import { AdminType } from "../types/AdminTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
import { create_admin } from "../redux/features/admin/adminSlice";
import useCustomSnackBar from "../hooks/useCustomSnackBar";
function AdminCreate() {
    const { showSnackBar } = useCustomSnackBar();
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async () => {
        if (!email || !username || !password) {
            return showSnackBar({
                message: "Please enter full data!",
                variant: "error",
            });
        }
        const payload: AdminType = {
            email,
            username,
            password,
        };
        const response = await dispatch(create_admin(payload));
        const errorMessage = response.payload.message;
        if (errorMessage) {
            showSnackBar({ message: errorMessage, variant: "error" });
            return;
        }
        showSnackBar({ message: "Successfully!", variant: "success" });
    };

    return (
        <div className="flex flex-col gap-2 px-10 py-5 text-black">
            <h1 className="text-3xl flex justify-center">Create Admin</h1>
            <input
                type="email"
                placeholder="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
            />
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
            <div className="flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="bg-green-600 p-2 rounded-md  text-slate-200"
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default AdminCreate;
