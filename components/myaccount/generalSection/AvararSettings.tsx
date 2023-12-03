import { Avatar, CardBody, Image } from '@nextui-org/react';
import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { MdAddAPhoto } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { IAvatarType } from './GeneralSection';

interface Props {
    defaultAvatarUrl?: string;
    avatar?: IAvatarType;
    setAvatar?: React.Dispatch<React.SetStateAction<IAvatarType | undefined>>;
}

const AvararSettings: FC<Props> = ({ avatar, setAvatar, defaultAvatarUrl }) => {
    const [hoverState, setHoverState] = useState(false);

    const suppoertedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    const maxSize = 2 * 1024 * 1024; //2 MB

    const createImageBlob = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files) throw new Error('No file selected');

            const file = e.target.files[0];

            if (!file) return console.log('No file selected');
            if (!suppoertedTypes.includes(file.type)) return;
            if (file.size > maxSize) return;

            const imageBlob = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });

            if (setAvatar) setAvatar(imageBlob);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <CardBody className="p-4 sm:p-6">
            <div className="flex flex-col items-center justify-center px-4 py-14 md:py-10">
                <label
                    htmlFor="changeUserAvatar"
                    className="relative flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed p-2"
                    onMouseEnter={() => setHoverState(true)}
                    onMouseLeave={() => setHoverState(false)}
                >
                    {avatar?.preview && <Avatar size="lg" src={avatar.preview} className="relative h-full w-full rounded-full border object-cover" alt="" />}

                    {defaultAvatarUrl && !avatar?.preview && <Avatar size="lg" src={defaultAvatarUrl} className="relative h-full w-full rounded-full border object-cover" alt="" />}

                    {!avatar?.preview && !defaultAvatarUrl && <FaUser className="h-full w-full rounded-full border p-10 text-gray-500" />}

                    <input id="changeUserAvatar" accept="image/*" type="file" onChange={(e) => createImageBlob(e)} className="hidden" />

                    <AnimatePresence>
                        {hoverState && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.25, type: 'just' }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-2 z-10  flex flex-col items-center justify-center gap-2 rounded-full bg-gray-900 bg-opacity-70 text-gray-300"
                            >
                                <MdAddAPhoto className="text-2xl" />
                                <p className="text-xs">Update Photo</p>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </label>

                <h2 className="mt-2 text-sm font-bold text-gray-500">Profile Picture</h2>

                <p className="mt-2 text-center text-xs font-medium text-gray-400">
                    Allowed *.jpeg, *.jpg, *.png <br /> max size of 2 MB
                </p>
            </div>
        </CardBody>
    );
};

export default AvararSettings;
