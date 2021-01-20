import React from 'react';
import useSWR from 'swr';
import { useAuth } from '@/lib/auth';
import { fetcher } from '@/utils/fetcher';
import { ISite } from '@/models';
import { EmptySate } from '@/components/empty-state';
import { SiteTableSkeleton } from '@/components/skeleton';
import { DashBoardShell } from '@/components/dashboard-shell';
import { SiteTable } from '@/components/site-table';
import { SiteTableHeader } from '@/components/site-table-header';

interface IProps {
  data: { sites: ISite[]; total: number };
}

const Container: React.FC<IProps> = ({ data }) => {
  return data.sites ? <SiteTable sites={data.sites} /> : <EmptySate />;
};

export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  return (
    <DashBoardShell>
      <SiteTableHeader />
      {data ? <Container data={data} /> : <SiteTableSkeleton />}
    </DashBoardShell>
  );
}
