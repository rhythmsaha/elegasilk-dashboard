import { Button, Input } from '@nextui-org/react';
import { FaKey, FaUser } from 'react-icons/fa';
import { CgSpinner } from 'react-icons/cg';

import Image from 'next/image';
import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import API_URLS from '@/lib/ApiUrls';
import axios from '@/utils/axios';
import { useAuthStore } from '@/store/useAuthStore';
import { setSession } from '@/utils/jwt';
import { NextPageWithLayout } from './_app';
import GuestGuard from '@/guards/GuestGuard';

interface ILoginInput {
    username: string;
    password: string;
}

const LoginPage: NextPageWithLayout = () => {
    const [isVisible, setIsVisible] = useState(false);

    const login = useAuthStore((state) => state.login);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ILoginInput>();

    const onSubmit: SubmitHandler<ILoginInput> = async ({ password, username }) => {
        if (isSubmitting) return;

        try {
            const response = await axios.post(API_URLS.login, {
                username,
                password,
            });

            const { accessToken, user, message } = await response.data;

            login(user, accessToken);
            setSession(accessToken);
        } catch (error: any) {}
    };

    return (
        <div className="mx-auto w-11/12 max-w-md pt-[10vh] lg:pt-[15vh] xl:pt-[20vh]">
            <div>
                <Image src="/logo/logo_black.svg" alt="logo" width="100" height="100" className="mx-auto w-40 object-contain py-5" />

                <h4 className="px-1 text-center text-xl font-extrabold text-gray-700 sm:text-2xl ">Sign in to your account</h4>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)} autoComplete="new-password">
                <Input
                    type="text"
                    variant="flat"
                    placeholder="Username"
                    startContent={<FaUser className="text-gray-500" />}
                    size="sm"
                    disabled={isSubmitting}
                    isInvalid={!!errors.username}
                    errorMessage={errors.username?.message}
                    {...register('username', {
                        required: 'Username is required',
                    })}
                />

                <Input
                    {...register('password', {
                        required: 'Password is required',
                    })}
                    autoComplete="new-password"
                    placeholder="Password"
                    variant="flat"
                    disabled={isSubmitting}
                    startContent={<FaKey className="text-gray-500" />}
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? <BsEyeSlashFill className="pointer-events-none text-2xl text-default-400" /> : <BsEyeFill className="pointer-events-none text-2xl text-default-400" />}
                        </button>
                    }
                    type={isVisible ? 'text' : 'password'}
                    size="sm"
                    errorMessage={errors.password?.message}
                    isInvalid={!!errors.password}
                />

                <Button type="submit" color="primary" variant="shadow" fullWidth size="md" spinner={<CgSpinner className="animate-spin" />} isLoading={isSubmitting}>
                    Sign In
                </Button>
            </form>

            <div className="flex select-none items-center justify-center py-3">
                <Link href="" className="text-xs font-medium text-primary transition  hover:underline sm:text-sm">
                    Forgot your password?
                </Link>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return <GuestGuard>{page}</GuestGuard>;
};

export default LoginPage;
