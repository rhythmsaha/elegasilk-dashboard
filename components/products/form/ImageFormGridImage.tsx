import { ImageFileType } from '@/Typings';
import { Image } from '@nextui-org/react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, useState } from 'react';
import { PiXCircleDuotone } from 'react-icons/pi';

type Props = {
    img: ImageFileType;
    onDelete: (id: string) => void;
};

const ImageFormGridImage: FC<Props> = ({ img, onDelete }) => {
    const [hovered, setHovered] = useState(false);

    const deleteButtonHandler = (id: string) => {
        onDelete(id);
    };

    return (
        <AnimatePresence>
            <div key={img.id} className="relative " onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <Image removeWrapper src={img.preview} alt="" className="m-0 aspect-square h-full w-full border-2 border-default-200 object-cover p-0" />

                {hovered && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-10 cursor-pointer rounded-xl bg-black bg-opacity-60">
                        <button className="flex h-full w-full items-center justify-center" type="button" onClick={() => deleteButtonHandler(img.id)}>
                            <PiXCircleDuotone className="absolute text-4xl text-default-100" />
                        </button>
                    </motion.div>
                )}
            </div>
        </AnimatePresence>
    );
};

export default ImageFormGridImage;
