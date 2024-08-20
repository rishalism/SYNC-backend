import { ISVISIBLE, NotePadInterface } from "../../domain/NotePadInterface"
import NotePadModal from "../databases/NotePadModal"



export default class NotePadRepository {

    constructor(

    ) { }


    async checkIfTitleAlreadyExist(title: string) {
        return NotePadModal.findOne({ title: title })
    }


    async SaveNewNote(noteDetails: NotePadInterface) {
        const note = await new NotePadModal(noteDetails)
        return await note.save()
    }

    async getNoteById(projectId: string, userid: string) {
        console.log(projectId, userid);

        const note = await NotePadModal.find({ projectId: projectId, $or: [{ is_visible: ISVISIBLE.TO_EVERYONE }, { user_id: userid }] })
        return note
    }


    async UpdateNoteById(notepadDetails: NotePadInterface) {
        return await NotePadModal.findByIdAndUpdate(notepadDetails._id, { title: notepadDetails.title, notes: notepadDetails.notes, is_visible: notepadDetails.is_visible })
    }

    async DeleteBydId(id: string) {
        console.log(id);
        return await NotePadModal.findByIdAndDelete(id)
    }

}