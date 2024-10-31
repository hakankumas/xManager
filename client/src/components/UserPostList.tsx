import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/app/store";
import UserPostListItem from "./UserPostListItem";
import { getall_content } from "../redux/features/content/contentSlice";
import { ContentType } from "../types/ContentTypes";
import { FaRegPlusSquare } from "react-icons/fa";
import UserPostModalCreate from "./UserPostModalCreate";
function UserPostList() {
    const { contents } = useSelector((state: RootState) => state.content);
    const dispatch = useDispatch<AppDispatch>();
    const [createModal, setCreateModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getall_content());
    }, []);
    console.log(contents);
    return (
        <div className="flex flex-col gap-2 px-3 py-5 text-slate-200">
            <div className="flex justify-between items-center px-5">
                <h1 className="text-3xl flex justify-center text-slate-100">
                    User Posts List
                </h1>
                <div
                    className="text-2xl hover:text-3xl hover:cursor-pointer"
                    title="Create User"
                >
                    <FaRegPlusSquare onClick={() => setCreateModal(true)} />
                </div>
            </div>
            <div>
                {contents &&
                    contents.map((content: ContentType) => (
                        <UserPostListItem key={content._id} content={content} />
                    ))}
            </div>
            <UserPostModalCreate
                createModal={createModal}
                setCreateModal={setCreateModal}
            />
        </div>
    );
}

export default UserPostList;
