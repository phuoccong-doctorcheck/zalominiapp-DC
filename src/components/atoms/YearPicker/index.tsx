import React, { useState, useRef } from 'react';
import { Icon } from 'zmp-ui';
import { useSwipeable } from 'react-swipeable';
import './styles.scss';

interface YearPickerProps {
    initialYear: number;
    value: number;
    onChange: (selectedYear: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ initialYear, value, onChange }) => {
    const [activeYear, setActiveYear] = useState(initialYear);
    const deltaXRef = useRef(0);

    const handleYearChange = (newYear: number) => {
        setActiveYear(newYear);
        onChange(newYear);
    };

    const handlers = useSwipeable({
        onSwiping: (event) => handleSwipe(event),
    });

    const handleSwipe = (event: any) => {
        deltaXRef.current = event.deltaX;
        requestAnimationFrame(() => updateYear());
    };

    const updateYear = () => {
        const deltaX = deltaXRef.current;
        const deltaThreshold = 50;

        if (deltaX > deltaThreshold && activeYear !== new Date().getFullYear()) {
            // Chỉ cho phép scroll ngược lại khi activeYear không phải là năm hiện tại
            const pixelsToYears = 10; // Số pixel tương ứng với khoảng 10 năm
            const yearsToScroll = Math.floor(deltaX / deltaThreshold) * pixelsToYears;
            const newYear = activeYear - yearsToScroll;

            if (newYear <= new Date().getFullYear()) {
                // Chỉ xử lý năm trong quá khứ
                handleYearChange(newYear);
            }
        } else if (deltaX < -deltaThreshold) {
            const pixelsToYears = 10;
            const yearsToScroll = Math.floor(-deltaX / deltaThreshold) * pixelsToYears;
            const newYear = activeYear + yearsToScroll;
            handleYearChange(newYear);
        }
    };

    const renderYears = () => {
        const currentYear = new Date().getFullYear();
        const isCurrentYear = activeYear === currentYear;
        const yearsToDisplay = isCurrentYear ? [-1, 0] : [-1, 0, 1];

        return yearsToDisplay.map((offset) => {
            const year = activeYear + offset;
            if (isCurrentYear && offset > 0) {
                return null; // Bỏ qua năm trong tương lai nếu activeYear là năm hiện tại
            }
            return (
                <div
                    key={year}
                    className={`year ${offset === 0 ? 'active' : ''}`}
                    onClick={() => handleYearChange(year)}
                >
                    {offset === 0 ? year : year}
                </div>
            );
        });
    };

    return (
        <div {...handlers} className="year-picker flex items-center justify-between">
            <Icon icon="zi-chevron-left" className='text-[#04566e] font-bold translate-x-[-15px]' />
            <div className="years">{renderYears()}</div>
            <Icon icon="zi-chevron-right" className='text-[#04566e] font-bold translate-x-[15px]' />
        </div>
    );
};

export default YearPicker;
