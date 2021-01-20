import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/lib/auth';
import {
  Flex,
  Icon,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Button,
} from '@chakra-ui/react';
import { Logo } from '@/components/logo';
import { AddSiteModal } from '../add-site-modal';
import { SiteTableHeader } from '../site-table-header';

interface IProps {
  children: ReactNode;
}

export const DashBoardShell: React.FC<IProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const onSignOut = () => {
    router.push('/');
    auth.signOut()
  };

  return (
    <Flex flexDirection="column">
      <Flex
        alignItems="center"
        backgroundColor="whiteAlpha.500"
        justifyContent="space-between"
        py={4}
        px={8}
      >
        <Stack isInline spacing={4} align="center">
          <Link href="/">
            <Logo size="24px" color="black" />
          </Link>
          <Link href="/dashboard">Sites</Link>
          <Link href="/feedback">Feedback</Link>
        </Stack>
        <Flex alignItems="center">
          {/* <Link mr={4}>Account</Link> */}
          {auth.user && (
            <Button variant="ghost" mr={4} onClick={onSignOut}>
              Sign Out
            </Button>
          )}
          <Avatar size="sm" src={auth.user?.photoURL} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.200" p={8} height="100vh">
        <Flex
          width="100%"
          maxWidth="800px"
          direction="column"
          ml="auto"
          mr="auto"
          p="20px"
        >
          {/* <Breadcrumb addSeparator separator="/">
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading mb={4}>Sites</Heading>
          <Flex justifyContent="space-between">
            <Heading mb={8}>My Sites</Heading>
            <AddSiteModal
              buttonProps={{ text: '+ Add Site', colorScheme: 'teal' }}
            />
          </Flex> */}
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
