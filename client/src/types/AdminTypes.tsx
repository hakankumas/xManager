export interface AdminInitialState {
    admins: AdminType[];
    errorMessage: string;
}

export interface AdminType {
    _id?: string;
    username: string;
    email?: string;
    password?: string;
    pp_path?: string;
    role?: string;
}

export interface AdminDeleteId {
    _id?: string;
}
