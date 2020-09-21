import Head from 'next/head';
import { Heading, Text, Code, Button, Box, Flex } from '@chakra-ui/core';
import { Icon } from '@chakra-ui/core';
import { useAuth } from '@/lib/auth';

export default function Index() {
  const auth = useAuth();

  return (
    <>
      <Head>
        <title>React 2025</title>
      </Head>
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
