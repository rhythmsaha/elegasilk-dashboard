import { Card, CardBody, Input, Textarea } from '@nextui-org/react';
import React, { FC, useState } from 'react';
import ProductFormSectionHeader from '../ProductFormSectionHeader';
import { Control, Controller } from 'react-hook-form';
import { IProductFormData } from '@/sections/products/NewProductSection';
import { inputClassNames } from '@/components/myaccount/generalSection/GeneralForm';

const ReactQuill = dynamic(
    () => import('react-quill'),
    { ssr: false } // This will only load react-quill on the client side
);

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import dynamic from 'next/dynamic';

interface Props {
    control: Control<IProductFormData>;
}

const DetailsForm: FC<Props> = ({ control }) => {
    const [value, setValue] = useState('');
    return (
        <div>
            <Card>
                <CardBody className="p-4 lg:p-5">
                    <div className="space-y-4 lg:space-y-6">
                        <ProductFormSectionHeader title="Details" description="Title, short description, image..." />
                        <Controller
                            name="name"
                            rules={{
                                required: 'Product Title is required!',
                                minLength: {
                                    value: 10,
                                    message: 'Product Title must be at least 10 characters',
                                },
                            }}
                            control={control}
                            render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                                <Input
                                    name={name}
                                    onValueChange={onChange}
                                    defaultValue={value}
                                    onBlur={onBlur}
                                    type="text"
                                    label="Product Title"
                                    variant="bordered"
                                    classNames={inputClassNames}
                                    disabled={formState.isSubmitting}
                                    isInvalid={invalid}
                                    errorMessage={error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            rules={{
                                required: false,
                                minLength: {
                                    value: 30,
                                    message: 'Description must be at least 30 characters long',
                                },

                                maxLength: {
                                    value: 300,
                                    message: 'Description must not exceed 300 characters',
                                },
                            }}
                            control={control}
                            render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                                <Textarea
                                    name={name}
                                    onValueChange={onChange}
                                    defaultValue={value}
                                    onBlur={onBlur}
                                    type="text"
                                    label="Short Description"
                                    variant="bordered"
                                    classNames={{
                                        ...inputClassNames,
                                        input: 'min-h-auto md:min-h-[5rem]',
                                    }}
                                    disabled={formState.isSubmitting}
                                    isInvalid={invalid}
                                    errorMessage={error?.message}
                                />
                            )}
                        />

                        <ReactQuill placeholder="Content" theme="bubble" value={value} onChange={setValue} className="z-10 h-44 rounded-xl border" />

                        {/* Images */}
                        {/* Stock */}
                        {/* Category, SubCategory */}
                        {/* Collection */}
                        {/* Colors */}
                        {/* MRP */}
                        {/* Price */}
                        {/* Published */}
                        {/* Button */}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default DetailsForm;
