import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, FormControl, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
import useCustomSnackBar from "../hooks/useCustomSnackBar";
import { ContentType } from "../types/ContentTypes";
import { update_content } from "../redux/features/content/contentSlice";

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

interface UserPostListItemUpdateProps {
    updateModal: boolean;
    setUpdateModal: (value: boolean) => void;
    content: ContentType;
}

function UserPostListItemUpdate({
    updateModal,
    setUpdateModal,
    content,
}: UserPostListItemUpdateProps) {
    const { _id, content: dataContent } = content;
    const dispatch = useDispatch<AppDispatch>();
    const { showSnackBar } = useCustomSnackBar();
    const [inputContent, setInputContent] = useState<string>(dataContent || "");
    useEffect(() => {
        if (updateModal) {
            setInputContent(dataContent || "");
        }
    }, [dataContent, updateModal]);
    const handleUpdate = async () => {
        try {
            const payload: ContentType = {
                _id,
                content: inputContent,
            };

            const response = await dispatch(update_content(payload)).unwrap();
            setUpdateModal(!updateModal);
            showSnackBar({
                message: "Successfully Updated!",
                variant: "success",
            });
            setInputContent(dataContent || "");
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
                    setInputContent(dataContent || "");
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
                                label="Content"
                                variant="outlined"
                                multiline
                                minRows={1}
                                maxRows={7}
                                value={inputContent}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setInputContent(e.target.value)}
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

export default UserPostListItemUpdate;
