import firebase from './firebase-admin';
import { ECollections } from '@/models';
import { compareDesc, parseISO } from 'date-fns';

export const getAllFeedback = async (siteId: string) => {
  try {
    const feedbacks = [];
    const snapshot = await firebase
      .collection(ECollections.feedback)
      .where('siteId', '==', siteId)
      .orderBy('createdAt', 'desc')
      .get();

    snapshot.forEach((doc) =>
      feedbacks.push({
        id: doc.id,
        ...doc.data(),
      }),
    );

    // feedbacks.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));

    return { feedbacks };
  } catch (error) {
    return { error };
  }
};

export const getAllSites = async () => {
  try {
    const sites = [];
    const snapshot = await firebase.collection(ECollections.sites).get();

    snapshot.forEach((doc) =>
      sites.push({
        id: doc.id,
        ...doc.data(),
      }),
    );

    return { sites };
  } catch (error) {
    return { error };
  }
};
