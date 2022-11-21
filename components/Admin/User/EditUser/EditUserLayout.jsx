import React from 'react';
import Image from "next/image";
import Img from "./Img";
import Employment from "./Employment";
import EmergencyContact from "./EmergencyContact";

const EditUserLayout = ({section, user}) => {

    return (
        <div className={`flex w-full px-10`}>
            {section === 'image' && <Img/>}
            {section === 'employment' && <Employment user={user}/>}
            {section === 'emergency contact' && <EmergencyContact user={user}/>}
        </div>
    );
};

export default EditUserLayout;
