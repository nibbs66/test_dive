import React from 'react';
import CatCard from "./CatCard";

const CategoryDisplay = ({search, handleClick}) => {
    return (
       <>
            {search?.map((item) => (
                <div key={item._id}>
                    <CatCard id={item._id} name={item.name} img={item.img} handleClick={handleClick} idx={2}/>
                </div>



            ))}

       </>
    );
};

export default CategoryDisplay;
