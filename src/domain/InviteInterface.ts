import { ObjectId } from "mongoose";

export interface IinviteMembers {
    projectId: ObjectId;
    projectOwner: string;
    token: string;
}