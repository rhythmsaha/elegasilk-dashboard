import { IMyAccountFormData } from '@/components/myaccount/generalSection/GeneralSection';
import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = Omit<SelectProps, 'children'>;

const UserRoleSelect = (props: Props) => {
    return (
        <Select {...props}>
            <SelectItem key="superadmin">Super Admin</SelectItem>
            <SelectItem key="admin">Admin</SelectItem>
            <SelectItem key="moderator">Moderator</SelectItem>
        </Select>
    );
};

export default UserRoleSelect;
