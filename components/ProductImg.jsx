import React from 'react';
import ModalCard from "./Modal/ModalCard";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import Image from "next/image";


const ProductImg = ({showModal, setShowModal, index, selector, product, setIndex}) => {
    return (
        <ModalCard showModal={showModal} setShowModal={setShowModal}>
            <div className='flex relative  z-40'>
                <div  className='absolute left-0  top-60 cursor-pointer z-40' onClick={()=>index > 0 ? setIndex(Math.max(index - 1, 0)) : setIndex(product.img.length - 1)}>
                    <ArrowLeft  width={40} height={40}  />
                </div>

                {product.img && <Image src={`${selector[index]}`} alt='' height={650} width={650} objectFit='contain'/>}
                <div  className='absolute right-0 top-60 cursor-pointer z-10'  onClick={ ()=>index + 1 < product.img.length ? setIndex(index + 1) : setIndex(0)}>
                    <ArrowRight width={40} height={40} />
                </div>

            </div>
        </ModalCard>

    );
};

export default ProductImg;
