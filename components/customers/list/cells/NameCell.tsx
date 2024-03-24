import React from 'react';

interface Props {
    firstName?: string;
    lastName?: string;
}

const NameCell: React.FC<Props> = ({ firstName, lastName }) => {
    return (
        <div>
            <p>
                {firstName} {lastName}
            </p>
        </div>
    );
};

export default NameCell;
