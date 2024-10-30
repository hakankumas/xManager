import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import { AdminType } from "../types/AdminTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
import { update_admin } from "../redux/features/admin/adminSlice";
import useCustomSnackBar from "../hooks/useCustomSnackBar";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    backgroundColor: "black",
    color: "white",
    border: "1px solid whitesmoke",
    borderRadius: "10px",
    boxShadow: "0px 0px 5px 0px gray",
    p: 4,
};

interface AdminListItemModalUpdateProps {
    updateModal: boolean;
    setUpdateModal: (value: boolean) => void;
    admin: AdminType;
    errorMessage: string;
}

function AdminListItemModalUpdate({
    updateModal,
    setUpdateModal,
    admin,
    errorMessage,
}: AdminListItemModalUpdateProps) {
    const { _id, email, username } = admin;
    const dispatch = useDispatch<AppDispatch>();
    const { showSnackBar } = useCustomSnackBar();
    const [inputEmail, setInputEmail] = useState<string>("");
    const [inputUsername, setInputUsername] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");

    const handleUpdate = async () => {
        if (!inputEmail && !inputPassword && !inputUsername) {
            return showSnackBar({
                message: "Please enter new data!",
                variant: "error",
            });
        }
        const payload: AdminType = {
            _id: _id,
            email: inputEmail,
            username: inputUsername,
            password: inputPassword,
        };
        const resultAction = await dispatch(update_admin(payload));
        if (update_admin.rejected.match(resultAction)) {
            const errorMessage = resultAction.payload as string;
            return showSnackBar({ message: errorMessage, variant: "error" });
        }
        showSnackBar({ message: "Successfully!", variant: "success" });
        setUpdateModal(!updateModal);
        setInputEmail("");
        setInputUsername("");
        setInputPassword("");
    };
    return (
        <div>
            <Modal
                open={updateModal}
                onClose={() => {
                    setUpdateModal(!updateModal);
                    setInputEmail("");
                    setInputUsername("");
                    setInputPassword("");
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        sx={{ textAlign: "center" }}
                    >
                        Are you sure you want to update this?
                    </Typography>
                    <div className="bg-gray-400 rounded mt-5 p-3">
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                placeholder={email}
                                value={inputEmail}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setInputEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <TextField
                                label="Username"
                                variant="outlined"
                                placeholder={username}
                                value={inputUsername}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setInputUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <TextField
                                label="Password"
                                variant="outlined"
                                value={inputPassword}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setInputPassword(e.target.value)}
                            />
                        </FormControl>
                    </div>
                    <div className="flex justify-end gap-3 mt-10">
                        <Button
                            onClick={handleUpdate}
                            variant="contained"
                            color="success"
                        >
                            Update
                        </Button>
                        <Button
                            onClick={() => setUpdateModal(!updateModal)}
                            variant="contained"
                            sx={{ backgroundColor: "gray" }}
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AdminListItemModalUpdate;
