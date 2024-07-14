import { ICategory } from "../../../domain/usecases/content/categories";
import instance from "../../../infra/http";

/**
 * Sends a POST request to add a new category with the provided data.
 * 
 * @param data - {@link ICategory} The category data to be added.
 * @returns The response from the server.
 */
export async function addCategory(data:ICategory){
    return await instance.post('/categories', data)
}