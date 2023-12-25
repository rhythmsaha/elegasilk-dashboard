import { IProductFormData } from '@/sections/products/NewProductSection';
import { Card, CardBody, Input } from '@nextui-org/react';
import React from 'react';
import { Control, Controller } from 'react-hook-form';
import ProductFormSectionHeader from '../ProductFormSectionHeader';
import { inputClassNames } from '@/components/myaccount/generalSection/GeneralForm';

interface Props {
    control: Control<IProductFormData>;
}

const PricingForm = ({ control }: Props) => {
    return (
        <Card>
            <CardBody className="p-4 lg:p-5">
                <div className="space-y-4 lg:space-y-6">
                    <ProductFormSectionHeader title="Pricing" description="Price related inputs..." />
                    {/* MRP */}
                    <Controller
                        name="MRP"
                        rules={{
                            required: 'MRP is required!',
                            min: {
                                value: 0,
                                message: 'MRP must not be negative!',
                            },
                        }}
                        control={control}
                        render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                            <Input
                                name={name}
                                onValueChange={onChange}
                                // defaultValue={value}
                                onBlur={onBlur}
                                type="number"
                                min={0}
                                label="MRP"
                                variant="bordered"
                                classNames={inputClassNames}
                                disabled={formState.isSubmitting}
                                isInvalid={invalid}
                                errorMessage={error?.message}
                            />
                        )}
                    />
                    {/* Price */}

                    <Controller
                        name="price"
                        rules={{
                            required: 'Sale Price is required!',
                            min: {
                                value: 0,
                                message: 'Sale Price must not be negative!',
                            },
                        }}
                        control={control}
                        render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                            <Input
                                name={name}
                                onValueChange={onChange}
                                // defaultValue={value}
                                onBlur={onBlur}
                                type="number"
                                min={0}
                                label="Sale Price"
                                variant="bordered"
                                classNames={inputClassNames}
                                disabled={formState.isSubmitting}
                                isInvalid={invalid}
                                errorMessage={error?.message}
                            />
                        )}
                    />
                </div>
            </CardBody>
        </Card>
    );
};

export default PricingForm;
