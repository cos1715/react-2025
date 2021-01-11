import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import { Heading, Text, Code, Button, Icon, Flex } from '@chakra-ui/core';
import { useEffect } from 'react';

export default function Index() {
  const auth = useAuth();
  const router = useRouter();
  // router.push('/dashboard')

  useEffect(() => {
    router.push('/dashboard');
  }, []);

  return (
    <>
      <Flex
        as="main"
        direction="column"
        align="center"
        justify="center"
        w="full"
        h="100vh"
      >
        <Icon name="logo" size="64px" color="red.500" />
        <Heading>Fast Feedback</Heading>
        {auth.user ? (
          <>
            <Text>
              Email: <Code>{auth.user.email}</Code>
            </Text>
            <Button onClick={(e) => auth.signOut()} variantColor="green">
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={(e) => auth.signInWithGitHub()}
            variant="ghost"
            size="sm"
            mt={4}
          >
            Sign In
          </Button>
        )}
      </Flex>
    </>
  );
}
