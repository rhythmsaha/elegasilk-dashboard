import { ImageFileType } from '@/Typings';
import createImageBlob from '@/utils/createImageBlob';
import { Image } from '@nextui-org/react';
import { FC } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { PiXCircleDuotone } from 'react-icons/pi';
import ImageFormImagesGrid from './ImageFormImagesGrid';

interface Props {
    images: ImageFileType[];
    setImages: React.Dispatch<React.SetStateAction<ImageFileType[]>>;
}

const fileTypes = ['JPG', 'PNG', 'GIF'];

const ImageForm: FC<Props> = ({ images, setImages }) => {
    const handleChange = (_file: object) => {
        const _fileArray = Object.values(_file) as ImageFileType[];

        _fileArray.map((file: File) => {
            createImageBlob(file, 10240000000000);
        });

        setImages((prev) => [...prev, ..._fileArray]);
    };

    const deleteImageHandler = (id: string) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    return (
        <section>
            <h3 className="mb-2 ml-1 text-lg font-semibold">Images</h3>

            <div className="overflow-hidden rounded-xl border-2 border-dashed transition duration-250 ease-in hover:border-primary-200">
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} multiple>
                    <div className="flex cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-50 p-8 transition duration-250 hover:bg-gray-100">
                        <MdAddPhotoAlternate className="text-9xl text-gray-400" />
                        <h3 className="text-center text-lg font-semibold text-gray-700 lg:font-bold">Drop or Select file</h3>
                        <p className="mt-2 text-center text-sm text-gray-400">
                            Drop files here or click <span className="font-medium text-primary-400">browse</span> thorough your machine
                        </p>
                    </div>
                </FileUploader>
            </div>

            <ImageFormImagesGrid images={images} onDelete={deleteImageHandler} />
        </section>
    );
};

export default ImageForm;
