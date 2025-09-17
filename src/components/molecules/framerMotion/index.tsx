/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { motion, AnimatePresence } from "framer-motion"

interface FramerMotionProps {
    children: React.ReactNode;
    numberDelay: number;
}

const FramerMotion: React.FC<FramerMotionProps> = ({ children, numberDelay }) => {
    return (
        <div className="m-framer_motion">
            <AnimatePresence mode="sync">
                <motion.div
                    layout
                    layoutRoot
                    initial={{ x: 15 }}
                    animate={{ x: 0 }}
                    exit={{ x: 15 }}
                    transition={{ duration: 1, delay: Number(numberDelay / 12), type: 'spring', restSpeed: 1, stiffness: 120 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

FramerMotion.defaultProps = {
    children: undefined,
};

export default FramerMotion;
