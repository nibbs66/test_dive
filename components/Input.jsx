import React from 'react';

const Input = ({label, type, name}) => {
    return (
        <div className={`flex flex-col`}>
            <label className={'px-1'} htmlFor="">{label}</label>
            <input className={`border rounded border-slate-600`} type={type} name={name}/>
        </div>
    );
};

export default Input;
