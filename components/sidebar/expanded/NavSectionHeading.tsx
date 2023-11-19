import React from 'react';

interface Props {
    title: string;
}
const NavSectionHeading: React.FC<Props> = ({ title }) => {
    return (
        <div className="w-full px-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                {title}
            </h3>
        </div>
    );
};

export default NavSectionHeading;
