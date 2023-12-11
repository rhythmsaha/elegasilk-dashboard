import { ImageFileType } from '@/Typings';
import createImageBlob from '@/utils/createImageBlob';
import { CardBody, Image } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { BiImageAdd } from 'react-icons/bi';
import { MdAddAPhoto } from 'react-icons/md';

interface IUploadImageProps {
    defaultImage?: string;
    image?: ImageFileType;
    setImage?: React.Dispatch<React.SetStateAction<ImageFileType | undefined>>;
}

const UploadImage: FC<IUploadImageProps> = ({ defaultImage, image, setImage }) => {
    const [hoverState, setHoverState] = useState(false);

    const maxSize = 100 * 1024 * 1024; //2 MB

    const selectImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!e.target.files) throw new Error('No file selected');
            const file = e.target.files[0];

            const imageBlob = createImageBlob(file, maxSize);

            if (setImage) setImage(imageBlob);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <CardBody className=" p-4 sm:p-6">
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed px-4 py-14 md:py-10">
                <label
                    htmlFor="changeUserAvatar"
                    className="relative flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-dashed p-2"
                    onMouseEnter={() => setHoverState(true)}
                    onMouseLeave={() => setHoverState(false)}
                >
                    {image?.preview && <Image src={image.preview} removeWrapper className="h-full w-full rounded-full object-cover" alt="" />}

                    {defaultImage && !image?.preview && <Image src={defaultImage} className="relative h-full w-full rounded-full border object-cover object-top" removeWrapper alt="" />}

                    {!image?.preview && !defaultImage && <BiImageAdd className="h-full w-full rounded-full border p-10 text-gray-500" />}

                    <input id="changeUserAvatar" accept="image/*" type="file" onChange={(e) => selectImageHandler(e)} className="hidden" />

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

                <h2 className="mt-2 text-sm font-bold text-gray-500">Thumbnail</h2>

                <p className="mt-2 text-center text-xs font-medium text-gray-400">
                    Allowed *.jpeg, *.jpg, *.png <br /> max size of 2 MB
                </p>
            </div>
        </CardBody>
    );
};

export default UploadImage;
