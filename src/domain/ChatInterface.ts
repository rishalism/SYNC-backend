import { Document } from 'mongoose'; 

export interface IMessage {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  text: string;
  timestamp: number;
}

export interface IChat {
  projectId: string;
  messages: IMessage[];
}
