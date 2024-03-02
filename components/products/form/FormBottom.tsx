import { IProductFormData } from '@/sections/products/NewProductSection';
import { Button, Card, CardBody, Switch, cn } from '@nextui-org/react';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface Props {
    control: Control<IProductFormData>;
    edit?: boolean;
}

const FormBottom = ({ control, edit }: Props) => {
    return (
        <Card>
            <CardBody className="p-4 lg:p-5">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <Controller
                        control={control}
                        name="published"
                        render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                            <Switch name={name} aria-label="Automatic updates" size="sm" defaultSelected={value} onChange={onChange}>
                                Publish
                            </Switch>
                        )}
                    />

                    <Button variant="shadow" color="primary" type="submit">
                        {edit ? 'Update Product' : 'Create Product'}
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default FormBottom;
