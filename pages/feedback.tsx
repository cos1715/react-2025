import useSWR from 'swr';
import { useAuth } from '@/lib/auth';
import { fetcher } from '@/utils/fetcher';
import { Page } from '@/components/page';
import { DashBoardShell } from '@/components/dashboard-shell';
import { FeedbackTable } from '@/components/feedback-table';
import { FeedbackEmptyState } from '@/components/feedback-empty-state';
import { FeedbackTableHeader } from '@/components/feedback-table-header';
import { FeedbackTableSkeleton } from '@/components/feedback-table-skeleton';
import { getAllUserFeedbacks } from '@/lib/db-admin';
import { IFeedback } from '@/models';

const contentRender = (feedback: IFeedback[]) => {
  return feedback.length ? (
    <FeedbackTable feedbacks={feedback} />
  ) : (
    <FeedbackEmptyState />
  );
};

const Feedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(
    user ? ['/api/feedback', user.token] : null,
    fetcher,
    { errorRetryCount: 3 },
  );

  return (
    <DashBoardShell>
      <FeedbackTableHeader />
      {data ? contentRender(data.feedbacks) : <FeedbackTableSkeleton />}
    </DashBoardShell>
  );
};

const AllFeedbackPage = () => (
  <Page name="All Feedback" path="/feedback">
    <Feedback />
  </Page>
);

export default AllFeedbackPage;
