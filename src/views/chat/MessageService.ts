import {AxiosResponse} from "axios";
import api from "../../common/api";
import {MessageInfo} from "./MessageInfo";

export async function getMessagesApi(chatId: string): Promise<AxiosResponse> {
    return await api.get(`/messages/${chatId}`);
}

export async function sendMessageApi(chatId: string, senderId: string, text: string): Promise<AxiosResponse> {
    return await api.post<MessageInfo>(`/messages/`, {chatId, senderId, text});
}