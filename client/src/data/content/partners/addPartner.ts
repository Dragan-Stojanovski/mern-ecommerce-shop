import { IAddPartnerRequest } from "../../../domain/usecases/content/partner";
import instance from "../../../infra/http";

/**
 * Sends a POST request to add a new partner with the provided data.
 * 
 * @param data - {@link IAddPartnerRequest} The partner data to be added.
 * @returns The response from the server.
 */
export async function addPartner(data:IAddPartnerRequest){
    return await instance.post('/partner', data)
}