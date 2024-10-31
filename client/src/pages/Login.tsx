import React, { useEffect, useState } from "react";
import { AuthType } from "../types/AuthTypes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/app/store";
import { login } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
    const { session } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [statusText, setStatusText] = useState<string>("");

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e: React.MouseEvent) => e.preventDefault();
    const handleMouseUpPassword = (e: React.MouseEvent) => e.preventDefault();

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
        <div className="flex">
            <div className="flex flex-col gap-5 p-14 w-1/2 h-screen bg-slate-600">
                <Typography
                    sx={{
                        textAlign: "start",
                        fontWeight: "bold",
                        fontSize: "40px",
                    }}
                >
                    xManager!
                </Typography>
                <Typography
                    sx={{
                        textAlign: "start",
                        fontWeight: "bold",
                        fontSize: "25px",
                    }}
                >
                    Lorem ipsum dolor sit amet!
                </Typography>
                <Typography
                    sx={{
                        textAlign: "start",
                        fontSize: "17px",
                    }}
                >
                    Aliquid ad nam cupiditate dolore nobis asperiores rerum,
                    odio reprehenderit minima nihil sequi dicta corrupti!
                </Typography>
                <Typography
                    sx={{
                        textAlign: "start",
                        fontSize: "17px",
                    }}
                >
                    Perferendis dolores officiis cumque aut pariatur esse eum
                    temporibus accusantium commodi, distinctio ipsam nisi!
                </Typography>
                <Typography
                    sx={{
                        textAlign: "start",
                        fontSize: "17px",
                    }}
                >
                    Rerum perspiciatis blanditiis nemo tempora repellendus
                    deserunt animi alias quia at porro maxime. Consequatur,
                    quisquam natus?
                </Typography>
                <Typography
                    sx={{
                        textAlign: "start",
                        fontSize: "17px",
                    }}
                >
                    Mollitia aliquam, nesciunt reiciendis perspiciatis eaque
                    dignissimos blanditiis officia libero incidunt aut.
                </Typography>
            </div>

            <div className="flex flex-col justify-center gap-5 px-20 w-1/2 h-screen bg-slate-400">
                <Typography
                    sx={{
                        textAlign: "left",
                        fontSize: "25px",
                        color: "black",
                    }}
                >
                    Login Page
                </Typography>
                <TextField
                    label="Username"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUsername(e.target.value)
                    }
                />
                <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                </FormControl>
                {statusText && (
                    <h6 className="text-red-600 flex justify-center">
                        {statusText}
                    </h6>
                )}
                <div className="flex justify-end">
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        color="success"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;
