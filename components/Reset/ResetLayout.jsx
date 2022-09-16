import {useEffect} from 'react';

const ResetLayout = ({children, handleSubmit, onSubmit}) => {

    return (
        <div className={`h-screen w-screen sm:p-24 p-5`}>
            <div className={`flex justify-center   sm:px-10`}>
                <form className={`flex flex-col  items-center  gap-4 w-full sm;w-1/2 xl:w-1/3 py-10 md:border rounded-md md:shadow-xl text-slate-400`}  onSubmit={handleSubmit(onSubmit)}>
                    {children}
        </form>
            </div>
        </div>
    );
};

export default ResetLayout;
