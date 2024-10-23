export interface AdminInitialState {
    admins: AdminType[];
}

export interface AdminType {
    _id?: number;
    username: string;
    email?: string;
    password?: string;
    pp_path?: string;
    role?: string;
}
