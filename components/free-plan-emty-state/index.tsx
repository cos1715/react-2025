import React from 'react';
import { Heading, Box, Text, Button } from '@chakra-ui/core';
import { DashBoardShell } from '../dashboard-shell';

export const FreePlanEmptySate = () => (
  <DashBoardShell>
    <Box
      width="100%"
      borderRadius="5%/10%"
      backgroundColor="whiteAlpha.900"
      p={4}
    >
      <Heading size="md">Get feedback instantly</Heading>
      <Text>Start Today 🌱</Text>
      <Button>Upgrade to Starter</Button>
    </Box>
  </DashBoardShell>
);
