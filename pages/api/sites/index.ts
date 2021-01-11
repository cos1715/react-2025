import { getAllUserSites } from '@/lib/db-admin';
import { auth } from '@/lib/firebase-admin';

export default async (req, res) => {
  try {
    const token = req.headers.token;
    const user = await auth.verifyIdToken(token);
    const { sites } = await getAllUserSites(user.uid);

    res.status(200).json({ sites, total: sites.length });
  } catch (error) {
    res.status(500).json({ error });
  }
};
