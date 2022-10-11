import React from 'react';
import Image from "next/image";

const VendorLogos = ({images, as}) => {
    return (
        <div className='flex items-center  justify-evenly h-24 w-[300vw] animate-[vendorScroll_45s_linear_infinite] bg-slate-200/70 truncate'>
            {images?.map((img, idx)=>(
                img.pic.category === 'vendorLogo' &&
                <div key={idx}  className='flex items-center py-2 bg-repeat-x'>
                    <Image  src={img.pic.img} alt='' height={200}
                            width={200} priority={true} objectFit='contain' as={as}
                          />
                </div>


            ))}
        </div>
    );
};

export default VendorLogos;
