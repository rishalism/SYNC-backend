
import { NotePadInterface } from "../domain/NotePadInterface";
import NotePadRepository from "../infrasctructure/repository/NotePadRepository";




export default class NotePadUsecase {
    constructor(
        private notepadrepo: NotePadRepository
    ) { }

    async CreateNewNote(notepadDetails: NotePadInterface) {
        return await this.notepadrepo.SaveNewNote(notepadDetails)
    }


    async checkIfThetitleAlreadyExist(title: string) {
        return await this.notepadrepo.checkIfTitleAlreadyExist(title)
    }


    async GetNotes(projectId: string, userId: string) {
        return await this.notepadrepo.getNoteById(projectId, userId)
    }

    async UpdateNote(notepadDetails: NotePadInterface) {
        return await this.notepadrepo.UpdateNoteById(notepadDetails)
    }


    async DeleteNote(id: string){
        return await this.notepadrepo.DeleteBydId(id)
    }

}