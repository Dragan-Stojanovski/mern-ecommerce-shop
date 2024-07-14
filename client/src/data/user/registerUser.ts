import { IRegisterUserRequestBody } from "../../domain/usecases/user/registerUser"
import instance from "../../infra/http"

/**
 * Registers a new user with the provided information.
 * 
 * @param data - The registration details of the new user.
 * @returns A promise that resolves to the result of the user registration.
 */
export async function registerNewUser(data:IRegisterUserRequestBody):Promise<void> {
  const result:void = await instance.post('/register',data)
        return result
}