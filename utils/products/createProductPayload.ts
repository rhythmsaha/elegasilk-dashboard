import { ImageFileType } from '@/Typings';
import { IProductFormData } from '@/sections/products/NewProductSection';

const createProductPayload = (data: IProductFormData, images: ImageFileType[]): any => {
    const payload: any = {};

    if (images.length > 0) payload['images'] = images.map((img) => img.publicUrl);
    if (data.name) payload.name = data.name;
    if (data.slug) payload.slug = data.slug;
    if (data.description) payload.description = data.description;
    if (data.sku) payload.sku = data.sku;
    if (data.stock) payload.stock = data.stock;
    if (data.MRP) payload.MRP = data.MRP;
    if (data.price) payload.price = data.price;
    if (data.published) payload.published = data.published;
    if (data.attributes) {
        const _attrs = data.attributes
            .map((attr) => {
                if (attr.subcategory) {
                    const _subcat = attr.subcategory.split(',');
                    return {
                        _id: attr._id,
                        category: attr.category,
                        subcategory: _subcat,
                    };
                }
            })
            .filter((attr) => attr);

        payload.attributes = _attrs;
    }

    if (data.specs) {
        const _specs = data.specs
            .map((spec) => {
                if (spec.name && spec.value) {
                    return {
                        name: spec.name,
                        value: spec.value,
                    };
                }
            })
            .filter((spec) => spec);

        payload.specs = _specs;
    }

    if (data.collections) {
        const _collections = data.collections.split(',');
        payload.collections = _collections;
    }
    if (data.colors) {
        const _colors = data.colors.split(',');
        payload.colors = _colors;
    }

    return payload;
};

export default createProductPayload;
