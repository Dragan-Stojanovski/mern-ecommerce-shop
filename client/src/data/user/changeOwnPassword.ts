import { IChangeOwnPassword } from "../../domain/usecases/user/IChangeOwnPassword";
import instance from "../../infra/http";

export async function changeOwnPassword (requestBody:IChangeOwnPassword):Promise<void>{
    return await instance.patch(`/change-password` ,requestBody)   
}