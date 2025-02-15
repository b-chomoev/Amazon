export interface IUser {
  _id: string;
  username: string;
  displayname: string;
  phone: string,
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
  displayname: string;
  phone: string,
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      message: string;
      name: string;
    },
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface RegisterResponse {
  user: IUser;
  message: string;
}

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  seller: IUser;
  price: number;
  category: string;
  image: string | null;
}

export interface ProductMutation {
  title: string;
  description: string;
  price: number;
  image: string | null;
  category: string;
}