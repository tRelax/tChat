import {AxiosResponse} from "axios";
import api from "../common/api";
import {ImageInfo} from "../common/types/ImageInfo";

export async function uploadImage(serverImage: ImageInfo | undefined): Promise<AxiosResponse> {
    return await api.post("/images/upload", {serverImage});
}

export async function getImage(imageId: string): Promise<AxiosResponse> {
    return await api.get(`/images/${imageId}`, {
        responseType: 'blob',
    });
}

export async function deleteImage(imageId: string | undefined): Promise<AxiosResponse> {
    return await api.delete("/images/delete", {data: {imageId}});
}