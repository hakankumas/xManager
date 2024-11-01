import { useEffect, useState } from "react";
import UserListItem from "./UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/app/store";
import { getall_user } from "../redux/features/user/userSlice";
import { UserType } from "../types/UserTypes";
import { FaRegPlusSquare } from "react-icons/fa";
import UserCreateModal from "./UserCreateModal";
function UserList() {
    const { users } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const [createModal, setCreateModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getall_user());
    }, []);

    return (
        <div className="flex flex-col gap-2 px-3 py-5 text-slate-200">
            <div className="flex justify-between items-center px-5">
                <h1 className="text-3xl flex justify-center text-slate-100">
                    User List
                </h1>
                <div
                    className="text-2xl hover:text-3xl hover:cursor-pointer"
                    title="Create User"
                >
                    <FaRegPlusSquare onClick={() => setCreateModal(true)} />
                </div>
            </div>
            <div>
                {users &&
                    users.map((user: UserType) => (
                        <UserListItem key={user._id} user={user} />
                    ))}
            </div>
            <UserCreateModal
                createModal={createModal}
                setCreateModal={setCreateModal}
            />
        </div>
    );
}

export default UserList;
