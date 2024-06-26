import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn, useDisclosure } from '@nextui-org/react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Link from 'next/link';
import { DeleteDocumentIcon, EditDocumentIcon } from '@/components/users/usersTable/tableBody/ActionsCell';
import CollectionDeleteModal from '../../CollectionDeleteModal';

interface Props {
    collectionSlug: string;
    onDelete: (collectionId: string) => void;
}

export const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0';

const ActionsCell: React.FC<Props> = ({ collectionSlug, onDelete }) => {
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
                    <DropdownItem key="edit" startContent={<EditDocumentIcon className={iconClasses} />} className="pr-10" href={`/collections/edit/${collectionSlug}`} as={Link}>
                        Edit Collection
                    </DropdownItem>

                    <DropdownItem key="delete" className="pr-10 text-danger" color="danger" startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />} onPress={onOpen}>
                        Delete Collection
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <CollectionDeleteModal isOpen={isOpen} onOpenChange={onOpenChange} id={collectionSlug} onDelete={onDelete} />
        </>
    );
};

export default ActionsCell;
