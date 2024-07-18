import { ObjectId } from "mongoose";




export interface Project {
    _id?: string;
    projectName: string;
    projectOwner: ObjectId;
    description: string;
    ProjectMembers?: ObjectId[];
    createdAt?: Date;
    updatedAt?: Date
}