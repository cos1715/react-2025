import firebase from './firebase';

const fireStore = firebase.firestore();

export const createUser = (uid, data) => {
  fireStore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};


export function createFeedback(data) {
  return fireStore.collection('feedback').add(data)
}