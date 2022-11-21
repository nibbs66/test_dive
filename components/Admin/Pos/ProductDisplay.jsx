import React from 'react';
import PosCard from "./PosCard";

const ProductDisplay = ({search, handleClick, setShowPosModal, getProduct}) => {

    return (
        <>
            {search.map((item) => (
                <div key={item._id}>
                    <PosCard id={item._id} name={item.name} man={item.vendor} img={item.img} setShowPosModal={setShowPosModal} handleClick={handleClick} getProduct={getProduct} idx={3}/>
                </div>



            ))}

        </>
    );
};

export default ProductDisplay;
