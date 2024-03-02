import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, useDisclosure } from '@nextui-org/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Link from 'next/link';
import { DeleteDocumentIcon, EditDocumentIcon } from '@/components/users/usersTable/tableBody/ActionsCell';
import { iconClasses } from '@/components/collections/collectionstable/body/ActionCell';
import ProductDeleteModal from '../../ProductDeleteModal';

interface Props {
    productId: string;
    onDelete: (productId: string) => void;
}

const ActionCell: React.FC<Props> = ({ onDelete, productId }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                    <DropdownItem key="edit" startContent={<EditDocumentIcon className={iconClasses} />} className="pr-10" href={`/products/edit/${productId}`} as={Link}>
                        Edit Product
                    </DropdownItem>

                    <DropdownItem key="delete" className="pr-10 text-danger" color="danger" startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />} onPress={onOpen}>
                        Delete Product
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <ProductDeleteModal isOpen={isOpen} onOpenChange={onOpenChange} id={productId} onDelete={onDelete} />
        </>
    );
};

export default ActionCell;
