import { Button } from '@nextui-org/react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

export default function ShowHidePasswordButton({ onToggle, visible }: { visible: boolean; onToggle: () => void }) {
    return (
        <Button isIconOnly variant="light" radius="full" className="h-full focus:outline-none" type="button" onClick={onToggle}>
            {visible ? <BsEyeSlashFill className="pointer-events-none text-2xl text-inherit opacity-30" /> : <BsEyeFill className="pointer-events-none text-2xl text-inherit opacity-30" />}
        </Button>
    );
}
