import React from 'react';
import { Heading, Text, Flex } from '@chakra-ui/react';
import { AddSiteModal } from '../add-site-modal';

export const EmptySate = () => (
  <Flex
    align="center"
    justify="center"
    direction="column"
    width="100%"
    borderRadius="5%/10%"
    backgroundColor="whiteAlpha.900"
    p={16}
  >
    <Heading size="lg" mb={2}>
      You haven't added any sites
    </Heading>
    <Text mb={4}>Welcome 👋 Let's get started</Text>
    <AddSiteModal buttonProps={{ colorScheme: 'teal' }} />
  </Flex>
);
