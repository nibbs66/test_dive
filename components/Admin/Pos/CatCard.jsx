import React from 'react';
import axios from "axios";

const CatCard = ({idx, id, name, img, handleClick, setShowPosModal}) => {
    return (

        <div key={id} onClick={()=>handleClick(name, idx, id)}
             className="px-3 py-3 gap-4 flex flex-col border border-gray-200 rounded-md h-32 items-center bg-white cursor-pointer">
            <div>
                <div className="font-bold text-gray-800 text-center">{name}</div>

            </div>
            <div className="flex flex-row justify-between items-center">

                {img.length >2 && <img src={img} className=" h-14 w-14 object-cover rounded-md" alt=""/>}
            </div>
        </div>


    );
};

export default CatCard;
