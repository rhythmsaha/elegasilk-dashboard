import { As, Button } from '@nextui-org/react';
import Link from 'next/link';
import { FC, MouseEventHandler } from 'react';
import { BiPlus } from 'react-icons/bi';

interface CreateNewButtonProps {
    as?: As<any> | undefined;
    href?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    text?: string;
    Icon?: JSX.Element;
}

const CreateNewButton: FC<CreateNewButtonProps> = ({ as, href, onClick, Icon, text }) => {
    return (
        <Button as={as} href={href || undefined} onClick={onClick} variant="shadow" color="primary">
            <span>{Icon}</span>
            <span>{text}</span>
        </Button>
    );
};

export default CreateNewButton;
