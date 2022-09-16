import {useState, useEffect} from 'react';
import Image from "next/image";
import Link from "next/link";


const Slider = ({images, as}) => {
    const [carousel, setCarousel] = useState([])
    const [loadImg, setLoadImg] = useState('')
    const [nextImg, setNextImg] = useState('')
    const[index, setIndex] = useState(0)
    const[active, setActive] = useState(false)
//index + 1 < product.img.length ? setIndex(index + 1) : setIndex(0)
    //setIndex(Math.max(index - 1, 0))
    useEffect(()=>{
        setCarousel([])
        images.map((image, idx)=>{

            if(image.pic.category === 'webPic'){
                console.log(idx)

               setCarousel(prev=>[...prev, image.pic.img])

            }

        })

    },[])
    const buttonLinks = [
        <Link  href="/shop" passHref>
            <button className='ml-16 -mt-16 uppercase w-[350px] bg-blue-500/70 hover:bg-blue-500/90 py-10 px-16 text-4xl rounded-xl text-white font-thin'>
                Shop Now
            </button>
        </Link>,
        <Link  href="/learn" passHref>
            <button className='ml-16 -mt-16 uppercase w-[350px] bg-blue-500/70 hover:bg-blue-500/90 py-10 px-16 text-4xl rounded-xl text-white font-thin'>
               Learn to Dive
            </button>
        </Link>,
        <Link  href="/rental" passHref>
            <button className='ml-16 -mt-16 uppercase w-[350px] bg-blue-500/70 hover:bg-blue-500/90 py-10 px-16 text-4xl rounded-xl text-white font-thin'>
                Rentals
            </button>
        </Link>,
        <Link  href="/service" passHref>
            <button className='ml-16 -mt-16 uppercase w-[350px] bg-blue-500/70 hover:bg-blue-500/90 py-10 px-16 text-4xl rounded-xl text-white font-thin'>
                Service
            </button>
        </Link>,
    ]
useEffect(()=>{

       const interval = setInterval(()=>{

           if(index + 1 < carousel.length){
               setActive(!active)
               setIndex(index + 1)




           }else{
               setActive(!active)
               setIndex(0)

           }
       }, 6000);



       return () => clearInterval(interval)

   })

console.log(carousel.length)
    return (
        <div className='h-[calc(80vh-100px)] w-full  my-5 relative'>

            <div  className='w-[calc(600vw-500vw)] p-16 fixed   text-white flex items-center  top-96  left-16 z-40'>
                <Link  href="/shop" passHref>
                    <button className='ml-16 -mt-16 uppercase w-[350px] bg-blue-500/70 hover:bg-blue-500/90 py-10 px-16 text-4xl rounded-xl text-white font-thin'>
                        Shop Now
                    </button>
                </Link>
            </div>

                <div className={`imgContainer`}>
                   <Image className={`${active ? 'fadeOut ' :  'fadeIn '} ${active ? 'next' : 'prev'}  `} src={carousel[index + 2]} priority={true} alt="" layout="fill" as={as} objectFit="cover"/>
                    <Image className={`${!active ? 'fadeOut ' :  'fadeIn '} ${!active ? 'next' : 'prev'}  `} src={carousel[index]} priority={true} alt="" layout="fill" as={as} objectFit="cover"/>






                </div>

        </div>
    );
};

export default Slider;
