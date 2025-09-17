import React, { useEffect, useState } from 'react';
import './index.scss';
import { mapModifiers } from '../../../utils/functions';

interface DelayedComponentProps {
    time: number; 
    zIndex: number;
    children: React.ReactNode;
}

const DelayedComponent: React.FC<DelayedComponentProps> = ({ time, children, zIndex }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        if (time === 0) return;
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, time);

        return () => clearTimeout(timer);
    }, [time]);

    return (
        <div className={mapModifiers(`delayed-component`, isVisible ? 'visible' : '', time.toString(), time === 0 && 'visible')} style={{
            position: 'relative',
            zIndex: zIndex,
        }}>
            {children}
        </div>
    );
};

export default DelayedComponent;
