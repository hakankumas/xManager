import { UserType } from "./UserTypes";

export interface ContentInitialState {
    contents: ContentType[];
}

export interface ContentType {
    _id?: string;
    content?: string;
    user?: UserType;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateContentType {
    _id?: string;
    content?: string;
    user_id?: string;
}

export interface ContentById {
    _id?: string;
}
