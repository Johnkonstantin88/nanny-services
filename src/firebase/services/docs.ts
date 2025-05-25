import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firestoreConfig';
import { IUser } from '../../types/auth.types';
import { FIREBASE_COLLECTION } from '../../constants';
import { IDocument } from '../../types/data.types';

export const setFirebaseUserDoc = (creds: IUser) =>
  setDoc(doc(db, FIREBASE_COLLECTION.users, creds.uid), {
    ...creds,
    favorites: [],
  });

export const getCountCollectionDocs = async (collName: string) => {
  const coll = collection(db, collName);
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
};

export const getDocument = async <T>(collName: string, id: string) => {
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id } as T;
  } else {
    console.log(`No document with id: ${id}!`);
  }
};

export const toggleFavorite = async (
  isFavorite: boolean,
  userId: string,
  id: string
) => {
  try {
    const usersRef = doc(db, FIREBASE_COLLECTION.users, userId);
    isFavorite
      ? await updateDoc(usersRef, {
          favorites: arrayRemove(id),
        })
      : await updateDoc(usersRef, {
          favorites: arrayUnion(id),
        });
  } catch (error) {
    console.log(error);
  }
};

export const getFavoritesDocs = async (arr: string[]) => {
  try {
    const fetchPromises: Promise<IDocument | undefined>[] = [];
    arr?.forEach(docId => {
      const doc: Promise<IDocument | undefined> = getDocument(
        FIREBASE_COLLECTION.nannies,
        docId
      );
      fetchPromises.push(doc);
    });

    const favorites = await Promise.all(fetchPromises);

    return favorites;
  } catch (error) {
    console.log(error);
  }
};
