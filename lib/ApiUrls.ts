const API_URLS = {
    // auth
    login: '/admin/login',
    session: '/admin/session',
    logout: '/admin/logout',

    // Admin Self
    upadateAccount: '/admin/user',
    updatePassword: '/admin/password',

    // Admin Users
    createNewAdmin: '/admin/create-new',
    getUsers: '/admin/users',
    updateUser: '/admin/user',
    deleteUser: (userId: string) => `/admin/user/${userId}`,

    // Admin Categories
    createCategory: '/categories/create-new',
    getCategories: '/categories',
    getSingleCategory: (categoryId: string) => `/categories/${categoryId}`,
    updateCategory: (categoryId: string) => `/categories/${categoryId}`,
    deleteCategory: (categoryId: string) => `/categories/${categoryId}`,

    // Sub Categories
    createSubCategory: '/subcategories/create-new',
    getSingleSubCategory: (subCategoryId: string) => `/subcategories/${subCategoryId}`,
    updateSubCategory: (subCategoryId: string) => `/subcategories/${subCategoryId}`,
    deleteSubCategory: (subCategoryId: string) => `/subcategories/${subCategoryId}`,

    // Collections
    createCollection: '/collections/create-new',
    getCollections: '/collections',
    getSingleCollection: (collectionId: string) => `/collections/${collectionId}`,
    updateCollection: (collectionId: string) => `/collections/${collectionId}`,
    deleteCollection: (collectionId: string) => `/collections/${collectionId}`,

    // Colors
    createColor: '/colors/create-new',
    getColors: '/colors',

    // Products
    createProduct: '/products/create-new',
};

export default API_URLS;
