import { IProductFormData } from '@/sections/products/NewProductSection';
import { Button, Card, CardBody, Switch, cn } from '@nextui-org/react';
import React from 'react';
import { Control } from 'react-hook-form';

interface Props {
    control: Control<IProductFormData>;
}

const FormBottom = (props: Props) => {
    return (
        <Card>
            <CardBody className="p-4 lg:p-5">
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <Switch defaultSelected aria-label="Automatic updates" size="sm">
                        Publish
                    </Switch>

                    <Button variant="shadow" color="primary" type="submit">
                        Create Product
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default FormBottom;
