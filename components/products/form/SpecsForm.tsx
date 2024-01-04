import { inputClassNames } from '@/components/myaccount/generalSection/GeneralForm';
import { IProductFormData } from '@/sections/products/NewProductSection';
import { Button, Card, CardBody, Input } from '@nextui-org/react';
import React, { FC, useEffect } from 'react';
import { Control, Controller, FieldArrayWithId, useFieldArray } from 'react-hook-form';
import ProductFormSectionHeader from '../ProductFormSectionHeader';
import { MdDeleteForever, MdDeleteOutline } from 'react-icons/md';
import { FaRecycle } from 'react-icons/fa';

interface Props {
    control: Control<IProductFormData>;
}

const SpecsForm: FC<Props> = ({ control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'specs',
    });

    return (
        <Card>
            <CardBody className="p-4 lg:p-5">
                <div className="space-y-4 lg:space-y-6">
                    <ProductFormSectionHeader title="Specifications" description="Specs and more attributes..." />

                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex w-full flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                                <div className="grid flex-1 gap-2 lg:grid-cols-2">
                                    <Controller
                                        name={`specs.${index}.name`}
                                        rules={{
                                            required: 'Product Title is required!',
                                        }}
                                        control={control}
                                        render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                                            <Input
                                                name={name}
                                                onValueChange={onChange}
                                                defaultValue={value}
                                                onBlur={onBlur}
                                                type="text"
                                                label="Property"
                                                variant="bordered"
                                                classNames={inputClassNames}
                                                disabled={formState.isSubmitting}
                                                isInvalid={invalid}
                                                errorMessage={error?.message}
                                            />
                                        )}
                                    />

                                    <Controller
                                        name={`specs.${index}.value`}
                                        rules={{
                                            required: 'Product Title is required!',
                                        }}
                                        control={control}
                                        render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                                            <Input
                                                name={name}
                                                onValueChange={onChange}
                                                defaultValue={value}
                                                onBlur={onBlur}
                                                type="text"
                                                label="Value"
                                                variant="bordered"
                                                classNames={inputClassNames}
                                                disabled={formState.isSubmitting}
                                                isInvalid={invalid}
                                                errorMessage={error?.message}
                                            />
                                        )}
                                    />
                                </div>

                                <Button color="danger" variant="flat" isIconOnly className="w-full lg:h-12 lg:w-12" onPress={() => remove(index)}>
                                    <MdDeleteForever size={20} />
                                </Button>
                            </div>
                        ))}

                        <Button type="button" variant="shadow" onClick={() => append({ name: '', value: '' })} fullWidth className="mt-4 flex h-12 ">
                            +
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default SpecsForm;
