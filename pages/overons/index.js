import {useState} from 'react';
import Client from "../../components/layout/Client";
import axios from "axios";
import ClientHeader from "../../components/Client/ClientHeader";
import AccordionLayout from "../../components/Accordion/AccordionLayout";
import ContactForm from "../../components/Client/ContactForm";
import Staff from "../../components/Client/Overons/Staff";
import OveronsCard from "../../components/Client/Overons/OveronsCard";

const Index = () => {
    const [activeIndex, setActiveIndex] = useState(1)
    return (
        <div className={`min-h-screen w-screen `}>
            <div className={`flex flex-col gap-5 my-5 items-center px-5 md:px-16`}>
                <ClientHeader title={`Over ons`} lastPage={'/'}/>
                <AccordionLayout
                    title={'Over ons'}
                    bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
                    text={'text-white'}
                    titleSize={`text-sm md:text-base`}
                    mx={'mx-10'}
                    width={`w-full`}
                    bodyMargin={'mx-10'}
                    index={1}
                    body={`justify-center`}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <OveronsCard/>
                </AccordionLayout>
                <AccordionLayout
                    title={'Contact Formulier'}
                    bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
                    text={'text-white'}
                    titleSize={`text-sm md:text-base`}
                    mx={'mx-10'}
                    width={`w-full`}
                    bodyMargin={'mx-10'}
                    index={2}
                    body={`justify-center`}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <ContactForm subject={`Alles`}/>

                </AccordionLayout>
                <AccordionLayout
                    title={'Onze Staff'}
                    bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
                    text={'text-white'}
                    titleSize={`text-sm md:text-base`}
                    mx={'mx-10'}
                    width={`w-full`}
                    bodyMargin={'mx-10'}
                    index={3}
                    body={`justify-center`}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                >
                    <Staff/>
                </AccordionLayout>

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
export const getServerSideProps = async (ctx) => {
    const host = ctx.req.headers.host;
    const img = await axios.get(`https://`+host+`/api/images`);

    return{
        props: {
            image: img.data
        }
    }
}
