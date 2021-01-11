import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import { useAuth } from '@/lib/auth';
import { Heading, Text, Code, Button, Flex } from '@chakra-ui/react';
import { Logo } from '@/components/logo';

export default function Index() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (document.cookie && cookies.get('auth-token')) {
      router.push('/dashboard');
    }
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
        <Logo size="64px" color="red.500" />
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
            onClick={(e) => auth.signInWithGoogle()}
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
