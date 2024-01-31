export type CreateUserArgs = {
  input: {
    name: string;
    email: string;
    username: string;
    age: number;
    password: string;
  };
};

export type LoginArgs = {
  email: string;
  password: string;
};

export type UpdateUserArgs = {
  id: string;
  input: {
    name?: string;
    username?: string;
    age?: number;
  };
};

export type User = {
  id: string;
  email: string;
  name: string;
  username: string;
  age: number;
  role: string;
  message: Message[];
};

export type Token = {
  token: string;
};

export type UserQuery = {
  users: User[];
  user: User;
  me: User;
};

export type UserMutation = {
  createUser: boolean;
  login: Token;
  updateUser: User;
  deleteUser: boolean;
  me: User;
};

export type UserSubscription = {
  user: User;
};
