export interface IChangeOwnPassword {
    oldPassword:string;
    newPassword:string;
}

export interface IChangeOwnPasswordForm extends IChangeOwnPassword {
    repeatPassword:string;
}