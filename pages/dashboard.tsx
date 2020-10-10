import React from 'react';
import useSWR from 'swr';
import { useAuth } from '@/lib/auth';
import { fetcher } from '@/utils/fetcher';
import { EmptySate } from '@/components/empty-state';
import { SiteTableSkeleton } from '@/components/skeleton';
import { DashBoardShell } from '@/components/dashboard-shell';
import { SiteTable } from '@/components/site-table';
import { ISite } from '@/models';

interface IProps {
  data: { sites: ISite[]; total: number };
}

const Container: React.FC<IProps> = ({ data }) => {
  return data.sites ? <SiteTable sites={data.sites} /> : <EmptySate />;
};

export default function Dashboard() {
  const { data } = useSWR('/api/sites', fetcher);
  console.log(data);

  return (
    <DashBoardShell>
      {data ? <Container data={data} /> : <SiteTableSkeleton />}
    </DashBoardShell>
  );
}
