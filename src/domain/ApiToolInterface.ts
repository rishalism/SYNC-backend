export default interface ApiToolInterface {
    projectId?: string;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: any;
    headers?: { [key: string]: string };
    queryParams?: { [key: string]: string };
}