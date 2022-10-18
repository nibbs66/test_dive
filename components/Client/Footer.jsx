import React from 'react';
import monkey from '../../public/img/494.jpg'
import Image from "next/image";
const Footer = () => {
    return (
        <div className='   h-96 text-xs md:text-base   bg-gradient-to-t from-[#1980b5] to-[rgba(25,128,180,0.1)]'>
           <div
               className="flex flex-col md:flex-row
               pt-2 md:pt-0 md:px-16 items-center md:gap-5 gap-1 justify-center h-full w-full md:justify-between text-white font-bold md:font-normal uppercase md:normal-case">
               <div className=" order-1 flex flex-col items-center gap-2">
                   <span className="t"> Teteringsedijk 275</span>
                   <span className="b">4817 ME Breda, NL</span>
                   <span className="r">+31 (0)88 00 454 00</span>
                   <span className="r">KvK: 06-41280374</span>
               </div>
               <div className=" order-3 md:order-2 flex flex-col items-center  ">
                   <span>info@rngdiving.nl</span>
                   <div className="flex items-center gap-3">
                       <span>powered by DiveMonkey
                       </span>
                     <div className='flex  w-12 h-12 justify-center rounded-full bg-white'>
                         <Image src={monkey} alt=""  width={35} height={35} objectFit='contain'/>
                     </div>
                   </div>
               </div>
               <div className="grid grid-cols-2 items-start gap-1 order-2 md:order-3">
                   <span className="r">Maandag: </span>
                   <span>Op afspraak</span>
                   <span className="r">Dinsdag: </span>
                   <span>18:00 - 20:00</span>
                   <span className="r">Woensdag: </span>
                   <span>Op afspraak</span>
                   <span className="r">Donderdag:</span>
                   <span>18:00 - 20:00</span>
                   <span className="r">Vrijdag: </span>
                   <span>12:00 - 20:00</span>
                   <span className="r">Zaterdag: </span>
                   <span>10:00 - 17:00</span>
                   <span className="r">Zondag : </span>
                   <span>Op afspraak</span>
               </div>
           </div>

        </div>
    );
};

export default Footer;
