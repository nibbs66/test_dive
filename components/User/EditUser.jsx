import {useEffect, useState} from 'react';
import UserLayout from "./UserLayout";
import AccordionLayout from "../Accordion/AccordionLayout";

import EditUserLayout from "./EditUser/EditUserLayout";
import EmergencyContact from "./EditUser/EmergencyContact";
import Employment from "./EditUser/Employment";

const EditUser = ({user}) => {
    const [data, setData] = useState([])
    const [activeIndex, setActiveIndex] = useState(1);


    const [section, setSection] = useState('')
console.log(user)
    return (
        <UserLayout user={user} editButton={false} deleteButton={true}>
            <div className={`flex flex-col gap-5 pt-5 mt-5`}>
                <div className={`flex justify-evenly `}>
                    <span
                        onClick={()=>setSection('certifications')}
                        className={`bg-blue-500 text-white text-xs uppercase py-1 px-2 rounded cursor-pointer`}>
                        Certifications
                    </span>
                    <span
                        onClick={()=>setSection('emergency contact')}
                        className={`bg-blue-500 text-white text-xs uppercase py-1 px-2 rounded cursor-pointer`}>
                        Emergency Contact
                    </span>
                    <span
                        onClick={()=>setSection('employment')}
                        className={`bg-blue-500 text-white text-xs uppercase py-1 px-2 rounded cursor-pointer`}>
                        Employment
                    </span>
                    <span
                        onClick={()=>setSection('image')}
                        className={`bg-blue-500 text-white text-xs uppercase py-1 px-2 rounded cursor-pointer`}>
                        Image
                    </span>
                </div>
            <AccordionLayout
                title={`Edit User`}
                bg={'bg-blue-500'}
                mx={'mx-10'}
                bodyMargin={'mx-10'}
                text={'text-white'}

                index={1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}

            >
                <EditUserLayout section={section} user={user}/>
            </AccordionLayout>
                <AccordionLayout
                    title={`Edit User Certifications`}
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}

                    index={2}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <EditUserLayout section={section} user={user}/>
                </AccordionLayout>
                <AccordionLayout
                    title={`Edit User Emergency Contact`}
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}

                    index={3}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <EmergencyContact  user={user}/>
                </AccordionLayout>
                <AccordionLayout
                    title={`Edit User Employment`}
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}

                    index={4}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <Employment  user={user}/>
                </AccordionLayout>
                <AccordionLayout
                    title={`Edit User Image`}
                    bg={'bg-blue-500'}
                    mx={'mx-10'}
                    bodyMargin={'mx-10'}
                    text={'text-white'}

                    index={5}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}

                >
                    <EditUserLayout section={section} user={user}/>
                </AccordionLayout>
            </div>


        </UserLayout>
    );
};

export default EditUser;
