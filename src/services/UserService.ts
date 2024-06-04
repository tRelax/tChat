import {AxiosResponse} from "axios";
import api from "../common/api";

export async function getUserApi(userId: string): Promise<AxiosResponse> {
    return await api.get(`/users/find/${userId}`);
}

export async function changeUserDetailsApi(userId: string, newUsername: string | null, changeImage: boolean, newImageId: string | null): Promise<AxiosResponse> {
    return await api.put('users/changeInfo', {userId, newUsername, changeImage, newImageId})
}