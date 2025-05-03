import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { ISignInDto, ISignUpDto } from '../../types/auth.types';

export const signUp = async ({ displayName, email, password }: ISignUpDto) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (userCredential && auth.currentUser) {
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
  }

  return userCredential;
};

export const signIn = async ({ email, password }: ISignInDto) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async (): Promise<void> => {
  return signOut(auth);
};
