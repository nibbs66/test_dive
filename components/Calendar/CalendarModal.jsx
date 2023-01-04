import React from 'react';

const CalendarModal = ({children, showModal, setShowModal}) => {
    return (
        <>
            {showModal && <div className="flex  items-center justify-center h-screen w-screen top-0 left-0 right-0 fixed bg-black/50 z-50">
                <div className=" flex flex-col  max-w-fit bg-slate-50 rounded-md px-10 p-10 mb-32 relative">
                    <div className="relative w-full">
                        <span
                            className={`absolute h-8 w-8  flex justify-center rounded-full border-2 border-white  -right-10 -top-20 font-bold cursor-pointer text-lg`}
                            onClick={() => setShowModal(false)}
                    >
        <span className='text-white'>X</span>
       </span>
                    </div>
                    <div className='flex w-full min-h-full'>
                        {children}
                    </div>
                </div>
            </div>}
        </>
    );
};

export default CalendarModal;
