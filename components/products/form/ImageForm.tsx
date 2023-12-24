import { ImageFileType } from '@/Typings';
import createImageBlob from '@/utils/createImageBlob';
import { Image } from '@nextui-org/react';
import { FC } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { PiXCircleDuotone } from 'react-icons/pi';

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

    console.log(images);

    return (
        <div>
            <h3 className="mb-2 ml-1 text-lg font-semibold">Images</h3>
            <div className="overflow-hidden rounded-xl border-2 border-dashed">
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

            <div className="mt-4">
                <div className="grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 ">
                    {images.length > 0 &&
                        images.map((f) => (
                            <div key={f.name + f.lastModified.toLocaleString()} className="relative">
                                <Image removeWrapper src={f.preview} alt="" className="m-0 aspect-square h-full w-full border-2 border-default-200 object-cover p-0" />

                                <button className="absolute left-1 top-1 z-10" type="button">
                                    <PiXCircleDuotone className="absolute text-xl text-default-500" />
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ImageForm;
