import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ContentType } from "../types/ContentTypes";

interface UserPostListItemProps {
    content: ContentType;
}

function UserPostListItem({ content }: UserPostListItemProps) {
    console.log("UserPostListItem component rendered.");
    const { content: dataContent, user } = content;
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
                    <MdDelete className="hover:text-red-500 hover:bg-slate-700 rounded-md p-1 text-3xl" />
                </button>
            </div>
        </div>
    );
}

export default UserPostListItem;
