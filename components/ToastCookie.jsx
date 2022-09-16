import React from 'react';
import { toast, Toaster, ToastBar } from 'react-hot-toast';
const ToastCookie = () => {
    return (
        <Toaster>
            {(t)=>(
                <ToastBar toast={t}>
                    <span>Lot of cookies here.  Accept or fact the consequences!!</span>
                    <button onClick={()=>toast.dismiss(t.id)}>Capitulate</button>

                </ToastBar>

            )}

        </Toaster>
    );
};

export default ToastCookie;
