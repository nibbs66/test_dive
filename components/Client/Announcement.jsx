import React from 'react';

const Announcement = () => {
    return (
        <div className='flex bg-green-100 items-center justify-evenly h-12 w-[200vw] animate-[vendorScroll_20s_linear_infinite] overflow-hidden'>
            <div   className='bg-repeat-x'>
                <span>Free Shipping on orders over €70.00</span>
            </div>
        </div>
    );
};

export default Announcement;
