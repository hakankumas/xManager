import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, FormControl, TextField } from "@mui/material";
import { useState } from "react";
import { UserType } from "../types/UserTypes";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
import { create_user } from "../redux/features/user/userSlice";
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

interface UserCreateModalProps {
    createModal: boolean;
    setCreateModal: (value: boolean) => void;
}

function UserCreateModal({
    createModal,
    setCreateModal,
}: UserCreateModalProps) {
    const { showSnackBar } = useCustomSnackBar();
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [telephone, setTelephone] = useState<number | string>("");
    const [aboutme, setAboutme] = useState<string>("");

    const handleCreate = async () => {
        if (!email || !username || !password) {
            return showSnackBar({
                message: "Please enter Email, Username and Password!",
                variant: "error",
            });
        }
        try {
            const payload: UserType = {
                email,
                username,
                password,
                telephone,
                aboutme,
            };
            const response = await dispatch(create_user(payload)).unwrap();
            setCreateModal(!createModal);
            showSnackBar({
                message: "Successfully Created!",
                variant: "success",
            });
            setEmail("");
            setUsername("");
            setPassword("");
            setTelephone("");
            setAboutme("");
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
                open={createModal}
                onClose={() => {
                    setCreateModal(!createModal);
                    setEmail("");
                    setUsername("");
                    setPassword("");
                    setTelephone("");
                    setAboutme("");
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
                        Do you want to create a new user?
                    </Typography>
                    <div className="bg-gray-400 rounded mt-5 p-3">
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <TextField
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <TextField
                                label="Username"
                                type="text"
                                variant="outlined"
                                value={username}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setUsername(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <TextField
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <TextField
                                label="Telephone"
                                type="number"
                                variant="outlined"
                                value={telephone}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setTelephone(e.target.value)}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <TextField
                                label="About Me"
                                type="text"
                                variant="outlined"
                                multiline
                                minRows={1}
                                maxRows={3}
                                value={aboutme}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setAboutme(e.target.value)}
                            />
                        </FormControl>
                    </div>
                    <div className="flex justify-end gap-3 mt-10">
                        <Button
                            onClick={handleCreate}
                            variant="contained"
                            color="success"
                        >
                            Create
                        </Button>
                        <Button
                            onClick={() => setCreateModal(!createModal)}
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

export default UserCreateModal;
