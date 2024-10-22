import React, { useState } from "react";

function Register() {
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = () => {
        console.log({ email, username, password });
    };

    return (
        <div className="flex flex-col w-1/4 gap-2 p-5 text-black">
            <input
                type="text"
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
            <button onClick={handleSubmit} className="bg-green-600">
                Register
            </button>
        </div>
    );
}

export default Register;
