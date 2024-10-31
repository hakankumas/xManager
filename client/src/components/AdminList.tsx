import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/app/store";
import { getall_admin } from "../redux/features/admin/adminSlice";
import AdminListItem from "./AdminListItem";
import { FaRegPlusSquare } from "react-icons/fa";
import AdminCreateModal from "./AdminCreateModal";

function AdminList() {
    const { admins, errorMessage } = useSelector(
        (state: RootState) => state.admin
    );
    const dispatch = useDispatch<AppDispatch>();
    const [createModal, setCreateModal] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getall_admin());
    }, []);

    return (
        <div className="flex flex-col gap-2 px-3 py-5 text-slate-200">
            <div className="flex justify-between items-center px-5">
                <h1 className="text-3xl flex justify-center text-slate-100">
                    Admin List
                </h1>
                <div
                    className="text-2xl hover:text-3xl hover:cursor-pointer"
                    title="Create User"
                >
                    <FaRegPlusSquare onClick={() => setCreateModal(true)} />
                </div>
            </div>
            <div>
                {admins &&
                    admins.map((admin) => (
                        <AdminListItem
                            key={admin._id}
                            admin={admin}
                            errorMessage={errorMessage}
                        />
                    ))}
            </div>
            <AdminCreateModal
                createModal={createModal}
                setCreateModal={setCreateModal}
            />
        </div>
    );
}

export default AdminList;
