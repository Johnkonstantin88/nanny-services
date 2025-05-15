import { IDocument } from '../types/data.types';
import {
  collection,
  DocumentData,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firestoreConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useLastVisibleState } from '../state/lastVisibleDoc';
import { getCountCollectionDocs } from '../firebase/services/docs';

// import data from '../firebase/babysitters.json';

// const uploadData = () => {
//   const newNannyRef = collection(db, 'nannies');
//   data.map(doc =>
//     setTimeout(async () => {
//       await addDoc(newNannyRef, {
//         documentDetails: doc,
//         createdAt: serverTimestamp(),
//       });
//     }, 1000)
//   );
// };

// uploadData();

// const userInfo = () => {
//   onAuthStateChanged(auth, user => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/auth.user
//       const uid = user.uid;
//       console.log(uid);

//       setDoc(doc(db, 'users', uid), {
//         favorites: [],
//       });
//       // ...
//     } else {
//       // User is signed out
//       // ...
//       console.log('no user');
//     }
//   });
// };

// userInfo();

export const useGetNanniesData = () => {
  const { data: lastVisibleDoc, setData } = useLastVisibleState();

  const nanniesCollection = collection(db, 'nannies');

  const getNannies = async (): Promise<IDocument[]> => {
    const q = query(
      nanniesCollection,
      limit(3),
      orderBy('createdAt'),
      ...(lastVisibleDoc ? [startAfter(lastVisibleDoc)] : [])
    );
    const documentSnapshots = await getDocs(q);

    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];

    setData(lastVisible);

    const response = documentSnapshots.docs.map(doc => doc.data() as IDocument);

    return response;
  };

  return getNannies;
};
