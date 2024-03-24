import API_URLS from '@/lib/ApiUrls';
import { Modal, ModalBody, ModalContent, ModalFooter, Button } from '@nextui-org/react';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineExclamation } from 'react-icons/hi';

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    id: string;
    onDelete: (id: string) => void;
}

const CustomerDeleteModal: React.FC<Props> = ({ id, isOpen, onDelete, onOpenChange }) => {
    const [isloading, setIsloading] = useState(false);

    const customerDeleteHandler = async (id: string, onDelete: (id: string) => void) => {
        if (isloading) return;
        if (!id) throw new Error('ID is required!');

        try {
            setIsloading(true);
            // const response = await axios.delete(API_URLS.deleteProduct(id));
            // if (response.status !== 200) throw new Error('Something Went Wrong!');
            setIsloading(false);
            // onDelete(id);
            toast.success('Customer Deleted Successfully!');
        } catch (error: any) {
            setIsloading(false);
            toast.error(error.message);
        }
    };

    const deleteHandler = async (closeFn: () => void) => {
        customerDeleteHandler(id, onDelete);
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
                                    <h4 className="text-base font-semibold leading-6 text-gray-900">Delete Customer</h4>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to Delete This Customer? All of the data of this will be permanently removed. This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter className="flex-col gap-2 pt-0 md:flex-row">
                            <Button color="default" variant="bordered" onPress={onClose} className="order-2 w-full md:order-1 md:w-28">
                                Close
                            </Button>

                            <Button color="danger" variant="shadow" onPress={deleteHandler.bind(null, onClose)} className="order-1 w-full md:order-2 md:w-28">
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CustomerDeleteModal;
