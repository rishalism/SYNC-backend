import ApiToolInterface from "../../domain/ApiToolInterface";
import ApiTestingModal from "../databases/ApiTestingModal";

export default class ApiRepository {
    constructor() {

    }


    async saveTestedApiInDb(apiDetails: ApiToolInterface) {
        const saved = new ApiTestingModal(apiDetails);
        return await saved.save()
    }


    async checkMethodAndUrlIsSame(projectId: string, method: string, url: string) {
        const apidetails = await ApiTestingModal.findOne({ projectId, url, method })
        return apidetails
    }


    async findByProjectId(projectId: string) {
        return await ApiTestingModal.find({ projectId })
    }


    async removeOnByprojectid(projectId: string, id: string) {
        return await ApiTestingModal.findByIdAndDelete(id, { projectId })
    }

}