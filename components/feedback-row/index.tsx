import React, { useState } from 'react';
import { Box, Code, Switch } from '@chakra-ui/react';
import { mutate } from 'swr';
import { IFeedback } from '@/models';
import { useAuth } from '@/lib/auth';
import { updateFeedback } from '@/lib/db';
import { Td } from '@/components/table';
import { DeleteFeedbackButton } from '@/components/delete-feedback-button';

interface IProps {
  feedback: IFeedback;
}

export const FeedbackRow: React.FC<IProps> = ({ feedback }) => {
  const auth = useAuth();
  const isChecked = feedback.status === 'active';

  const toggleFeedback = async () => {
    await updateFeedback(feedback.id, {
      status: isChecked ? 'pending' : 'active',
    });
    mutate(['/api/feedback', auth.user.token]);
  };

  return (
    <Box as="tr" key={feedback.id}>
      <Td fontWeight="medium">{feedback.author}</Td>
      <Td>{feedback.text}</Td>
      <Td>
        <Code
          maxW="150px"
          textOverflow="ellipsis"
          whiteSpace="nowrap"
          overflow="hidden"
          display="inherit"
        >
          {feedback.route || '/'}
        </Code>
      </Td>
      <Td>
        <Switch color="green" onChange={toggleFeedback} isChecked={isChecked} />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={feedback.id} />
      </Td>
    </Box>
  );
};
