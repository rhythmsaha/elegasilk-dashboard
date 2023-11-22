import { Button, Input, Select, SelectItem, Selection } from '@nextui-org/react';
import React, { useState } from 'react';

interface Props {}

const GeneralForm = () => {
    const [role, setRole] = useState<Selection>(new Set([]));

    return (
        <div>
            <div className="grid gap-4 md:grid-cols-2">
                <Input type="text" label="First Name" variant="bordered" classNames={{ inputWrapper: 'border-1 focus-within:border-2' }} />
                <Input type="text" label="Last Name" variant="bordered" classNames={{ inputWrapper: 'border-1 focus-within:border-2' }} />
                <Input type="text" label="username" variant="bordered" classNames={{ inputWrapper: 'border-1 focus-within:border-2' }} />
                <Input type="email" label="Email" variant="bordered" classNames={{ inputWrapper: 'border-1 focus-within:border-2' }} />
                <Input type="tel" label="Phone" variant="bordered" classNames={{ inputWrapper: 'border-1 focus-within:border-2' }} />

                <Select
                    label="Role"
                    variant="bordered"
                    classNames={{ trigger: 'border-1 focus-within:border-2 focus-visible:border-2 focus:border-2 active:border-2' }}
                    onSelectionChange={(key) => setRole(key)}
                    selectedKeys={Array.from(role)}
                >
                    <SelectItem key="superadmin">Super Admin</SelectItem>
                    <SelectItem key="admin">Admin</SelectItem>
                    <SelectItem key="moderator">Moderator</SelectItem>
                </Select>
            </div>

            <div className="mt-8">
                <Button className="ml-auto block w-full md:w-auto" variant="shadow" color="primary">
                    Save Changes
                </Button>
            </div>
        </div>
    );
};

export default GeneralForm;
