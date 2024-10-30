import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
import useCustomSnackBar from "../hooks/useCustomSnackBar";
import { UserType } from "../types/UserTypes";
import { update_user } from "../redux/features/user/userSlice";

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

interface UserListItemModalUpdateProps {
    updateModal: boolean;
    setUpdateModal: (value: boolean) => void;
    user: UserType;
}

function UserListItemModalUpdate({
    updateModal,
    setUpdateModal,
    user,
}: UserListItemModalUpdateProps) {
    const { _id, email, username } = user;
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
        try {
            const payload: UserType = {
                _id: _id,
                email: inputEmail,
                username: inputUsername,
                password: inputPassword,
            };

            const response = await dispatch(update_user(payload)).unwrap();
            setUpdateModal(!updateModal);
            showSnackBar({
                message: "Successfully Updated!",
                variant: "success",
            });
            setInputEmail("");
            setInputUsername("");
            setInputPassword("");
        } catch (error) {
            showSnackBar({
                message: error as string,
                variant: "error",
            });
        }
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

export default UserListItemModalUpdate;
