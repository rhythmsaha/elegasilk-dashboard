import { CardBody, Switch } from '@nextui-org/react';
import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface Props {
    control?: Control<any>;
}

const CategoryStatus: React.FC<Props> = ({ control }) => {
    return (
        <CardBody className="p-0">
            <div className="flex justify-between gap-2 p-4 sm:p-6">
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-gray-600">Status</p>
                    <p className="text-xs text-gray-400">Toggle Category active status</p>
                </div>

                <Controller
                    name="status"
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { onChange, onBlur, value }, formState: { isSubmitting } }) => (
                        <Switch size="sm" defaultSelected={value} onValueChange={onChange} onBlur={onBlur} isDisabled={isSubmitting} />
                    )}
                />
            </div>
        </CardBody>
    );
};

export default CategoryStatus;
