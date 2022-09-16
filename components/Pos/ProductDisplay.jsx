import React from 'react';
import PosCard from "./PosCard";

const ProductDisplay = ({search, handleClick}) => {
    return (
        <>
            {search.map((item) => (
                <div key={item._id}>
                    <PosCard id={item._id} name={item.name} img={item.img} handleClick={handleClick} idx={3}/>
                </div>



            ))}

        </>
    );
};

export default ProductDisplay;
