import { IGetProductRequest } from "../../../domain/usecases/content/product";
import instance from "../../../infra/http";

export async function getProducts(data:IGetProductRequest){
    return await instance.post('/product/filter', data)
}