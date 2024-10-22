export interface UserInitialState {
    users: UserType[];
}

export interface UserType {
    id: number;
    username: string;
    email: string;
    name: string;
    surname: string;
}
