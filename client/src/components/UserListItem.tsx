import React, { useState } from "react";
import { UserById, UserType } from "../types/UserTypes";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/app/store";
import { delete_user } from "../redux/features/user/userSlice";
import useCustomSnackBar from "../hooks/useCustomSnackBar";
import UserListItemModalDelete from "./UserListItemModalDelete";

interface UserListItemProps {
    user: UserType;
}

function UserListItem({ user }: UserListItemProps) {
    console.log("UserListItem component rendered.");

    const { errorMessage } = useSelector((state: RootState) => state.user);
    const { showSnackBar } = useCustomSnackBar();
    const dispatch = useDispatch<AppDispatch>();
    const { _id, username } = user;
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const handleDelete = () => {
        try {
            const payload: UserById = {
                _id,
            };
            dispatch(delete_user(payload));
            showSnackBar({
                message: "Successfully Deleted!",
                variant: "success",
            });
        } catch (error) {
            console.log(error);
            showSnackBar({ message: errorMessage as string, variant: "error" });
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
                <UserListItemModalDelete
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}

export default UserListItem;
