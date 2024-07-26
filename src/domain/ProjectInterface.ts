import { ObjectId } from "mongoose";




export interface Project {
    _id?: string;
    projectName: string;
    projectOwner: ObjectId;
    description: string;
    ProjectMembers?: ObjectId[];
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date
}