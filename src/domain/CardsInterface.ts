import { ObjectId } from "mongoose";

export interface Task {
    task: string;
    assignedMembers: ObjectId[];
}


export enum Icolumn {
    TODO = "ToDo",
    INPROGRESS = "Inprogress",
    TESTING = "Testing",
    COMPLETED = "Completed"
}

export interface CardInterface {
    _id?: string
    projectId: ObjectId;
    id: string;
    title: string;
    column: Icolumn;
    data?: Task[];
    TotalassignedMembers?: ObjectId[];
}
