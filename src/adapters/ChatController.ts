import { IChat } from "../domain/ChatInterface";
import { httpStatus } from "../infrasctructure/constants/httpStatus";
import { Next, Req, Res } from "../infrasctructure/types/expressTypes";
import ChatUseCase from "../use_case/ChatUsecase";




export default class ChatController {
    constructor(
        private chatusecase: ChatUseCase
    ) { }



    async SaveChats(req: Req, res: Res, next: Next) {
        try {
            const { id, sender, text, timestamp, projectId } = req.body;
            const message = await this.chatusecase.saveMessage({ id, sender, text, timestamp });
            if (message) {
                const data: IChat = {
                    projectId: projectId,
                    messages: [{
                        id: message.id,
                        sender: {
                            id: message.sender.id,
                            avatar: message.sender.avatar,
                            name: message.sender.name
                        },
                        text: message.text,
                        timestamp: message.timestamp
                    }]
                };
                // Save or update the conversation
                const conversation = await this.chatusecase.saveChats(data);
                if (conversation) {
                    res.status(httpStatus.OK).json('chat saved');
                }
            }
        } catch (error) {
            next(error);
        }
    }




    async GetChats(req: Req, res: Res, next: Next) {
        try {
            const projectId = req.params.projectId
            // get chats by project id 
            const chats = await this.chatusecase.Getchats(projectId)
            if (chats) {
                res.status(httpStatus.OK).json(chats)
            } 
        } catch (error) {
            next(error)

        }
    }


}