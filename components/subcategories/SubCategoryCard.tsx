import { Avatar, Button, Card, CardFooter, Divider, Image, Tooltip, useDisclosure } from '@nextui-org/react';
import React from 'react';
import CategoryStatusChip from '../ui/chip/CategoryStatusChip';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';
import Link from 'next/link';
import { ICategory } from '../categories/CategoryCard';

export interface ISubCategory {
    _id: string;
    name: string;
    slug: string;
    description: string;
    status: boolean;
    image: string;
    createdAt: string;
    updatedAt: string;
    category?: ICategory;
}

interface Props {
    category: ISubCategory;
    onDelete: (id: string) => void;
}

const SubCategoryCard = ({ category: { _id, image, name, slug, status }, onDelete }: Props) => {
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
                    <div className="flex w-full items-center  justify-center gap-6">
                        <Tooltip showArrow={true} radius="sm" content="Edit" placement="top">
                            <Button color="success" variant="flat" radius="full" size="lg" className="text-base" isIconOnly as={Link} href={`/subcategories/edit/${_id}`}>
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

                <CategoryStatusChip status={status} />
            </Card>

            {/* <CategoryDeleteModal isOpen={isOpen} onOpenChange={onOpenChange} id={_id} onDelete={onDelete} /> */}
        </>
    );
};

export default SubCategoryCard;
