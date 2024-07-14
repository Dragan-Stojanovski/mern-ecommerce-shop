import instance from "../../../infra/http";

export async function getCategories(){
    return await instance.get('/categories');
}