export interface ISignUpDto {
  displayName: string;
  email: string;
  password: string;
}

export interface ISignInDto extends Omit<ISignUpDto, 'displayName'> {}

export interface IUser {
  displayName: string | null;
  email: string | null;
  uid: string;
}

export interface IUserState {
  user: IUser;
  isLoggedIn: boolean;
}
