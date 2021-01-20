import { getAllFeedback } from '@/lib/db-admin';

export default async (req, res) => {
  const id = req.query.siteId;
  const { feedbacks, error } = await getAllFeedback(id);
  if (error) {
    res.status(500).json({ error });
  }
  res.status(200).json({ feedbacks });
};
