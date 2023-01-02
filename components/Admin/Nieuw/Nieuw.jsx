import React from 'react';
import ModalCard from "../../Modal/ModalCard";

import {
    UserIcon,
    BanknotesIcon,
    WrenchIcon,
    AcademicCapIcon,
    ClockIcon,
    RectangleGroupIcon,
    BuildingStorefrontIcon
} from '@heroicons/react/24/outline'
import {useRouter} from "next/router";


const Nieuw = ({showModal, setShowModal}) => {
    const router = useRouter()
    const handleClick = (data) => {
        router.push(`/admin/${data}`)
        setShowModal(false)
    }
    return (
        <>
            <ModalCard  showModal={showModal} setShowModal={setShowModal}>
                <ul className={'flex flex-col font-bold text-slate-400  uppercase gap-4 px-10 py-5'}>
                    <li className={'flex gap-2 cursor-pointer'}  onClick={()=>handleClick('store')}>
                        <BanknotesIcon className={`h-5 w-5 `}/>
                        <span >New Sale</span>
                    </li>

                    <li className={'flex gap-2 cursor-pointer'} onClick={()=>handleClick('users/user/new')}>
                        <UserIcon className={`h-5 w-5 `}/>
                        <span >New User</span>
                    </li>
                    <li className={'flex gap-2 cursor-pointer'}   onClick={()=>handleClick('products/new')}>
                        <RectangleGroupIcon  className={`h-5 w-5 `}/>
                        <span >New Product</span>
                    </li>
                    <li className={'flex gap-2 cursor-pointer'}   onClick={()=>handleClick('vendors/new')}>
                        <BuildingStorefrontIcon  className={`h-5 w-5`}/>
                        <span>New Vendor</span>
                    </li>

                    <li className={'flex gap-2 cursor-pointer'}>
                        <WrenchIcon className={`h-5 w-5 `}/>
                        <span >Book Service</span>
                    </li>

                    <li className={'flex gap-2 cursor-pointer'} onClick={()=>handleClick('rental_equipment/new')}>
                        <ClockIcon   className={`h-5 w-5 `}/>
                        <span >New Rental</span>
                    </li>
                    <li className={'flex gap-2 cursor-pointer'} onClick={()=>handleClick('cursus/new')}>
                        <AcademicCapIcon  className={`h-5 w-5 `}/>
                        <span >New Cursus</span>
                    </li>


                </ul>

            </ModalCard>

        </>
    );
};

export default Nieuw;
