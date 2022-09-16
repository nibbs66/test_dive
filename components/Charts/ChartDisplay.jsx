import React from 'react';
import {ResponsiveContainer} from "recharts";

const ChartDisplay = ({children, width}) => {

    return (
        <ResponsiveContainer width={width}  aspect={4}>
            {children}
        </ResponsiveContainer>
    );
};

export default ChartDisplay;
