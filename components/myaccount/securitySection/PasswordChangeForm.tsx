import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { FaCircleExclamation } from 'react-icons/fa6';
import { IChangePasswordFormData } from './SecutirySection';
import { SubmitHandler, useForm } from 'react-hook-form';
import { inputClassNames } from '../generalSection/GeneralForm';
import validator from 'validator';

const PasswordChangeForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<IChangePasswordFormData>();

    const togglePasswordVisibility = () => setIsPasswordVisible((state) => !state);

    const submitHandler: SubmitHandler<IChangePasswordFormData> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="sm:spy-6 space-y-4">
                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="Old Password"
                    variant="bordered"
                    classNames={inputClassNames}
                    endContent={<ShowHidePasswordButton visible={isPasswordVisible} onToggle={togglePasswordVisibility} />}
                    isInvalid={!!errors?.oldPassword}
                    errorMessage={errors?.oldPassword?.message && <PasswordStrengthIndicator message={errors?.oldPassword?.message} />}
                    {...register('oldPassword', {
                        required: 'Old Password is required',
                        minLength: { value: 8, message: 'Old Password must be at least 8 characters' },
                        maxLength: { value: 50, message: 'Old Password must not exceed 50 characters' },
                        validate: (value) => validator.isStrongPassword(value) || 'Old Password is not strong enough',
                    })}
                />

                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="New Password"
                    variant="bordered"
                    description={<PasswordStrengthIndicator message="Password must be 8+ characters long" />}
                    classNames={inputClassNames}
                    endContent={<ShowHidePasswordButton visible={isPasswordVisible} onToggle={togglePasswordVisibility} />}
                    isInvalid={!!errors?.newPassword}
                    errorMessage={errors?.newPassword?.message && <PasswordStrengthIndicator message={errors?.newPassword?.message} />}
                    {...register('newPassword', {
                        required: 'New Password is required',
                        minLength: { value: 8, message: 'New Password must be at least 8 characters' },
                        maxLength: { value: 50, message: 'New Password must not exceed 50 characters' },
                        validate: (value) => validator.isStrongPassword(value) || 'New Password is not strong enough',
                    })}
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
                        validate: (value) => validator.equals(value, getValues('newPassword')) || 'Confirm Password must match New Password',
                    })}
                />
            </div>

            <div className="mt-8">
                <Button className="ml-auto block w-full md:w-auto" variant="shadow" color="primary" type="submit">
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

export default PasswordChangeForm;

function ShowHidePasswordButton({ onToggle, visible }: { visible: boolean; onToggle: () => void }) {
    return (
        <Button isIconOnly variant="light" radius="full" className="h-full focus:outline-none" type="button" onClick={onToggle}>
            {visible ? <BsEyeSlashFill className="pointer-events-none text-2xl text-inherit opacity-30" /> : <BsEyeFill className="pointer-events-none text-2xl text-inherit opacity-30" />}
        </Button>
    );
}

function PasswordStrengthIndicator({ message }: { message: string }) {
    return (
        <p className="flex items-center gap-2">
            <FaCircleExclamation className="inline-block" />
            <span>{message}</span>
        </p>
    );
}
