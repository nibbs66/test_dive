import React from 'react';
import Image from "next/image";

const VendorLogos = ({images, as}) => {
    return (
        <div className='flex items-center  justify-evenly h-12 w-[300vw] animate-[vendorScroll_45s_linear_infinite] bg-slate-200/70 truncate'>
            {images?.map((img, idx)=>(
                img.pic.category === 'vendorLogo' &&
                <div key={idx}  className='flex  bg-repeat-x'>
                    <Image  src={img.pic.img} alt='' height={80}
                            width={100} priority={true} objectFit='contain' as={as}
                            crossOrigin="anonymous"/>
                </div>


            ))}
        </div>
    );
};

export default VendorLogos;
