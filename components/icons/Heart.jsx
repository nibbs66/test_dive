import React from 'react';

const Heart = ({color}) => {
    return (
        <div>
            <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fillRule='nonzero'
                    clipRule='evenodd'
                    stroke={color}
                    d="M11.9877
                    18.2715L16.9239 13.3352L18.3747 11.9342L18.3762 11.9356L19.4386 10.8732C20.8055 9.50635 20.8055 7.29028 19.4386
                    5.92344C18.0718 4.55661 15.8557 4.55661 14.4889 5.92344L12.0133 8.39904L12.006 8.3918L12.005 8.39287L9.51101
                    5.89891C8.14417 4.53207 5.92809 4.53207 4.56126 5.89891C3.19442 7.26574 3.19442 9.48182
                    4.56126 10.8487L7.10068 13.3881L7.10248 13.3863L11.9877 18.2715Z"
                    fill='none' strokeWidth="2.5"
                />
            </svg>
        </div>
    );
};

export default Heart;
