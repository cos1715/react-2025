import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex,
  Box,
} from '@chakra-ui/react';
import { AddSiteModal } from '@/components/add-site-modal';

export const SiteTableHeader = ({ isPaidAccount = true }) => (
  <Box mx={4}>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Sites</Heading>
      {isPaidAccount && (
        <AddSiteModal buttonProps={{ text: '+ Add Site', colorScheme: 'teal' }}>
          + Add Site
        </AddSiteModal>
      )}
    </Flex>
  </Box>
);
