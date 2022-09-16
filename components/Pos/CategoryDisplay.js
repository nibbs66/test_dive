import React from 'react';
import PosCard from "./PosCard";

const CategoryDisplay = ({search, handleClick}) => {
    return (
       <>
            {search.map((item) => (
                <div key={item._id}>
                    <PosCard id={item._id} name={item.name} img={item.img} handleClick={handleClick} idx={2}/>
                </div>



            ))}

       </>
    );
};

export default CategoryDisplay;
