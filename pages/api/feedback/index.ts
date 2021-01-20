// import { auth } from '@/lib/firebase-admin';
// import { getAllUserFeedbacks } from '@/lib/db-admin';
// import { logger, formatObjectKeys } from '@/utils/logger';

// export default async (req, res) => {
//   try {
//     const { uid } = await auth.verifyIdToken(req.headers.token);
//     const { feedbacks } = await getAllUserFeedbacks(uid);

//     res.status(200).json({ feedbacks });
//   } catch (error) {
//     logger.error(
//       {
//         request: {
//           headers: formatObjectKeys(req.headers),
//           url: req.url,
//           method: req.method
//         },
//         response: {
//           statusCode: res.statusCode
//         }
//       },
//       error.message
//     );

//     res.status(500).json({ error });
//   }
// };

import { auth } from '@/lib/firebase-admin';
import { getAllFeedback, getAllUserFeedbacks } from '@/lib/db-admin';

export default async (req, res) => {
  try {
    const token = req.headers.token;
    const user = await auth.verifyIdToken(token);
    const { feedbacks = [] } = await getAllUserFeedbacks(user.uid);

    res.status(200).json({ feedbacks, total: feedbacks.length });
  } catch (error) {
    res.status(500).json({ error });
  }
};
