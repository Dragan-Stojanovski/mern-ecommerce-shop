import instance from "../../../infra/http";

export async function deleteCategory(id:string) {
    return await instance.delete(`/categories/${id}`)
}