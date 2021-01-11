import React, { ReactNode } from 'react';
import useSWR, { mutate } from 'swr';
import { Controller, useForm } from 'react-hook-form';
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { fetcher } from '@/utils/fetcher';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  useToast,
} from '@chakra-ui/react';

interface IProps {
  children?: ReactNode;
  buttonProps?: {
    variantColor?: string;
    text?: string;
  };
}

export const AddSiteModal: React.FC<IProps> = (props) => {
  // const { data } = useSWR('/api/sites', fetcher);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, formState, control } = useForm({
    mode: 'onBlur',
  });
  const toast = useToast();
  const auth = useAuth();
  const onSubmit = async (values) => {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      ...values,
    };
    try {
      const { id } = await createSite(newSite);
      mutate(
        ['/api/sites',auth.user.token],
        async (data) => {
          console.log('mutate==>>', data);

          return {
            sites: [{ id, ...newSite }, ...data.sites],
            total: data.sites.length + 1,
          };
        },
        false,
      );
      onClose();
      toast({
        title: 'Success',
        description: "We've added your site",
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        maxW="200px"
        fontWeight="medium"
        variantColor={props.buttonProps.variantColor}
      >
        {props.buttonProps.text || 'Add your first site'}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader fontWeight="bold">Add Site</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Site Name</FormLabel>
                <Input
                  name="name"
                  ref={register({
                    required: 'Required',
                    validate: (value) => value !== 'admin' || 'Nice try!',
                  })}
                />
                {errors.name && errors.name.message}
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Site Link</FormLabel>
                <Input name="link" ref={register({ required: 'Required' })} />
                {errors.link && errors.link.message}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} mr={2}>
                Cancel
              </Button>
              <Button
                isDisabled={!formState.isValid}
                type="submit"
                variantColor="teal"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
