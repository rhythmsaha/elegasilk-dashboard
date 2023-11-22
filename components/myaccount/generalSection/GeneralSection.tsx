import { IUserAccount, IUserRoles } from '@/Typings';
import { Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { FC, useEffect } from 'react';
import GeneralForm from './GeneralForm';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffectOnce } from 'react-use';

interface Props {
    user?: IUserAccount;
}

export interface IMyAccountFormData {
    firstName: string;
    lastName: string;
    username: string;
    email?: string;
    phone?: number;
    role?: IUserRoles;
    avatar?: string;
}

const GeneralSection: FC<Props> = ({}) => {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IMyAccountFormData>();

    const submitHandler: SubmitHandler<IMyAccountFormData> = (data) => {
        try {
            console.log(data);
        } catch (error: any) {}
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="grid gap-5 lg:grid-cols-3">
                <Card shadow="sm" className="lg:col-span-1">
                    <CardBody className="p-6">
                        {/* Avatar Comp */}
                        {/* Delete User Button */}
                    </CardBody>
                </Card>

                <Card shadow="sm" className="lg:col-span-2">
                    <CardBody className="p-6">
                        <GeneralForm register={register} loading={isSubmitting} errors={errors} />
                    </CardBody>
                </Card>
            </div>
        </form>
    );
};

export default GeneralSection;
