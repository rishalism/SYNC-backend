import axios, { AxiosError } from 'axios'
import ApiToolInterface from '../domain/ApiToolInterface'
import ApiRepository from '../infrasctructure/repository/ApiRepository';



export default class ApiToolUseCase {
    constructor(
        private apitoolrepo: ApiRepository
    ) { }

    async sendApiToTarget(targetDetails: ApiToolInterface): Promise<any> {
        const validHeaders = targetDetails.headers
            ? Object.fromEntries(
                Object.entries(targetDetails.headers).filter(
                    ([key, value]) => typeof key === 'string' && key.trim() !== '' && typeof value === 'string' && value.trim() !== ''
                )
            )
            : { "Content-Type": 'application/json' }; // Default headers if none provided

        const validParams = targetDetails.queryParams
            ? Object.fromEntries(
                Object.entries(targetDetails.queryParams).filter(
                    ([key, value]) => typeof key === 'string' && key.trim() !== '' && typeof value === 'string' && value.trim() !== ''
                )
            )
            : {};

        const startTime = performance.now();

        try {
            const response = await axios({
                url: targetDetails.url,
                method: targetDetails.method,
                data: targetDetails.body,
                headers: validHeaders,
                params: validParams,
            });

            const endTime = performance.now();
            const time = Math.round(endTime - startTime);

            const data = {
                status: response.status,
                statustext: response.statusText,
                header: response.headers,
                body: response.data,
                time: time
            }

            return data;
        } catch (error: any) {
            const endTime = performance.now();
            const time = Math.round(endTime - startTime);

            const data = {
                status: error.response.status,
                header: error.response.headers,
                body: error.response.statusText,
                time: time
            }
            return data;
        }
    }

    async checkIfIsSame(projectId: string, method: string, url: string) {
        return this.apitoolrepo.checkMethodAndUrlIsSame(projectId, method, url)
    }


    async saveDetailsInDb(apiDetails: ApiToolInterface) {
        return this.apitoolrepo.saveTestedApiInDb(apiDetails)
    }


    async getAllStoredApis(projectId: string) {
        return await this.apitoolrepo.findByProjectId(projectId)
    }



    async RemoveStoredApi(projectId: string, id: string) {
        return await this.apitoolrepo.removeOnByprojectid(projectId, id)
    }

}