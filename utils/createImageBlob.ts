import { ImageFileType } from '@/Typings';
const suppoertedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

const createImageBlob: (file: File, maxSize: number) => ImageFileType = (file, maxSize) => {
    try {
        if (!file) throw new Error('No file provided');
        if (!suppoertedTypes.includes(file.type)) throw new Error('File type not supported');
        if (file.size > maxSize) throw new Error('File size too large');

        const imageBlob = Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substr(2, 9),
        });

        if (!imageBlob) throw new Error('Error creating image blob');

        return imageBlob;
    } catch (error: any) {
        throw new Error(error);
    }
};

export default createImageBlob;
