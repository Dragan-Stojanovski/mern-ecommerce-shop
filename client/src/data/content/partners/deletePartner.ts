import instance from "../../../infra/http";

export async function deletePartner(id:string) {
    return await instance.delete(`/partner/${id}`)
}