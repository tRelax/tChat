import api from "../../common/api";
import {AxiosResponse} from "axios";


export async function registerApi(username: string, password: string): Promise<AxiosResponse> {
    return await api.post('/users/register', {username, password});
}