import { IAddToCartRequest } from "../../../domain/usecases/user/cart/ICart";
import instance from "../../../infra/http";


export async function addToCart(body:IAddToCartRequest ){
    const result = await instance.post('/cart',body);
    return result;
}