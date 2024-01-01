import { IColletionFormData } from '@/sections/collections/NewCollectionSection';
import { Button, CardBody, Input, Textarea } from '@nextui-org/react';
import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { inputClassNames } from '../myaccount/generalSection/GeneralForm';

interface Props {
    control: Control<IColletionFormData>;
}

const CollectionsForm: FC<Props> = ({ control }) => {
    return (
        <CardBody className="p-4 sm:p-6">
            <div className="space-y-4">
                <Controller
                    name="name"
                    rules={{
                        required: 'Name is required!',

                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters',
                        },

                        maxLength: {
                            value: 50,
                            message: 'Name must not exceed 50 characters',
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
                            label="Name"
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
                            label="Description"
                            variant="bordered"
                            classNames={{
                                ...inputClassNames,
                                input: 'min-h-auto md:min-h-[11rem]',
                            }}
                            disabled={formState.isSubmitting}
                            isInvalid={invalid}
                            errorMessage={error?.message}
                        />
                    )}
                />
            </div>

            <div className="mt-8">
                <Button className="ml-auto block w-full min-w-[120px] md:w-auto" variant="shadow" color="primary" type="submit">
                    {control._formState.isSubmitting ? 'Please Wait...' : ' Save Changes'}
                </Button>
            </div>
        </CardBody>
    );
};

export default CollectionsForm;
