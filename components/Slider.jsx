import {useState, useEffect} from 'react';
import Image from "next/image";
import Link from "next/link";

const Slider = ({images, as}) => {
    const[index, setIndex] = useState(0)

    const buttonLinks = [
        <Link  href="/shop" passHref>
            <button className='flex justify-center whitespace-nowrap  ml-16 -mt-16 uppercase  bg-green-500 hover:bg-green-500/90 p-5 lg:p-10  lg:text-4xl text-xl rounded-xl text-white font-light hover:font-normal'>
                Shop Now
            </button>
        </Link>,
        <Link  href="/learn" passHref>
            <button className='flex justify-center whitespace-nowrap ml-16 -mt-16 uppercase  bg-green-500 hover:bg-green-500/90 p-5 lg:p-10  lg:text-4xl text-xl rounded-xl text-white font-light hover:font-normal'>
                Learn to Dive
            </button>
        </Link>,
        <Link  href="/rental" passHref>
            <button className='flex justify-center whitespace-nowrap ml-16 -mt-16  uppercase  bg-green-500 hover:bg-green-500/90 p-5 lg:p-10  lg:text-4xl text-xl rounded-xl text-white font-light hover:font-normal'>
                Rentals
            </button>
        </Link>,
        <Link  href="/service" passHref>
            <button className='flex justify-center whitespace-nowrap ml-16 -mt-16 uppercase  bg-green-500 hover:bg-green-500/90 p-5 lg:p-10  lg:text-4xl text-xl rounded-xl text-white font-light hover:font-normal'>
                Service
            </button>
        </Link>,
    ]
    useEffect(()=>{

        const interval = setInterval(()=>{

            if(index + 1 < buttonLinks.length){

                setIndex(index + 1)
            }else{
                setIndex(0)
            }
        }, 6000);
        return () => clearInterval(interval)

    })

    return (
        <div className='h-[calc(80vh-100px)] w-full   my-5 relative '>

               <div  className=' w-[calc(600vw-500vw)] p-16  absolute  text-white flex items-center top-56 -left-16.5  lg:top-50 lg:left-16 z-10'>
                   {buttonLinks[index]}

               </div>

            <div className=" flex w-[600vw]   h-full  whitespace-nowrap animate-[scroll_60s_linear_infinite] ">

                    {images?.map((img, idx)=>(
                        img.pic.category === 'webPic' &&

                        <div key={idx} className="w-screen h-full relative">
                            <Image className=' bg-repeat-x ' src={img.pic.img} priority={true} alt="" layout="fill" as={as} objectFit="cover"/>
                        </div>

                    ))}


            </div>

        </div>
    );
};

export default Slider;
