import { useAuthStore } from '@/store/useAuthStore';
import { Button, CardBody, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { Control, Controller, FieldErrors, UseFormGetValues, UseFormRegister } from 'react-hook-form';
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
    control?: Control<ICreateNewUserFormData, any>;
}

const UserForm: React.FC<Props> = ({ register, errors, loading, getValues, control }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setIsPasswordVisible((state) => !state);

    return (
        <CardBody className="p-4 sm:p-6">
            <div className="grid gap-4 md:grid-cols-2">
                <Controller
                    name="firstName"
                    rules={{
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
                    }}
                    control={control}
                    render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                        <Input
                            name={name}
                            onValueChange={onChange}
                            defaultValue={value}
                            onBlur={onBlur}
                            type="text"
                            label="First Name"
                            variant="bordered"
                            classNames={inputClassNames}
                            disabled={formState.isSubmitting}
                            isInvalid={invalid}
                            errorMessage={error?.message}
                            className="md:order-1"
                        />
                    )}
                />

                <Controller
                    name="lastName"
                    rules={{
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
                    }}
                    control={control}
                    render={({ field: { name, onBlur, onChange, value }, formState, fieldState }) => (
                        <Input
                            name={name}
                            onValueChange={onChange}
                            defaultValue={value}
                            onBlur={onBlur}
                            type="text"
                            label="Last Name"
                            variant="bordered"
                            classNames={inputClassNames}
                            disabled={formState.isSubmitting}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                            className="md:order-2"
                        />
                    )}
                />

                <Controller
                    name="username"
                    rules={{
                        required: 'username is required',
                        validate: (value) => (validator.isNumeric(value) ? false : validator.isAlphanumeric(value) || `Username can't contain special characters or numbers only`),
                        minLength: { value: 4, message: 'Username must be at least 4 characters' },
                        maxLength: { value: 15, message: 'Username must not exceed 15 characters' },
                    }}
                    control={control}
                    render={({ field: { name, onBlur, onChange, value }, formState, fieldState }) => (
                        <Input
                            name={name}
                            onValueChange={onChange}
                            defaultValue={value}
                            onBlur={onBlur}
                            type="text"
                            label="username"
                            variant="bordered"
                            classNames={inputClassNames}
                            disabled={formState.isSubmitting}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                            className="md:order-3"
                        />
                    )}
                />

                <Controller
                    name="email"
                    rules={{
                        required: 'Email is required',
                        validate: (value) => (value?.length === 0 ? true : validator.isEmail(value) || 'Please enter a valid email address!'),
                    }}
                    control={control}
                    render={({ field: { name, onBlur, onChange, value }, formState, fieldState }) => (
                        <Input
                            name={name}
                            onValueChange={onChange}
                            defaultValue={value}
                            onBlur={onBlur}
                            label="Email"
                            variant="bordered"
                            classNames={inputClassNames}
                            disabled={formState.isSubmitting}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message}
                            className="md:order-4"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    rules={{
                        required: 'New Password is required',
                        minLength: { value: 8, message: 'New Password must be at least 8 characters' },
                        maxLength: { value: 50, message: 'New Password must not exceed 50 characters' },
                        validate: (value) => validator.isStrongPassword(value) || 'New Password is not strong enough',
                    }}
                    render={({ field: { name, onBlur, onChange, value }, formState, fieldState }) => (
                        <Input
                            name={name}
                            onValueChange={onChange}
                            defaultValue={value}
                            onBlur={onBlur}
                            type={isPasswordVisible ? 'text' : 'password'}
                            label="New Password"
                            variant="bordered"
                            autoComplete="new-password"
                            classNames={inputClassNames}
                            isInvalid={fieldState.invalid}
                            description={<PasswordStrengthIndicator message="Password must be 8+ characters long" />}
                            endContent={<ShowHidePasswordButton visible={isPasswordVisible} onToggle={togglePasswordVisibility} />}
                            errorMessage={fieldState.error?.message && <PasswordStrengthIndicator message={fieldState.error?.message} />}
                            className="md:order-5"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                        required: 'New Password is required',
                        minLength: { value: 8, message: 'New Password must be at least 8 characters' },
                        maxLength: { value: 50, message: 'New Password must not exceed 50 characters' },
                        validate: (value) => validator.isStrongPassword(value) || 'New Password is not strong enough',
                    }}
                    render={({ field: { name, onBlur, onChange, value }, formState, fieldState }) => (
                        <Input
                            name={name}
                            onValueChange={onChange}
                            defaultValue={value}
                            onBlur={onBlur}
                            type={isPasswordVisible ? 'text' : 'password'}
                            label="Confirm Password"
                            variant="bordered"
                            autoComplete="new-password"
                            classNames={inputClassNames}
                            endContent={<ShowHidePasswordButton visible={isPasswordVisible} onToggle={togglePasswordVisibility} />}
                            description={<PasswordStrengthIndicator message="Password must be 8+ characters long" />}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message && <PasswordStrengthIndicator message={fieldState.error?.message} />}
                            className="md:order-7"
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="role"
                    rules={{ validate: (value) => (value && value!.length === 0 ? true : ['superadmin', 'admin', 'moderator'].includes(value!) || 'Please select a valid role!') }}
                    render={({ field, formState, fieldState }) => (
                        <UserRoleSelect
                            {...field}
                            defaultSelectedKeys={field.value ? [field.value] : []}
                            label="Role"
                            variant="bordered"
                            classNames={{ trigger: 'border-1 focus-within:border-2 focus-visible:border-2 focus:border-2 active:border-2' }}
                            isDisabled={formState.isSubmitting}
                            isInvalid={fieldState.invalid}
                            errorMessage={fieldState.error?.message && <PasswordStrengthIndicator message={fieldState.error?.message} />}
                            className="md:order-6"
                            mode="others"
                        />
                    )}
                />
            </div>

            <div className="mt-8">
                <Button className="ml-auto block w-full min-w-[120px] md:w-auto" variant="shadow" color="primary" type="submit">
                    {loading ? 'Please Wait...' : ' Save Changes'}
                </Button>
            </div>
        </CardBody>
    );
};

export default UserForm;
