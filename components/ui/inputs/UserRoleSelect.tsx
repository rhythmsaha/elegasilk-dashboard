import { IMyAccountFormData } from '@/components/myaccount/generalSection/GeneralSection';
import { useAuthStore } from '@/store/useAuthStore';
import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import React, { forwardRef } from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = Omit<SelectProps, 'children'> & {
    register?: UseFormRegister<IMyAccountFormData>;
    loading?: boolean;
    mode?: 'self' | 'others';
};

const UserRoleSelect = forwardRef((props: Props, ref) => {
    const role = useAuthStore((state) => state.user?.role);
    let isSelfEdit = props.mode === 'self';

    const elements = [];

    if (role === 'superadmin') {
        elements.push(<SelectItem key="superadmin">Super Admin</SelectItem>);
        elements.push(<SelectItem key="admin">Admin</SelectItem>);
        elements.push(<SelectItem key="moderator">Moderator</SelectItem>);
    } else if (role === 'admin') {
        if (isSelfEdit) {
            elements.push(<SelectItem key="admin">Admin</SelectItem>);
        }

        elements.push(<SelectItem key="moderator">Moderator</SelectItem>);
    } else if (role === 'moderator') {
        elements.push(<SelectItem key="moderator">Moderator</SelectItem>);
    }

    return <Select {...props}>{elements.length > 0 ? elements : <SelectItem key="moderator">Moderator</SelectItem>}</Select>;
});

UserRoleSelect.displayName = 'UserRoleSelect';

export default UserRoleSelect;
