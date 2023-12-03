const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'elegasilk');
    formData.append('cloud_name', 'desihzeid');

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/desihzeid/image/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data?.url;
    } catch (error) {
        throw new Error('Failed to upload image!');
    }
};

export default uploadToCloudinary;
