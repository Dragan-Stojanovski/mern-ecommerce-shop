import { IUpdateUserOwnRequest, IUpdateUserOwnResponse } from "../../domain/usecases/user/updated-user-own";
import instance from "../../infra/http";

/**
 * Updates the user details for the specified user ID.
 * @param userId - The ID of the user to update.
 * @param requestBody - The data to update the user with.
 * @returns A promise resolving to the updated user response.
 */
export async function updateUserOwn (userId:string, requestBody:IUpdateUserOwnRequest):Promise<IUpdateUserOwnResponse>{
    const result:IUpdateUserOwnResponse = await instance.patch(`/users/${userId}` ,requestBody)   
    return result;
}