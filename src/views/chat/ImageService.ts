import {AxiosResponse} from "axios";
import api from "../../common/api";
import {ImageInfo} from "./ImageInfo";

export async function uploadImage(serverImage: ImageInfo): Promise<AxiosResponse> {
    return await api.post("/images/upload", {serverImage});
}

export async function getImage(imageId: string): Promise<AxiosResponse> {
    return await api.get(`/images/${imageId}`, {
        responseType: 'blob',
    });
}