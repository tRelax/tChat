import api from "../../common/api";

export type RegisterResponse = {
    message?: string
};

export async function registerApi(username: string, password: string): Promise<RegisterResponse> {
    const response = await api.post<RegisterResponse>('/register', {username, password});
    return response;
}