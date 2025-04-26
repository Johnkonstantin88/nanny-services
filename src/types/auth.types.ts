import { User } from 'firebase/auth';

export interface ISignUpDto {
  displayName: string;
  email: string;
  password: string;
}

export interface ISignInDto extends Omit<ISignUpDto, 'displayName'> {}

export interface IResponseData {
  data: IUser;
}

export interface IUser {
  kind: string;
  idToken: string;
  displayName: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface IUserState {
  user: User;
  isLoggedIn: boolean;
  // signIn: (creds: ISignInDto) => void;
  // signUp: (creds: ISignUpDto) => void;
  // signOut: () => void;
}
