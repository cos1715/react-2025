import Head from 'next/Head';
import { Heading, Text, Code, Button } from '@chakra-ui/core';
import { useAuth } from '@/lib/auth';

export default function Index() {
  const auth = useAuth();

  return auth.user ? (
    <div>
      <Head>
        <title>React 2025</title>
      </Head>
      <Heading>Fast Feedback</Heading>
      <Text>
        Email: <Code>{auth.user.email}</Code>
      </Text>
      <Button onClick={(e) => auth.signOut()} variantColor="green">
        Sign Out
      </Button>
    </div>
  ) : (
    <Button onClick={(e) => auth.signInWithGitHub()}>Sign In</Button>
  );
}
