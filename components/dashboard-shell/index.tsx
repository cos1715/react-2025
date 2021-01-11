import React, { ReactNode } from 'react';
import { useAuth } from '@/lib/auth';
import {
  Flex,
  Icon,
  Link,
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

interface IProps {
  children: ReactNode;
}

export const DashBoardShell: React.FC<IProps> = ({ children }) => {
  const auth = useAuth();

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
          <Logo size="24px" color="black" />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems="center">
          {/* <Link mr={4}>Account</Link> */}
          {auth.user && (
            <Button variant="ghost" mr={4} onClick={auth.signOut}>
              Log Out
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
          <Breadcrumb addSeparator separator="/">
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
              buttonProps={{ text: '+ Add Site', variantColor: 'teal' }}
            />
          </Flex>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
