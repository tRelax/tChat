import {AxiosResponse} from "axios";
import api from "../../common/api";

export async function getUserApi(userId: string): Promise<AxiosResponse> {
    return await api.get(`/users/find/${userId}`);
}