import { ICreateProductResponse} from "../../../domain/usecases/content/product";
import instance from "../../../infra/http";

export async function getProductDetails(productId:string):Promise<ICreateProductResponse>{
    return await instance.get(`/product?id=${productId}`)
}