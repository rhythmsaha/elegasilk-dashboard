import React, { FC } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { HiOutlineExclamation } from 'react-icons/hi';
import useDeleteUser from '@/hooks/auth/useDeleteUser';

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    userId: string;
    onDelete: (userId: string) => void;
}

const UserDeleteModal: FC<Props> = ({ isOpen, onOpenChange, userId, onDelete }) => {
    const { ApiDeleteUser } = useDeleteUser();

    const submitHandler = async (closeFn: () => void) => {
        ApiDeleteUser(userId, onDelete);
        closeFn();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody className="py-8">
                            <div className="flex flex-col items-center  gap-4 md:flex-row md:items-start">
                                <div className="rounded-full bg-red-100 p-2.5">
                                    <HiOutlineExclamation className="text-2xl text-red-600" aria-hidden="true" />
                                </div>

                                <div className="text-center md:text-left">
                                    <h4 className="text-base font-semibold leading-6 text-gray-900">Delete Account</h4>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to Delete your account? All of your data will be permanently removed. This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter className="flex-col gap-2 pt-0 md:flex-row">
                            <Button color="default" variant="bordered" onPress={onClose} className="order-2 w-full md:order-1 md:w-28">
                                Close
                            </Button>

                            <Button color="danger" variant="shadow" onPress={submitHandler.bind(null, onClose)} className="order-1 w-full md:order-2 md:w-28">
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default UserDeleteModal;
