import React from 'react';
import CardDisplay from "../CardDisplay";

const DashboardUserCard = ({bg, title, box}) => {
    return (
        <CardDisplay  bg={bg} title={title} box={box}>
           <div className="flex w-full">
               zoinks
           </div>
        </CardDisplay>
    );
};

export default DashboardUserCard;
