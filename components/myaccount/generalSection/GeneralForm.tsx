import { Button, CardBody, Input, InputSlots, Select, SelectItem, SlotsToClasses } from '@nextui-org/react';
import { FC } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { IMyAccountFormData } from './GeneralSection';
import validator from 'validator';
import { useAuthStore } from '@/store/useAuthStore';
import UserRoleSelect from '@/components/ui/inputs/UserRoleSelect';

interface Props {
    register: UseFormRegister<IMyAccountFormData>;
    loading?: boolean;
    errors?: FieldErrors<IMyAccountFormData>;
}

export const inputClassNames: SlotsToClasses<InputSlots> = {
    inputWrapper: 'border-1 focus-within:border-2',
};

const GeneralForm: FC<Props> = ({ register, errors, loading }) => {
    const user = useAuthStore((state) => state.user);
    const role = useAuthStore((state) => state.user?.role);

    return (
        <CardBody className="p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-2">
                <Input
                    type="text"
                    label="First Name"
                    variant="bordered"
                    classNames={inputClassNames}
                    disabled={loading}
                    isInvalid={!!errors?.firstName}
                    errorMessage={errors?.firstName?.message}
                    defaultValue={user?.firstName}
                    {...register('firstName', {
                        required: 'First Name is required',
                        validate: (value) => validator.isAlpha(value) || 'First Name must be alphabetic',
                        minLength: {
                            value: 2,
                            message: 'First Name must be at least 2 characters',
                        },

                        maxLength: {
                            value: 50,
                            message: 'First Name must not exceed 50 characters',
                        },
                    })}
                />

                <Input
                    type="text"
                    label="Last Name"
                    variant="bordered"
                    classNames={inputClassNames}
                    disabled={loading}
                    isInvalid={!!errors?.lastName}
                    errorMessage={errors?.lastName?.message}
                    defaultValue={user?.lastName}
                    {...register('lastName', {
                        required: 'Last Name is required',
                        validate: (value) => validator.isAlpha(value) || 'Last Name must be alphabetic',
                        minLength: {
                            value: 2,
                            message: 'Last Name must be at least 2 characters',
                        },

                        maxLength: {
                            value: 50,
                            message: 'Last Name must not exceed 50 characters',
                        },
                    })}
                />

                <Input
                    {...register('username', {
                        required: 'username is required',
                        validate: (value) => (validator.isNumeric(value) ? false : validator.isAlphanumeric(value) || `Username can't contain special characters or numbers only`),
                        minLength: { value: 4, message: 'Username must be at least 4 characters' },
                        maxLength: { value: 15, message: 'Username must not exceed 15 characters' },
                    })}
                    type="text"
                    label="username"
                    variant="bordered"
                    defaultValue={user?.username}
                    classNames={inputClassNames}
                    disabled={loading}
                    isInvalid={!!errors?.username}
                    errorMessage={errors?.username?.message}
                />

                <Input
                    {...register('email', {
                        validate: (value) => (value?.length === 0 ? true : validator.isEmail(value!) || 'Please enter a valid email address!'),
                    })}
                    type="email"
                    label="Email"
                    variant="bordered"
                    defaultValue={user?.email}
                    classNames={inputClassNames}
                    disabled={loading}
                    isInvalid={!!errors?.email}
                    errorMessage={errors?.email?.message}
                />

                <UserRoleSelect
                    {...register('role', {
                        validate: (value) => (value!.length === 0 ? true : ['superadmin', 'admin', 'moderator'].includes(value!) || 'Please select a valid role!'),
                    })}
                    label="Role"
                    variant="bordered"
                    classNames={{ trigger: 'border-1 focus-within:border-2 focus-visible:border-2 focus:border-2 active:border-2' }}
                    isDisabled={loading || role !== 'superadmin'}
                    isInvalid={!!errors?.role}
                    errorMessage={errors?.role?.message}
                    defaultSelectedKeys={[role!]}
                />
            </div>

            <div className="mt-8">
                <Button className="ml-auto block w-full md:w-auto" variant="shadow" color="primary" type="submit">
                    Save Changes
                </Button>
            </div>
        </CardBody>
    );
};

export default GeneralForm;
