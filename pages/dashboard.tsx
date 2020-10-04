import React from 'react';
import { useAuth } from '@/lib/auth';
import { EmptySate } from '@/components/empty-state';

export default function Dashboard() {
  const auth = useAuth();

  return auth.user ? <EmptySate /> : 'Loading...';
}
