import { ICreateProductRequest } from "../../../domain/usecases/content/product";
import instance from "../../../infra/http";

/**
 * Creates a new product by sending a POST request with the provided data.
 * @param data - The product data to be created, adhering to the ICreateProductRequest interface.
 * @returns A promise resolving to the response from the API.
 */
export async function createProduct(data:ICreateProductRequest){
    return await instance.post('/product', data)
}