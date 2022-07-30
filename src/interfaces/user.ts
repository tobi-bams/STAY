export interface User {
  fullname: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface JWTUser {
  id: number;
  fullname: string;
  email: string;
}

export interface Bank {
  bank_code: string;
  account_number: string;
}
