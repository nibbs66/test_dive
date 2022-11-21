import {useState} from 'react';
import Client from "../../components/layout/Client";
import ClientHeader from "../../components/Client/ClientHeader";
import Faq from "../../components/Client/Overons/Faq";

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
