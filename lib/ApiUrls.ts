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

    // forgetPassword: "/auth/seller/forgetpassword",
    // resetPassword: "/auth/seller/resetpassword",
    // updatePassword: "/auth/seller/changepassword",
    // changeEmail: "/auth/seller/changeemail",
    // verifyEmail: "/auth/seller/verifyemail",
    // updateNotificationSettings: "/auth/seller/update_notification_settings",
};

export default API_URLS;
