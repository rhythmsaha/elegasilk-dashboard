import { FaCircleExclamation } from 'react-icons/fa6';

export default function PasswordStrengthIndicator({ message }: { message: string }) {
    return (
        <p className="flex items-center gap-2">
            <FaCircleExclamation className="inline-block" />
            <span>{message}</span>
        </p>
    );
}
