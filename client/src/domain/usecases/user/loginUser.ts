/**
 * Interface representing the fields of the authentication form.
 *
 * @param username - The username of the user's account.
 * @param password - The password of the user's account.
 */

export interface IAuthenticateUserRequest{
    username:string;
    password:string;
}