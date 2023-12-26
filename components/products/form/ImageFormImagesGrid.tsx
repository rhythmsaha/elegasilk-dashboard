import { ImageFileType } from '@/Typings';
import React, { FC } from 'react';
import ImageFormGridImage from './ImageFormGridImage';

type Props = {
    images: ImageFileType[];
    onDelete: (id: string) => void;
};

const ImageFormImagesGrid: FC<Props> = ({ images, onDelete }) => {
    return (
        <div className="mt-4 grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 ">
            {images.length > 0 && images.map((f, index) => <ImageFormGridImage onDelete={onDelete} img={f} key={f.id} />)}
        </div>
    );
};

export default ImageFormImagesGrid;
