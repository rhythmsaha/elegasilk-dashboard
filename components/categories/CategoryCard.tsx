import { Avatar, Button, Card, CardFooter, Divider, Image, Tooltip } from '@nextui-org/react';
import Link from 'next/link';
import React, { FC } from 'react';
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from 'react-icons/ai';

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
}

const CategoryCard: FC<Props> = ({ category: { _id, createdAt, description, image, name, slug, updatedAt } }) => {
    return (
        <Card className="w-full rounded-2xl p-0" radius="none">
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
                        <Button color="primary" variant="flat" radius="full" size="lg" className="text-base" isIconOnly>
                            <AiOutlineEye className="min-w-min text-lg" />
                        </Button>
                    </Tooltip>

                    <Tooltip showArrow={true} radius="sm" content="Edit" placement="top">
                        <Button color="success" variant="flat" radius="full" size="lg" className="text-base" isIconOnly as={Link} href={`/categories/edit/${slug}`}>
                            <AiOutlineEdit className="min-w-min text-lg" />
                        </Button>
                    </Tooltip>

                    <Tooltip showArrow={true} radius="sm" content="Delete" placement="top">
                        <Button color="danger" variant="flat" radius="full" size="lg" className="text-base" isIconOnly>
                            <AiOutlineDelete className="min-w-min text-lg" />
                        </Button>
                    </Tooltip>
                </div>
            </CardFooter>
        </Card>
    );
};

export default CategoryCard;
