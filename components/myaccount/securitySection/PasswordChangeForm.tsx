import { Button, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { FaCircleExclamation } from 'react-icons/fa6';

const PasswordChangeForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setIsPasswordVisible((state) => !state);

    return (
        <div>
            <div className="sm:spy-6 space-y-4">
                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="Old Password"
                    variant="bordered"
                    classNames={{ inputWrapper: 'border-1 focus-within:border-2' }}
                    endContent={
                        <Button isIconOnly variant="light" radius="full" className="h-full focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? (
                                <BsEyeSlashFill className="pointer-events-none text-2xl text-inherit opacity-30" />
                            ) : (
                                <BsEyeFill className="pointer-events-none text-2xl text-inherit opacity-30" />
                            )}
                        </Button>
                    }
                />

                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="New Password"
                    variant="bordered"
                    description={
                        <p className="flex items-center gap-2">
                            <FaCircleExclamation className="inline-block" />
                            <span>Password must be minimum 6+</span>
                        </p>
                    }
                    classNames={{ inputWrapper: 'border-1 focus-within:border-2' }}
                    endContent={
                        <Button isIconOnly variant="light" radius="full" className="h-full focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? (
                                <BsEyeSlashFill className="pointer-events-none text-2xl text-inherit opacity-30" />
                            ) : (
                                <BsEyeFill className="pointer-events-none text-2xl text-inherit opacity-30" />
                            )}
                        </Button>
                    }
                />

                <Input
                    type={isPasswordVisible ? 'text' : 'password'}
                    label="Confirm Password"
                    variant="bordered"
                    classNames={{ inputWrapper: 'border-1 focus-within:border-2' }}
                    endContent={
                        <Button isIconOnly variant="light" radius="full" className="h-full focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? (
                                <BsEyeSlashFill className="pointer-events-none text-2xl text-inherit opacity-30" />
                            ) : (
                                <BsEyeFill className="pointer-events-none text-2xl text-inherit opacity-30" />
                            )}
                        </Button>
                    }
                />
            </div>

            <div className="mt-8">
                <Button className="ml-auto block w-full md:w-auto" variant="shadow" color="primary">
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default PasswordChangeForm;
