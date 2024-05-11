import api from '../../common/api';
import {AxiosResponse} from "axios";

export async function loginApi(username: string, password: string): Promise<AxiosResponse> {
    return await api.post('/login', {username, password});
}