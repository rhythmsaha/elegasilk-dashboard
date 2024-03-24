import { DeleteDocumentIcon, EditDocumentIcon, iconClasses } from '@/components/users/usersTable/tableBody/ActionsCell';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, useDisclosure, button } from '@nextui-org/react';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import { MdBlock, MdDelete } from 'react-icons/md';
import CustomerDeleteModal from '../../CustomerDeleteModal';
import toast from 'react-hot-toast';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';

interface Props {
    customerId: string;
    customerStatus: boolean;
    onDelete: (customerId: string) => void;
    refetch: () => void;
}

const ActionCell: React.FC<Props> = ({ customerId, customerStatus, onDelete, refetch }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const updateCustomer = async () => {
        console.log(customerId);

        try {
            // Update Customer Status
            const _customerStatus = !customerStatus;

            // Update Customer Status API
            const response = await axios.put(API_URLS.customers.updateStatus, {
                id: customerId,
                status: _customerStatus,
            });

            if (response.status !== 200) throw new Error('Something Went Wrong!');

            // Update Customer Status in UI
            toast.dismiss();
            toast.success('Customer Status Updated Successfully!');
            refetch();
        } catch (error) {
            toast.dismiss();
            toast.error('Error while updating customer status:');
        }
    };

    return (
        <>
            <Dropdown
                placement="bottom-end"
                classNames={{
                    content: 'min-w-0',
                }}
            >
                <DropdownTrigger>
                    <Button variant="light" isIconOnly radius="full">
                        <BsThreeDotsVertical className={iconClasses} />
                    </Button>
                </DropdownTrigger>

                <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                    {customerStatus ? (
                        <DropdownItem key="block" startContent={<MdBlock className="text-lg text-red-500" />} className="flex items-center pr-10 text-danger" color="danger" onClick={updateCustomer}>
                            Block Customer
                        </DropdownItem>
                    ) : (
                        <DropdownItem startContent={<FaCheckCircle className="text-lg text-success" />} key="unblock" className="pr-10 text-success" color="success" onClick={updateCustomer}>
                            Unblock Customer
                        </DropdownItem>
                    )}

                    <DropdownItem isReadOnly key="delete" startContent={<MdDelete className="text-xl " />} onPress={onOpen} className="pr-10 text-danger read-only:text-gray-400 ">
                        Delete Customer
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <CustomerDeleteModal isOpen={isOpen} onOpenChange={onOpenChange} id={customerId} onDelete={onDelete} />
        </>
    );
};

export default ActionCell;
