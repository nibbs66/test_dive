import React from 'react';
import PosCard from "./PosCard";

const CursusDisplay = ({search, handleClick}) => {
    return (
        <>
            {search.map((item) => (
                <div key={item._id}>
                    <PosCard id={item._id} name={item.cursus} img={item.img[0]} handleClick={handleClick} idx={2}/>
                </div>



            ))}

        </>
    );
};

export default CursusDisplay;
