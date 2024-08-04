export interface IUpdateUserOwnRequest {
    username?: string;
    email?: string;
    password?: string; 
    firstName?: string;
    secondName?: string;
    phone?: string;
    gender?: string;
    profilePicture?: string;
}

export interface IUpdateUserOwnResponse {
      id: string;
      username: string;
      email: string;
      firstName?: string;
      secondName?: string;
      phone?: string;
      gender?: string;
      profilePicture?: string;
  }