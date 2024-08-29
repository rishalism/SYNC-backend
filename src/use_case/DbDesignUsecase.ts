import IDbDesign from "../domain/DbDesignInterface";
import DbDesignRepository from "../infrasctructure/repository/DbDesignRepository";




export default class DbDesignUsecase {

    constructor(
        private dbdesignrepo: DbDesignRepository

    ) { }


    async saveDbDesign(dbdesignData: IDbDesign) {
        return await this.dbdesignrepo.SaveDbDesignInDb(dbdesignData)
    }


    async getdbdesignByProjectId(projectId: string) {
        return await this.dbdesignrepo.GetDbDesignsByprojectId(projectId)
    }


}