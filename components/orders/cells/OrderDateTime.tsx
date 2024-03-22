import React from 'react';

interface Props {
    date: string;
    time: string;
}

const OrderDateTime: React.FC<Props> = (props) => {
    return (
        <div>
            <div className=" ">{props.date}</div>
            <div className="">{props.time}</div>
        </div>
    );
};

export default OrderDateTime;
