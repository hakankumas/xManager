import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/app/store";
import { getall_admin } from "../redux/features/admin/adminSlice";
import AdminListItem from "./AdminListItem";

function AdminList() {
    const { admins, errorMessage } = useSelector(
        (state: RootState) => state.admin
    );
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getall_admin());
    }, []);
    console.log(admins);
    return (
        <div className="flex flex-col gap-2 px-3 py-5 text-slate-200">
            <h1 className="text-3xl flex justify-center text-black">
                Admin List
            </h1>
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
        </div>
    );
}

export default AdminList;
