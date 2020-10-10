// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import firebaseAdmin from '@/lib/firebase-admin';

export default async (req, res) => {
  const sitesRef = firebaseAdmin.collection('sites');
  const getDoc = await sitesRef.get();
  if (getDoc.empty) {
    res.status(200).end(JSON.stringify({ total: 0 }));
  }
  const sites = [];
  getDoc.forEach((doc) =>
    sites.push({
      id: doc.id,
      ...doc.data(),
    }),
  );
  res.status(200).end(JSON.stringify({ sites, total: sites.length }));
};
