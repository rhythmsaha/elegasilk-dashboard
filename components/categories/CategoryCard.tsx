import { Avatar, Button, Card, CardFooter, Chip, Divider, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import CategoryDeleteModal from './CategoryDeleteModal';

export interface ICategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
    status: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    category: ICategory;
    onDelete: (id: string) => void;
}

const CategoryCard: FC<Props> = ({ category: { _id, createdAt, description, image, name, slug, updatedAt, status }, onDelete }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card className="relative w-full rounded-2xl p-0" radius="none">
                <div className="relative w-full overflow-hidden">
                    <Image src={image} alt="categories" width={'100%'} className="h-44 w-full scale-110 object-cover blur-sm saturate-0 md:h-48" radius="none" />
                </div>

                <div className="z-10">
                    <div className="flex flex-col items-center">
                        <div className="-mt-14 rounded-full border-4 border-white md:-mt-16" id="category_avatar">
                            <Avatar src={image} className="h-24 w-24 md:h-28 md:w-28" alt="category" />
                        </div>

                        <div className="mt-2 p-4 pt-0 text-center">
                            <h3 className="text-xl font-semibold text-gray-700">{name}</h3>
                            <p className="text-sm text-gray-400">{slug}</p>
                        </div>
                    </div>
                </div>

                <Divider className="mx-auto mt-4 w-6/12" />

                <CardFooter className="p-8">
                    <div className="flex w-full items-center  justify-center gap-6  ">
                        <Tooltip showArrow={true} radius="sm" content="View more" placement="top">
                            <Button color="primary" variant="flat" radius="full" size="lg" className="text-base" isIconOnly as={Link} href={`/categories/${slug}`}>
                                <AiOutlineEye className="min-w-min text-lg" />
                            </Button>
                        </Tooltip>

                        <Tooltip showArrow={true} radius="sm" content="Edit" placement="top">
                            <Button color="success" variant="flat" radius="full" size="lg" className="text-base" isIconOnly as={Link} href={`/categories/edit/${slug}`}>
                                <AiOutlineEdit className="min-w-min text-lg" />
                            </Button>
                        </Tooltip>

                        <Tooltip showArrow={true} radius="sm" content="Delete" placement="top">
                            <Button color="danger" variant="flat" radius="full" size="lg" className="text-base" isIconOnly onPress={onOpen}>
                                <AiOutlineDelete className="min-w-min text-lg" />
                            </Button>
                        </Tooltip>
                    </div>
                </CardFooter>

                {status ? (
                    <Chip color="success" variant="solid" className="absolute right-3 top-3 !text-white" style={{ zIndex: 10 }}>
                        Active
                    </Chip>
                ) : (
                    <Chip color="danger" variant="solid" className="absolute right-3 top-3 !text-white" style={{ zIndex: 10 }}>
                        Inactive
                    </Chip>
                )}
            </Card>

            <CategoryDeleteModal isOpen={isOpen} onOpenChange={onOpenChange} id={_id} onDelete={onDelete} />
        </>
    );
};

export default CategoryCard;
