import { IMyAccountFormData } from '@/components/myaccount/generalSection/GeneralSection';
import { useAuthStore } from '@/store/useAuthStore';
import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import React, { FC, forwardRef } from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = Omit<SelectProps, 'children'>;

const UserRoleSelect = forwardRef((props: Props, ref) => {
    const role = useAuthStore((state) => state.user?.role);

    const elements = [];

    if (role === 'superadmin') {
        elements.push(<SelectItem key="superadmin">Super Admin</SelectItem>);
        elements.push(<SelectItem key="admin">Admin</SelectItem>);
        elements.push(<SelectItem key="moderator">Moderator</SelectItem>);
    } else if (role === 'admin') {
        elements.push(<SelectItem key="admin">Admin</SelectItem>);
        elements.push(<SelectItem key="moderator">Moderator</SelectItem>);
    } else if (role === 'moderator') {
        elements.push(<SelectItem key="moderator">Moderator</SelectItem>);
    }

    return <Select {...props}>{elements.length > 0 ? elements : <SelectItem key="moderator">Moderator</SelectItem>}</Select>;
});

UserRoleSelect.displayName = 'UserRoleSelect';

export default UserRoleSelect;
