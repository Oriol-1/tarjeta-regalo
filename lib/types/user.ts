export interface User {
  // id: string;
  name: string;
  nif: string;
  email: string;
  balance: number;
  initialBalance: number;
}


export interface UserValidationResponse {
  success: boolean;
  user?: User;
  error?: string;
}

export interface UserCredentials {

  nif: string;
  email: string;

}