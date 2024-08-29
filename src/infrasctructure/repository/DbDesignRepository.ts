import IDbDesign from "../../domain/DbDesignInterface";
import DbDesignModal from "../databases/DbDesignModal";


export default class DbDesignRepository {
    constructor() {

    }


    async SaveDbDesignInDb(dbdesignData: IDbDesign) {
        const filter = { projectId: dbdesignData.projectId };
        const update = {
            nodes: dbdesignData.nodes,
            edges: dbdesignData.edges,
            viewport: dbdesignData.viewport
        };
        const options = {
            new: true,
            upsert: true,
            useFindAndModify: false
        };
        const saved = await DbDesignModal.findOneAndUpdate(filter, update, options);

        return saved;
    }


    async GetDbDesignsByprojectId(projectId: string) {
        return await DbDesignModal.findOne({ projectId })
    }


}