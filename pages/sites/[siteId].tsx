import React, { useState } from 'react';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { IFeedback, ISite } from '@/models';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import Feedback from '@/components/feedback';

interface IProps extends InferGetStaticPropsType<typeof getStaticProps> {
  initialFeedback: IFeedback[];
}

export default function SiteFeedback(props: IProps) {
  const router = useRouter();
  const { siteId } = router.query;
  const { handleSubmit, register, reset } = useForm({
    mode: 'onBlur',
  });
  const { user } = useAuth();
  const [allFeedback, setAllFeedback] = useState(props.initialFeedback);

  const onSubmit = async (values) => {
    const newFeedback: IFeedback = {
      author: user.name,
      authorId: user.uid,
      provider: user.provider,
      rating: 5,
      siteId: `${siteId}`,
      status: 'pending',
      text: values.comment,
      route: '/',
      createdAt: new Date().toISOString(),
    };
    try {
      createFeedback(newFeedback);
      reset();
      setAllFeedback([newFeedback, ...allFeedback]);
    } catch {}
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="800px"
      margin="0 auto"
    >
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl my={8}>
          <FormLabel htmlFor="comment">Comment</FormLabel>
          <Input id="comment" name="comment" type="text" ref={register} />
          <Button type="submit" fontWeight={500} mt={2}>
            Add comment
          </Button>
        </FormControl>
      </Box>
      {allFeedback.map((feedback) => (
        <Box key={feedback.id} mb={8}>
          <Feedback {...feedback} />
        </Box>
      ))}
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const siteId = context.params.siteId;
  const { feedbacks } = await getAllFeedback(`${siteId}`);

  return {
    props: {
      initialFeedback: feedbacks,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
