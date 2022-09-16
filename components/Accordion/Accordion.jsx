import {useState} from 'react';
import AccordionLayout from "./AccordionLayout";

const Accordion = ({section}) => {
    const [activeIndex, setActiveIndex] = useState('');

    return (
        <div>
            <AccordionLayout
                title='Personal'
                section={section}
                index={1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                Hello hello bye
            </AccordionLayout>
            <AccordionLayout
                title='Recent Activity'
                section={section}
                index={2}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                Hello hello bye
            </AccordionLayout>
            <AccordionLayout
                title='Recent Activity'
                section={section}
                index={3}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
            >
                Hello hello bye
            </AccordionLayout>

        </div>
    );
};

export default Accordion;
