import instance from "../../../infra/http";

export async function deleteProduct(id:string) {
    return await instance.delete(`/product/${id}`)
}