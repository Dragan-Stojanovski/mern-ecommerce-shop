import { ICartResponse } from "../../../domain/usecases/user/cart/ICart";
import instance from "../../../infra/http";

export async function getCartProducts(): Promise<ICartResponse> {
    const result = await instance.get('/cart');
    return result.data; 
}