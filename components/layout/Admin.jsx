import React from 'react';
import AdminSidebar from "../Admin/AdminSidebar"
import AdminNavbar from "../Admin/AdminNavbar";
import  {Toaster} from 'react-hot-toast'

const Admin = ({children}) => {
    return (
        <div className={'flex relative'}>
            <Toaster toastOptions={{className: 'text-center uppercase', duration: 5000,}}/>
            <AdminSidebar/>
            <div className={'flex flex-col w-full'}>
                <AdminNavbar/>
                {children}
            </div>

        </div>
    );
};

export default Admin;
