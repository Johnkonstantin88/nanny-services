import {
  collection,
  doc,
  getCountFromServer,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firestoreConfig';
import { IUser } from '../../types/auth.types';

export const setFirebaseUserDoc = (creds: IUser) =>
  setDoc(doc(db, 'users', creds.uid), {
    ...creds,
    favorites: [],
  });

export const getCountCollectionDocs = async () => {
  const coll = collection(db, 'nannies');
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};
