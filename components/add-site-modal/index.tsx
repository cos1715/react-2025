import React from 'react';
import { useForm } from 'react-hook-form';
import { createSite } from '@/lib/db';
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
} from '@chakra-ui/core';

export const AddSiteModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register, errors, formState } = useForm();
  const onSubmit = async (values) => {
    await createSite(values);
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} maxW="200px" fontWeight="medium">
        Add your first site
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
                type="submit"
                isDisabled={!formState.isValid}
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
