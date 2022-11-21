import React from 'react';
import Image from "next/image";

const VendorLogos = ({images, logos, as}) => {

    return (
        <div className='flex items-center  justify-evenly h-24 w-[300vw] animate-[vendorScroll_45s_linear_infinite] bg-slate-200/70 truncate'>
            {logos?.map(({img, _id})=>(

                <div key={_id}  className='flex items-center py-2 bg-repeat-x'>
                    <Image  src={img} alt='' height={200}
                            width={200} priority={true} objectFit='contain' as={as}
                            crossOrigin="anonymous"/>
                </div>


            ))}
        </div>
    );
};

export default VendorLogos;
