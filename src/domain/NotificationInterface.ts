import { Date } from "mongoose";

interface messages {
    messages: string,
    time: string
}


export interface INotification {
    projectId: string;
    userId: string;
    notifications: messages[]
    time: Date;
}