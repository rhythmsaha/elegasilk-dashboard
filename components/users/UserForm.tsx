import { useAuthStore } from '@/store/useAuthStore';
import { Button, CardBody, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
import { inputClassNames } from '../myaccount/generalSection/GeneralForm';
import { ICreateNewUserFormData } from '@/sections/users/CreateNewUserSection';
import validator from 'validator';
import UserRoleSelect from '../ui/inputs/UserRoleSelect';
import ShowHidePasswordButton from '../ui/inputs/TogglePasswordButton';
import PasswordStrengthIndicator from '../ui/inputs/PasswordStrengthIndicator';

interface Props {
    register: UseFormRegister<ICreateNewUserFormData>;
    loading?: boolean;
    errors?: FieldErrors<ICreateNewUserFormData>;
    getValues: UseFormGetValues<ICreateNewUserFormData>;
}

const UserForm: React.FC<Props> = ({ register, errors, loading, getValues }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setIsPasswordVisible((state) => !state);

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
                    className="md:order-1"
                />

                <Input
                    type="text"
                    label="Last Name"
                    variant="bordered"
                    classNames={inputClassNames}
                    disabled={loading}
                    isInvalid={!!errors?.lastName}
                    errorMessage={errors?.lastName?.message}
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
                    className="md:order-2"
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
                    classNames={inputClassNames}
                    disabled={loading}
                    isInvalid={!!errors?.username}
                    errorMessage={errors?.username?.message}
                    className="md:order-3"
                />

                <Input
                    {...register('email', {
                        required: 'Email is required',
                        validate: (value) => (value?.length === 0 ? true : validator.isEmail(value!) || 'Please enter a valid email address!'),
                    })}
                    type="email"
                    label="Email"
                    variant="bordered"
                    classNames={inputClassNames}
                    disabled={loading}
                    isInvalid={!!errors?.email}
                    errorMessage={errors?.email?.message}
                    className="md:order-4"
                />

                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="New Password"
                    variant="bordered"
                    autoComplete="new-password"
                    description={<PasswordStrengthIndicator message="Password must be 8+ characters long" />}
                    classNames={inputClassNames}
                    endContent={<ShowHidePasswordButton visible={isPasswordVisible} onToggle={togglePasswordVisibility} />}
                    isInvalid={!!errors?.password}
                    errorMessage={errors?.password?.message && <PasswordStrengthIndicator message={errors?.password?.message} />}
                    {...register('password', {
                        required: 'New Password is required',
                        minLength: { value: 8, message: 'New Password must be at least 8 characters' },
                        maxLength: { value: 50, message: 'New Password must not exceed 50 characters' },
                        validate: (value) => validator.isStrongPassword(value) || 'New Password is not strong enough',
                    })}
                    className="md:order-5"
                />

                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="Confirm Password"
                    variant="bordered"
                    classNames={inputClassNames}
                    endContent={<ShowHidePasswordButton visible={isPasswordVisible} onToggle={togglePasswordVisibility} />}
                    isInvalid={!!errors?.confirmPassword}
                    errorMessage={errors?.confirmPassword?.message && <PasswordStrengthIndicator message={errors?.confirmPassword?.message} />}
                    {...register('confirmPassword', {
                        required: 'Confirm Password is required',
                        minLength: { value: 8, message: 'Confirm Password must be at least 8 characters' },
                        maxLength: { value: 50, message: 'Confirm Password must not exceed 50 characters' },
                        validate: (value) => validator.equals(value, getValues('password')) || 'Confirm Password must match New Password',
                    })}
                    className="md:order-7"
                />

                <UserRoleSelect
                    {...register('role', {
                        validate: (value) => (value && value!.length === 0 ? true : ['superadmin', 'admin', 'moderator'].includes(value!) || 'Please select a valid role!'),
                    })}
                    label="Role"
                    variant="bordered"
                    classNames={{ trigger: 'border-1 focus-within:border-2 focus-visible:border-2 focus:border-2 active:border-2' }}
                    isDisabled={loading}
                    isInvalid={!!errors?.role}
                    errorMessage={errors?.role?.message}
                    className="md:order-6"
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

export default UserForm;
