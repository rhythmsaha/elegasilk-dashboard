import React, { useRef, useState } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { Input } from '@nextui-org/react';
import { useClickAway } from 'react-use';

const currentDate = new Date();
const tomorrowDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
const minDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 367);

interface Props {
    alignRight?: boolean;
    placeHolder?: string;

    selectedDate: Date | undefined;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DatePicker: React.FC<Props> = ({ alignRight, placeHolder, selectedDate, setSelectedDate }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    // const [selected, setSelected] = useState<Date>();
    const [inputValue, setInputValue] = useState('');

    const ref = useRef(null);

    useClickAway(ref, () => {
        setShowDatePicker(false);
    });

    const onDateChange = (e: any) => {
        e.preventDefault();
    };

    const onToggle = (e: any) => {
        setShowDatePicker((prev) => !prev);
    };

    return (
        <div className="relative w-full" ref={ref}>
            <button onClick={onToggle} className="w-full cursor-pointer">
                <Input type="text" variant="bordered" placeholder={placeHolder} onChange={onDateChange} value={inputValue} readOnly />
            </button>

            {showDatePicker && (
                <DayPicker
                    className={`absolute top-12 z-10 rounded-xl bg-white p-2 shadow-lg ${alignRight ? '-right-3' : '-left-3'}`}
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                        if (date) {
                            setInputValue(format(date!, 'MMM dd, yyyy'));
                        } else {
                            setInputValue('');
                        }

                        setSelectedDate(date);
                    }}
                    disabled={[
                        { from: new Date('1-1-1979'), to: minDate },
                        { from: tomorrowDate, to: new Date('12-12-9999') },
                    ]}
                />
            )}
        </div>
    );
};

export default DatePicker;
