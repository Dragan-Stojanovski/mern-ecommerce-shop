import instance from "../../infra/http";

/**
 * Fetches the information of the current user.
 * 
 * @returns A promise that resolves to the current user's information.
 */
export async function getUserOwn() {
  const result = await instance.get('/userown')
        return result
}