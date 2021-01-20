import React from 'react';
import { Box } from '@chakra-ui/react';
import { IFeedback } from '@/models';
import { Table, Tr, Th } from '@/components/table';
import { FeedbackRow } from '@/components/feedback-row';

interface IProps {
  feedbacks: IFeedback[];
}

export const FeedbackTable: React.FC<IProps> = ({ feedbacks }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th minW="150px">Name</Th>
            <Th>Feedback</Th>
            <Th>Route</Th>
            <Th>Visible</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback) => (
            <FeedbackRow key={feedback.id} feedback={feedback} />
          ))}
        </tbody>
      </Table>
    </Box>
  );
};
