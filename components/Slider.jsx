import {Fragment, useState, useEffect} from 'react'
import {Transition } from '@headlessui/react'
import { useTimeoutFn } from 'react-use'
import Image from 'next/image'
import Link from "next/link";
const NewSlider = ({images, as}) => {
    const [isShowing, setIsShowing] = useState(true)
    const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 1000)
    const [carousel, setCarousel] = useState([])
    const [index, setIndex] = useState(0)
    const [bIndex, setBIndex] = useState(0)


    useEffect(() =>{

        images.map((img, idx)=>{

            if(img.pic.category === 'webPic'){
                setCarousel(prev=>[...prev, img])
            }
        })
    },[images])
    const buttonLinks = [
        <Link  href="/shop" passHref>
            <button className='flex justify-center whitespace-nowrap  ml-16 -mt-16 uppercase  bg-green-500 hover:bg-green-500/90 p-5 lg:p-10  lg:text-4xl text-xl rounded-xl text-white font-light hover:font-normal'>
                Winkel
            </button>
        </Link>,
        <Link  href="/learn" passHref>
            <button className='flex justify-center whitespace-nowrap ml-16 -mt-16 uppercase  bg-green-500 hover:bg-green-500/90 p-5 lg:p-10  lg:text-4xl text-xl rounded-xl text-white font-light hover:font-normal'>
                Leren Duiken
            </button>
        </Link>,
        <Link  href="/rental" passHref>
            <button className='flex justify-center whitespace-nowrap ml-16 -mt-16  uppercase  bg-green-500 hover:bg-green-500/90 p-5 lg:p-10  lg:text-4xl text-xl rounded-xl text-white font-light hover:font-normal'>
                Te Huur
            </button>
        </Link>,
        <Link  href="/service" passHref>
            <button className='flex justify-center whitespace-nowrap ml-16 -mt-16 uppercase  bg-green-500 hover:bg-green-500/90 p-5 lg:p-10  lg:text-4xl text-xl rounded-xl text-white font-light hover:font-normal'>
                Onderhoud
            </button>
        </Link>,
    ]
    useEffect(()=>{

        const interval = setInterval(()=>{
            if(bIndex  + 1 < buttonLinks.length){
                setBIndex(bIndex + 1)
            }else{
                setBIndex(0)
            }

            if(index + 1 < carousel.length){

                setIndex(index + 1)
                setIsShowing(false)
                resetIsShowing()
            }else{
                setIndex(0)
                setIsShowing(false)
                resetIsShowing()
            }
        }, 6000);
        return () => clearInterval(interval)

    })
    return (
        <div className="w-full h-[calc(80vh-100px)] bg-[ghost-white] my-5">

            <Transition

                as={Fragment}
                show={isShowing}
                enter="transform transition duration-[1000ms]"
                enterFrom="opacity-0 rotate-[-120deg] scale-50"
                enterTo="opacity-100 rotate-0 scale-100"
                leave="transform duration-500 transition ease-in-out"
                leaveFrom="opacity-100 rotate-0 scale-100 "
                leaveTo="opacity-0 rotate-[120deg] scale-50 "
            >

                {/*<div className="h-full w-full rounded-md bg-blue-500 shadow-lg"/>*/}
                <div  className=" h-full w-full    whitespace-nowrap  relative">
                    <div className={` absolute  top-56 -left-16.5  lg:top-50 lg:left-16 z-10`}>{buttonLinks[bIndex]}</div>
                    <div >
                        <Image  src={carousel[index]?.pic.img} priority={true} as={as} alt=""
                                layout={`fill`} objectFit="cover"/>
                    </div>
                </div>

            </Transition>



        </div>
    )

}
export default NewSlider;

