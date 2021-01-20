import firebase from './firebase';
import { ECollections } from '@/models';

const fireStore = firebase.firestore();

export const createUser = (uid, data) => {
  fireStore
    .collection(ECollections.users)
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
};

export function createSite(data) {
  const site = fireStore.collection(ECollections.sites).doc();
  site.set(data);

  return site;
}

export function createFeedback(data) {
  return fireStore.collection(ECollections.feedback).add(data);
}

export function updateFeedback(id, data) {
  return fireStore.collection(ECollections.feedback).doc(id).update(data);
}

export function deleteFeedback(id) {
  return fireStore.collection(ECollections.feedback).doc(id).delete();
}
