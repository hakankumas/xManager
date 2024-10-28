export interface UserInitialState {
    users: UserType[];
    errorMessage: null | string;
}

export interface UserType {
    _id?: string;
    username: string;
    email?: string;
    password?: string;
    pp_path?: string;
    telephone?: number;
    aboutme?: string;
}

export interface UserById {
    _id?: string;
}
