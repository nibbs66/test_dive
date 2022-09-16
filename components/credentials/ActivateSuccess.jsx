import React from 'react';
import Link from "next/link";

const ActivateSuccess = () => {
    return (
        <div className={`h-screen p-24`}>
            <div className={`flex justify-center px-10`}>
                <div className={`flex flex-col items-center gap-6 w-1/2 md:w-1/2 py-10 px-10 md:border rounded-md md:shadow-xl text-slate-400`}>
                    <span className={`text-lg text-center uppercase`}>Your account has been activated.  You can now log in to your account.</span>
                    <Link href={`/login`} passHref>
                        <button className={`uppercase bg-blue-500 text-white font-bold rounded py-1 px-2`}>
                            login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ActivateSuccess;
