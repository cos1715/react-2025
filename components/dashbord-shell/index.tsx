import React from 'react';
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
  Box,
  Text,
  Button,
} from '@chakra-ui/core';

export const DashBoardShell = () => (
  <Flex flexDirection="column">
    <Flex
      alignItems="center"
      backgroundColor="whiteAlpha.500"
      justifyContent="space-between"
      p={4}
    >
      <Stack isInline spacing={4}>
        <Icon name="logo" />
        <Link>Sites</Link>
        <Link>Feedback</Link>
      </Stack>
      <Flex alignItems="center">
        <Link mr={4}>Account</Link>
        <Avatar size="sm" />
      </Flex>
    </Flex>
    <Flex backgroundColor="gray.200">
      <Flex
        maxWidth="800px"
        alignItems="center"
        justifyContent="center"
        ml="auto"
        mr="auto"
      >
        <Breadcrumb addSeparator separator="/">
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
          <Heading>Sites</Heading>
          <Box
            width="100%"
            borderRadius="10%"
            backgroundColor="whiteAlpha.900"
            p={4}
          >
            <Heading size="md">Get feedback instantly</Heading>
            <Text>Start Today 🌱</Text>
            <Button>Upgrade to Starter</Button>
          </Box>
        </Breadcrumb>
      </Flex>
    </Flex>
  </Flex>
);
