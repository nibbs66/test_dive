import {useState} from 'react';
import Client from "../../components/layout/Client";
import AccordionLayout from "../../components/Accordion/AccordionLayout";
import OveronsCard from "../../components/OveronsCard";
import ClientHeader from "../../components/ClientHeader";
import Faq from "../../components/Faq";

const Index = () => {
    const [activeIndex, setActiveIndex] = useState(-1)
    return (
        <div className={`min-h-fit`}>
            <div className={`flex flex-col gap-2 md:gap-5 my-5 items-center px-5 md:px-10`}>
            <ClientHeader title={`FAQ's`} lastPage={'/'}/>
          <Faq activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
            </div>
        </div>
    );
};

export default Index;
Index.getLayout = function getLayout(page){
    return(
        <Client>
            {page}
        </Client>
    )
}
