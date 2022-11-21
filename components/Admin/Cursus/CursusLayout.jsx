import React from 'react';
import Link from "next/link";

const CursusLayout = ({children, user, editButton, deleteButton}) => {
    return (
        <div className=' relative flex flex-col gap-5 justify-start h-full  w-full mx-auto p-5   mt-16'>
            <div className='absolute w-5/6 h-16 flex items-center justify-between shadow-2xl py-2.5 p-10 mx-20   items-center rounded-md bg-blue-600 -top-8 ' >
                {user && <h1
                    className=' uppercase text-3xl font-thin text-slate-600 tracking-widest'>{user.firstName}{' '}{user.lastName}</h1>}
                <div className='flex gap-3 '>
                    {editButton && <Link href={`/admin/users/edit/${user._id}`} style={{textDecoration: "none"}} >
                        <button
                            className=' uppercase py-1 px-4 rounded font-bold text-sm text-white bg-[#3b81f6]'>Edit
                        </button>
                    </Link>}
                    {deleteButton && <button
                        className=' uppercase py-1 px-4 rounded font-bold text-sm bg-[#ef4444] text-white'>Delete</button>}

                </div>
            </div>
            {children}
        </div>
    );
};

export default CursusLayout;
