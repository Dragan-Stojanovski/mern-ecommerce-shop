import instance from "../../../infra/http";

export async function getPartners(){
    return await instance.get('/partner');
}