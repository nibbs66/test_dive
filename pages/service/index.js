import {useState} from 'react';
import Client from "../../components/layout/Client";
import axios from "axios";
import AccordionLayout from "../../components/Accordion/AccordionLayout";
import ClientHeader from "../../components/ClientHeader";

const Index = ({service}) => {
    const [activeIndex, setActiveIndex] = useState(1)
    return (
        <div className={`container flex`}>
            <div className={`flex flex-col gap-5 my-5  min-h-fit`}>
            <ClientHeader title={`service`}/>
                <div className={`px-24 my-5 h-48 md:h-full overflow-scroll text-sm md:text-base text-slate-500`}>
                    {service.map((services)=>(
                        <div key={services._id}>
                            <p>{services.desc}</p>
                        </div>
                    ))}
                </div>
                {service.map((services, idx)=>(
                    !services.desc &&
                    <AccordionLayout
                        title={services.serviceType}
                        bg={`${activeIndex === 0 ? 'bg-blue-600' : 'bg-blue-500'}`}
                        text={'text-white'}
                        mx={'mx-10'}
                        bodyMargin={'mx-10'}
                        index={idx}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}>
                       <ul className={ `flex flex-col gap-4 pl-16 text-slate-500`}>
                           {services.services.map((item, idx)=>(
                               <li key={idx}>
                                   {item}
                               </li>
                           ))}
                       </ul>
                    </AccordionLayout>
                ))}
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
    const res = await axios.get(`http://`+host+`/api/service`);

    return{
        props: {
            service: res.data
        }
    }
}
