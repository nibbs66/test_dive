import React from 'react';
import AdminSidebar from "../AdminSidebar"
import AdminNavbar from "../AdminNavbar";


const Admin = ({children}) => {
    return (
        <div className={'flex relative'}>
            <AdminSidebar/>
            <div className={'flex flex-col w-full'}>
                <AdminNavbar/>
                {children}
            </div>

        </div>
    );
};

export default Admin;
