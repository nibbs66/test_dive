import React from 'react';
import ClientHeader from "../ClientHeader";

function CourseWrapper() {
    return null;
}

const CourseDisplay = () => {
    return (
        <div className='flex flex-col w-screen min-h-screen m-auto  pt-1'>
            <ClientHeader title={`${id} ${' '} Diver`} lastPage={'/learn'}/>
            <div className={'flex flex-col  gap-5 px-10 pt-5'}>
                <CourseWrapper/>
            </div>


        </div>
    );
};

export default CourseDisplay;
