export interface UserInitialState {
    users: UserType[];
    errorMessage: null | string;
}

export interface UserType {
    _id?: string;
    email?: string;
    username?: string;
    password?: string;
    pp_path?: string;
    telephone?: number | string;
    aboutme?: string;
}

export interface UserById {
    _id?: string;
}
