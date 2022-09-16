import React from 'react';

const ArrowUp = ({height, width, color}) => {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" className={`${height} ${width}`}>
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"/>
            </svg>

        </div>
    );
};

export default ArrowUp;
