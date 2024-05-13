import {AxiosResponse} from "axios";
import api from "../../common/api";

export async function getUserChatsApi(userId: string): Promise<AxiosResponse> {
    return await api.get(`/chats/${userId}`);
}