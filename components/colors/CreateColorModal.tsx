import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter } from '@nextui-org/react';
import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ChromePicker, ChromePickerProps, Color, ColorChangeHandler, SketchPicker, SliderPicker } from 'react-color';
import { PiPencil } from 'react-icons/pi';
import { inputClassNames } from '../myaccount/generalSection/GeneralForm';
import { IColor, useColorsStore } from '@/store/colors/useColors';
import toast from 'react-hot-toast';
import axios from '@/utils/axios';
import API_URLS from '@/lib/ApiUrls';

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    id: string;
    onCreate: (id: string) => void;
}

interface IColorFromData {
    name: string;
    hex: Color;
}

const CreateColorModal: FC<Props> = ({ id, isOpen, onCreate, onOpenChange }) => {
    const [color, setColor] = useState<Color>();
    const dispatchColor = useColorsStore((state) => state.addColor);

    const colorChange: ColorChangeHandler = (color) => {
        setColor(color.hex);
    };

    const {
        handleSubmit,
        control,

        formState: { isSubmitting },
    } = useForm<IColorFromData>();

    const submitHandler = async (data: IColorFromData) => {
        toast.dismiss();
        if (isSubmitting) return;

        const payload: IColorFromData = {
            ...data,
        };

        try {
            if (!color) throw new Error('Color is required!');
            payload.hex = color;
            console.log(payload);
            const response = await axios.post(API_URLS.createColor, payload);
            if (response.status !== 201) throw new Error('Something Went Wrong!');
            dispatchColor(response.data.data);
            onOpenChange();
            toast.success('Color Created Successfully!');
        } catch (error: any) {
            toast.error(error.message || 'Something went wrong!');
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} hideCloseButton size="full">
            <ModalContent className="md:h-auto md:max-w-xl md:!rounded-2xl md:shadow-lg">
                {(onClose) => (
                    <form onSubmit={handleSubmit(submitHandler)} className="h-full">
                        <ModalBody className="py-8">
                            <div className="flex flex-col items-center  gap-4 md:flex-row md:items-start">
                                <div className="rounded-full bg-success-100 p-2.5">
                                    <PiPencil className="text-2xl text-success-600" aria-hidden="true" />
                                </div>

                                <div className="text-center md:text-left">
                                    <h4 className="text-base font-semibold leading-6 text-gray-900">Create New Color</h4>
                                    <p className="text-sm text-gray-300">You can not delete this color after creation.</p>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Controller
                                    name="name"
                                    rules={{
                                        required: 'Name is required!',
                                    }}
                                    control={control}
                                    render={({ field: { name, onBlur, onChange, value }, formState, fieldState: { invalid, error } }) => (
                                        <Input
                                            name={name}
                                            onValueChange={onChange}
                                            defaultValue={value}
                                            onBlur={onBlur}
                                            type="text"
                                            label="Name"
                                            variant="bordered"
                                            classNames={inputClassNames}
                                            disabled={formState.isSubmitting}
                                            isInvalid={invalid}
                                            errorMessage={error?.message}
                                        />
                                    )}
                                />

                                <div className="mt-4">
                                    <ChromePicker className="min-w-full max-w-full" color={color} onChange={colorChange} />
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter className="flex-col gap-2 pt-0 md:flex-row">
                            <Button color="default" variant="bordered" onPress={onClose} className="order-2 w-full md:order-1 md:w-28">
                                Close
                            </Button>

                            <Button color="primary" type="submit" variant="shadow" className="order-1 w-full md:order-2 md:w-28">
                                Create
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CreateColorModal;
