import { ObjectId } from "mongoose";

export enum ISVISIBLE {
    TO_ME = 'only me',
    TO_EVERYONE = 'everyone'
}

export interface NotePadInterface {
    _id?: string;
    projectId: ObjectId;
    user_id: ObjectId
    title: string;
    notes: string;
    is_visible: ISVISIBLE;
    createdAt?: string,
    updatedAt?: String
}
