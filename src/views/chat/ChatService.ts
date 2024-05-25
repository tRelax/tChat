import {AxiosResponse} from "axios";
import api from "../../common/api";

export async function getUserChatsApi(userId: string): Promise<AxiosResponse> {
    return await api.get(`/chats/${userId}`);
}

export async function addUserToChatApi(userId: string, chatId: string): Promise<AxiosResponse> {
    return await api.put("/chats/addUserToChat", {userId, chatId});
}

export async function createChatApi(ownerId: string, name: string): Promise<AxiosResponse> {
    return await api.post("/chats/newChat", {ownerId, name});
}