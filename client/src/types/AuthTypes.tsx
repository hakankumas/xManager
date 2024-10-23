export interface AuthInitialState {
    auth: AuthType[];
    session: boolean;
}

export interface AuthType {
    _id?: number;
    username: string;
    email?: string;
    password?: string;
    pp_path?: string;
    role?: string;
}
