import React from 'react';
import AdminSidebar from "../Admin/AdminSidebar"
import AdminNavbar from "../Admin/AdminNavbar";


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
