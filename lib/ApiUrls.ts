const API_URLS = {
    // auth
    login: '/user/login',
    session: '/user/session',
    logout: '/user/logout',

    // Admin Self
    upadateAccount: '/user/user',
    updatePassword: '/user/password',

    // Admin Users
    createNewAdmin: '/user/create-new',
    getUsers: '/user/users',
    updateUser: '/user/user',
    deleteUser: (userId: string) => `/user/user/${userId}`,

    // Admin Categories
    createCategory: '/categories/create-new',
    getCategories: '/categories',
    getSingleCategory: (categoryId: string) => `/categories/${categoryId}`,
    updateCategory: (categoryId: string) => `/categories/${categoryId}`,
    deleteCategory: (categoryId: string) => `/categories/${categoryId}`,

    // Sub Categories
    createSubCategory: '/subcategories/create-new',
    getSubCategories: '/subcategories',
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
    getProducts: '/products',
    getSingleProduct: (productId: string) => `/products/${productId}`,
    updateProduct: (productId: string) => `/products/${productId}`,
    deleteProduct: (productId: string) => `/products/${productId}`,

    // Orders
    orders: {
        get: '/orders',
        getSingle: (id: string) => `/orders/${id}`,
        update: (id: string) => `/orders/${id}`,
        delete: (id: string) => `/orders/${id}`,
        updateStatus: (id: string) => `/orders/status/${id}`,
    },

    // Customers
    customers: {
        getCustomers: '/customers',
        updateStatus: `/customers/status`,
    },

    dashboard: {
        salesAndOrderReport: '/dashboard/report',
        graphData: '/dashboard/graph',
    },
};

export default API_URLS;
