import { useState } from "react";
import { AdminDeleteId, AdminType } from "../types/AdminTypes";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalAdminItemDelete from "./ModalAdminItemDelete";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/app/store";
import { delete_admin } from "../redux/features/admin/adminSlice";
import useCustomSnackBar from "../hooks/useCustomSnackBar";

function AdminListItem({ admin }: { admin: AdminType }) {
    const { showSnackBar } = useCustomSnackBar();
    const { _id, username, email, password, pp_path, role } = admin;
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () => {
        console.log({ _id });
        try {
            const payload: AdminDeleteId = {
                _id,
            };
            const response = dispatch(delete_admin(payload));
            showSnackBar({
                message: "Successfully Deleted!",
                variant: "success",
            });
        } catch (error) {
            showSnackBar({ message: "Something went wrong", variant: "error" });
        }
    };
    return (
        <div className="flex items-center border gap-5 my-3 mx-3 p-3 hover:bg-slate-600 rounded-md">
            <div className="w-3/4">
                <h1>{"@" + username}</h1>
            </div>
            <div className="flex w-1/4">
                <button className="w-1/2 flex justify-center items-center">
                    <FaEdit className="hover:text-green-400 hover:bg-slate-700 rounded-md p-1 text-3xl" />
                </button>
                <button className="w-1/2 flex justify-center items-center">
                    <MdDelete
                        className="hover:text-red-500 hover:bg-slate-700 rounded-md p-1 text-3xl"
                        onClick={() => setDeleteModal(true)}
                    />
                </button>
                <ModalAdminItemDelete
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}

export default AdminListItem;
