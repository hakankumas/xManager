import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ContentById, ContentType } from "../types/ContentTypes";
import UserPostListItemDelete from "./UserPostListItemDelete";
import { useState } from "react";
import useCustomSnackBar from "../hooks/useCustomSnackBar";
import { AppDispatch } from "../redux/app/store";
import { useDispatch } from "react-redux";
import { delete_content } from "../redux/features/content/contentSlice";

interface UserPostListItemProps {
    content: ContentType;
}

function UserPostListItem({ content }: UserPostListItemProps) {
    console.log("UserPostListItem component rendered.");

    const { showSnackBar } = useCustomSnackBar();
    const dispatch = useDispatch<AppDispatch>();
    const { content: dataContent, user, _id } = content;
    const [deleteModal, setDeleteModal] = useState<boolean>(false);

    const handleDelete = async () => {
        try {
            const payload: ContentById = {
                _id,
            };
            const response = await dispatch(delete_content(payload)).unwrap();
            showSnackBar({
                message: "Successfully Deleted!",
                variant: "success",
            });
        } catch (error) {
            showSnackBar({
                message: error as string,
                variant: "error",
            });
        }
    };
    return (
        <div className="flex items-center border gap-5 my-3 mx-3 p-3 hover:bg-slate-600 rounded-md">
            <div className="w-5/6 flex gap-5">
                <div className="w-1/4">
                    <p>{"@" + user?.username}</p>
                </div>
                <div className="w-3/4">
                    <p>{dataContent}</p>
                </div>
            </div>
            <div className="flex w-1/6">
                <button className="w-1/2 flex justify-center items-center">
                    <FaEdit className="hover:text-green-400 hover:bg-slate-700 rounded-md p-1 text-3xl" />
                </button>
                <button className="w-1/2 flex justify-center items-center">
                    <MdDelete
                        className="hover:text-red-500 hover:bg-slate-700 rounded-md p-1 text-3xl"
                        onClick={() => setDeleteModal(true)}
                    />
                </button>
                <UserPostListItemDelete
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}

export default UserPostListItem;
