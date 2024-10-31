import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/app/store";
import useCustomSnackBar from "../hooks/useCustomSnackBar";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
} from "@mui/material";
import { CreateContentType } from "../types/ContentTypes";
import { create_content } from "../redux/features/content/contentSlice";

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

interface UserPostModalCreateProps {
    createModal: boolean;
    setCreateModal: (value: boolean) => void;
}

function UserPostModalCreate({
    createModal,
    setCreateModal,
}: UserPostModalCreateProps) {
    const { showSnackBar } = useCustomSnackBar();
    const dispatch = useDispatch<AppDispatch>();
    const [content, setContent] = useState<string>("");
    const [userInput, setUserInput] = useState<string>("");
    const { users } = useSelector((state: RootState) => state.user);

    const handleCreate = async () => {
        if (!content) {
            return showSnackBar({
                message: "Please enter data!",
                variant: "error",
            });
        }
        try {
            const payload: CreateContentType = {
                content,
                user_id: userInput,
            };
            const response = await dispatch(create_content(payload)).unwrap();
            setCreateModal(!createModal);
            showSnackBar({
                message: "Successfully Created!",
                variant: "success",
            });
            setContent("");
            setUserInput("");
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
                    setContent("");
                    setUserInput("");
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
                        Do you want to create a new content?
                    </Typography>
                    <div className="bg-gray-400 rounded mt-5 p-3">
                        <FormControl fullWidth variant="standard" sx={{ p: 1 }}>
                            <InputLabel id="content-select-label" sx={{ p: 1 }}>
                                User
                            </InputLabel>
                            <Select
                                labelId="content-select-label"
                                id="content-select"
                                value={userInput}
                                onChange={(e: SelectChangeEvent) =>
                                    setUserInput(e.target.value)
                                }
                            >
                                {users.map((user) => (
                                    <MenuItem key={user._id} value={user._id}>
                                        {user.username}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ p: 1 }}>
                            <TextField
                                label="Content"
                                type="text"
                                variant="standard"
                                multiline
                                minRows={1}
                                maxRows={7}
                                value={content}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setContent(e.target.value)}
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

export default UserPostModalCreate;
