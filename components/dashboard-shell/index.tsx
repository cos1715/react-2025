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
} from '@chakra-ui/core';

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
          <Icon name="logo" color="block" size="24px" />
          <Link>Feedback</Link>
          <Link>Sites</Link>
        </Stack>
        <Flex alignItems="center">
          <Link mr={4}>Account</Link>
          <Avatar size="sm" src={auth.user.photoURL} />
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
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
