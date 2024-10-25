import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    backgroundColor: "black",
    color: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

interface ModalAdminItemDeleteProps {
    deleteModal: boolean;
    setDeleteModal: (value: boolean) => void;
    handleDelete: () => void;
}

function ModalAdminItemDelete({
    deleteModal,
    setDeleteModal,
    handleDelete,
}: ModalAdminItemDeleteProps) {
    return (
        <div>
            <Modal
                open={deleteModal}
                onClose={() => setDeleteModal(!deleteModal)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        sx={{ textAlign: "center" }}
                    >
                        Are you sure you want to delete this?
                    </Typography>
                    <div className="flex justify-end gap-3 mt-10">
                        <Button
                            onClick={handleDelete}
                            variant="contained"
                            color="error"
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => setDeleteModal(!deleteModal)}
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

export default ModalAdminItemDelete;
