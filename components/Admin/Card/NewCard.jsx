import React from 'react';

const NewCard = ({children}) => {
    return (
        <div className=' sm:mt-16 mt-5 px-5 '>
        <div className='relative h-auto justify-center sm:h-full flex flex-col rounded-md drop-shadow-xl
                        md:rounded-xl md:drop-shadow-2xl  bg-white py-5 cursor-pointer'
                    >
            {children}

        </div>
        </div>
    );
};

export default NewCard;
