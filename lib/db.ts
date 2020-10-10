import firebase from './firebase';

const fireStore = firebase.firestore();

export const createUser = (uid, data) => {
  fireStore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

export function createSite(data) {
  const site = fireStore.collection('sites').doc();
  site.set(data);

  return site;
}

export function createFeedback(data) {
  return fireStore.collection('feedback').add(data);
}
