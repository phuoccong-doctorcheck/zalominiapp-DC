import React, { useEffect, useState } from "react";
import { Box, Text } from "zmp-ui";
import ReactPullToRefresh from 'react-pull-to-refresh';

const { Title } = Text;
type Variant = 'default' | 'style';

interface PullToRefreshProps {
    children?: React.ReactNode;
    loading?: React.ReactNode;
    onRefresh: () => void;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
    children, onRefresh,
}) => {
    return (
        <ReactPullToRefresh
            onRefresh={onRefresh as any}
        >
            <>
                {children}
            </>
        </ReactPullToRefresh>
    );
};

PullToRefresh.defaultProps = {
};

export default PullToRefresh;
